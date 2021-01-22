import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import { CredentialsByIssuer, IBackupInfo } from '../../utils/types';
import {
  CertificatesAction,
  certificatesActionTypes,
  CreateBackupSuccessAction,
  LoadBackupSuccessAction,
  SaveCertificateAction,
} from './actions';

export interface CertificatesState {
  data: CredentialsByIssuer;
  backups: IBackupInfo[];
}

const INITIAL_STATE: CertificatesState = {
  data: {},
  backups: [],
};

type Handler<A> = (state: CertificatesState, action: A) => CertificatesState;

const saveCertificate: Handler<SaveCertificateAction> = (
  state,
  { certificate, issuer },
) => {
  const newIssuerCertificates = state.data[issuer.id]?.certificates || [];
  const isNewCertificate = !_.find(
    newIssuerCertificates,
    (el) => el.id === certificate.id,
  );
  if (isNewCertificate) {
    newIssuerCertificates.push(certificate);
  }

  return {
    ...state,
    data: {
      ...state.data,
      [issuer.id]: {
        id: issuer.id,
        issuer,
        certificates: newIssuerCertificates,
      },
    },
  };
};

const createBackupSuccess: Handler<CreateBackupSuccessAction> = (
  state,
  { backupInfo },
) => {
  return {
    ...state,
    backups: [...state.backups, { ...backupInfo }],
  };
};

const loadBackupSuccess: Handler<LoadBackupSuccessAction> = (
  state,
  { credsByIssuer },
) => {
  return {
    ...state,
    data: credsByIssuer,
  };
};

export const certificatesReducer = createReducer<
  CertificatesState,
  CertificatesAction
>(INITIAL_STATE, {
  [certificatesActionTypes.SAVE_CERTIFICATE]: saveCertificate,
  [certificatesActionTypes.CREATE_BACKUP_SUCCESS]: createBackupSuccess,
  [certificatesActionTypes.LOAD_BACKUP_SUCCESS]: loadBackupSuccess,
});
