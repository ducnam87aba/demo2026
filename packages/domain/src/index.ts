export const GRADE_BANDS = [
  { code: 'G1_3', minimumGrade: 1, maximumGrade: 3 },
  { code: 'G4_6', minimumGrade: 4, maximumGrade: 6 },
  { code: 'G7_9', minimumGrade: 7, maximumGrade: 9 },
  { code: 'G10_12', minimumGrade: 10, maximumGrade: 12 }
] as const;

export type GradeBandCode = (typeof GRADE_BANDS)[number]['code'];