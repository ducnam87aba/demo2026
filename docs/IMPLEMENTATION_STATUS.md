# Trạng thái triển khai

Ngày cập nhật: 15/10/2026.

## Tổng quan

| Gói | Trạng thái | Ghi chú |
|---|---|---|
| W00 Khóa phạm vi | Hoàn thành tài liệu | ADR/phạm vi/giả định đã ghi; quyết định provider/deployment cuối còn pending đầu vào |
| W01 Nền tảng | Hoàn thành trong giới hạn môi trường | Monorepo, CI, app skeleton, migration/seed và Docker Compose đã tạo; lint/typecheck/unit/build và API smoke pass |
| F04 auth/desktop spike | Một phần | JWT verifier/JWKS code và crypto tests cục bộ có thật; Electron security skeleton có thật; Supabase PKCE/token storage chưa thể test vì thiếu sandbox credentials |
| W02 Identity và phân quyền | Một phần | Schema identity/scope, `/v1/me`, student scope queries và negative policy tests đã có; provisioning/invitation và DB runtime còn pending |
| W03–W10 | Chưa bắt đầu | Không mock thành hoàn thành |

## Phần chạy thật

- Web React/Vite responsive foundation với đúng năm nhãn tab học sinh và nhãn demo.
- NestJS API với `/v1/health/live`, `/v1/health/ready` và OpenAPI UI.
- Global bearer guard xác minh chữ ký JWT qua remote JWKS cùng issuer/audience; `/v1/me` và student API lấy role/scope từ PostgreSQL, không tin role do client/JWT tùy ý gửi.
- Prisma model cho user profile, membership, school, classroom, student, enrollment và guardian/student account links; query student áp authorization ngay trong điều kiện DB.
- Worker process có structured heartbeat và graceful shutdown; chưa claim job.
- Electron local renderer shell và hardening cơ bản.
- Prisma migration cho organization/age band, constraint DB và seed idempotent bốn dải lớp.
- Pure scoring primitive nhỏ có unit tests; đây chỉ là nền kỹ thuật, không phải Assessment Engine được nghiệm thu.
- CI lint/typecheck/test/build.

## Kiểm tra đã chạy

- `pnpm lint`: pass 8/8 workspace; test âm xác nhận web import `assessment-core` bị chặn.
- `pnpm typecheck`: pass 8/8 workspace.
- `pnpm test`: pass; `assessment-core` có 7 assertions qua 3 nhóm test, các app/package chưa có test dùng `--passWithNoTests` và không được tính là coverage chức năng.
- API có 8 test: chữ ký/issuer/audience/expiry JWT và policy âm cho parent, teacher, content editor/default-deny. JWKS test dùng RSA key và HTTP server cục bộ, chưa phải Supabase integration test.
- `pnpm build`: pass 8/8 workspace; tạo output cho web/API/worker/desktop.
- API production-build smoke: `GET /v1/health/live` trả `200` và payload `status=ok`.
- `pnpm test:e2e`: chỉ xác nhận harness chưa tồn tại; **không tính là E2E pass**.

## Chưa có hoặc chưa kiểm chứng

- Docker không có trên máy bootstrap nên migration/seed chưa chạy với PostgreSQL thật.
- Chưa có Supabase project/credentials: verifier đã test cryptographic cục bộ nhưng JWKS thật, PKCE callback và secure token store chưa chạy.
- Chưa có E2E harness; lệnh hiện thông báo rõ thay vì tạo pass giả.
- Desktop chưa kiểm thử cài đặt, signing, notarization, updater hoặc OS matrix. macOS local skeleton không đại diện Windows build.
- Authorization W02 mới bao phủ read scope cho profile/student; chưa có provisioning/invitation, assessment session, content workflow, report/PDF hay production UI.

## Release gate

Không artifact nào hiện là production release. Không dùng seed cho người học thật và không diễn giải score demo như thước đo đã kiểm định.