import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import { CacheAction, cacheActionTypes, SetFirstLaunchAction } from './actions';

export interface CacheState {
  isFirstLaunch: boolean;
}

const INITIAL_STATE: CacheState = {
  isFirstLaunch: true,
};

type Handler<A> = (state: CacheState, action: A) => CacheState;

const setFirstLaunch: Handler<SetFirstLaunchAction> = (
  state,
  { isFirstLaunch },
) => ({
  ...state,
  isFirstLaunch,
});

export const cacheReducer = createReducer<CacheState, CacheAction>(
  INITIAL_STATE,
  {
    [cacheActionTypes.SET_FIRST_LAUNCH]: setFirstLaunch,
  },
);
