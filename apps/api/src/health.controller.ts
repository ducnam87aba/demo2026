import { Controller, Get } from '@nestjs/common';
import type { HealthResponse } from '@aba/contracts';
import { Public } from './auth/public.decorator.js';

@Public()
@Controller('health')
export class HealthController {
  @Get('live') live(): HealthResponse { return { status: 'ok', service: 'api', timestamp: new Date().toISOString() }; }
  @Get('ready') ready(): HealthResponse { return { status: 'ok', service: 'api', timestamp: new Date().toISOString() }; }
}