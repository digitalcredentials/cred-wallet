import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import {
  CacheAction,
  cacheActionTypes,
  SetFirstLaunchAction,
  SetIsShownOnboarding,
} from './actions';

export interface CacheState {
  isFirstLaunch: boolean;
  isShownOnboarding: boolean;
}

const INITIAL_STATE: CacheState = {
  isFirstLaunch: true,
  isShownOnboarding: false,
};

type Handler<A> = (state: CacheState, action: A) => CacheState;

const setFirstLaunch: Handler<SetFirstLaunchAction> = (
  state,
  { isFirstLaunch },
) => ({
  ...state,
  isFirstLaunch,
});

const setIsShownOnboarding: Handler<SetIsShownOnboarding> = (
  state,
  { isShownOnboarding },
) => ({
  ...state,
  isShownOnboarding,
});

export const cacheReducer = createReducer<CacheState, CacheAction>(
  INITIAL_STATE,
  {
    [cacheActionTypes.SET_FIRST_LAUNCH]: setFirstLaunch,
    [cacheActionTypes.SET_IS_SHOWN_ONBOARDING]: setIsShownOnboarding,
  },
);
