import type { Prisma } from '@prisma/client';
import type { ActorContext } from './identity.types.js';

export function studentAccessWhere(actor: ActorContext): Prisma.StudentWhereInput {
  const scopes: Prisma.StudentWhereInput[] = [];
  if (actor.memberships.some(({ role }) => role === 'PARENT')) scopes.push({ guardianLinks: { some: { guardianUserId: actor.userProfileId, verificationStatus: 'VERIFIED' } } });
  if (actor.memberships.some(({ role }) => role === 'STUDENT')) scopes.push({ accountLinks: { some: { userProfileId: actor.userProfileId, status: 'ACTIVE' } } });
  for (const membership of actor.memberships) {
    if (membership.role === 'TEACHER' && membership.classroomId) scopes.push({ organizationId: membership.organizationId, enrollments: { some: { classroomId: membership.classroomId, OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }] } } });
    if (membership.role === 'SCHOOL_ADMIN' && membership.schoolId) scopes.push({ organizationId: membership.organizationId, enrollments: { some: { schoolId: membership.schoolId, OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }] } } });
    if (membership.role === 'ABA_OPERATOR') scopes.push({ organizationId: membership.organizationId });
  }
  return scopes.length === 0 ? { id: { in: [] } } : { OR: scopes };
}