import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { AppDispatch, RootState } from '..';
import { ICertificate } from '../../utils/types';
import { searchActionTypes } from './actions';

// Selector hooks
export const useFoundCertificates = () =>
  useSelector((state: RootState): ICertificate[] => state.search.certificates);

// Callback hooks
export const useSearchCertificatesCallback = (dispatch: AppDispatch) =>
  useCallback(
    (value: string) =>
      dispatch({ type: searchActionTypes.SEARCH_CERTIFICATE, value }),
    [dispatch],
  );
