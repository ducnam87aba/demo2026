# ABA Skills 360

Nền tảng mới cho đánh giá và phát triển năng lực học sinh lớp 1–12. Repository hiện ở giai đoạn **W00/W01 foundation**. Mọi nội dung seed/UI hiện tại là dữ liệu minh họa, chưa phải bộ đo đã kiểm định.

## Yêu cầu

- Node.js 22.x (đã kiểm với 22.19.0)
- Corepack và pnpm 10.19.0
- Docker Desktop/Engine để chạy PostgreSQL local (chưa có trên máy bootstrap ban đầu)

## Khởi động local

```bash
corepack enable
pnpm install
cp .env.example .env
docker compose up -d postgres
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Web: `http://localhost:5173`; API: `http://localhost:3000/v1/health/live`; OpenAPI UI: `http://localhost:3000/docs`.

## Lệnh kiểm tra

`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm test:e2e`, `pnpm desktop:dev`, `pnpm desktop:dist`.

`test:e2e` hiện chỉ thông báo harness chưa được triển khai, không được tính là test pass. Desktop development cần chạy web trước rồi dùng `ABA_DESKTOP_DEV_URL=http://localhost:5173 pnpm desktop:dev`. Build Windows phải chạy trên Windows và build macOS phải chạy trên macOS; artifact chưa ký không phải production release.

Xem [quyết định](docs/DECISIONS.md), [trạng thái](docs/IMPLEMENTATION_STATUS.md) và [backlog](docs/BACKLOG.md).