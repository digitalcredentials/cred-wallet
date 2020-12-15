import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { AppDispatch, RootState } from '..';
import { appActionTypes } from './actions';

// Selector hooks
export const useIsVerificationProcess = () =>
  useSelector((state: RootState): boolean => state.app.isVerificationProcess);

export const useIsFirstVerification = () =>
  useSelector((state: RootState) => state.app.isFirstVerification);

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
