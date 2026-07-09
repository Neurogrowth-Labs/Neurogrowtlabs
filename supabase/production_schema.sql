-- Neurogrowth Labs production Supabase schema
-- Paste into Supabase SQL Editor after enabling Authentication > Providers > Email.
-- This script is idempotent and configures profiles, role-based admin access,
-- public form capture tables, webinar management, RLS, triggers, indexes, and seed data.

create extension if not exists pgcrypto;
create extension if not exists citext;

do $$
begin
  create type public.app_role as enum ('user', 'admin', 'super_admin');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.submission_status as enum ('unread', 'read', 'archived');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.partner_status as enum ('new', 'reviewing', 'approved', 'rejected', 'archived');
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext unique not null,
  full_name text,
  avatar_url text,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_not_blank check (length(trim(email::text)) > 0)
);

create table if not exists public.webinars (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Neurogrowth Labs Webinar',
  date text not null,
  track text not null default 'Free Webinar',
  duration text not null default '1h 30m',
  focus text not null,
  team text not null,
  is_published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint webinars_focus_not_blank check (length(trim(focus)) > 0)
);

create table if not exists public.webinar_registrations (
  id uuid primary key default gen_random_uuid(),
  webinar_id uuid references public.webinars(id) on delete set null,
  name text not null,
  email citext not null,
  company text,
  role text,
  phone text,
  notes text,
  status public.submission_status not null default 'unread',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint webinar_registrations_email_not_blank check (length(trim(email::text)) > 0)
);

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact_name text not null,
  email citext not null,
  partnership_type text,
  message text,
  status public.partner_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint partner_applications_email_not_blank check (length(trim(email::text)) > 0)
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email citext not null,
  subject text,
  message text not null,
  status public.submission_status not null default 'unread',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contact_submissions_email_not_blank check (length(trim(email::text)) > 0)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  source text default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_email_not_blank check (length(trim(email::text)) > 0)
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'super_admin')
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    case when lower(new.email) = 'lusimadio12@gmail.com' then 'super_admin'::public.app_role else 'user'::public.app_role end
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    role = case when lower(excluded.email::text) = 'lusimadio12@gmail.com' then 'super_admin'::public.app_role else public.profiles.role end,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists webinars_set_updated_at on public.webinars;
create trigger webinars_set_updated_at before update on public.webinars for each row execute function public.set_updated_at();
drop trigger if exists webinar_registrations_set_updated_at on public.webinar_registrations;
create trigger webinar_registrations_set_updated_at before update on public.webinar_registrations for each row execute function public.set_updated_at();
drop trigger if exists partner_applications_set_updated_at on public.partner_applications;
create trigger partner_applications_set_updated_at before update on public.partner_applications for each row execute function public.set_updated_at();
drop trigger if exists contact_submissions_set_updated_at on public.contact_submissions;
create trigger contact_submissions_set_updated_at before update on public.contact_submissions for each row execute function public.set_updated_at();
drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.webinars enable row level security;
alter table public.webinar_registrations enable row level security;
alter table public.partner_applications enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.subscriptions enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles_update_own_non_role" on public.profiles;
create policy "profiles_update_own_non_role" on public.profiles for update using (id = auth.uid() or public.is_super_admin()) with check (id = auth.uid() or public.is_super_admin());

drop policy if exists "webinars_public_read_published" on public.webinars;
create policy "webinars_public_read_published" on public.webinars for select using (is_published = true or public.is_admin());
drop policy if exists "webinars_admin_write" on public.webinars;
create policy "webinars_admin_write" on public.webinars for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "webinar_registrations_public_insert" on public.webinar_registrations;
create policy "webinar_registrations_public_insert" on public.webinar_registrations for insert with check (true);
drop policy if exists "webinar_registrations_admin_manage" on public.webinar_registrations;
create policy "webinar_registrations_admin_manage" on public.webinar_registrations for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "partner_applications_public_insert" on public.partner_applications;
create policy "partner_applications_public_insert" on public.partner_applications for insert with check (true);
drop policy if exists "partner_applications_admin_manage" on public.partner_applications;
create policy "partner_applications_admin_manage" on public.partner_applications for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "contact_submissions_public_insert" on public.contact_submissions;
create policy "contact_submissions_public_insert" on public.contact_submissions for insert with check (true);
drop policy if exists "contact_submissions_admin_manage" on public.contact_submissions;
create policy "contact_submissions_admin_manage" on public.contact_submissions for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "subscriptions_public_insert" on public.subscriptions;
create policy "subscriptions_public_insert" on public.subscriptions for insert with check (true);
drop policy if exists "subscriptions_admin_manage" on public.subscriptions;
create policy "subscriptions_admin_manage" on public.subscriptions for all using (public.is_admin()) with check (public.is_admin());

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists webinars_published_created_idx on public.webinars(is_published, created_at desc);
create index if not exists webinar_registrations_created_idx on public.webinar_registrations(created_at desc);
create index if not exists partner_applications_status_created_idx on public.partner_applications(status, created_at desc);
create index if not exists contact_submissions_status_created_idx on public.contact_submissions(status, created_at desc);
create index if not exists subscriptions_created_idx on public.subscriptions(created_at desc);

insert into public.webinars (date, track, duration, focus, team, is_published)
values
  ('On demand', 'Free Webinar', '1h 30m', 'Fintech Infrastructure', '2 Speakers + 1 Moderator', true)
on conflict do nothing;
