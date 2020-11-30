import { createActions } from 'reduxsauce';
import { ICertificate } from '../../utils/types';

interface SearchActionTypes {
  SEARCH_CERTIFICATE: 'SEARCH_CERTIFICATE';
  SEARCH_CERTIFICATE_SUCCESS: 'SEARCH_CERTIFICATE_SUCCESS';
}

export interface SearchCertificateAction {
  type: SearchActionTypes['SEARCH_CERTIFICATE'];
  value: string;
}

export interface SearchCertificateSuccessAction {
  type: SearchActionTypes['SEARCH_CERTIFICATE_SUCCESS'];
  certificates: ICertificate[];
}

interface SearchActionCreators {
  searchCertificate(value: string): SearchCertificateAction;
  searchCertificateSuccess(
    certificates: ICertificate[],
  ): SearchCertificateSuccessAction;
}

export type SearchAction = SearchCertificateAction;

const { Types, Creators } = createActions<
  SearchActionTypes,
  SearchActionCreators
>(
  {
    searchCertificate: ['value'],
    searchCertificateSuccess: ['certificates'],
  },
  {
    prefix: 'SEARCH/',
  },
);

export const searchActionTypes = Types;

export const searchActionCreators = Creators;
