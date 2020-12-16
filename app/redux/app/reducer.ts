import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import {
  AppAction,
  appActionTypes,
  SetDeeplinkUrlAction,
  SetFirstVerificationAction,
  SetVerificationProcessAction,
} from './actions';

export interface AppState {
  isFirstVerification: boolean;
  isVerificationProcess: boolean;
  deeplinkUrl: string | null;
}

const INITIAL_STATE: AppState = {
  isFirstVerification: true,
  isVerificationProcess: false,
  deeplinkUrl: null,
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

const setDeeplinkUrl: Handler<SetDeeplinkUrlAction> = (
  state,
  { deeplinkUrl },
) => ({
  ...state,
  deeplinkUrl,
});

export const appReducer = createReducer<AppState, AppAction>(INITIAL_STATE, {
  [appActionTypes.SET_VERIFICATION_PROCESS]: setVerificationProcess,
  [appActionTypes.SET_FIRST_VERIFICATION]: setFirstVerification,
  [appActionTypes.SET_DEEPLINK_URL]: setDeeplinkUrl,
});
