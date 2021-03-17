import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import { IFoundCredential } from '../../utils/types';
import {
  SearchAction,
  SearchCredentialsSuccessAction,
  searchActionTypes,
} from './actions';

export interface SearchState {
  credentials: IFoundCredential[];
}

const INITIAL_STATE: SearchState = {
  credentials: [],
};

type Handler<A> = (state: SearchState, action: A) => SearchState;

const searchCredentialsSuccess: Handler<SearchCredentialsSuccessAction> = (
  state,
  { credentials },
) => {
  return {
    ...state,
    credentials,
  };
};

export const searchReducer = createReducer<SearchState, SearchAction>(
  INITIAL_STATE,
  {
    [searchActionTypes.SEARCH_CREDENTIALS_SUCCESS]: searchCredentialsSuccess,
  },
);
