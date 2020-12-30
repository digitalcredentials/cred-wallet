import { createActions } from 'reduxsauce';
import {
  ICertificate,
  ICertificateDeeplinkWithDID,
  IIssuer,
} from '../../utils/types';

interface CertificatesActionTypes {
  ADD_CERTIFICATE: 'ADD_CERTIFICATE';
  ADD_CERTIFICATE_SUCCESS: 'ADD_CERTIFICATE_SUCCESS';
  ADD_CERTIFICATE_FAILURE: 'ADD_CERTIFICATE_FAILURE';

  CREATE_BACKUP: 'CREATE_BACKUP';
  CREATE_BACKUP_SUCCESS: 'CREATE_BACKUP_SUCCESS';
  CREATE_BACKUP_FAILURE: 'CREATE_BACKUP_FAILURE';

  SAVE_CERTIFICATE: 'SAVE_CERTIFICATE';
}

export interface AddCertificateAction {
  type: CertificatesActionTypes['ADD_CERTIFICATE'];
  data: ICertificateDeeplinkWithDID;
}

export interface AddCertificateSuccessAction {
  type: CertificatesActionTypes['ADD_CERTIFICATE_SUCCESS'];
}

export interface AddCertificateFailureAction {
  type: CertificatesActionTypes['ADD_CERTIFICATE_FAILURE'];
  error: string;
}

export interface CreateBackupAction {
  type: CertificatesActionTypes['CREATE_BACKUP'];
  key: string;
}

export interface CreateBackupSuccessAction {
  type: CertificatesActionTypes['CREATE_BACKUP_SUCCESS'];
}

export interface CreateBackupFailureAction {
  type: CertificatesActionTypes['CREATE_BACKUP_FAILURE'];
  error: string;
}

export interface SaveCertificateAction {
  type: CertificatesActionTypes['SAVE_CERTIFICATE'];
  certificate: ICertificate;
  issuer: IIssuer;
}

interface CertificatesActionCreators {
  addCertificate(): AddCertificateAction;
  addCertificateSuccess(): AddCertificateSuccessAction;
  addCertificateFailure(error: string): AddCertificateFailureAction;

  createBackup(key: string): CreateBackupAction;
  createBackupSuccess(): CreateBackupSuccessAction;
  createBackupFailure(error: string): CreateBackupFailureAction;

  saveCertificate(
    certificate: ICertificate,
    issuer: IIssuer,
  ): SaveCertificateAction;
}

export type CertificatesAction =
  | AddCertificateAction
  | AddCertificateSuccessAction
  | AddCertificateFailureAction
  | CreateBackupAction
  | CreateBackupSuccessAction
  | CreateBackupFailureAction
  | SaveCertificateAction;

const { Types, Creators } = createActions<
  CertificatesActionTypes,
  CertificatesActionCreators
>(
  {
    addCertificate: null,
    addCertificateSuccess: null,
    addCertificateFailure: ['error'],

    createBackup: ['key'],
    createBackupSuccess: null,
    createBackupFailure: ['error'],

    saveCertificate: ['certificate', 'issuer'],
  },
  {
    prefix: 'CERTIFICATES/',
  },
);

export const certificatesActionTypes = Types;

export const certificatesActionCreators = Creators;
