-- estandard.mn — public site settings (marketing flash background)
-- Supabase SQL Editor-т ажиллуулна. Public (нэвтрээгүй зочин) уншина, admin бичнэ.

-- 1. Shared settings table
create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

-- MVP: RLS унтраалттай (бусад хүснэгттэй адил) — бүх зочин уншина, admin бичнэ
alter table site_settings disable row level security;

-- 2. Default flash background (анхны утга)
insert into site_settings (key, value) values
  ('flash_bg', 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=800&q=80&auto=format&fit=crop')
on conflict (key) do nothing;

-- 3. Public storage bucket for marketing uploads (admin файл upload)
insert into storage.buckets (id, name, public) values ('marketing', 'marketing', true)
on conflict (id) do nothing;

-- Storage policy: public read (bucket public тул нэмэлт policy шаардахгүй байх нь элбэг;
-- хэрэв RLS шаардавал доорхыг ажиллуулна)
-- create policy "public read marketing" on storage.objects for select using (bucket_id = 'marketing');
-- create policy "authenticated upload marketing" on storage.objects for insert with check (bucket_id = 'marketing');

-- 4. Баталгаажуулах
select * from site_settings;
