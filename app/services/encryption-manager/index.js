import CryptoJS, { AES } from 'react-native-crypto-js';

export default class EncryptionManager {
  static encryptAES(message, key) {
    return AES.encrypt(message, key).toString();
  }

  static decryptAES(cipher, key) {
    const bytes = AES.decrypt(cipher, key);
    const result = bytes.toString(CryptoJS.enc.Utf8);
    return result;
  }
}
