import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { IdentityController } from './identity.controller.js';
import { PrismaIdentityRepository } from './prisma-identity.repository.js';
import { IdentityService } from './identity.service.js';
import { IDENTITY_REPOSITORY } from './tokens.js';
@Module({ controllers: [IdentityController], providers: [PrismaService, IdentityService, { provide: IDENTITY_REPOSITORY, useClass: PrismaIdentityRepository }] })
export class IdentityModule {}