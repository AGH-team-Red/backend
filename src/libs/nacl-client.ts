import nacl from 'tweetnacl';

interface NaclClient {
  signDetachedVerify: (nonce: string, sigBytes: Uint8Array, pubkeyBytes: Uint8Array) => boolean;
  randomBytes: (n: number) => Uint8Array;
}

const initNaclClient = (): NaclClient => {
  const signDetachedVerify = (nonce: string, sigBytes: Uint8Array, pubkeyBytes: Uint8Array): boolean => {
    return nacl.sign.detached.verify(new TextEncoder().encode(nonce), sigBytes, pubkeyBytes);
  };

  const randomBytes = (n: number): Uint8Array => {
    return nacl.randomBytes(n);
  };

  return {
    signDetachedVerify,
    randomBytes
  };
};

const naclClient = initNaclClient();

export { naclClient };
