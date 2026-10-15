import type { Request } from 'express';
export interface AuthPrincipal { authUserId: string; }
export interface AuthenticatedRequest extends Request { principal: AuthPrincipal; }