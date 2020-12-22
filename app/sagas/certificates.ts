import { call, put } from 'redux-saga/effects';
import {
  AddCertificateAction,
  AddCertificateFailureAction,
  AddCertificateSuccessAction,
  certificatesActionCreators,
} from '../redux/certificates';
import { apiInstance } from '../services/api';
import CONFIG from '../config/env';
import { ApiResponse } from 'apisauce';
import { Credential } from '../services/api/api.types';
import { StaticNavigator } from '../services/navigator';
import { getCredentialCertificate, getCredentialIssuer } from '../utils';

export function* addCertificate({ data }: AddCertificateAction) {
  const response: ApiResponse<Credential, Credential> = yield call(
    apiInstance.addCertificate,
    data.requestUrl.replace(CONFIG.API_URL, ''),
    {
      holder: data.did,
      ...data,
    },
  );

  if (response.ok) {
    const certificate = yield call(getCredentialCertificate, response.data!);
    const issuer = yield call(getCredentialIssuer, response.data!);
    yield put<AddCertificateSuccessAction>(
      certificatesActionCreators.addCertificateSuccess(),
    );
    yield call(StaticNavigator.navigateTo, 'AddCertificate', {
      certificate,
      issuer,
    });
  } else {
    yield put<AddCertificateFailureAction>(
      certificatesActionCreators.addCertificateFailure(
        'Some problems with QRcode/deeplink. Try again.',
      ),
    );
  }
}
