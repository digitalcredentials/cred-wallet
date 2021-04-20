import { Platform } from 'react-native';
import queryString from 'query-string';
import * as ed25519 from '@transmute/did-key-ed25519';
import { generateSecureRandom } from 'react-native-securerandom';
import vc from '@transmute/vc.js';

// @ts-ignore
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';

import { documentLoaderFactory } from '@transmute/jsonld-document-loader';

import { Credential } from '../services/api/api.types';
import {
  DeeplinkOAuthSourceType,
  DeeplinkType,
  ICertificate,
  ICertificateDeeplink,
  IIssuer,
  IOAuthDeeplink,
  ShareActivityType,
} from './types';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { IMAGES } from '../assets';
import { BACKUP_EXTENSION } from './constants';
import DidContext from './did-v1.json';
import JWS_V1 from './jws2020.json';

export const isAndroid = Platform.OS === 'android';

export const isIOS = Platform.OS === 'ios';

export const DID_CONTEXT_URL = 'https://www.w3.org/ns/did/v1';

import W3ID_SEC_V1 from './sec-v1.json';
import W3ID_SEC_V2 from './sec-v2.json';

const W3ID_SEC_URL_V1 = 'https://w3id.org/security/v1';
const W3ID_SEC_URL_V2 = 'https://w3id.org/security/v2';

const JWS_URL_V1 = 'https://w3id.org/security/jws/v1';

import W3C_VC_DATA_MODEL_V1 from './vc-v1.json';
import W3C_VC_DATA_MODEL_EXAMPLES_V1 from './vc-example-v1.json';

const W3C_VC_DATA_MODEL_URL_V1 = 'https://www.w3.org/2018/credentials/v1';
const W3C_VC_DATA_MODEL_EXAMPLES_URL_V1 =
  'https://www.w3.org/2018/credentials/examples/v1';

//TODO: remove sum function
// created for jest first test only
export function sum(a: number, b: number): number {
  return a + b;
}

export function parseOAuthDeeplink(deeplinkUrl: string): IOAuthDeeplink {
  const parsedUrl = queryString.parseUrl(deeplinkUrl);

  return {
    authType: parsedUrl.query.auth_type as DeeplinkOAuthSourceType,
    issuer: parsedUrl.query.issuer as string,
    vcRequestUrl: parsedUrl.query.vc_request_url as string,
    challenge: parsedUrl.query.challenge as string,
  };
}

export function parseCertificateDeeplink(
  deeplinkUrl: string,
): ICertificateDeeplink {
  const parsedUrl = queryString.parseUrl(deeplinkUrl);

  return {
    challenge: parsedUrl.query.challenge as string,
    requestUrl: parsedUrl.query.request_url as string,
  };
}

export function getDeeplinkType(deeplinkUrl: string): DeeplinkType {
  let resultDeeplinkType: DeeplinkType = DeeplinkType.Default;

  const isBackup = isBackupUrl(deeplinkUrl);
  if (isBackup) {
    resultDeeplinkType = DeeplinkType.Backup;
  } else {
    const parsedUrl = queryString.parseUrl(deeplinkUrl);
    if (parsedUrl.query.auth_type) {
      resultDeeplinkType = DeeplinkType.OAuth;
    }
  }

  return resultDeeplinkType;
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

function generateDidKeySuite(keyPair: ed25519.Ed25519KeyPair): any {
  const suite = new Ed25519Signature2018({
    // verificationMethod: keyPair.id,
    key: keyPair,
  });
  return suite;
}

function createPresentation(holder: string): any {
  return {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://w3id.org/security/jws/v1',
    ],
    type: ['VerifiablePresentation'],
    holder: holder,
  };
}

export async function generateAndProveDid(challenge: string): Promise<any> {
  console.tron.log('start');
  const keyPair = await generateDidKeyPair();
  console.tron.log('keyPair', keyPair);
  const suite = generateDidKeySuite(keyPair);
  console.tron.log('suite', suite);

  const documentLoader = documentLoaderFactory.pluginFactory
    .build()
    .addContext({ [DID_CONTEXT_URL]: DidContext })
    .addContext({ [W3ID_SEC_URL_V1]: W3ID_SEC_V1 })
    .addContext({ [W3ID_SEC_URL_V2]: W3ID_SEC_V2 })
    .addContext({ [JWS_URL_V1]: JWS_V1 })
    .addContext({ [W3C_VC_DATA_MODEL_URL_V1]: W3C_VC_DATA_MODEL_V1 })
    .addContext({
      [W3C_VC_DATA_MODEL_EXAMPLES_URL_V1]: W3C_VC_DATA_MODEL_EXAMPLES_V1,
    })
    .buildDocumentLoader();
  console.tron.log('documentLoader', documentLoader);

  console.tron.log('controller: ' + keyPair.controller);

  const presentation = createPresentation(keyPair.controller);
  console.tron.log('presentation', JSON.stringify(presentation, null, 2));
  //presentation['@context'].push('https://w3id.org/did/v1');
  const signedPresentation = await vc.ld.signPresentation({
    presentation: presentation,
    documentLoader: documentLoader,
    suite,
    challenge: challenge,
  });

  console.tron.log('signedPres', signedPresentation);
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
