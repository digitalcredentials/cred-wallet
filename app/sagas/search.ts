import { put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
  SearchCertificateAction,
  SearchCertificateSuccessAction,
  searchActionCreators,
} from '../redux/search';
import { RootState } from '../redux';
import { ICertificate } from '../utils/types';

export function* searchCertificate({ value }: SearchCertificateAction) {
  let foundCertificates: ICertificate[] = [];

  if (value) {
    foundCertificates = yield select((state: RootState) => {
      const foundCertificates: ICertificate[] = [];

      _.forEach(state.certificates.data, (credential) => {
        // Ignore value cases
        const regexp = new RegExp(value, 'i');

        // Check issuer fields
        const isIssuerSearchField =
          credential.issuer.name.search(regexp) !== -1;

        if (isIssuerSearchField) {
          foundCertificates.push(...credential.certificates);
        } else {
          // Trying to find matches inside certificates
          const filteredCertificates = _.filter(
            credential.certificates,
            (cert) => cert.credentialSubject.name.search(regexp) !== -1,
          );

          foundCertificates.push(...filteredCertificates);
        }
      });

      return foundCertificates;
    });
  }

  yield put<SearchCertificateSuccessAction>(
    searchActionCreators.searchCertificateSuccess(foundCertificates),
  );
}
