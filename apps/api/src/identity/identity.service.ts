import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { MeResponse, StudentSummary } from '@aba/contracts';
import type { ActorContext, IdentityRepository } from './identity.types.js';
import { toMeResponse } from './identity.types.js';
import { IDENTITY_REPOSITORY } from './tokens.js';

@Injectable()
export class IdentityService {
  constructor(@Inject(IDENTITY_REPOSITORY) private readonly repository: IdentityRepository) {}
  async actor(authUserId: string): Promise<ActorContext> {
    const actor = await this.repository.findActor(authUserId);
    if (!actor) throw new NotFoundException('User profile is not provisioned.');
    return actor;
  }
  async me(authUserId: string): Promise<MeResponse> { return toMeResponse(await this.actor(authUserId)); }
  async students(authUserId: string): Promise<StudentSummary[]> { return this.repository.findStudents(await this.actor(authUserId)); }
  async student(authUserId: string, studentId: string): Promise<StudentSummary> {
    const result = await this.repository.findStudent(await this.actor(authUserId), studentId);
    if (!result) throw new NotFoundException('Student was not found.');
    return result;
  }
}