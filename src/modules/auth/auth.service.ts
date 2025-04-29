import { AuthService } from './types';
import { UsersRepository } from 'modules/users/types';
import { bs58Client } from 'libs/bs58-client';
import { naclClient } from 'libs/nacl-client';

const getAuthService = (usersRepository: UsersRepository): AuthService => {
  const nonces = new Map<string, string>();

  const encodeNonce = async (publicKey: string): Promise<string> => {
    const nonce = bs58Client.encode(naclClient.randomBytes(32));

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
