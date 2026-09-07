-- estandard.mn — Supabase schema (Postgres)
-- Run in Supabase SQL Editor

-- Extensions
create extension if not exists "uuid-ossp";

-- Organizations (multi-tenant)
create table if not exists organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  domain text,
  created_at timestamptz default now()
);

-- Profiles (linked to auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  org_id uuid references organizations(id),
  full_name text,
  role text default 'member', -- admin, auditor, member
  created_at timestamptz default now()
);

-- Standards (seed)
create table if not exists standards (
  id text primary key, -- iso9001, iso14001...
  code text not null,
  name_mn text not null,
  name_en text not null
);

-- Clauses (Annex SL)
create table if not exists clauses (
  id uuid primary key default uuid_generate_v4(),
  standard_id text references standards(id) on delete cascade,
  clause_no text not null, -- e.g., "4", "5.1"
  title_mn text not null,
  title_en text,
  sort_order int not null
);

-- GAP assessments
create table if not exists gap_assessments (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  standard_id text references standards(id),
  created_by uuid references profiles(id),
  status text default 'draft', -- draft, completed
  created_at timestamptz default now()
);

create table if not exists gap_scores (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references gap_assessments(id) on delete cascade,
  clause_id uuid references clauses(id) on delete cascade,
  score int check (score between 0 and 5),
  evidence text,
  created_at timestamptz default now(),
  unique(assessment_id, clause_id)
);

-- Documents
create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  title text not null,
  category text, -- policy, procedure, form, record
  standard_id text references standards(id),
  version text default '1.0',
  status text default 'draft', -- draft, review, approved, obsolete
  file_url text,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Risks (ISO 31000 + 9001 6.1, 45001 6.1, 27001)
create table if not exists risks (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  title text not null,
  description text,
  category text, -- quality, environmental, safety, information, strategic
  likelihood int check (likelihood between 1 and 5),
  impact int check (impact between 1 and 5),
  level text generated always as (
    case when likelihood*impact >= 15 then 'high'
         when likelihood*impact >= 8 then 'medium'
         else 'low' end
  ) stored,
  owner uuid references profiles(id),
  mitigation text,
  status text default 'open',
  created_at timestamptz default now()
);

-- Audits
create table if not exists audits (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  title text not null,
  standard_id text references standards(id),
  planned_date date,
  status text default 'planned', -- planned, in_progress, completed
  lead_auditor uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists audit_findings (
  id uuid primary key default uuid_generate_v4(),
  audit_id uuid references audits(id) on delete cascade,
  clause_id uuid references clauses(id),
  type text, -- nc_major, nc_minor, observation, positive
  description text not null,
  created_at timestamptz default now()
);

-- CAPA
create table if not exists capa_tasks (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  finding_id uuid references audit_findings(id) on delete set null,
  title text not null,
  root_cause text,
  action text,
  assignee uuid references profiles(id),
  due_date date,
  status text default 'open', -- open, in_progress, verified, closed
  created_at timestamptz default now()
);

-- Seed standards
insert into standards (id, code, name_mn, name_en) values
  ('iso9001','ISO 9001:2015','Чанарын Удирдлага','Quality Management'),
  ('iso14001','ISO 14001:2015','Байгаль Орчны Удирдлага','Environmental Management'),
  ('iso45001','ISO 45001:2018','Хөдөлмөрийн Аюулгүй Байдал','Occupational Health & Safety'),
  ('iso27001','ISO 27001:2022','Мэдээллийн Аюулгүй Байдал','Information Security'),
  ('iso31000','ISO 31000:2018','Эрсдэлийн Удирдлага','Risk Management'),
  ('iso19011','ISO 19011:2018','Аудитын Удирдамж','Auditing Guidelines')
on conflict (id) do nothing;

-- RLS enable (example: enable and add policies after auth setup)
-- alter table organizations enable row level security;
-- create policy "org members can read" on organizations for select using (true);

-- Storage bucket for documents
-- insert into storage.buckets (id, name, public) values ('documents','documents', false) on conflict (id) do nothing;
