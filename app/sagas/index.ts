import { all, takeLatest } from 'redux-saga/effects';
import { GetUserAccountAction, userActionTypes } from '../redux/user';
import {
  AddCertificateAction,
  certificatesActionTypes,
  CreateBackupAction,
  LoadBackupAction,
} from '../redux/certificates';
import { searchActionTypes, SearchCredentialAction } from '../redux/search';

import { getUser } from './user';
import { addCertificate, createBackup, loadBackup } from './certificates';
import { appStateListenerSaga } from './event-channel';
import { searchCertificate } from './search';

export default function* rootSaga() {
  yield all([
    // Event Channels
    appStateListenerSaga(),

    // User
    takeLatest<GetUserAccountAction>(userActionTypes.GET_USER, getUser),

    // Certificates
    takeLatest<AddCertificateAction>(
      certificatesActionTypes.ADD_CERTIFICATE,
      addCertificate,
    ),
    takeLatest<CreateBackupAction>(
      certificatesActionTypes.CREATE_BACKUP,
      createBackup,
    ),
    takeLatest<LoadBackupAction>(
      certificatesActionTypes.LOAD_BACKUP,
      loadBackup,
    ),

    // Search
    takeLatest<SearchCredentialAction>(
      searchActionTypes.SEARCH_CREDENTIALS,
      searchCertificate,
    ),
  ]);
}
