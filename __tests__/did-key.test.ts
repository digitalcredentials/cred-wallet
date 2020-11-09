import * as ed25519 from '@transmute/did-key-ed25519';

import { virgilCrypto } from 'react-native-virgil-crypto';

it('must create a DID Doc', async () => {
  const key = await ed25519.Ed25519KeyPair.generate({
    secureRandom: () => virgilCrypto.getRandomBytes(32)
  });
  console.log(key);
});
