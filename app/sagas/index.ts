import { all } from 'redux-saga/effects';

import { userSaga } from './user';
import { certificatesSaga } from './certificates';
import { appStateListenerSaga } from './event-channel';
import { searchSaga } from './search';

export default function* rootSaga() {
  yield all([
    // Event Channels
    appStateListenerSaga(),

    // Sagas
    userSaga(),
    certificatesSaga(),
    searchSaga(),
  ]);
}
