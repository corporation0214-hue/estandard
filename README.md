# estandard.mn — ISO Нэгдсэн Удирдлагын Тогтолцооны Платформ

AI эрин, цахим үйлчилгээний хурдацтай хөгжлийн үед байгууллага бүрийн тогтвортой хөгжлийн суурь болох **нэгдсэн удирдлагын тогтолцоо (IMS)**-г нэвтрүүлэхэд дэмжлэг үзүүлэх web app.

**Хамрах стандартууд:** ISO 9001:2015 (Чанар), ISO 14001:2015 (Байгаль орчин), ISO 45001:2018 (ХАБЭА), ISO 27001:2022 (Мэдээллийн аюулгүй байдал), ISO 31000:2018 (Эрсдэл), ISO 19011:2018 (Аудит)

## Технологи
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4**
- **Supabase** (Postgres, Auth, Storage, Realtime)
- **Vercel** (hosting)
- **GitHub** (version control)

## Ажиллуулах

```bash
npm install
cp .env.example .env.local  # Supabase URL/keys бөглөх
npm run dev  # http://localhost:3000
```

## Supabase тохиргоо
1. https://supabase.com → New Project
2. SQL Editor → `supabase/schema.sql` агуулгыг ажиллуулах
3. Authentication → Email/Password идэвхжүүлэх
4. Storage → `documents` bucket үүсгэх (private)
5. `.env.local` бөглөх

## Vercel Deploy
```bash
vercel --prod
# эсвэл GitHub push → Vercel auto-deploy
```

## Бүтэц
- `/` — Landing (hero, стандартууд, IMS)
- `/standards` — Стандартын жагсаалт
- `/standards/[id]` — Бүлэг тус бүр, GAP үнэлгээ
- `/dashboard` — KPI, эрсдэл, аудит самбар
- `supabase/schema.sql` — Бүрэн DB schema
- `src/lib/supabase/*` — Supabase client/server

## Дараагийн алхмууд
- [ ] Supabase Auth (нэвтрэх, байгууллага үүсгэх)
- [ ] RLS policies + multi-tenant
- [ ] GAP үнэлгээ хадгалах/тайлан PDF
- [ ] Баримт бичиг upload (Storage)
- [ ] Эрсдэлийн матриц CRUD
- [ ] Дотоод аудит чеклист + CAPA

© 2026 estandard.mn
