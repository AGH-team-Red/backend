import { AuthService } from './types';
import { UsersRepository } from '../users/types';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

const getAuthService = (usersRepository: UsersRepository): AuthService => {
  const nonces = new Map<string, string>();

  const encodeNonce = async (publicKey: string): Promise<string> => {
    const nonce = bs58.encode(nacl.randomBytes(32));

    nonces.set(publicKey, nonce);

    return nonce;
  };

  const getNonce = (publicKey: string): string | null => {
    const nonce = nonces.get(publicKey);

    if (!nonce) {
      return null;
    }

    return nonce;
  };

  const removeNonce = (publicKey: string): void => {
    nonces.delete(publicKey);
  };

  return {
    encodeNonce,
    getNonce,
    removeNonce
  };
};

export { getAuthService };
