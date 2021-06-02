import { Platform } from 'react-native';
import queryString from 'query-string';

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
