import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import {
  AppAction,
  appActionTypes,
  SetFirstVerificationAction,
  SetVerificationProcessAction,
} from './actions';

export interface AppState {
  isFirstVerification: boolean;
  isVerificationProcess: boolean;
}

const INITIAL_STATE: AppState = {
  isFirstVerification: true,
  isVerificationProcess: false,
};

type Handler<A> = (state: AppState, action: A) => AppState;

const setVerificationProcess: Handler<SetVerificationProcessAction> = (
  state,
  { isVerificationProcess },
) => ({
  ...state,
  isVerificationProcess,
});

const setFirstVerification: Handler<SetFirstVerificationAction> = (
  state,
  { isFirstVerification },
) => ({
  ...state,
  isFirstVerification,
});

export const appReducer = createReducer<AppState, AppAction>(INITIAL_STATE, {
  [appActionTypes.SET_VERIFICATION_PROCESS]: setVerificationProcess,
  [appActionTypes.SET_FIRST_VERIFICATION]: setFirstVerification,
});
