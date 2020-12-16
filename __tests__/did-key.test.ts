import { didFromKeyPair, generateKeyPair, resolve, Ed25519KeyPair }
  from '../app/utils/did-key';
import crypto from 'crypto';

// In these Node.js unit tests, we're using native Node crypto for the seed
// Within a React Native (iOS or Android) app, generateKeyPair() with no
// seed will use the appropriate platform's random generator
const seed = crypto.randomBytes(32);

describe('generateKeyPair', () => {
  it('generates an Ed25519 type key', async () => {
    const keyPair = await generateKeyPair(seed);
    expect(keyPair).toHaveProperty('type', 'Ed25519VerificationKey2018');
    expect(keyPair.controller.startsWith('did:key')).toBe(true);

    // This key material will be used for signing and verifying
    expect(keyPair).toHaveProperty('publicKeyBuffer');
    expect(keyPair).toHaveProperty('privateKeyBuffer');
  });

  it('generates an Ed25519 type key for export', async () => {
    const keyPair = await generateKeyPair(seed);
    const exportPrivateKey = true;

    const exported = keyPair.toKeyPair(exportPrivateKey);

    // Example exported key:
    // {
    //   id: '#z6MkiTBz1ymuepAQ4HEHYSF1H8quG5GLVVQR3djdX3mDooWp',
    //   type: 'Ed25519VerificationKey2018',
    //   controller: 'did:key:z6MkiTBz1ymuepAQ4HEHYSF1H8quG5GLVVQR3djdX3mDooWp',
    //   publicKeyBase58: '4zvwRjXUKGfvwnParsHAS3HuSVzV5cA4McphgmoCtajS',
    //   privateKeyBase58: '111111111111111111111111111111114zvwRjXUKGfvwnParsHAS3HuSVzV5cA4McphgmoCtajS'
    // }

    expect(exported).toHaveProperty('type', 'Ed25519VerificationKey2018');
    expect(exported.controller.startsWith('did:key')).toBe(true);
    expect(exported).toHaveProperty('publicKeyBase58');
    expect(exported).toHaveProperty('privateKeyBase58');

    // To store a key pair in a React Native keychain, stringify it
    const exportedString = JSON.stringify(exported);

    // To load / re-hydrate the key pair from keychain:
    const loadedKeyPair = new Ed25519KeyPair(JSON.parse(exportedString));
    expect(loadedKeyPair).toHaveProperty('publicKeyBuffer');
    expect(loadedKeyPair).toHaveProperty('privateKeyBuffer');
  });
});

describe('didFromKeyPair', () => {
  it('generates an Ed25519 type did:key DID from a key pair', async () => {
    const keyPair = await generateKeyPair(seed);

    const did = didFromKeyPair(keyPair);

    expect(did.startsWith('did:key:z')).toBe(true);
  });
});

describe('resolve', () => {
  it('resolves a did:key type DID Document', async () => {
    const keyPair = await generateKeyPair(seed);
    const did = didFromKeyPair(keyPair);

    const {didDocument} = await resolve(did);

    expect(didDocument).toHaveProperty('@context');
    expect(didDocument.id).toEqual(did);
    expect(didDocument).toHaveProperty('verificationMethod');
  });
});
