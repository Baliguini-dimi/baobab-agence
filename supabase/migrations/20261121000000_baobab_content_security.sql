-- Prepared for later Supabase activation. This migration has not been applied.
-- All content is bilingual at the column level and public only when published.

create table if not exists public.baobab_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.baobab_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.jwt() ->> 'aal') = 'aal2'
    and exists (
      select 1
      from public.baobab_admins as admins
      where admins.user_id = (select auth.uid())
    );
$$;

revoke all on function public.baobab_is_admin() from public, anon;
grant execute on function public.baobab_is_admin() to authenticated;

create table if not exists public.content_projects (
  id uuid primary key default gen_random_uuid(),
  slug_fr text not null unique,
  slug_en text not null unique,
  title_fr text not null,
  title_en text not null,
  summary_fr text not null,
  summary_en text not null,
  context_fr text not null,
  context_en text not null,
  solution_fr text not null,
  solution_en text not null,
  technique_fr text not null,
  technique_en text not null,
  result_fr text not null,
  result_en text not null,
  classification text not null check (classification in ('client', 'demo', 'academique')),
  written_consent boolean not null default false,
  anonymized boolean not null default false,
  client_name text,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint client_disclosure_check check (
    classification <> 'client'
    or written_consent
    or (anonymized and client_name is null)
  ),
  constraint non_client_name_check check (classification = 'client' or client_name is null),
  constraint project_publish_date_check check (not is_published or published_at is not null)
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug_fr text not null unique,
  slug_en text not null unique,
  title_fr text not null,
  title_en text not null,
  excerpt_fr text not null,
  excerpt_en text not null,
  body_fr text not null,
  body_en text not null,
  author_name_fr text,
  author_name_en text,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint post_publish_date_check check (not is_published or published_at is not null)
);

