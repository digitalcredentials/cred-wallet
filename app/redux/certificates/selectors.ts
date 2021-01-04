import { RootState } from '..';
import { CredentialsByIssuer } from '../../utils/types';

export const CertificateSelectors = {
  selectCertificates: (state: RootState): CredentialsByIssuer =>
    state.certificates.data,
};
