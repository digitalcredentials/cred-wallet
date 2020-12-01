import { VerifyPanelStatus } from '../../utils/types';

const CIPHERS_FIRST_ROW: number[] = [1, 2, 3];
const CIPHERS_SECOND_ROW: number[] = [4, 5, 6];
const CIPHERS_THIRD_ROW: number[] = [7, 8, 9];
const CIPHERS_ZERO: number[] = [0];

export const CIPHER_LETTERS: Record<number, string[]> = {
  1: [],
  2: ['A', 'B', 'C'],
  3: ['D', 'E', 'F'],
  4: ['G', 'H', 'I'],
  5: ['J', 'K', 'L'],
  6: ['M', 'N', 'O'],
  7: ['P', 'Q', 'R', 'S'],
  8: ['T', 'U', 'V'],
  9: ['W', 'X', 'Y', 'Z'],
  0: [],
};

export const CIPHERS_BY_ROWS: number[][] = [
  CIPHERS_FIRST_ROW,
  CIPHERS_SECOND_ROW,
  CIPHERS_THIRD_ROW,
  CIPHERS_ZERO,
];

export const PIN_LENGTH = 4;

// TODO: refactor to enum
type VerifyPanelStatusKeys =
  | 'CHECK_BIOMETRIC_VERIFY'
  | 'CHECK_PIN_KEYCHAIN'
  | 'PIN_CREATE'
  | 'PIN_CREATE_VERIFY'
  | 'SAVE_PIN_KEYCHAIN'
  | 'PIN_ENTER'
  | 'PIN_VERIFY'
  | 'BIOMETRIC_VERIFY'
  | 'VERIFIED';
export const PANEL_STATUS: Record<VerifyPanelStatusKeys, VerifyPanelStatus> = {
  CHECK_BIOMETRIC_VERIFY: 'check-biometric-verify',
  CHECK_PIN_KEYCHAIN: 'check-pin-keychain',
  PIN_CREATE: 'pin-create',
  PIN_CREATE_VERIFY: 'pin-create-verify',
  SAVE_PIN_KEYCHAIN: 'save-pin-keychain',
  PIN_ENTER: 'pin-enter',
  PIN_VERIFY: 'pin-verify',
  BIOMETRIC_VERIFY: 'biometric-verify',
  VERIFIED: 'verified',
};

export const BIOMETRY_OPTIONS = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};
