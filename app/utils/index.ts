import { Platform } from 'react-native';
import queryString from 'query-string';
import * as ed25519 from '@transmute/did-key-ed25519';
import { keyToDidDoc } from '@transmute/did-key-common';
import { generateSecureRandom } from 'react-native-securerandom';
import { createIssuer } from '@digitalcredentials/sign-and-verify-core';
import { uuid } from 'uuidv4';

import { Credential } from '../services/api/api.types';
import {
  ICertificate,
  ICertificateDeeplink,
  IIssuer,
  ShareActivityType,
} from './types';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { IMAGES } from '../assets';
import { BACKUP_EXTENSION } from './constants';

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

export async function generateDid(): Promise<string> {
  const BYTES_LENGTH = 32;

  const randomBytes = await generateSecureRandom(BYTES_LENGTH);
  const keyPair = await ed25519.Ed25519KeyPair.generate({
    secureRandom: () => randomBytes,
  });

  return keyPair.controller;
}

async function generateDidDoc(): Promise<any> {
  const BYTES_LENGTH = 32;

  const randomBytes = await generateSecureRandom(BYTES_LENGTH);
  const keyPair = await ed25519.Ed25519KeyPair.generate({
    secureRandom: () => randomBytes,
  });

  return keyToDidDoc(keyPair);
}

export async function generateAndProveDid(challenge: string): Promise<any> {
  const didDoc = await generateDidDoc();
  const issuer = createIssuer(didDoc);

  const options = {
    // TODO: in did-core, publicKey is deprecrated, changed to verificationMethod
    'verificationMethod': didDoc.publicKey[0].id,
    'challenge': challenge
  };
  // this is the signed payload (REQUEST_PAYLOAD) to pass to vc_request_url
  return issuer.createAndSignPresentation(null, 'TODO', didDoc.controller, options);
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

export function getSocialShareImageSource(activityType: string): ImageSource {
  switch (activityType) {
    case ShareActivityType.GoogleDrive:
      return IMAGES.GOOGLE_DRIVE;
    case ShareActivityType.Skype:
      return IMAGES.SKYPE;
    default:
      return null;
  }
}

export function isBackupUrl(url: string) {
  const splittedUrl = url.split('.');
  const fileExtension = splittedUrl[splittedUrl.length - 1];
  return fileExtension === BACKUP_EXTENSION;
}
