import jwt from 'jsonwebtoken';
import { UnitAnyCase } from 'ms';

interface JWTClient {
  sign: (
    payload: string | Buffer | object,
    secretOrPrivateKey: jwt.Secret | jwt.PrivateKey,
    options?: jwt.SignOptions
  ) => string;
  verify: (
    token: string,
    secretOrPublicKey: jwt.Secret | jwt.PublicKey,
    options?: jwt.VerifyOptions & { complete: true }
  ) => jwt.Jwt | jwt.JwtPayload | string;
}

export type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`;

const initJWTClient = (): JWTClient => {
  const sign = (
    payload: string | Buffer | object,
    secretOrPrivateKey: jwt.Secret | jwt.PrivateKey,
    options?: jwt.SignOptions
  ): string => {
    return jwt.sign(payload, secretOrPrivateKey, options);
  };

  const verify = (
    token: string,
    secretOrPublicKey: jwt.Secret | jwt.PublicKey,
    options?: jwt.VerifyOptions & { complete: true }
  ): jwt.Jwt | jwt.JwtPayload | string => {
    return jwt.verify(token, secretOrPublicKey, options);
  };

  return {
    sign,
    verify
  };
};

const jwtClient = initJWTClient();

export { jwtClient };
