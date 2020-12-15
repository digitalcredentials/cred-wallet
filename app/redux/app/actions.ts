import { createActions } from 'reduxsauce';

interface AppActionTypes {
  SET_VERIFICATION_PROCESS: 'SET_VERIFICATION_PROCESS';
  SET_FIRST_VERIFICATION: 'SET_FIRST_VERIFICATION';
}

export interface SetVerificationProcessAction {
  type: AppActionTypes['SET_VERIFICATION_PROCESS'];
  isVerificationProcess: boolean;
}

export interface SetFirstVerificationAction {
  type: AppActionTypes['SET_FIRST_VERIFICATION'];
  isFirstVerification: boolean;
}

interface AppActionCreators {
  setVerificationProcess(
    isVerificationProcess: boolean,
  ): SetVerificationProcessAction;

  setFirstVerification(
    isFirstVerification: boolean,
  ): SetFirstVerificationAction;
}

export type AppAction =
  | SetVerificationProcessAction
  | SetFirstVerificationAction;

const { Types, Creators } = createActions<AppActionTypes, AppActionCreators>(
  {
    setVerificationProcess: ['isVerificationProcess'],
    setFirstVerification: ['isFirstVerification'],
  },
  {
    prefix: 'APP/',
  },
);

export const appActionTypes = Types;

export const appActionCreators = Creators;
