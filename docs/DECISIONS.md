# Quyết định kiến trúc

Ngày cập nhật: 15/10/2026. Trạng thái: W00 được ghi nhận; các quyết định auth/deployment cần được xác minh tiếp trong spike có credentials.

## ADR-001 — Phạm vi và kiến trúc nền tảng

**Chấp nhận.** Đây là sản phẩm mới; không sửa ABA Learning hay WordPress. Dùng pnpm workspace/Turborepo, TypeScript strict, React/Vite SPA, NestJS REST `/v1`, Prisma/PostgreSQL, worker Node và Electron. API là ranh giới nghiệp vụ cho web, desktop và Expo tương lai. `assessment-core` là server-only và lint cấm web import package này hoặc Prisma.

Bốn dải lớp được cấu hình trong dữ liệu: 1–3, 4–6, 7–9, 10–12. Chúng chưa phải nhóm chuẩn hóa tâm trắc. Seed và UI bắt buộc ghi nhãn “minh họa/chưa kiểm định”.

## ADR-002 — Auth web và desktop

**Chấp nhận về thiết kế, tích hợp sandbox còn pending.** Supabase Auth phát JWT; NestJS xác minh issuer/audience/signature qua JWKS và luôn lấy quyền nghiệp vụ từ PostgreSQL, không tin role/student ID do client gửi. Verifier và negative policy tests đã chạy bằng JWKS/RSA cục bộ; chưa được coi là Supabase integration pass.

- Web: ưu tiên BFF/cookie `HttpOnly`, `Secure`, `SameSite=Lax`. Spike phải đánh giá hosting/cross-origin trước khi chốt. Nếu buộc dùng token trong SPA, phải có ADR thay thế và threat model XSS.
- Electron: mở system browser với Authorization Code + PKCE; redirect `aba-skills-360://auth/callback`; nonce/state dùng một lần và có TTL. Refresh token chỉ lưu qua OS credential store adapter đã kiểm chứng, không plaintext/localStorage.
- Hiện chưa có Supabase sandbox credentials nên chưa thực hiện callback/token exchange. Không có auth giả được coi là production path.

## ADR-003 — Electron security và phân phối

**Chấp nhận cho skeleton.** Renderer tải asset Vite cục bộ ở production; development URL chỉ lấy từ env. `contextIsolation=true`, `nodeIntegration=false`, `sandbox=true`; preload chỉ expose dữ liệu allowlist bất biến. `window.open` bị từ chối và chỉ mở URL HTTPS ngoài bằng system browser; cross-origin navigation bị chặn. IPC nghiệp vụ/download sẽ kiểm sender và schema ở D03.

Electron pin chính xác trong lockfile. Phiên bản OS tối thiểu, custom protocol, signing/notarization và updater chưa chốt cho tới khi chạy spike trên Windows/macOS thật. Build `dir` unsigned chỉ là artifact nội bộ.

## ADR-004 — Dữ liệu và triển khai

**Chấp nhận cho development; production pending.** PostgreSQL là nguồn dữ liệu nghiệp vụ; local dùng container PostgreSQL. Production dự kiến Supabase managed PostgreSQL/Auth/Storage, nhưng API kết nối bằng DB role tối thiểu và client không ghi bảng nghiệp vụ qua Data API. Prisma migration là luồng schema duy nhất; grants/RLS mở ra Data API phải đi cùng migration và allow/deny tests.

Web dự kiến static hosting; API/worker chạy container riêng; DB/storage managed. Nhà cung cấp, vùng dữ liệu, backup, budget, retention và SLA chưa được chọn. Dev/staging/production phải tách hoàn toàn.

## Giả định và giới hạn

- Một đơn vị ABA vận hành nhiều trường; student có thể có nhiều guardian đã xác minh; guardian có nhiều con.
- MVP online-first, chỉ draft/resume có hỗ trợ cục bộ hạn chế; không submit/scoring offline.
- Không có câu hỏi production, PII thật, hạ tầng, domain, signing certificate hoặc tài khoản store trong repository.
- Demo không phải pilot; pilot chỉ bắt đầu sau duyệt nội dung/đo lường, privacy/legal review, security/a11y/load/restore checks và release gate.