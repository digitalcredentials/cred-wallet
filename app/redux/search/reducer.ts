import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import { ICertificate } from '../../utils/types';
import {
  SearchAction,
  SearchCertificateSuccessAction,
  searchActionTypes,
} from './actions';

export interface SearchState {
  certificates: ICertificate[];
}

const INITIAL_STATE: SearchState = {
  certificates: [],
};

type Handler<A> = (state: SearchState, action: A) => SearchState;

const searchCertificateSuccess: Handler<SearchCertificateSuccessAction> = (
  state,
  { certificates },
) => {
  return {
    ...state,
    certificates,
  };
};

export const searchReducer = createReducer<SearchState, SearchAction>(
  INITIAL_STATE,
  {
    [searchActionTypes.SEARCH_CERTIFICATE_SUCCESS]: searchCertificateSuccess,
  },
);
