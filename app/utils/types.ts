import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { MainTabParams } from '../navigation/main-tab-navigator';

export type VerifyPanelStatus =
  | 'check-first-launch'
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
  issuer: IIssuer;
  issuanceDate: string;
  credentialSubject: {
    id: string;
    type: string;
    name: string;
    hasCredential: {
      type: string[];
      id: string;
      name: string;
      description: string;
    };
  };
  proof: any;
}

export interface IIssuer {
  type: string;
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
  challenge: string;
  requestUrl: string;
}

export interface IOAuthDeeplink {
  authType: DeeplinkOAuthSourceType;
  issuer: string;
  vcRequestUrl: string;
  challenge: string;
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
  ISubjectDID { }

export enum LoadingType {
  isAddCertificate = 'isAddCertificate',
  isCreateBackup = 'isCreateBackup',
  isLoadBackup = 'isLoadBackup',
  isShareCertificate = 'isShareCertificate',
}

export enum ErrorType {
  addCertificate = 'addCertificate',
  wrongPin = 'wrongPin',
  createBackup = 'createBackup',
  loadBackup = 'loadBackup',
  shareCertificate = 'shareCertificate',
}

export enum FocusStatus {
  Focus,
  Blur,
}

export interface CredentialsByIssuer {
  [issuerId: string]: ICredentials;
}

export enum ShareActivityType {
  Telegraph = 'ph.telegra.Telegraph.Share',
  GoogleDrive = 'com.google.Drive.ShareExtension',
  Skype = 'com.skype.skype.sharingextension',
}

export interface IBackupInfo {
  date: string;
  activityType?: string;
  action: 'sharedAction';
}

export interface ISwiperItem {
  id: string;
  image: any;
  title: string;
  description: string;
}

export enum DeeplinkType {
  Backup = 'Backup',
  Default = 'Default',
  OAuth = 'OAuth',
}

export enum DeeplinkOAuthSourceType {
  XPro = 'xpro',
}

export interface IDeeplinkSourceData {
  cliendId: string;
  issuer: string;
  issuerAuthorizationEndpoint: string;
  issuerTokenEndpoint: string;
}

export enum RequestMethod {
  Post = 'POST',
  Get = 'GET',
  Put = 'PUT',
  Delete = 'DELETE',
}
