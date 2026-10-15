import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import type { AuthPrincipal } from './auth.types.js';
export interface TokenVerifier { verify(token: string): Promise<AuthPrincipal>; }
@Injectable()
export class SupabaseJwtVerifier implements TokenVerifier {
  async verify(token: string): Promise<AuthPrincipal> {
    const jwksUrl = process.env.SUPABASE_JWKS_URL;
    const issuer = process.env.SUPABASE_JWT_ISSUER;
    const audience = process.env.SUPABASE_JWT_AUDIENCE;
    if (!jwksUrl || !issuer || !audience) throw new Error('Supabase JWT verification is not configured.');
    try {
      const { payload } = await jwtVerify(token, createRemoteJWKSet(new URL(jwksUrl)), { issuer, audience });
      if (typeof payload.sub !== 'string') throw new UnauthorizedException('Token subject is missing.');
      return { authUserId: payload.sub };
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Bearer token is invalid or expired.');
    }
  }
}