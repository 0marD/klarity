-- ============================================================
-- Klarity — Migración inicial completa
-- Ejecutar en Supabase SQL Editor (o supabase db push)
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ─── Profiles ────────────────────────────────────────────────
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  role       text not null default 'viewer'
             check (role in ('admin', 'editor', 'viewer')),
  full_name  text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'viewer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ─── Projects ────────────────────────────────────────────────
create table if not exists projects (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  title_es       text not null,
  title_en       text not null,
  description_es text,
  description_en text,
  cover_url      text,
  tags           text[],
  technologies   text[],
  metrics        jsonb,   -- [{ label, before, after }]
  is_featured    boolean default false,
  is_published   boolean default false,
  order_index    int default 0,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

create index if not exists projects_slug_idx       on projects(slug);
create index if not exists projects_published_idx  on projects(is_published);
create index if not exists projects_featured_idx   on projects(is_featured);
create index if not exists projects_order_idx      on projects(order_index);

-- ─── Services ────────────────────────────────────────────────
create table if not exists services (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  title_es       text not null,
  title_en       text not null,
  description_es text,
  description_en text,
  features_es    text[],
  features_en    text[],
  icon           text,
  base_price     numeric(10,2),
  is_active      boolean default true,
  order_index    int default 0
);

create index if not exists services_active_idx on services(is_active);
create index if not exists services_order_idx  on services(order_index);

-- ─── Testimonials ─────────────────────────────────────────────
create table if not exists testimonials (
  id          uuid primary key default gen_random_uuid(),
  author      text not null,
  role        text not null,
  company     text not null,
  avatar_url  text,
  content_es  text not null,
  content_en  text,
  rating      int not null default 5 check (rating between 1 and 5),
  is_active   boolean default true,
  order_index int default 0,
  created_at  timestamptz default now()
);

create index if not exists testimonials_active_idx on testimonials(is_active);
create index if not exists testimonials_order_idx  on testimonials(order_index);

-- ─── Quotes ──────────────────────────────────────────────────
create table if not exists quotes (
  id              uuid primary key default gen_random_uuid(),
  client_name     text not null,
  client_email    text not null,
  client_company  text,
  client_phone    text,
  project_type    text not null,
  modules         text[],
  deadline        text,
  budget_range    text,
  estimated_price numeric(10,2),
  locale          text default 'es',
  status          text not null default 'new'
                  check (status in ('new','reviewing','proposal_sent','closed_won','closed_lost')),
  notes           text,
  crm_lead_id     text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index if not exists quotes_status_idx       on quotes(status);
create index if not exists quotes_created_at_idx   on quotes(created_at desc);
create index if not exists quotes_client_email_idx on quotes(client_email);
create index if not exists quotes_locale_idx       on quotes(locale);

-- ─── FAQs ────────────────────────────────────────────────────
create table if not exists faqs (
  id          uuid primary key default gen_random_uuid(),
  question_es text not null,
  question_en text not null,
  answer_es   text not null,
  answer_en   text not null,
  category    text,
  is_active   boolean default true
);

-- ─── Analytics events ────────────────────────────────────────
create table if not exists analytics_events (
  id         uuid primary key default gen_random_uuid(),
  event_type text not null,
  payload    jsonb,
  session_id text,
  locale     text,
  created_at timestamptz default now()
);

create index if not exists analytics_events_type_idx on analytics_events(event_type);
create index if not exists analytics_events_ts_idx   on analytics_events(created_at desc);

-- ─── Site config ─────────────────────────────────────────────
create table if not exists site_config (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

-- Default feature flags
insert into site_config (key, value) values (
  'feature_flags',
  '{"chatbot": false, "email_notifications": false, "crm_integration": false, "whatsapp_button": true}'::jsonb
) on conflict (key) do nothing;

-- ─── Row Level Security ──────────────────────────────────────
alter table profiles          enable row level security;
alter table projects          enable row level security;
alter table services          enable row level security;
alter table testimonials      enable row level security;
alter table quotes            enable row level security;
alter table faqs              enable row level security;
alter table analytics_events  enable row level security;
alter table site_config       enable row level security;

-- Profiles: users can only read/update their own
create policy "users_read_own_profile"   on profiles for select using (auth.uid() = id);
create policy "users_update_own_profile" on profiles for update using (auth.uid() = id);
create policy "admin_all_profiles"       on profiles for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Projects: public can read published, admin/editor can manage
create policy "public_read_published_projects" on projects
  for select using (is_published = true);
create policy "staff_manage_projects" on projects for all
  using (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')));

-- Services: public can read active, admin/editor can manage
create policy "public_read_active_services" on services
  for select using (is_active = true);
create policy "staff_manage_services" on services for all
  using (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')));

-- Testimonials: public can read active, admin/editor can manage
create policy "public_read_active_testimonials" on testimonials
  for select using (is_active = true);
create policy "staff_manage_testimonials" on testimonials for all
  using (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')));

-- Quotes: anyone can insert, staff can read/update
create policy "public_insert_quote"  on quotes for insert with check (true);
create policy "staff_read_quotes"    on quotes for select
  using (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor', 'viewer')));
create policy "staff_update_quotes"  on quotes for update
  using (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')));

-- FAQs: public read active, admin manages
create policy "public_read_faqs" on faqs for select using (is_active = true);
create policy "admin_manage_faqs" on faqs for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Analytics: anyone inserts, admin reads
create policy "public_insert_analytics" on analytics_events for insert with check (true);
create policy "admin_read_analytics"    on analytics_events for select
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Site config: public read, admin writes
create policy "public_read_site_config" on site_config for select using (true);
create policy "admin_write_site_config" on site_config for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
