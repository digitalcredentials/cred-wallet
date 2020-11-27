import queryString from 'query-string';
import randomString from 'random-string';
import { Platform } from 'react-native';

import { Credential } from '../services/api/api.types';
import { ICertificate, ICertificateDeeplink, IIssuer } from './types';

export const isAndroid = Platform.OS === 'android';

export const isIOS = Platform.OS === 'ios';

//TODO: remove sum function
// created for jest first test only
export function sum(a: number, b: number): number {
  return a + b;
}

export function parseCertificateDeeplink(
  deeplinkUrl: string,
): ICertificateDeeplink {
  const parsedUrl = queryString.parseUrl(deeplinkUrl);

  return {
    challenge: parsedUrl.query.challenge,
    requestUrl: parsedUrl.query.request_url,
  };
}

export function generateExampleDid() {
  const EXAMPLE_DID_PREFIX = 'did:example:';
  return `${EXAMPLE_DID_PREFIX}${randomString()}`;
}

export function generateDid() {
  const DID_PREFIX = 'did:';
  return `${DID_PREFIX}${randomString()}`;
}

export function getCredentialCertificate(credential: Credential): ICertificate {
  const proof = {};

  // TODO: proof parsing

  return {
    ['@context']: credential['@context'],
    type: credential.type,
    id: credential.id,
    issuerId: credential.issuer.id,
    issuanceDate: credential.issuanceDate,
    credentialSubject: credential.credentialSubject,
    proof,
    proofType: credential.proof.type as string,
  };
}

export function getCredentialIssuer(credential: Credential): IIssuer {
  return credential.issuer;
}
