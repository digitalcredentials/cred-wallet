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

import { logInfo, logError } from '../../utils/log';


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
  } else {
    logError(`Already have a credential with id=${certificate.id}`);
    // TODO: alert to user  
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
  const newCredentialsByIssuer = { ...state.data };

  // Merge new credsByIssuer to existing data
  _.forEach(_.entries(credsByIssuer), ([issuerId, credential]) => {
    if (!newCredentialsByIssuer[issuerId]) {
      // Issuer doesn't exist
      newCredentialsByIssuer[issuerId] = credential;
    } else {
      // Issuer exists
      _.forEach(credsByIssuer[issuerId].certificates, (certificate) => {
        // Try to find certificate by id
        const certificateIndex = _.findIndex(
          newCredentialsByIssuer[issuerId].certificates,
          (item) => item.id === certificate.id,
        );

        if (certificateIndex === -1) {
          // Certificate doesn't exist
          // Add certificate
          newCredentialsByIssuer[issuerId].certificates.push(certificate);
        } else {
          // Certificate exists
          // Update certificate
          newCredentialsByIssuer[issuerId].certificates[
            certificateIndex
          ] = certificate;
        }
      });
    }
  });

  return {
    ...state,
    data: newCredentialsByIssuer,
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
