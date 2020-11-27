import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { AppDispatch, RootState } from '..';
import {
  ICertificate,
  ICertificateDeeplinkWithDID,
  ICredentials,
  IIssuer,
} from '../../utils/types';
import { certificatesActionTypes } from './actions';

// Selector hooks
export const useCredentials = () =>
  useSelector((state: RootState): ICredentials[] =>
    Object.values(state.certificates.data),
  );

// Callback hooks
export const useAddCertificateCallback = (dispatch: AppDispatch) =>
  useCallback(
    (data: ICertificateDeeplinkWithDID) =>
      dispatch({ type: certificatesActionTypes.ADD_CERTIFICATE, data }),
    [dispatch],
  );

export const useAddCertificateSuccessCallback = (dispatch: AppDispatch) =>
  useCallback(
    (certificate: ICertificate, issuer: IIssuer) =>
      dispatch({
        type: certificatesActionTypes.ADD_CERTIFICATE_SUCCESS,
        certificate,
        issuer,
      }),
    [],
  );
