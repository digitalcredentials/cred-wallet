import { Platform } from 'react-native';
import queryString from 'query-string';
import * as ed25519 from '@transmute/did-key-ed25519';
import { generateSecureRandom } from 'react-native-securerandom';

import { Credential } from '../services/api/api.types';
import { ICertificate, ICertificateDeeplink, IIssuer } from './types';

export const isAndroid = Platform.OS === 'android';

export const isIOS = Platform.OS === 'ios';

export function parseCertificateDeeplink(
  deeplinkUrl: string,
): ICertificateDeeplink {
  const parsedUrl = queryString.parseUrl(deeplinkUrl);

  return {
    challenge: parsedUrl.query.challenge,
    requestUrl: parsedUrl.query.request_url,
  };
}

export async function generateDid(): Promise<string> {
  const BYTES_LENGTH = 32;

  const randomBytes = await generateSecureRandom(BYTES_LENGTH);
  const keyPair = await ed25519.Ed25519KeyPair.generate({
    secureRandom: () => randomBytes,
  });

  return keyPair.controller;
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
