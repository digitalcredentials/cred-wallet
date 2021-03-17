import SensitiveInfo, {
  RNSensitiveInfoOptions,
} from 'react-native-sensitive-info';
import CONFIG from '../../config/env';

const KEYCHAIN_SERVICE = 'credwalletKeychainService';

const KEYSTORE_OPTIONS: RNSensitiveInfoOptions = {
  sharedPreferencesName: KEYCHAIN_SERVICE,
  keychainService: KEYCHAIN_SERVICE,
};

export class Keystore {
  static savePin(newPin: string): Promise<any> {
    return SensitiveInfo.setItem(
      CONFIG.KEYCHAIN_PIN_KEY,
      newPin,
      KEYSTORE_OPTIONS,
    );
  }

  static getPin(): Promise<string> {
    return SensitiveInfo.getItem(CONFIG.KEYCHAIN_PIN_KEY, KEYSTORE_OPTIONS);
  }

  static resetPin(): Promise<null> {
    return SensitiveInfo.deleteItem(CONFIG.KEYCHAIN_PIN_KEY, KEYSTORE_OPTIONS);
  }
}
