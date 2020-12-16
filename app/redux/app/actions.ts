import { createActions } from 'reduxsauce';

interface AppActionTypes {
  SET_VERIFICATION_PROCESS: 'SET_VERIFICATION_PROCESS';
  SET_FIRST_VERIFICATION: 'SET_FIRST_VERIFICATION';
  SET_DEEPLINK_URL: 'SET_DEEPLINK_URL';
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

interface AppActionCreators {
  setVerificationProcess(
    isVerificationProcess: boolean,
  ): SetVerificationProcessAction;

  setFirstVerification(
    isFirstVerification: boolean,
  ): SetFirstVerificationAction;

  setDeeplinkUrl(deeplinkUrl: string | null): SetDeeplinkUrlAction;
}

export type AppAction =
  | SetVerificationProcessAction
  | SetFirstVerificationAction
  | SetDeeplinkUrlAction;

const { Types, Creators } = createActions<AppActionTypes, AppActionCreators>(
  {
    setVerificationProcess: ['isVerificationProcess'],
    setFirstVerification: ['isFirstVerification'],
    setDeeplinkUrl: ['deeplinkUrl'],
  },
  {
    prefix: 'APP/',
  },
);

export const appActionTypes = Types;

export const appActionCreators = Creators;
