import * as ed25519 from '@transmute/did-key-ed25519';
import { generateSecureRandom } from 'react-native-securerandom';

export const Ed25519KeyPair = ed25519.Ed25519KeyPair;
export const resolve = ed25519.driver.resolve;

const KEY_SEED_LENGTH = 32;

/**
 * @param {Uint8Array} [seed] - Random bytes for deterministic key generation.
 */
export async function generateKeyPair(seed?: Uint8Array): Promise<ed25519.Ed25519KeyPair> {
  const randomBytes = seed || await generateSecureRandom(KEY_SEED_LENGTH);

  const keyPair = await ed25519.Ed25519KeyPair.generate({
    secureRandom: () => randomBytes
  });

  return keyPair;
}

/**
 * @param {Ed25519KeyPair} keyPair - Ed25519VerificationKey2018 instance.
 */
export function didFromKeyPair(keyPair: ed25519.Ed25519KeyPair): string {
  return `did:key:${keyPair.fingerprint()}`;
}

