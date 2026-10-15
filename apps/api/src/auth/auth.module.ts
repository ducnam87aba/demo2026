import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { SupabaseJwtVerifier } from './jwt-verifier.js';
import { TOKEN_VERIFIER } from './tokens.js';
@Module({ providers: [{ provide: TOKEN_VERIFIER, useClass: SupabaseJwtVerifier }, { provide: APP_GUARD, useClass: JwtAuthGuard }], exports: [TOKEN_VERIFIER] })
export class AuthModule {}