import { PrismaClient } from '@prisma/client';
import { GRADE_BANDS } from '../packages/domain/src/index.js';

const prisma = new PrismaClient();
async function main(): Promise<void> {
  const organization = await prisma.organization.upsert({ where: { code: 'ABA_DEMO' }, update: {}, create: { code: 'ABA_DEMO', name: 'ABA Skills 360 — Dữ liệu minh họa, chưa kiểm định' } });
  for (const band of GRADE_BANDS) await prisma.ageBand.upsert({ where: { organizationId_code: { organizationId: organization.id, code: band.code } }, update: { minimumGrade: band.minimumGrade, maximumGrade: band.maximumGrade }, create: { organizationId: organization.id, code: band.code, label: `Khối ${band.minimumGrade}–${band.maximumGrade} (minh họa)`, minimumGrade: band.minimumGrade, maximumGrade: band.maximumGrade } });
}
main().finally(async () => prisma.$disconnect());