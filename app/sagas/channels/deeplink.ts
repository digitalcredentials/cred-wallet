import { actionChannel, delay, select, take, call } from 'redux-saga/effects';
import {
  authorize,
  AuthConfiguration,
  AuthorizeResult,
} from 'react-native-app-auth';
import _ from 'lodash';

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
} from '../../utils/types';
import { DEEPLINK_OAUTH_SOURCE_DATA } from '../../utils/constants';

function* handleBackupDeeplink(backupDeeplinkUrl: string) {
  yield call(StaticNavigator.navigateTo, 'CreateBackup', {
    isLoadBackup: true,
    backupPath: backupDeeplinkUrl,
  });
}

// Unauthenticated deep link
function* handleCertificateDeeplink(certificateDeeplinkUrl: string) {
  console.tron.log('handleCertificateDeeplink:', certificateDeeplinkUrl);

  const parsedDeeplink: ICertificateDeeplink = yield call(
    parseCertificateDeeplink,
    certificateDeeplinkUrl,
  );
  const payload: Object = yield call(
    generateAndProveDid,
    parsedDeeplink.challenge,
  );

  console.tron.log('payload', payload);

  try {
    console.log(parsedDeeplink.requestUrl);
    const result: Response = yield fetch(parsedDeeplink.requestUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.tron.log('response', result);

    // TODO
  } catch (e) {
    console.log(e);
  }
}

// Oauth deep link
function* handleOAuthDeeplink(oauthDeeplinkUrl: string) {
  console.tron?.log('handleOAuthDeeplink', oauthDeeplinkUrl);
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

    console.tron?.log('authorizeResponse', authorizeResponse);

    const payload: Object = yield call(
      generateAndProveDid,
      parsedOAuthDeeplink.challenge,
    );

    console.tron?.log('payload', payload);

    console.tron?.log(
      'headers',
      `${authorizeResponse.tokenType} ${authorizeResponse.accessToken}`,
    );

    const response: Response = yield fetch(parsedOAuthDeeplink.vcRequestUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${authorizeResponse.tokenType} ${authorizeResponse.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    console.tron?.log('response', response);
  } catch (e) {
    // Cancelled authorization
    console.tron?.log('error', e);
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
    console.tron?.log('deeplinkChannel', deeplinkUrl);

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
