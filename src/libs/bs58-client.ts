import bs58 from 'bs58';

interface BS58Client {
  decode: (key: string) => Uint8Array;
}

const initBS58Client = (): BS58Client => {
  const decode = (key: string): Uint8Array => {
    return bs58.decode(key);
  };

  return {
    decode
  };
};

const bs58Client = initBS58Client();

export { bs58Client };
