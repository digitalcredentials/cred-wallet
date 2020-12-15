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

  SET_DEEPLINK_URL: 'SET_DEEPLINK_URL';
}

export interface AddCertificateAction {
  type: CertificatesActionTypes['ADD_CERTIFICATE'];
  data: ICertificateDeeplinkWithDID;
}

export interface AddCertificateSuccessAction {
  type: CertificatesActionTypes['ADD_CERTIFICATE_SUCCESS'];
  certificate: ICertificate;
  issuer: IIssuer;
}

export interface AddCertificateFailureAction {
  type: CertificatesActionTypes['ADD_CERTIFICATE_FAILURE'];
  error: string;
}

export interface SetDeeplinkUrlAction {
  type: CertificatesActionTypes['SET_DEEPLINK_URL'];
  deeplinkUrl: string | null;
}

interface CertificatesActionCreators {
  addCertificate(): AddCertificateAction;
  addCertificateSuccess(certificate: ICertificate): AddCertificateSuccessAction;
  addCertificateFailure(error: string): AddCertificateFailureAction;

  setDeeplinkUrl(deeplinkUrl: string): SetDeeplinkUrlAction;
}

export type CertificatesAction =
  | AddCertificateAction
  | AddCertificateSuccessAction
  | AddCertificateFailureAction
  | SetDeeplinkUrlAction;

const { Types, Creators } = createActions<
  CertificatesActionTypes,
  CertificatesActionCreators
>(
  {
    addCertificate: null,
    addCertificateSuccess: ['certificate', 'issuer'],
    addCertificateFailure: ['error'],

    setDeeplinkUrl: ['deeplinkUrl'],
  },
  {
    prefix: 'CERTIFICATES/',
  },
);

export const certificatesActionTypes = Types;

export const certificatesActionCreators = Creators;
