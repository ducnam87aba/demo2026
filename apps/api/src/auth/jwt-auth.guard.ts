import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthenticatedRequest } from './auth.types.js';
import type { TokenVerifier } from './jwt-verifier.js';
import { IS_PUBLIC_KEY } from './public.decorator.js';
import { TOKEN_VERIFIER } from './tokens.js';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, @Inject(TOKEN_VERIFIER) private readonly verifier: TokenVerifier) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])) return true;
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) throw new UnauthorizedException('Bearer token is required.');
    const token = authorization.slice(7).trim();
    if (!token) throw new UnauthorizedException('Bearer token is required.');
    request.principal = await this.verifier.verify(token);
    return true;
  }
}