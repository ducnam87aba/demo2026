import { Controller, Get, Param, ParseUUIDPipe, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import type { MeResponse, StudentSummary } from '@aba/contracts';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { IdentityService } from './identity.service.js';

@ApiBearerAuth()
@Controller()
export class IdentityController {
  constructor(private readonly identity: IdentityService) {}
  @Get('me') @ApiOperation({ summary: 'Get the authenticated profile and active scopes' }) @ApiOkResponse()
  me(@Req() request: AuthenticatedRequest): Promise<MeResponse> { return this.identity.me(request.principal.authUserId); }
  @Get('students') @ApiOperation({ summary: 'List students visible to the authenticated actor' }) @ApiOkResponse()
  students(@Req() request: AuthenticatedRequest): Promise<StudentSummary[]> { return this.identity.students(request.principal.authUserId); }
  @Get('students/:id') @ApiOperation({ summary: 'Get a student only when an authorized relationship exists' }) @ApiOkResponse()
  student(@Req() request: AuthenticatedRequest, @Param('id', new ParseUUIDPipe()) id: string): Promise<StudentSummary> { return this.identity.student(request.principal.authUserId, id); }
}