create table if not exists public.service_offers (
  id uuid primary key default gen_random_uuid(),
  slug_fr text not null unique,
  slug_en text not null unique,
  category text not null check (category in ('digitalSolutions', 'aiAutomation', 'onlinePresence', 'mediaCoverage')),
  title_fr text not null,
  title_en text not null,
  summary_fr text not null,
  summary_en text not null,
  description_fr text not null,
  description_en text not null,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.offer_prices (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.service_offers (id) on delete cascade,
  amount_xof integer not null check (amount_xof > 0),
  cadence text not null check (cadence in ('project', 'month')),
  starting_at boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote_fr text not null,
  quote_en text not null,
  attribution_fr text,
  attribution_en text,
  role_fr text,
  role_en text,
  organization_fr text,
  organization_en text,
  written_consent boolean not null default false,
  anonymized boolean not null default false,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint testimonial_consent_check check (not is_published or written_consent),
  constraint testimonial_anonymization_check check (
    not anonymized or (
      attribution_fr is null and attribution_en is null
      and role_fr is null and role_en is null
      and organization_fr is null and organization_en is null
    )
  ),
  constraint testimonial_publish_date_check check (not is_published or published_at is not null)
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name_fr text not null,
  name_en text not null,
  role_fr text not null,
  role_en text not null,
  biography_fr text,
  biography_en text,
  public_profile_approved boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_profile_approval_check check (not is_published or public_profile_approved)
);

-- Future tables created by this migration owner do not inherit broad API grants.
alter default privileges in schema public revoke all on tables from anon, authenticated;

alter table public.baobab_admins enable row level security;
alter table public.content_projects enable row level security;
alter table public.blog_posts enable row level security;
alter table public.service_offers enable row level security;
alter table public.offer_prices enable row level security;
alter table public.testimonials enable row level security;
alter table public.team_members enable row level security;

revoke all on table public.baobab_admins, public.content_projects, public.blog_posts,
  public.service_offers, public.offer_prices, public.testimonials, public.team_members
  from anon, authenticated;
grant select on table public.content_projects, public.blog_posts, public.service_offers,
  public.offer_prices, public.testimonials, public.team_members to anon, authenticated;
grant insert, update, delete on table public.content_projects, public.blog_posts,
  public.service_offers, public.offer_prices, public.testimonials, public.team_members
  to authenticated;
grant select on table public.baobab_admins to authenticated;

create policy "admins may read own admin record"
  on public.baobab_admins for select to authenticated
  using (user_id = (select auth.uid()) and (select auth.jwt() ->> 'aal') = 'aal2');

create policy "published projects are readable"
  on public.content_projects for select to anon, authenticated using (is_published);
create policy "admins manage projects"
  on public.content_projects for all to authenticated
  using ((select public.baobab_is_admin())) with check ((select public.baobab_is_admin()));

create policy "published posts are readable"
  on public.blog_posts for select to anon, authenticated using (is_published);
create policy "admins manage posts"
  on public.blog_posts for all to authenticated
  using ((select public.baobab_is_admin())) with check ((select public.baobab_is_admin()));

create policy "published offers are readable"
  on public.service_offers for select to anon, authenticated using (is_published);
create policy "admins manage offers"
  on public.service_offers for all to authenticated
  using ((select public.baobab_is_admin())) with check ((select public.baobab_is_admin()));

create policy "prices for published offers are readable"
  on public.offer_prices for select to anon, authenticated
  using (exists (
    select 1 from public.service_offers as offers
    where offers.id = offer_prices.offer_id and offers.is_published
  ));
create policy "admins manage offer prices"
  on public.offer_prices for all to authenticated
  using ((select public.baobab_is_admin())) with check ((select public.baobab_is_admin()));

create policy "consented published testimonials are readable"
  on public.testimonials for select to anon, authenticated
  using (is_published and written_consent);
create policy "admins manage testimonials"
  on public.testimonials for all to authenticated
  using ((select public.baobab_is_admin())) with check ((select public.baobab_is_admin()));

create policy "approved published team profiles are readable"
  on public.team_members for select to anon, authenticated
  using (is_published and public_profile_approved);
create policy "admins manage team profiles"
  on public.team_members for all to authenticated
  using ((select public.baobab_is_admin())) with check ((select public.baobab_is_admin()));

-- Private bucket; public reads are limited to files attached to published records.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'baobab-published-media', 'baobab-published-media', false, 5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  name = excluded.name,
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "published content media is readable"
  on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'baobab-published-media'
    and (
      ((storage.foldername(name))[1] = 'projects' and exists (
        select 1 from public.content_projects as projects
        where projects.id::text = (storage.foldername(name))[2] and projects.is_published
      ))
      or ((storage.foldername(name))[1] = 'posts' and exists (
        select 1 from public.blog_posts as posts
        where posts.id::text = (storage.foldername(name))[2] and posts.is_published
      ))
      or ((storage.foldername(name))[1] = 'team' and exists (
        select 1 from public.team_members as members
        where members.id::text = (storage.foldername(name))[2]
          and members.is_published and members.public_profile_approved
      ))
    )
  );
create policy "aal2 admins upload content media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'baobab-published-media' and (select public.baobab_is_admin()));
create policy "aal2 admins update content media"
  on storage.objects for update to authenticated
  using (bucket_id = 'baobab-published-media' and (select public.baobab_is_admin()))
  with check (bucket_id = 'baobab-published-media' and (select public.baobab_is_admin()));
create policy "aal2 admins delete content media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'baobab-published-media' and (select public.baobab_is_admin()));

-- Supabase manages storage schema and enables RLS on storage.objects; fail closed if not.
do $$
begin
  if exists (
    select 1
    from pg_class
    where oid = any(array[
      'public.baobab_admins'::regclass,
      'public.content_projects'::regclass,
      'public.blog_posts'::regclass,
      'public.service_offers'::regclass,
      'public.offer_prices'::regclass,
      'public.testimonials'::regclass,
      'public.team_members'::regclass,
      'storage.objects'::regclass
    ])
    and not relrowsecurity
  ) then
    raise exception 'RLS is required on every Baobab application and storage object table';
  end if;
  if not exists (
    select 1 from pg_class
    where oid = 'storage.objects'::regclass and relrowsecurity
  ) then
    raise exception 'RLS must be enabled on storage.objects before applying this migration';
  end if;
end;
$$;
