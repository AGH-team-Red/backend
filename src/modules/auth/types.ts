import { RequestHandler } from 'express';

export interface AuthController {
  getNonce: RequestHandler;
  verifySignature: RequestHandler;
}

export interface AuthService {
  getNonce: (publicKey: string) => string | null;
  encodeNonce: (publicKey: string) => Promise<string>;
  removeNonce: (publicKey: string) => void;
}
