import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import { ICredentials } from '../../utils/types';
import {
  CertificatesAction,
  certificatesActionTypes,
  CreateBackupSuccessAction,
  SaveCertificateAction,
} from './actions';

export interface CertificatesState {
  data: {
    [issuerId: string]: ICredentials;
  };
  backups: [];
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

const createBackupSuccess: Handler<CreateBackupSuccessAction> = (state, {}) => {
  // TODO
  return state;
};

export const certificatesReducer = createReducer<
  CertificatesState,
  CertificatesAction
>(INITIAL_STATE, {
  [certificatesActionTypes.SAVE_CERTIFICATE]: saveCertificate,
  [certificatesActionTypes.CREATE_BACKUP_SUCCESS]: createBackupSuccess,
});
