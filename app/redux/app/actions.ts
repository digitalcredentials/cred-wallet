import { createActions } from 'reduxsauce';

interface AppActionTypes {
  SET_VERIFICATION_PROCESS: 'SET_VERIFICATION_PROCESS';
}

export interface SetVerificationProcessAction {
  type: AppActionTypes['SET_VERIFICATION_PROCESS'];
  isVerificationProcess: boolean;
}

interface AppActionCreators {
  setVerificationProcess(
    isVerificationProcess: boolean,
  ): SetVerificationProcessAction;
}

export type AppAction = SetVerificationProcessAction;

const { Types, Creators } = createActions<AppActionTypes, AppActionCreators>(
  {
    setVerificationProcess: ['isVerificationProcess'],
  },
  {
    prefix: 'APP/',
  },
);

export const appActionTypes = Types;

export const appActionCreators = Creators;
