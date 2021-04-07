import {
  actionChannel,
  delay,
  select,
  take,
  call,
  put,
} from 'redux-saga/effects';
import queryString from 'query-string';
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
} from '../../utils';
import { DeeplinkType } from '../../utils/types';
import { certificatesActionCreators } from '../../redux/certificates';

function handleBackupDeeplink(backupDeeplinkUrl: string) {
  StaticNavigator.navigateTo('CreateBackup', {
    isLoadBackup: true,
    backupPath: backupDeeplinkUrl,
  });
}

function* handleCertificateDeeplink(certificateDeeplinkUrl: string) {
  const parsedCertificateDeeplink = parseCertificateDeeplink(
    certificateDeeplinkUrl,
  );

  const did = yield call(generateDid);
  yield put(
    certificatesActionCreators.addCertificate({
      did,
      ...parsedCertificateDeeplink,
    }),
  );

  yield put(appActionCreators.setDeeplinkUrl(null));
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
