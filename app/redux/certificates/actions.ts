import { createActions } from 'reduxsauce';
import {
  CredentialsByIssuer,
  IBackupInfo,
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

  LOAD_BACKUP: 'LOAD_BACKUP';
  LOAD_BACKUP_SUCCESS: 'LOAD_BACKUP_SUCCESS';
  LOAD_BACKUP_FAILURE: 'LOAD_BACKUP_FAILURE';

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
  backupInfo: IBackupInfo;
}

export interface CreateBackupFailureAction {
  type: CertificatesActionTypes['CREATE_BACKUP_FAILURE'];
  error: string;
}

export interface LoadBackupAction {
  type: CertificatesActionTypes['LOAD_BACKUP'];
  backupPath: string;
  key: string;
}

export interface LoadBackupSuccessAction {
  type: CertificatesActionTypes['LOAD_BACKUP_SUCCESS'];
  credsByIssuer: CredentialsByIssuer;
}

export interface LoadBackupFailureAction {
  type: CertificatesActionTypes['LOAD_BACKUP_FAILURE'];
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
  createBackupSuccess(backupInfo: IBackupInfo): CreateBackupSuccessAction;
  createBackupFailure(error: string): CreateBackupFailureAction;

  loadBackup(backupPath: string, key: string): LoadBackupAction;
  loadBackupSuccess(
    credsByIssuer: CredentialsByIssuer,
  ): LoadBackupSuccessAction;
  loadBackupFailure(error: string): LoadBackupFailureAction;

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
  | LoadBackupAction
  | LoadBackupSuccessAction
  | LoadBackupFailureAction
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
    createBackupSuccess: ['backupInfo'],
    createBackupFailure: ['error'],

    loadBackup: ['backupPath', 'key'],
    loadBackupSuccess: ['credsByIssuer'],
    loadBackupFailure: ['error'],

    saveCertificate: ['certificate', 'issuer'],
  },
  {
    prefix: 'CERTIFICATES/',
  },
);

export const certificatesActionTypes = Types;

export const certificatesActionCreators = Creators;
