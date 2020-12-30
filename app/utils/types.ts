import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { MainTabParams } from '../navigation/main-tab-navigator';

export type VerifyPanelStatus =
  | 'check-biometric-verify'
  | 'check-pin-keychain'
  | 'pin-create'
  | 'pin-create-verify'
  | 'save-pin-keychain'
  | 'pin-enter'
  | 'pin-verify'
  | 'biometric-verify'
  | 'verified';

export interface ICertificate extends IWithID {
  '@context': string[];
  type: string[];
  issuerId: string;
  issuanceDate: string;
  credentialSubject: {
    id: string;
    type: string;
    name: string;
    hasAchieved: {
      type: string[];
      id: string;
      name: string;
      description: string;
    };
  };
  proofType: string;
  proof: { [proofUrl: string]: Object | string };
}

export interface IIssuer {
  type: 'issuer';
  id: string;
  image: string;
  name: string;
  url: string;
}

export interface ICredentials extends IWithID {
  issuer: IIssuer;
  certificates: ICertificate[];
}

export interface ICertificateDeeplink {
  challenge: any;
  requestUrl: any;
}

export interface ISubjectDID {
  did: string;
}

export interface IWithID {
  id: string;
}

export interface IFoundCredential extends IWithID {
  certificate: ICertificate;
  issuer: IIssuer;
}

export type TabNavigatorOptions = {
  [key in keyof MainTabParams]?: BottomTabNavigationOptions;
};

export interface ICertificateDeeplinkWithDID
  extends ICertificateDeeplink,
    ISubjectDID {}

export enum LoadingType {
  isAddCertificate = 'isAddCertificate',
}

export enum ErrorType {
  addCertificate = 'addCertificate',
  wrongPin = 'wrongPin',
}

export enum FocusStatus {
  Focus,
  Blur,
}
