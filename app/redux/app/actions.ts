import { createActions } from 'reduxsauce';
import { ErrorType } from '../../utils/types';

interface AppActionTypes {
  SET_VERIFICATION_PROCESS: 'SET_VERIFICATION_PROCESS';
  SET_FIRST_VERIFICATION: 'SET_FIRST_VERIFICATION';
  SET_DEEPLINK_URL: 'SET_DEEPLINK_URL';

  SAVE_NAV_ROUTE: 'SAVE_NAV_ROUTE';
  RESET_NAV_ROUTE: 'RESET_NAV_ROUTE';

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

export interface SaveNavRouteAction {
  type: AppActionTypes['SAVE_NAV_ROUTE'];
  routeName: string;
  routeParams: any;
}

export interface ResetNavRouteAction {
  type: AppActionTypes['RESET_NAV_ROUTE'];
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

  saveNavRoute(routeName: string, routeParams: any): SaveNavRouteAction;
  resetNavRoute(): ResetNavRouteAction;

  setError(errorType: ErrorType, error: string | null): SetErrorAction;
  resetErrors(): ResetErrorsAction;
}

export type AppAction =
  | SetVerificationProcessAction
  | SetFirstVerificationAction
  | SetDeeplinkUrlAction
  | SaveNavRouteAction
  | ResetNavRouteAction
  | SetErrorAction
  | ResetErrorsAction;

const { Types, Creators } = createActions<AppActionTypes, AppActionCreators>(
  {
    setVerificationProcess: ['isVerificationProcess'],
    setFirstVerification: ['isFirstVerification'],
    setDeeplinkUrl: ['deeplinkUrl'],

    saveNavRoute: ['routeName', 'routeParams'],
    resetNavRoute: null,

    setError: ['errorType', 'error'],
    resetErrors: null,
  },
  {
    prefix: 'APP/',
  },
);

export const appActionTypes = Types;

export const appActionCreators = Creators;
