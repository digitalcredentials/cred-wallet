import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import { ICredentials } from '../../utils/types';
import {
  CertificatesAction,
  certificatesActionTypes,
  AddCertificateSuccessAction,
} from './actions';

export interface CertificatesState {
  data: {
    [issuerId: string]: ICredentials;
  };
}

const INITIAL_STATE: CertificatesState = {
  data: {},
};

type Handler<A> = (state: CertificatesState, action: A) => CertificatesState;

const addCertificateSuccess: Handler<AddCertificateSuccessAction> = (
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
    isLoading: false,
    error: null,
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

export const certificatesReducer = createReducer<
  CertificatesState,
  CertificatesAction
>(INITIAL_STATE, {
  [certificatesActionTypes.ADD_CERTIFICATE_SUCCESS]: addCertificateSuccess,
});
