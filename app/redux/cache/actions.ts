import { createActions } from 'reduxsauce';
import { ErrorType } from '../../utils/types';

interface CacheActionTypes {
  SET_FIRST_LAUNCH: 'SET_FIRST_LAUNCH';
}

export interface SetFirstLaunchAction {
  type: CacheActionTypes['SET_FIRST_LAUNCH'];
  isFirstLaunch: boolean;
}

interface CacheActionCreators {
  setFirstLaunch(isFirstLaunch: boolean): SetFirstLaunchAction;
}

export type CacheAction = SetFirstLaunchAction;

const { Types, Creators } = createActions<
  CacheActionTypes,
  CacheActionCreators
>(
  {
    setFirstLaunch: ['isFirstLaunch'],
  },
  {
    prefix: 'CACHE/',
  },
);

export const cacheActionTypes = Types;

export const cacheActionCreators = Creators;
