import { createActions } from 'reduxsauce';
import { ErrorType } from '../../utils/types';

interface AppActionTypes {
  SET_VERIFICATION_PROCESS: 'SET_VERIFICATION_PROCESS';
  SET_FIRST_VERIFICATION: 'SET_FIRST_VERIFICATION';
  SET_DEEPLINK_URL: 'SET_DEEPLINK_URL';

  SET_ERROR: 'SET_ERROR';
  RESET_ERRORS: 'RESET_ERRORS';
}

export interface SetVerificationProcessAction {
  type: AppActionTypes['SET_VERIFICATION_PROCESS'];
  isVerificationProcess: boolean;
}

export interface SetFirstVerificationAction {
  type: AppActionTypes['SET_FIRST_VERIFICATION'];
  isFirstVerification: boolean;
}

export interface SetDeeplinkUrlAction {
  type: AppActionTypes['SET_DEEPLINK_URL'];
  deeplinkUrl: string | null;
}

export interface SetErrorAction {
  type: AppActionTypes['SET_ERROR'];
  errorType: ErrorType;
  error: string | null;
}

export interface ResetErrorsAction {
  type: AppActionTypes['RESET_ERRORS'];
}

interface AppActionCreators {
  setVerificationProcess(
    isVerificationProcess: boolean,
  ): SetVerificationProcessAction;

  setFirstVerification(
    isFirstVerification: boolean,
  ): SetFirstVerificationAction;

  setDeeplinkUrl(deeplinkUrl: string | null): SetDeeplinkUrlAction;

  setError(errorType: ErrorType, error: string | null): SetErrorAction;
  resetErrors(): ResetErrorsAction;
}

export type AppAction =
  | SetVerificationProcessAction
  | SetFirstVerificationAction
  | SetDeeplinkUrlAction
  | SetErrorAction
  | ResetErrorsAction;

const { Types, Creators } = createActions<AppActionTypes, AppActionCreators>(
  {
    setVerificationProcess: ['isVerificationProcess'],
    setFirstVerification: ['isFirstVerification'],
    setDeeplinkUrl: ['deeplinkUrl'],

    setError: ['errorType', 'error'],
    resetErrors: null,
  },
  {
    prefix: 'APP/',
  },
);

export const appActionTypes = Types;

export const appActionCreators = Creators;
