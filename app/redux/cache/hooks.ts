import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { AppDispatch, RootState } from '..';
import { cacheActionTypes } from './actions';

// Selector hooks
export const useIsFirstLaunch = () =>
  useSelector((state: RootState): boolean => state.cache.isFirstLaunch);

export const useIsShownOnboarding = () =>
  useSelector((state: RootState): boolean => state.cache.isShownOnboarding);

// Callback hooks
export const useSetFirstLaunchCallback = (dispatch: AppDispatch) =>
  useCallback(
    (isFirstLaunch: boolean) =>
      dispatch({
        type: cacheActionTypes.SET_FIRST_LAUNCH,
        isFirstLaunch,
      }),
    [dispatch],
  );

export const useSetIsShownOnboarding = (dispatch: AppDispatch) =>
  useCallback(
    (isShownOnboarding: boolean) =>
      dispatch({
        type: cacheActionTypes.SET_IS_SHOWN_ONBOARDING,
        isShownOnboarding,
      }),
    [dispatch],
  );
