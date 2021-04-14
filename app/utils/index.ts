import { Platform } from 'react-native';
import queryString from 'query-string';
import * as ed25519 from '@transmute/did-key-ed25519';
import { generateSecureRandom } from 'react-native-securerandom';
import vc from "vc-js";
const { suites: { Ed25519Signature2018 } } = require('jsonld-signatures');
import { contexts, documentLoaderFactory } from '@transmute/jsonld-document-loader';

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
import DidContext from './did-v1.json';

export const isAndroid = Platform.OS === 'android';

export const isIOS = Platform.OS === 'ios';

export const DID_CONTEXT_URL = 'https://www.w3.org/ns/did/v1';

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

async function generateDidKeyPair(): Promise<ed25519.Ed25519KeyPair> {
  const BYTES_LENGTH = 32;

  const randomBytes = await generateSecureRandom(BYTES_LENGTH);
  return ed25519.Ed25519KeyPair.generate({
    secureRandom: () => randomBytes,
  });
}

export async function generateDid(): Promise<string> {
  const keyPair = await generateDidKeyPair();
  return keyPair.controller;
}

function generateDidKeySuite(
  keyPair: ed25519.Ed25519KeyPair
): any {
  const suite = new Ed25519Signature2018({
    verificationMethod: keyPair.id,
    key: keyPair
  });
  return suite;
}

export async function generateAndProveDid(challenge: string): Promise<any> {
  const keyPair = await generateDidKeyPair();
  const suite = generateDidKeySuite(keyPair);

  const documentLoader = documentLoaderFactory.pluginFactory
    .build({
      contexts: {
        ...contexts.W3C_Verifiable_Credentials,
        ...contexts.W3ID_Security_Vocabulary,
        ...contexts.W3C_Decentralized_Identifiers
      },
    })
    .addContext({ [DID_CONTEXT_URL]: DidContext })
    .buildDocumentLoader();

  const presentation = vc.createPresentation({
    verifiableCredential: null,
    holder: keyPair.controller
  });
  presentation["@context"].push('https://w3id.org/did/v1');

  const signedPresentation = await vc.signPresentation({
    presentation: presentation,
    documentLoader: documentLoader,
    suite,
    challenge: challenge
  });
  return signedPresentation;
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
