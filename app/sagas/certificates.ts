import { call, put } from 'redux-saga/effects';
import { ApiResponse } from 'apisauce';

import {
  AddCertificateAction,
  AddCertificateFailureAction,
  AddCertificateSuccessAction,
  certificatesActionCreators,
  CreateBackupAction,
} from '../redux/certificates';
import { apiInstance } from '../services/api';
import CONFIG from '../config/env';
import { Credential } from '../services/api/api.types';
import { StaticNavigator } from '../services/navigator';
import { getCredentialCertificate, getCredentialIssuer } from '../utils';
import EncryptionManager from '../services/encryption-manager';

export function* addCertificate({ data }: AddCertificateAction) {
  const response: ApiResponse<Credential, Credential> = yield call(
    apiInstance.addCertificate,
    data.requestUrl.replace(CONFIG.API_URL, ''),
    {
      holder: data.did,
      ...data,
    },
  );

  if (response.ok) {
    const certificate = yield call(getCredentialCertificate, response.data!);
    const issuer = yield call(getCredentialIssuer, response.data!);
    yield put<AddCertificateSuccessAction>(
      certificatesActionCreators.addCertificateSuccess(),
    );
    yield call(StaticNavigator.navigateTo, 'AddCertificate', {
      certificate,
      issuer,
    });
  } else {
    yield put<AddCertificateFailureAction>(
      certificatesActionCreators.addCertificateFailure(
        'Some problems with QRcode/deeplink. Try again.',
      ),
    );
  }
}

export function* createBackup({ key }: CreateBackupAction) {
  // TODO: get certificates from redux
  // TODO: stringify certificates -> create backup string
  // EncryptionManager.encryptAES(message, key);
  // EncryptionManager.decryptAES(cipher, key);
  // TODO: create file with ecrypted data
}
