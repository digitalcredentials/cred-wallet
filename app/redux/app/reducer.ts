import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import {
  AppAction,
  appActionTypes,
  ResetErrorsAction,
  SetDeeplinkUrlAction,
  SetErrorAction,
  SetFirstVerificationAction,
  SetVerificationProcessAction,
} from './actions';
import { ErrorType, LoadingType } from '../../utils/types';
import {
  AddCertificateAction,
  AddCertificateFailureAction,
  AddCertificateSuccessAction,
  certificatesActionTypes,
} from '../certificates';

export interface AppState {
  isFirstVerification: boolean;
  isVerificationProcess: boolean;
  deeplinkUrl: string | null;
  loading: Record<LoadingType, boolean>;
  errors: Record<ErrorType, string | null>;
}

const INITIAL_STATE: AppState = {
  isFirstVerification: true,
  isVerificationProcess: false,
  deeplinkUrl: null,
  loading: {
    isAddCertificate: false,
  },
  errors: {
    addCertificate: null,
    wrongPin: null,
  },
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

const setError: Handler<SetErrorAction> = (state, { errorType, error }) => ({
  ...state,
  errors: {
    ...state.errors,
    [errorType]: error,
  },
});

const resetErrors: Handler<ResetErrorsAction> = (state) => ({
  ...state,
  errors: _.cloneDeep(INITIAL_STATE.errors),
});

/* ------ AUTOMATIC ANOTHER SAGAS HANDLERS ------ */
const getLoadingHandler = <T>(
  loadingType: LoadingType,
  isLoading: boolean,
  errorType: ErrorType,
): Handler<T> => (state) => ({
  ...state,
  loading: { ...state.loading, [loadingType]: isLoading },
  errors: { ...state.errors, [errorType]: null },
});

const getLoadingErrorHandler = <T extends { error: string | null }>(
  loadingType: LoadingType,
  errorType: ErrorType,
): Handler<T> => (state, { error }) => ({
  ...state,
  loading: { ...state.loading, [loadingType]: false },
  errors: { ...state.errors, [errorType]: error },
});
/* ---------------------------------------------- */

export const appReducer = createReducer<AppState, AppAction>(INITIAL_STATE, {
  [appActionTypes.SET_VERIFICATION_PROCESS]: setVerificationProcess,
  [appActionTypes.SET_FIRST_VERIFICATION]: setFirstVerification,
  [appActionTypes.SET_DEEPLINK_URL]: setDeeplinkUrl,

  [appActionTypes.SET_ERROR]: setError,
  [appActionTypes.RESET_ERRORS]: resetErrors,

  [certificatesActionTypes.ADD_CERTIFICATE]: getLoadingHandler<
    AddCertificateAction
  >(LoadingType.isAddCertificate, true, ErrorType.addCertificate),
  [certificatesActionTypes.ADD_CERTIFICATE_SUCCESS]: getLoadingHandler<
    AddCertificateSuccessAction
  >(LoadingType.isAddCertificate, false, ErrorType.addCertificate),
  [certificatesActionTypes.ADD_CERTIFICATE_FAILURE]: getLoadingErrorHandler<
    AddCertificateFailureAction
  >(LoadingType.isAddCertificate, ErrorType.addCertificate),
});
