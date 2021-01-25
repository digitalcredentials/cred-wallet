import { AppState, AppStateStatus } from 'react-native';
import { eventChannel } from 'redux-saga';
import { take, call, cancelled, put, delay } from 'redux-saga/effects';
import { StaticNavigator } from '../../services/navigator';
import _ from 'lodash';
import { appActionCreators } from '../../redux/app';

function createAppStateChannel() {
  return eventChannel((emit: (nextState: AppStateStatus) => void) => {
    AppState.addEventListener('change', emit);
    return () => {
      AppState.removeEventListener('change', emit);
    };
  });
}

export function* appStateListenerSaga(): Generator<any, any, any> {
  const PIN_ROUTE_NAME = 'Pin';
  const MODAL_SCREENS = ['CreateBackup', 'AddCertificate'];
  let prevAppState = '';
  const appStateChannel = yield call(createAppStateChannel);
  try {
    while (true) {
      const nextAppState: AppStateStatus = yield take(appStateChannel);
      if (prevAppState.match(/background/) && nextAppState === 'active') {
        const currentRoute = StaticNavigator.getCurretRoute();
        if (currentRoute?.name !== PIN_ROUTE_NAME) {
          if (_.includes(MODAL_SCREENS, currentRoute?.name)) {
            yield call(StaticNavigator.goBack);
            yield put(
              appActionCreators.saveNavRoute(
                currentRoute?.name!,
                currentRoute?.params!,
              ),
            );
            yield delay(500);
          }
          yield call(StaticNavigator.push, PIN_ROUTE_NAME, { isPushed: true });
        }
      }

      prevAppState = nextAppState;
    }
  } finally {
    if (yield cancelled()) {
      appStateChannel.close();
    }
  }
}
