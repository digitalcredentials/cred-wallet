import { createActions } from 'reduxsauce';
import { IFoundCredential } from '../../utils/types';

interface SearchActionTypes {
  SEARCH_CREDENTIALS: 'SEARCH_CREDENTIALS';
  SEARCH_CREDENTIALS_SUCCESS: 'SEARCH_CREDENTIALS_SUCCESS';
}

export interface SearchCredentialAction {
  type: SearchActionTypes['SEARCH_CREDENTIALS'];
  value: string;
}

export interface SearchCredentialsSuccessAction {
  type: SearchActionTypes['SEARCH_CREDENTIALS_SUCCESS'];
  credentials: IFoundCredential[];
}

interface SearchActionCreators {
  searchCredentials(value: string): SearchCredentialAction;
  searchCredentialsSuccess(
    credentials: IFoundCredential[],
  ): SearchCredentialsSuccessAction;
}

export type SearchAction =
  | SearchCredentialAction
  | SearchCredentialsSuccessAction;

const { Types, Creators } = createActions<
  SearchActionTypes,
  SearchActionCreators
>(
  {
    searchCredentials: ['value'],
    searchCredentialsSuccess: ['credentials'],
  },
  {
    prefix: 'SEARCH/',
  },
);

export const searchActionTypes = Types;

export const searchActionCreators = Creators;
