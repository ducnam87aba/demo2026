import { describe, expect, it } from 'vitest';
import { studentAccessWhere } from './access-policy.js';
import type { ActorContext } from './identity.types.js';

const actor = (role: ActorContext['memberships'][number]['role'], overrides: Partial<ActorContext['memberships'][number]> = {}): ActorContext => ({
  userProfileId: 'user-a', authUserId: 'auth-a', displayName: 'Actor',
  memberships: [{ role, organizationId: 'org-a', schoolId: null, classroomId: null, ...overrides }]
});

describe('student access policy', () => {
  it('limits a parent to verified guardian links owned by that parent', () => {
    expect(studentAccessWhere(actor('PARENT'))).toEqual({ OR: [{ guardianLinks: { some: { guardianUserId: 'user-a', verificationStatus: 'VERIFIED' } } }] });
  });
  it('limits a teacher to active enrollment in the assigned classroom and organization', () => {
    const where = studentAccessWhere(actor('TEACHER', { schoolId: 'school-a', classroomId: 'class-a' }));
    expect(where).toMatchObject({ OR: [{ organizationId: 'org-a', enrollments: { some: { classroomId: 'class-a' } } }] });
  });
  it('gives a content editor no student PII scope', () => {
    expect(studentAccessWhere(actor('CONTENT_EDITOR'))).toEqual({ id: { in: [] } });
  });
  it('defaults to deny when no active membership is present', () => {
    expect(studentAccessWhere({ ...actor('TEACHER'), memberships: [] })).toEqual({ id: { in: [] } });
  });
});