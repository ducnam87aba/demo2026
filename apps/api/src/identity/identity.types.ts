import type { MeResponse, MembershipRole, StudentSummary } from '@aba/contracts';

export interface MembershipScope { role: MembershipRole; organizationId: string; schoolId: string | null; classroomId: string | null; }
export interface ActorContext { userProfileId: string; authUserId: string; displayName: string; memberships: MembershipScope[]; }
export interface IdentityRepository {
  findActor(authUserId: string): Promise<ActorContext | null>;
  findStudents(actor: ActorContext): Promise<StudentSummary[]>;
  findStudent(actor: ActorContext, studentId: string): Promise<StudentSummary | null>;
}
export function toMeResponse(actor: ActorContext): MeResponse {
  return { id: actor.userProfileId, displayName: actor.displayName, memberships: actor.memberships.map(({ role, organizationId, schoolId }) => ({ role, organizationId, schoolId })) };
}