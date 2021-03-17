import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { AppDispatch, RootState } from '..';
import { IFoundCredential } from '../../utils/types';
import { searchActionTypes } from './actions';

// Selector hooks
export const useFoundCredentials = () =>
  useSelector(
    (state: RootState): IFoundCredential[] => state.search.credentials,
  );

// Callback hooks
export const useSearchCredentialsCallback = (dispatch: AppDispatch) =>
  useCallback(
    (value: string) =>
      dispatch({ type: searchActionTypes.SEARCH_CREDENTIALS, value }),
    [dispatch],
  );
