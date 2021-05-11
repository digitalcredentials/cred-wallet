#!/usr/bin/env node

// @ts-ignore
import { documentLoaderFactory } from '@transmute/jsonld-document-loader';
const vc = require('@digitalbazaar/vc');
import { generateSecureRandom } from 'react-native-securerandom';
const didKeyDriver = require('@digitalbazaar/did-method-key').driver();

const ed25519 = require('@digitalbazaar/ed25519-signature-2020');
const x25519Ctx = require('x25519-key-agreement-2020-context');
const ed25519Ctx = require('ed25519-signature-2020-context');
const credentialsCtx = require('credentials-context');

export function getController(fullDid: string) {
  return fullDid.split('#')[0];
}

export function getCustomLoader(): any {
  const customLoaderProto = documentLoaderFactory.pluginFactory
    .build()
    .addContext({ [ed25519Ctx.constants.CONTEXT_URL]: ed25519Ctx.contexts.get(ed25519Ctx.constants.CONTEXT_URL) })
    .addContext({ [credentialsCtx.CONTEXT_URL]: credentialsCtx.CONTEXT })
    .addContext({ [x25519Ctx.constants.CONTEXT_URL]: x25519Ctx.contexts.get(x25519Ctx.constants.CONTEXT_URL) });
  return customLoaderProto.buildDocumentLoader();
}


async function generateDidKeyPair(): Promise<any> {
  const BYTES_LENGTH = 32;

  const randomBytes = await generateSecureRandom(BYTES_LENGTH);

  const { didKeyDocument, keyPairs } = await didKeyDriver.generate({ randomBytes });
  const kp = keyPairs.entries().next().value;
  const v = kp[1];
  return v;
}

function generateDidKeySuite(keyPair: any): any {
  const signingSuite = new ed25519.Ed25519Signature2020({ key: keyPair });
  return signingSuite;
}

function createPresentation(holder: string): any {
  return {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "type": [
      "VerifiablePresentation"
    ],
    "id": "123", // TODO: generate a UUID for use here
    "holder": holder
  };
}

export async function generateAndProveDid(challenge: string): Promise<any> {
  console.log('start');
  const keyPair = await generateDidKeyPair();
  console.log('keyPair', keyPair);
  const suite = generateDidKeySuite(keyPair);
  console.log('suite', suite);
  console.log('controller: ' + keyPair.controller);

  const presentation = createPresentation(keyPair.controller);
  console.log('presentation', JSON.stringify(presentation, null, 2));
  const customLoader = getCustomLoader();
  let signedPresentation = null;
  try {

    signedPresentation = await vc.signPresentation({
      presentation: presentation,
      documentLoader: customLoader,
      suite: suite,
      challenge: challenge
    });

  } catch (e) {
    console.tron?.error(e);
    console.trace(e);
  }

  console.log('signedPres', signedPresentation);
  return signedPresentation;
}


(async () => {
  var text = await generateAndProveDid('3443wrerwrew');
  console.log(text);
})().catch((e) => {
  console.error(e);
  // Deal with the fact the chain failed
});
