import { Insets } from 'react-native';

import { DeeplinkOAuthSourceType, IDeeplinkSourceData } from './types';

export const NAVIGATION_TIME = 200;

export const EXTENDED_HIT_SLOP: Insets = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

export const BACKUP_EXTENSION = 'dcc';

export const DEEPLINK_OAUTH_SOURCE_DATA: Record<
  DeeplinkOAuthSourceType,
  IDeeplinkSourceData
> = {
  [DeeplinkOAuthSourceType.XPro]: {
    cliendId: 'l5pbLVALWD89VwfS8IsozXRI5yftHo1fpMJgWP53',
    issuer: 'https://rc.xpro.mit.edu',
    issuerAuthorizationEndpoint: 'https://rc.xpro.mit.edu/oauth2/authorize/',
    issuerTokenEndpoint: 'https://rc.xpro.mit.edu/oauth2/token/',
  },
};

export const DEFAULT_JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
