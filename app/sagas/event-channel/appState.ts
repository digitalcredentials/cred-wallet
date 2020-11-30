import { AppState, AppStateStatus } from 'react-native';
import { eventChannel } from 'redux-saga';
import { take, call, cancelled } from 'redux-saga/effects';
import { StaticNavigator } from '../../services/navigator';

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
  let prevAppState = '';
  const appStateChannel = yield call(createAppStateChannel);
  try {
    while (true) {
      const nextAppState: AppStateStatus = yield take(appStateChannel);
      if (prevAppState.match(/background/) && nextAppState === 'active') {
        const currentRouteName = StaticNavigator.getCurretRoute()?.name;
        if (currentRouteName !== PIN_ROUTE_NAME) {
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
