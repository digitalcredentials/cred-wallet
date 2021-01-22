import { call, put, select } from 'redux-saga/effects';
import { ApiResponse } from 'apisauce';
import { ShareAction } from 'react-native';
import moment from 'moment';
import FS from 'react-native-fs';

import {
  AddCertificateAction,
  AddCertificateFailureAction,
  AddCertificateSuccessAction,
  certificatesActionCreators,
  CertificateSelectors,
  CreateBackupAction,
  CreateBackupFailureAction,
  CreateBackupSuccessAction,
  LoadBackupAction,
  LoadBackupFailureAction,
  LoadBackupSuccessAction,
} from '../redux/certificates';
import { apiInstance } from '../services/api';
import CONFIG from '../config/env';
import { Credential } from '../services/api/api.types';
import { StaticNavigator } from '../services/navigator';
import { getCredentialCertificate, getCredentialIssuer } from '../utils';
import EncryptionManager from '../services/encryption-manager';
import { CredentialsByIssuer } from '../utils/types';
import { FileManager } from '../services/file-manager';

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
  try {
    const certificates: CredentialsByIssuer = yield select(
      CertificateSelectors.selectCertificates,
    );
    const certificatesString: string = JSON.stringify(certificates);
    const encryptedCertificatesString: string = yield EncryptionManager.encryptAES(
      certificatesString,
      key,
    );

    const filename = `backup_${moment().format('YYYY_MM_DD__HH_mm')}.dcc`;
    const filepath = yield call(
      FileManager.createFile,
      filename,
      encryptedCertificatesString,
    );

    const shareResponse: ShareAction = yield call(
      FileManager.shareFile,
      filepath,
      filename,
    );

    if (shareResponse.action === 'sharedAction') {
      yield put<CreateBackupSuccessAction>(
        certificatesActionCreators.createBackupSuccess({
          ...shareResponse,
          date: moment().format(),
        }),
      );
    }
  } catch (error) {
    yield put<CreateBackupFailureAction>(
      certificatesActionCreators.createBackupFailure(error),
    );
  }
}

export function* loadBackup({ backupPath, key }: LoadBackupAction) {
  try {
    const cipher = yield call(FileManager.readFile, backupPath);

    const decryptedBackup = yield EncryptionManager.decryptAES(cipher, key);

    const parsedBackup: CredentialsByIssuer = JSON.parse(decryptedBackup);

    yield put<LoadBackupSuccessAction>(
      certificatesActionCreators.loadBackupSuccess(parsedBackup),
    );
  } catch (error) {
    yield put<LoadBackupFailureAction>(
      certificatesActionCreators.loadBackupFailure(error),
    );
  }

  // TODO save to redux
}
