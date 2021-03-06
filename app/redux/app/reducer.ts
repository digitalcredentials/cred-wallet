import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import {
  AppAction,
  appActionTypes,
  ResetErrorsAction,
  ResetNavRouteAction,
  SaveNavRouteAction,
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
  CreateBackupAction,
  CreateBackupFailureAction,
  CreateBackupSuccessAction,
  LoadBackupAction,
  ShareCertificateFailureAction,
} from '../certificates';

export interface AppState {
  isFirstVerification: boolean;
  isVerificationProcess: boolean;
  deeplinkUrl: string | null;
  loading: Record<LoadingType, boolean>;
  errors: Record<ErrorType, string | null>;
  navRoute: {
    name: string;
    params: any;
  } | null;
}

const INITIAL_STATE: AppState = {
  isFirstVerification: true,
  isVerificationProcess: false,
  deeplinkUrl: null,
  loading: {
    isAddCertificate: false,
    isCreateBackup: false,
    isLoadBackup: false,
    isShareCertificate: false,
  },
  errors: {
    addCertificate: null,
    wrongPin: null,
    createBackup: null,
    loadBackup: null,
    shareCertificate: null,
  },
  navRoute: null,
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

const saveNavRoute: Handler<SaveNavRouteAction> = (
  state,
  { routeName, routeParams },
) => ({
  ...state,
  navRoute: {
    name: routeName,
    params: routeParams,
  },
});

const resetNavRoute: Handler<ResetNavRouteAction> = (state) => ({
  ...state,
  navRoute: null,
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

  [appActionTypes.SAVE_NAV_ROUTE]: saveNavRoute,
  [appActionTypes.RESET_NAV_ROUTE]: resetNavRoute,

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

  [certificatesActionTypes.CREATE_BACKUP_FAILURE]: getLoadingErrorHandler<
    CreateBackupFailureAction
  >(LoadingType.isCreateBackup, ErrorType.createBackup),

  [certificatesActionTypes.SHARE_CERTIFICATE_FAILURE]: getLoadingErrorHandler<
    ShareCertificateFailureAction
  >(LoadingType.isShareCertificate, ErrorType.shareCertificate),

  [certificatesActionTypes.LOAD_BACKUP]: getLoadingHandler<LoadBackupAction>(
    LoadingType.isLoadBackup,
    true,
    ErrorType.loadBackup,
  ),
  [certificatesActionTypes.LOAD_BACKUP_SUCCESS]: getLoadingHandler<
    CreateBackupSuccessAction
  >(LoadingType.isLoadBackup, false, ErrorType.loadBackup),
  [certificatesActionTypes.LOAD_BACKUP_FAILURE]: getLoadingErrorHandler<
    CreateBackupFailureAction
  >(LoadingType.isLoadBackup, ErrorType.loadBackup),
});
