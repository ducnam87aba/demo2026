import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { exportJWK, generateKeyPair, SignJWT } from 'jose';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { SupabaseJwtVerifier } from './jwt-verifier.js';

describe('SupabaseJwtVerifier', () => {
  let close: () => Promise<void>;
  let sign: (overrides?: { issuer?: string; audience?: string; expiresIn?: string }) => Promise<string>;
  beforeAll(async () => {
    const { publicKey, privateKey } = await generateKeyPair('RS256');
    const jwk = await exportJWK(publicKey); Object.assign(jwk, { kid: 'test-key', alg: 'RS256', use: 'sig' });
    const server = createServer((_request, response) => { response.setHeader('content-type', 'application/json'); response.end(JSON.stringify({ keys: [jwk] })); });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    process.env.SUPABASE_JWKS_URL = `http://127.0.0.1:${(server.address() as AddressInfo).port}/jwks`;
    process.env.SUPABASE_JWT_ISSUER = 'https://sandbox.example/auth/v1';
    process.env.SUPABASE_JWT_AUDIENCE = 'authenticated';
    close = () => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    sign = async (overrides = {}) => new SignJWT({}).setProtectedHeader({ alg: 'RS256', kid: 'test-key' }).setSubject('00000000-0000-0000-0000-000000000001').setIssuer(overrides.issuer ?? process.env.SUPABASE_JWT_ISSUER!).setAudience(overrides.audience ?? 'authenticated').setIssuedAt().setExpirationTime(overrides.expiresIn ?? '5m').sign(privateKey);
  });
  afterAll(async () => close());
  it('accepts a correctly signed token', async () => expect(new SupabaseJwtVerifier().verify(await sign())).resolves.toEqual({ authUserId: '00000000-0000-0000-0000-000000000001' }));
  it('rejects the wrong issuer', async () => expect(new SupabaseJwtVerifier().verify(await sign({ issuer: 'https://attacker.example' }))).rejects.toThrow('invalid or expired'));
  it('rejects the wrong audience', async () => expect(new SupabaseJwtVerifier().verify(await sign({ audience: 'service_role' }))).rejects.toThrow('invalid or expired'));
  it('rejects an expired token', async () => expect(new SupabaseJwtVerifier().verify(await sign({ expiresIn: '0s' }))).rejects.toThrow('invalid or expired'));
});