import bs58 from 'bs58';

interface BS58Client {
  decode: (key: string) => Uint8Array;
  encode: (buffer: Uint8Array | number[]) => string;
}

const initBS58Client = (): BS58Client => {
  const decode = (key: string): Uint8Array => {
    return bs58.decode(key);
  };

  const encode = (buffer: Uint8Array | number[]): string => {
    return bs58.encode(buffer);
  };

  return {
    decode,
    encode
  };
};

const bs58Client = initBS58Client();

export { bs58Client };
