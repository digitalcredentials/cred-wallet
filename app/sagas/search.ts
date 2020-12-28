import { put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
  SearchCredentialAction,
  SearchCredentialsSuccessAction,
  searchActionCreators,
} from '../redux/search';
import { RootState } from '../redux';
import { ICertificate, IFoundCredential } from '../utils/types';

export function* searchCertificate({ value }: SearchCredentialAction) {
  let foundCredentials: IFoundCredential[] = [];

  foundCredentials = yield select((state: RootState) => {
    const resultCredentials: IFoundCredential[] = [];

    const isAllResults = !value.length;

    _.forEach(state.certificates.data, (credential) => {
      // Ignore value cases
      const regexp = new RegExp(value, 'i');

      // Check issuer fields
      const isIssuerSearchField = credential.issuer.name.search(regexp) !== -1;

      let filteredCertificates: ICertificate[] = [];
      if (isIssuerSearchField || isAllResults) {
        filteredCertificates = [...credential.certificates];
      } else {
        filteredCertificates = _.filter(
          credential.certificates,
          (cert) => cert.credentialSubject.name.search(regexp) !== -1,
        );
      }

      resultCredentials.push(
        ..._.map<ICertificate, IFoundCredential>(
          filteredCertificates,
          (certificate, index) => ({
            id: `${credential.issuer.id}-${index}`,
            certificate,
            issuer: credential.issuer,
          }),
        ),
      );
    });

    return resultCredentials;
  });

  yield put<SearchCredentialsSuccessAction>(
    searchActionCreators.searchCredentialsSuccess(foundCredentials),
  );
}
