import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { HealthController } from './health.controller.js';
import { IdentityModule } from './identity/identity.module.js';
import { PrismaService } from './prisma.service.js';

@Module({ imports: [AuthModule, IdentityModule], controllers: [HealthController], providers: [PrismaService] })
export class AppModule {}