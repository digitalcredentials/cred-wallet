import {
  actionChannel,
  delay,
  select,
  take,
  call,
  put,
} from 'redux-saga/effects';
import {
  authorize,
  AuthConfiguration,
  AuthorizeResult,
} from 'react-native-app-auth';
import _ from 'lodash';
import { logInfo, logError } from '../../utils/log';

import { StaticNavigator } from '../../services/navigator';
import {
  appActionTypes,
  AppSelectors,
  SetDeeplinkUrlAction,
  SetVerificationProcessAction,
} from '../../redux/app';
import {
  getDeeplinkType,
  parseCertificateDeeplink,
  parseOAuthDeeplink,
} from '../../utils';
import { generateAndProveDid } from '../../didKey';
import {
  DeeplinkType,
  ICertificateDeeplink,
  IOAuthDeeplink,
  RequestMethod,
} from '../../utils/types';
import {
  DEEPLINK_OAUTH_SOURCE_DATA,
  DEFAULT_JSON_HEADERS,
} from '../../utils/constants';
import {
  AddCertificateAction,
  AddCertificateFailureAction,
  certificatesActionCreators,
} from '../../redux/certificates';
import { Credential } from '../../services/api/api.types';

function* handleBackupDeeplink(backupDeeplinkUrl: string) {
  yield call(StaticNavigator.navigateTo, 'CreateBackup', {
    isLoadBackup: true,
    backupPath: backupDeeplinkUrl,
  });
}

// Unauthenticated deep link
function* handleCertificateDeeplink(certificateDeeplinkUrl: string) {
  const parsedDeeplink: ICertificateDeeplink = yield call(
    parseCertificateDeeplink,
    certificateDeeplinkUrl,
  );
  const payload: Object = yield call(
    generateAndProveDid,
    parsedDeeplink.challenge,
  );

  try {
    const response: Response = yield fetch(parsedDeeplink.requestUrl, {
      method: RequestMethod.Post,
      headers: DEFAULT_JSON_HEADERS,
      body: JSON.stringify(payload),
    });

    const credential: Credential = yield response.json();
    yield put<AddCertificateAction>(
      certificatesActionCreators.addCertificate(credential),
    );
  } catch (e) {
    logError(e);
    yield put<AddCertificateFailureAction>(
      certificatesActionCreators.addCertificateFailure(`Encountered an error handling the credential or its link. Details: ${e}`),

    );
  }
}

// Oauth deep link
function* handleOAuthDeeplink(oauthDeeplinkUrl: string) {
  const parsedOAuthDeeplink: IOAuthDeeplink = yield call(
    parseOAuthDeeplink,
    oauthDeeplinkUrl,
  );

  const providerData = DEEPLINK_OAUTH_SOURCE_DATA[parsedOAuthDeeplink.authType];

  const authorizeConfig: AuthConfiguration = {
    clientId: providerData.cliendId,
    issuer: providerData.issuer,
    redirectUrl: 'dccrequest://oauth',
    serviceConfiguration: {
      authorizationEndpoint: providerData.issuerAuthorizationEndpoint,
      tokenEndpoint: providerData.issuerTokenEndpoint,
    },
    scopes: ['digitalcredentials'],
  };

  try {
    const authorizeResponse: AuthorizeResult = yield call(
      authorize,
      authorizeConfig,
    );

    const payload: Object = yield call(
      generateAndProveDid,
      parsedOAuthDeeplink.challenge,
    );

    const response: Response = yield fetch(parsedOAuthDeeplink.vcRequestUrl, {
      method: RequestMethod.Post,
      headers: {
        ...DEFAULT_JSON_HEADERS,
        Authorization: `${authorizeResponse.tokenType} ${authorizeResponse.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const credential: Credential = yield response.json();
    yield put<AddCertificateAction>(
      certificatesActionCreators.addCertificate(credential),
    );
  } catch (e) {
    logError(e);
    yield put<AddCertificateFailureAction>(
      certificatesActionCreators.addCertificateFailure(`Encountered an error handling the credential or its authenticated link. Details: ${e}`),
    );
  }
}

function* handleDeeplinkUrl(deeplinkUrl: string) {
  const deeplinkType: DeeplinkType = yield call(getDeeplinkType, deeplinkUrl);
  switch (deeplinkType) {
    case DeeplinkType.Backup:
      yield call(handleBackupDeeplink, deeplinkUrl);
      break;
    case DeeplinkType.Default:
      yield call(handleCertificateDeeplink, deeplinkUrl);
      break;
    case DeeplinkType.OAuth:
      yield call(handleOAuthDeeplink, deeplinkUrl);
      break;
  }
}

export function* deeplinkListenerSaga(): Generator<any, any, any> {
  const deeplinkChannel = yield actionChannel(appActionTypes.SET_DEEPLINK_URL);
  while (true) {
    const { deeplinkUrl }: SetDeeplinkUrlAction = yield take(deeplinkChannel);

    // Handle only not null
    if (deeplinkUrl) {
      // Timeout for verification handling
      // If we open app from browser
      yield delay(500);

      // Checking verification process
      const isVerificationProcess: boolean = yield select(
        AppSelectors.selectIsVerificationProcess,
      );

      // Waiting for verification process
      if (isVerificationProcess) {
        while (true) {
          const {
            isVerificationProcess: newIsVerificationProcess,
          }: SetVerificationProcessAction = yield take(
            appActionTypes.SET_VERIFICATION_PROCESS,
          );

          // Break only when verification process ended
          if (!newIsVerificationProcess) {
            break;
          }
        }
      }

      yield call(handleDeeplinkUrl, deeplinkUrl);
    }
  }
}
