#!/usr/bin/env node

// @ts-ignore
import { documentLoaderFactory } from '@transmute/jsonld-document-loader';
const vc = require('@digitalcredentials/vc');
import { generateSecureRandom } from 'react-native-securerandom';
const didKeyDriver = require('@digitalcredentials/did-method-key').driver();

const ed25519 = require('@digitalcredentials/ed25519-signature-2020');
const x25519Ctx = require('@digitalcredentials/x25519-key-agreement-2020-context');
const ed25519Ctx = require('ed25519-signature-2020-context');
const credentialsCtx = require('@digitalcredentials/credentials-context');
import uuid from 'react-native-uuid';

export function getController(fullDid: string) {
  return fullDid.split('#')[0];
}

export function getCustomLoader(): any {
  const customLoaderProto = documentLoaderFactory.pluginFactory
    .build()
    .addContext({
      [ed25519Ctx.constants.CONTEXT_URL]: ed25519Ctx.contexts.get(
        ed25519Ctx.constants.CONTEXT_URL,
      ),
    })
    .addContext({ [credentialsCtx.CONTEXT_URL]: credentialsCtx.CONTEXT })
    .addContext({
      [x25519Ctx.constants.CONTEXT_URL]: x25519Ctx.contexts.get(
        x25519Ctx.constants.CONTEXT_URL,
      ),
    });
  return customLoaderProto.buildDocumentLoader();
}

async function generateDidKeyPair(): Promise<any> {
  const BYTES_LENGTH = 32;

  const randomBytes = await generateSecureRandom(BYTES_LENGTH);

  const { keyPairs } = await didKeyDriver.generate({
    randomBytes,
  });

  return keyPairs.entries().next().value[1];
}

function generateDidKeySuite(keyPair: any): any {
  const signingSuite = new ed25519.Ed255Signature2020({ key: keyPair });
  return signingSuite;
}

function createPresentation(holder: string): any {
  return {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1',
    ],
    type: ['VerifiablePresentation'],
    id: uuid.v4(),
    holder: holder,
  };
}

export async function generateAndProveDid(challenge: string): Promise<any> {
  const keyPair = await generateDidKeyPair();
  const suite = generateDidKeySuite(keyPair);

  const presentation = createPresentation(keyPair.controller);
  const customLoader = getCustomLoader();
  let signedPresentation = null;
  try {
    signedPresentation = await vc.signPresentation({
      presentation: presentation,
      documentLoader: customLoader,
      suite: suite,
      challenge: challenge,
    });
  } catch (e) {
    // console.tron?.error(e);
    console.trace(e);
  }

  return signedPresentation;
}
