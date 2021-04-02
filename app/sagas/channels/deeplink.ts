import { actionChannel, delay, select, take, call } from 'redux-saga/effects';
import { StaticNavigator } from '../../services/navigator';
import _ from 'lodash';

import {
  appActionTypes,
  AppSelectors,
  SetDeeplinkUrlAction,
  SetVerificationProcessAction,
} from '../../redux/app';

function handleDeeplinkUrl(deeplinkUrl: string) {
  // TODO
  switch (deeplinkUrl) {
    default:
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
