# AI Knowledge Base - Lab 6

Đồ án AI Knowledge Base sử dụng Next.js 15, RAG với pgvector và Gemini API.

## Cài đặt

`ash
npm install
`

## Cấu hình

Tạo file .env.local:

`env
DATABASE_URL="your-postgres-connection-string"
GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"
RATE_LIMIT_SECRET="any-random-string"
`

## Khởi tạo Database

`ash
npm run db:init
npm run db:seed
npm run db:embed
`

## Chạy Development Server

`ash
npm run dev
`

Mở [http://localhost:3000](http://localhost:3000)

## Công nghệ sử dụng

- Next.js 15 (App Router)
- PostgreSQL + pgvector
- Google Gemini API
- Vercel AI SDK
- Tailwind CSS