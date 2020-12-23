import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { AppDispatch, RootState } from '..';
import { appActionTypes } from './actions';
import { ErrorType } from '../../utils/types';

// Selector hooks
export const useIsVerificationProcess = () =>
  useSelector((state: RootState): boolean => state.app.isVerificationProcess);

export const useIsFirstVerification = () =>
  useSelector((state: RootState) => state.app.isFirstVerification);

export const useDeeplinkUrl = () =>
  useSelector((state: RootState): string | null => state.app.deeplinkUrl);

export const useLoadingState = () =>
  useSelector((state: RootState) => state.app.loading);

export const useIsLoading = () =>
  useSelector((state: RootState) => _.some(Object.values(state.app.loading)));

export const useErrors = () =>
  useSelector((state: RootState) => state.app.errors);

// Callback hooks
export const useSetVerificationProcessCallback = (dispatch: AppDispatch) =>
  useCallback(
    (isVerificationProcess: boolean) =>
      dispatch({
        type: appActionTypes.SET_VERIFICATION_PROCESS,
        isVerificationProcess,
      }),
    [dispatch],
  );

export const useSetFirstVerificationCallback = (dispatch: AppDispatch) =>
  useCallback(
    (isFirstVerification: boolean) =>
      dispatch({
        type: appActionTypes.SET_FIRST_VERIFICATION,
        isFirstVerification,
      }),
    [dispatch],
  );

export const useSetDeeplinkUrlCallback = (dispatch: AppDispatch) =>
  useCallback(
    (deeplinkUrl: string | null) =>
      dispatch({
        type: appActionTypes.SET_DEEPLINK_URL,
        deeplinkUrl,
      }),
    [],
  );

export const useSetErrorCallback = (dispatch: AppDispatch) =>
  useCallback(
    (errorType: ErrorType, error: string | null) =>
      dispatch({
        type: appActionTypes.SET_ERROR,
        errorType,
        error,
      }),
    [],
  );

export const useResetErrorsCallback = (dispatch: AppDispatch) =>
  useCallback(
    () =>
      dispatch({
        type: appActionTypes.RESET_ERRORS,
      }),
    [],
  );
