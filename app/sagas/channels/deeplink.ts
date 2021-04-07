import {
  actionChannel,
  delay,
  select,
  take,
  call,
  put,
} from 'redux-saga/effects';
import { authorize, AuthConfiguration } from 'react-native-app-auth';
import _ from 'lodash';

import { StaticNavigator } from '../../services/navigator';
import {
  appActionCreators,
  appActionTypes,
  AppSelectors,
  SetDeeplinkUrlAction,
  SetVerificationProcessAction,
} from '../../redux/app';
import {
  generateDid,
  getDeeplinkType,
  parseCertificateDeeplink,
  parseOAuthDeeplink,
} from '../../utils';
import {
  DeeplinkType,
  ICertificateDeeplink,
  IDeeplinkSourceData,
  IOAuthDeeplink,
} from '../../utils/types';
import { certificatesActionCreators } from '../../redux/certificates';
import { DEEPLINK_OAUTH_SOURCE_DATA } from '../../utils/constants';
import { apiInstance } from '../../services/api';

function* handleBackupDeeplink(backupDeeplinkUrl: string) {
  yield call(StaticNavigator.navigateTo, 'CreateBackup', {
    isLoadBackup: true,
    backupPath: backupDeeplinkUrl,
  });
}

function* handleCertificateDeeplink(certificateDeeplinkUrl: string) {
  console.tron?.log('handleCertificateDeeplink:', certificateDeeplinkUrl);

  // TODO: uncomment these lines when `handleOAuthDeeplink` works

  // const parsedCertificateDeeplink: ICertificateDeeplink = yield call(
  //   parseCertificateDeeplink,
  //   certificateDeeplinkUrl,
  // );

  // const did = yield call(generateDid);
  // yield put(
  //   certificatesActionCreators.addCertificate({
  //     did,
  //     ...parsedCertificateDeeplink,
  //   }),
  // );

  // yield put(appActionCreators.setDeeplinkUrl(null));
}

function* handleOAuthDeeplink(oauthDeeplinkUrl: string) {
  console.tron?.log('handleOAuthDeeplink', oauthDeeplinkUrl);
  const parsedOAuthDeeplink: IOAuthDeeplink = yield call(
    parseOAuthDeeplink,
    oauthDeeplinkUrl,
  );

  console.tron?.log('parsedOAuthDeeplink', parsedOAuthDeeplink);

  const providerData = DEEPLINK_OAUTH_SOURCE_DATA[parsedOAuthDeeplink.authType];

  console.tron?.log('providerData', providerData);

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
  console.tron?.log('authorizeConfig', authorizeConfig);
  try {
    const authorizeResponse = yield call(authorize, authorizeConfig);
    console.tron?.log('response', authorizeResponse);

    // TODO: replace dummyTokens by real
    const dummyTokens = {};

    const payload = {
      // TODO: generate did token???
      ...dummyTokens,
    };

    // TODO: check addCertificate & do it like there
    const addCertResponse = yield call(
      apiInstance.addCertificate,
      parsedOAuthDeeplink.vcRequestUrl,
      payload,
    );
  } catch (e) {
    console.tron?.log('error', e);
    // Cancelled authorization
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
