# Backlog theo mã issue

Trạng thái: `[x]` foundation hiện có, `[-]` một phần, `[ ]` chưa làm.

## W00/W01

- [x] **F01** pnpm workspace, TypeScript strict, lint boundary.
- [x] **F02** CI build/test và `.env.example` placeholder.
- [-] **F03** local DB/schema/seed: file hoàn tất; cần Docker để chạy migration/seed thật; Auth/Storage local chưa dựng.
- [-] **F04** ADR auth và desktop smoke spike: ADR/security skeleton xong; PKCE/credential store/OS smoke pending.

## W02–W03

- [ ] **I01–I06** auth, `/me`, organization scopes, student/guardian/consent và negative authorization tests.
- [ ] **U01–U10** tokens, navigation/guards/states/controls, child switcher, sitemap, flows, wireframes, Lesson/Quiz và clickable prototype.

## W04–W10

- [ ] **C01–C05** content/version/template/assignment.
- [ ] **E01–E06** survey session/autosave/revision/resume/idempotent submit/conflict.
- [ ] **S01–S05** golden scoring/missingness/jobs/snapshots/replay.
- [ ] **R01–R05** report facts/HTML/PDF/auth/four demo cases.
- [ ] **G01–G04** recommendations/missions/XP/achievements.
- [ ] **D01–D05** desktop protocol/PKCE/IPC/packaging/updater.
- [ ] **O01–O05** observability/restore/load/retention/pilot gate.

Mỗi issue phải cập nhật schema/API/docs cùng test liên quan; không chứa secret/PII và không đánh dấu hoàn thành nếu chỉ mock phần bắt buộc.