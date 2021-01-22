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

export const useCredentialsById = (credentialsId: string) =>
  useSelector((state: RootState): ICredentials | undefined =>
    _.find(
      Object.values(state.certificates.data),
      (cred) => cred.id === credentialsId,
    ),
  );

export const useCertificateWithIssuer = (
  certificateId: string,
  issuerId: string,
) =>
  useSelector((state: RootState): {
    certificate: ICertificate;
    issuer: IIssuer;
  } => {
    const creds: ICredentials = _.find(
      Object.values(state.certificates.data),
      (cred) => cred.issuer.id === issuerId,
    )!;

    const certificate: ICertificate = _.find(
      creds.certificates,
      (cert) => cert.id === certificateId,
    )!;

    return { issuer: creds.issuer, certificate };
  });

export const useBackups = () =>
  useSelector((state: RootState) => state.certificates.backups);

// Callback hooks
export const useAddCertificateCallback = (dispatch: AppDispatch) =>
  useCallback(
    (data: ICertificateDeeplinkWithDID) =>
      dispatch({ type: certificatesActionTypes.ADD_CERTIFICATE, data }),
    [dispatch],
  );

export const useSaveCertificateCallback = (dispatch: AppDispatch) =>
  useCallback(
    (certificate: ICertificate, issuer: IIssuer) =>
      dispatch({
        type: certificatesActionTypes.SAVE_CERTIFICATE,
        certificate,
        issuer,
      }),
    [],
  );

export const useCreateBackupCallback = (dispatch: AppDispatch) =>
  useCallback(
    (key: string) =>
      dispatch({
        type: certificatesActionTypes.CREATE_BACKUP,
        key,
      }),
    [],
  );

export const useLoadBackupCallback = (dispatch: AppDispatch) =>
  useCallback(
    (backupPath: string, key: string) =>
      dispatch({
        type: certificatesActionTypes.LOAD_BACKUP,
        backupPath,
        key,
      }),
    [],
  );
