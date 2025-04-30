import { AuthController, AuthService } from './types';
import { Request, Response } from 'express';
import { bs58Client } from 'libs/bs58-client';
import { jwtClient, StringValue } from 'libs/jwt-client';
import { getEnv } from 'utils/env';
import { naclClient } from 'libs/nacl-client';
import { ServerError } from 'utils/server-error';

const getAuthController = (authService: AuthService): AuthController => {
  const getNonce = async (req: Request, res: Response): Promise<void> => {
    const requestBody = req.body;

    if (typeof requestBody?.publicKey !== 'string') {
      res.status(400).json({ error: 'Public key is required.' });
    }

    const nonce = await authService.encodeNonce(requestBody.publicKey);

    res.json({ nonce });
  };

  const decodeInputs = (publicKey: string, signature: string): { pubkeyBytes: Uint8Array; sigBytes: Uint8Array } => {
    const pubkeyBytes = bs58Client.decode(publicKey);
    const sigBytes = bs58Client.decode(signature);

    return { pubkeyBytes, sigBytes };
  };

  const verifySignature = async (req: Request, res: Response): Promise<void> => {
    const { publicKey, signature } = req.body;

    if (typeof publicKey !== 'string' || typeof signature !== 'string') {
      throw new ServerError('Public key and signature is required.', 400);
    }

    const nonce = authService.getNonce(publicKey);
    if (!nonce) {
      throw new ServerError('No nonce found for this publicKey', 400);
    }

    let pubkeyBytes: Uint8Array, sigBytes: Uint8Array;
    try {
      const decodedInputs = decodeInputs(publicKey, signature);

      pubkeyBytes = decodedInputs.pubkeyBytes;
      sigBytes = decodedInputs.sigBytes;
    } catch (e) {
      throw new ServerError('Invalid base58 encoding', 400);
    }

    const valid = naclClient.signDetachedVerify(nonce, sigBytes, pubkeyBytes);
    if (!valid) {
      throw new ServerError('Signature verification failed', 400);
    }

    const expiresIn = getEnv('JWT_EXPIRES_IN', '1h') as StringValue;
    const jwtSecret = getEnv('JWT_SECRET', '');
    const token = jwtClient.sign({ sub: publicKey }, jwtSecret, {
      expiresIn
    });

    authService.removeNonce(publicKey);

    res.json({ token });
  };

  return {
    getNonce,
    verifySignature
  };
};

export { getAuthController };
