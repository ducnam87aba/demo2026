# Local development runbook

1. Dùng Node 22.x, bật Corepack và chạy `corepack prepare pnpm@10.19.0 --activate` nếu `pnpm` chưa có.
2. Copy `.env.example` thành `.env`; chỉ điền sandbox credentials, không production secrets.
3. Chạy `docker compose up -d postgres`, sau đó `pnpm db:migrate && pnpm db:seed`.
4. `pnpm dev` chạy web/API/worker. Không chạy desktop trong Turbo dev; dùng terminal riêng với `ABA_DESKTOP_DEV_URL=http://localhost:5173 pnpm desktop:dev`.
5. Trước PR chạy `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.

Khôi phục local: dừng app, `docker compose down -v`, khởi động DB và chạy lại migration/seed. Không dùng quy trình phá hủy này ở staging/production.