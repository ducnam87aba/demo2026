import { z } from 'zod';

export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.string(),
  timestamp: z.iso.datetime()
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  requestId: z.string(),
  details: z.unknown().optional()
});

export type ApiError = z.infer<typeof apiErrorSchema>;

export const membershipRoleSchema = z.enum([
  'STUDENT', 'PARENT', 'TEACHER', 'SCHOOL_ADMIN', 'CONTENT_EDITOR', 'ABA_OPERATOR'
]);
export type MembershipRole = z.infer<typeof membershipRoleSchema>;

export const meResponseSchema = z.object({
  id: z.uuid(),
  displayName: z.string(),
  memberships: z.array(z.object({
    role: membershipRoleSchema,
    organizationId: z.uuid(),
    schoolId: z.uuid().nullable()
  }))
});
export type MeResponse = z.infer<typeof meResponseSchema>;

export const studentSummarySchema = z.object({
  id: z.uuid(),
  studentCode: z.string(),
  displayName: z.string(),
  grade: z.number().int().min(1).max(12)
});
export type StudentSummary = z.infer<typeof studentSummarySchema>;