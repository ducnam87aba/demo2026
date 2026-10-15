import { Injectable } from '@nestjs/common';
import type { MembershipRole, StudentSummary } from '@aba/contracts';
import { PrismaService } from '../prisma.service.js';
import { studentAccessWhere } from './access-policy.js';
import type { ActorContext, IdentityRepository } from './identity.types.js';

const studentSelect = { id: true, studentCode: true, displayName: true, grade: true } as const;
@Injectable()
export class PrismaIdentityRepository implements IdentityRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findActor(authUserId: string): Promise<ActorContext | null> {
    const user = await this.prisma.userProfile.findUnique({ where: { authUserId }, include: { memberships: { where: { status: 'ACTIVE' } } } });
    if (!user) return null;
    return { userProfileId: user.id, authUserId: user.authUserId, displayName: user.displayName, memberships: user.memberships.map((membership) => ({ role: membership.role as MembershipRole, organizationId: membership.organizationId, schoolId: membership.schoolId, classroomId: membership.classroomId })) };
  }
  async findStudents(actor: ActorContext): Promise<StudentSummary[]> {
    return this.prisma.student.findMany({ where: studentAccessWhere(actor), select: studentSelect, orderBy: [{ displayName: 'asc' }, { id: 'asc' }], take: 100 });
  }
  async findStudent(actor: ActorContext, studentId: string): Promise<StudentSummary | null> {
    return this.prisma.student.findFirst({ where: { AND: [{ id: studentId }, studentAccessWhere(actor)] }, select: studentSelect });
  }
}