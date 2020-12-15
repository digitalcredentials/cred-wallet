import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import {
  AppAction,
  appActionTypes,
  SetVerificationProcessAction,
} from './actions';

export interface AppState {
  isVerificationProcess: boolean;
}

const INITIAL_STATE: AppState = {
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

export const appReducer = createReducer<AppState, AppAction>(INITIAL_STATE, {
  [appActionTypes.SET_VERIFICATION_PROCESS]: setVerificationProcess,
});
