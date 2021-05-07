import { Platform } from 'react-native';
import queryString from 'query-string';
const didKeyDriver = require('@digitalbazaar/did-method-key').driver();
import { generateSecureRandom } from 'react-native-securerandom';
const vc = require('@digitalbazaar/vc');
const ed25519 = require('@digitalbazaar/ed25519-signature-2020');

import { documentLoaderFactory } from '@transmute/jsonld-document-loader';

const ed25519Ctx = require('ed25519-signature-2020-context');
const x25519Ctx = require('x25519-key-agreement-2020-context');
const credentialsCtx = require('credentials-context');

export function getController(fullDid: string) {
  return fullDid.split('#')[0];
}

export function getCustomLoader(): any {
  const customLoaderProto = documentLoaderFactory.pluginFactory
    .build()
    .addContext({ [ed25519Ctx.constants.CONTEXT_URL]: ed25519Ctx.contexts.get(ed25519Ctx.constants.CONTEXT_URL) })
    .addContext({ [credentialsCtx.CONTEXT_URL]: credentialsCtx.CONTEXT })
    .addContext({ [x25519Ctx.constants.CONTEXT_URL]: x25519Ctx.contexts.get(x25519Ctx.constants.CONTEXT_URL) });
  return customLoaderProto.buildDocumentLoader();
}

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

export const isAndroid = Platform.OS === 'android';

export const isIOS = Platform.OS === 'ios';

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

async function generateDidKeyPair(): Promise<any> {
  const BYTES_LENGTH = 32;

  const randomBytes = await generateSecureRandom(BYTES_LENGTH);

  const { didKeyDocument, keyPairs } = await didKeyDriver.generate({ randomBytes });
  const kp = keyPairs.entries().next().value;
  const v = kp[1];
  return v;
}

export async function generateDid(): Promise<string> {
  const keyPair = await generateDidKeyPair();
  return keyPair.controller;
}

function generateDidKeySuite(keyPair: any): any {
  const signingSuite = new ed25519.Ed25519Signature2020({ key: keyPair });
  return signingSuite;
}

function createPresentation(holder: string): any {
  return {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "type": [
      "VerifiablePresentation"
    ],
    "id": "123",
    "holder": holder
  };
}

export async function generateAndProveDid(challenge: string): Promise<any> {
  console.log('start');
  const keyPair = await generateDidKeyPair();
  console.log('keyPair', keyPair);
  const suite = generateDidKeySuite(keyPair);
  console.log('suite', suite);
  console.log('controller: ' + keyPair.controller);

  const presentation = createPresentation(keyPair.controller);
  console.log('presentation', JSON.stringify(presentation, null, 2));
  const customLoader = getCustomLoader();
  let signedPresentation = null;
  try {

    signedPresentation = await vc.signPresentation({
      presentation: presentation,
      documentLoader: customLoader,
      suite: suite,
      challenge: challenge
    });

  } catch (e) {
    console.log('exception: ' + e);
  }

  console.log('signedPres', signedPresentation);
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
