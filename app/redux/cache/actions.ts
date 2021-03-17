import { createActions } from 'reduxsauce';
import { ErrorType } from '../../utils/types';

interface CacheActionTypes {
  SET_FIRST_LAUNCH: 'SET_FIRST_LAUNCH';
  SET_IS_SHOWN_ONBOARDING: 'SET_IS_SHOWN_ONBOARDING';
}

export interface SetFirstLaunchAction {
  type: CacheActionTypes['SET_FIRST_LAUNCH'];
  isFirstLaunch: boolean;
}

export interface SetIsShownOnboarding {
  type: CacheActionTypes['SET_IS_SHOWN_ONBOARDING'];
  isShownOnboarding: boolean;
}

interface CacheActionCreators {
  setFirstLaunch(isFirstLaunch: boolean): SetFirstLaunchAction;
  setIsShownOnboarding(isShownOnboarding: boolean): SetIsShownOnboarding;
}

export type CacheAction = SetFirstLaunchAction | SetIsShownOnboarding;

const { Types, Creators } = createActions<
  CacheActionTypes,
  CacheActionCreators
>(
  {
    setFirstLaunch: ['isFirstLaunch'],
    setIsShownOnboarding: ['isShownOnboarding'],
  },
  {
    prefix: 'CACHE/',
  },
);

export const cacheActionTypes = Types;

export const cacheActionCreators = Creators;
