import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { AppDispatch, RootState } from '..';
import { appActionTypes } from './actions';

// Selector hooks
export const useIsVerificationProcess = () =>
  useSelector((state: RootState): boolean => state.app.isVerificationProcess);

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
