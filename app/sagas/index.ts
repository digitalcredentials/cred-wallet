import { all } from 'redux-saga/effects';

import { appStateListenerSaga, deeplinkListenerSaga } from './channels';
import { userSaga } from './user';
import { certificatesSaga } from './certificates';
import { searchSaga } from './search';

export default function* rootSaga() {
  yield all([
    // Channels
    appStateListenerSaga(),
    deeplinkListenerSaga(),

    // Sagas
    userSaga(),
    certificatesSaga(),
    searchSaga(),
  ]);
}
