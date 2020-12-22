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

export interface SaveCertificateAction {
  type: CertificatesActionTypes['SAVE_CERTIFICATE'];
  certificate: ICertificate;
  issuer: IIssuer;
}

interface CertificatesActionCreators {
  addCertificate(): AddCertificateAction;
  addCertificateSuccess(): AddCertificateSuccessAction;
  addCertificateFailure(error: string): AddCertificateFailureAction;

  saveCertificate(
    certificate: ICertificate,
    issuer: IIssuer,
  ): SaveCertificateAction;
}

export type CertificatesAction =
  | AddCertificateAction
  | AddCertificateSuccessAction
  | AddCertificateFailureAction
  | SaveCertificateAction;

const { Types, Creators } = createActions<
  CertificatesActionTypes,
  CertificatesActionCreators
>(
  {
    addCertificate: null,
    addCertificateSuccess: null,
    addCertificateFailure: ['error'],

    saveCertificate: ['certificate', 'issuer'],
  },
  {
    prefix: 'CERTIFICATES/',
  },
);

export const certificatesActionTypes = Types;

export const certificatesActionCreators = Creators;
