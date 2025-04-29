import nacl from 'tweetnacl';

interface NaclClient {
  signDetachedVerify: (nonce: string, sigBytes: Uint8Array, pubkeyBytes: Uint8Array) => boolean;
}

const initNaclClient = (): NaclClient => {
  const signDetachedVerify = (nonce: string, sigBytes: Uint8Array, pubkeyBytes: Uint8Array): boolean => {
    return nacl.sign.detached.verify(new TextEncoder().encode(nonce), sigBytes, pubkeyBytes);
  };

  return {
    signDetachedVerify
  };
};

const naclClient = initNaclClient();

export { naclClient };
