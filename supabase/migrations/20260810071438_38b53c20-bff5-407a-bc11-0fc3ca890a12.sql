-- ===========================================================================
-- SkillStack consolidated baseline schema
--
-- This single migration reproduces the complete production schema from an
-- empty Supabase project. Every statement is idempotent so it can be replayed
-- safely on an existing database.
--
-- Authorization model (authoritative):
--   * public.user_roles (+ public.app_role enum) is the ONLY source of truth
--     for roles. All RLS uses public.has_role() / public.is_admin(),
--     which are SECURITY DEFINER to avoid recursive policy evaluation.
--   * public.profiles.role is a display-only mirror. The
--     public.guard_profile_role() trigger reverts any client attempt to change
--     profiles.role or profiles.xp, so it can never grant privileges.
--   * Role changes go through public.set_admin(), which itself requires admin.
-- ===========================================================================

-- roles -------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace
                 where t.typname = 'app_role' and n.nspname = 'public') then
    create type public.app_role as enum ('admin','moderator','user');
  end if;
end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin');
$$;

drop policy if exists "own roles read" on public.user_roles;
create policy "own roles read" on public.user_roles for select to authenticated using (auth.uid() = user_id or public.is_admin());

revoke all on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- profiles ----------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  username text unique,
  bio text,
  avatar_url text,
  role text not null default 'student',
  xp int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select to authenticated using (auth.uid() = id or public.is_admin());
drop policy if exists "profiles self insert" on public.profiles;
create policy "profiles self insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles for update to authenticated using (auth.uid() = id or public.is_admin()) with check (auth.uid() = id or public.is_admin());

-- profiles.role is a read-only mirror of user_roles; block self-escalation.
create or replace function public.guard_profile_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role then
    new.role := old.role;
  end if;
  if new.xp is distinct from old.xp and not public.is_admin() then
    new.xp := old.xp;
  end if;
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function public.guard_profile_role() from public, anon, authenticated;
drop trigger if exists profiles_guard_role on public.profiles;
create trigger profiles_guard_role before update on public.profiles
for each row execute function public.guard_profile_role();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), new.raw_user_meta_data->>'username')
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'user') on conflict do nothing;
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.set_admin(_user_id uuid, _make_admin boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not authorized'; end if;
  if _make_admin then
    insert into public.user_roles (user_id, role) values (_user_id, 'admin') on conflict do nothing;
    update public.profiles set role = 'admin' where id = _user_id;
  else
    delete from public.user_roles where user_id = _user_id and role = 'admin';
    update public.profiles set role = 'student' where id = _user_id;
  end if;
end;
$$;
revoke all on function public.set_admin(uuid, boolean) from public, anon;
grant execute on function public.set_admin(uuid, boolean) to authenticated;

-- courses -----------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  duration text not null default '',
  difficulty text not null default 'Beginner',
  projects text not null default '',
  category text not null default 'Physical',
  status text not null default 'open',
  features text[] not null default '{}',
  curriculum jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
grant select on public.courses to anon;
grant select, insert, update, delete on public.courses to authenticated;
grant all on public.courses to service_role;
alter table public.courses enable row level security;
drop policy if exists "courses public read" on public.courses;
create policy "courses public read" on public.courses for select using (true);
drop policy if exists "courses admin write" on public.courses;
create policy "courses admin write" on public.courses for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'active',
  progress int not null default 0,
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, course_id)
);
grant select, insert, update, delete on public.enrollments to authenticated;
grant all on public.enrollments to service_role;
alter table public.enrollments enable row level security;
drop policy if exists "enrollments own" on public.enrollments;
create policy "enrollments own" on public.enrollments for all to authenticated using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  certificate_number text unique not null,
  issued_at timestamptz not null default now()
);
grant select on public.certificates to authenticated;
grant all on public.certificates to service_role;
alter table public.certificates enable row level security;
drop policy if exists "certificates own read" on public.certificates;
create policy "certificates own read" on public.certificates for select to authenticated using (auth.uid() = user_id or public.is_admin());
drop policy if exists "certificates admin write" on public.certificates;
create policy "certificates admin write" on public.certificates for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  program text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
drop policy if exists "contact anyone insert" on public.contact_messages;
create policy "contact anyone insert" on public.contact_messages for insert with check (true);
drop policy if exists "contact admin read" on public.contact_messages;
create policy "contact admin read" on public.contact_messages for select to authenticated using (public.is_admin());
drop policy if exists "contact admin write" on public.contact_messages;
create policy "contact admin write" on public.contact_messages for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "contact admin delete" on public.contact_messages;
create policy "contact admin delete" on public.contact_messages for delete to authenticated using (public.is_admin());

-- admissions --------------------------------------------------------
create table if not exists public.admissions_applications (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'admission' check (kind in ('admission','scholarship','inquiry')),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(email) between 5 and 255),
  phone text not null check (char_length(phone) between 6 and 30),
  city text,
  program text not null,
  mode text,
  scholarship_type text,
  topic text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','accepted','rejected','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists admissions_created_idx on public.admissions_applications (created_at desc);
create index if not exists admissions_dupe_idx on public.admissions_applications (lower(email), kind, program, created_at desc);
grant insert on public.admissions_applications to anon, authenticated;
grant select, update, delete on public.admissions_applications to authenticated;
grant all on public.admissions_applications to service_role;
alter table public.admissions_applications enable row level security;
drop policy if exists "admissions anyone insert" on public.admissions_applications;
create policy "admissions anyone insert" on public.admissions_applications for insert with check (true);
drop policy if exists "admissions admin read" on public.admissions_applications;
create policy "admissions admin read" on public.admissions_applications for select to authenticated using (public.is_admin());
drop policy if exists "admissions admin update" on public.admissions_applications;
create policy "admissions admin update" on public.admissions_applications for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admissions admin delete" on public.admissions_applications;
create policy "admissions admin delete" on public.admissions_applications for delete to authenticated using (public.is_admin());

create or replace function public.admissions_block_duplicates()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.email := lower(trim(new.email));
  if exists (
    select 1 from public.admissions_applications a
    where lower(a.email) = new.email
      and a.kind = new.kind
      and a.program = new.program
      and a.created_at > now() - interval '24 hours'
  ) then
    raise exception 'duplicate_application' using errcode = '23505';
  end if;
  return new;
end;
$$;
revoke all on function public.admissions_block_duplicates() from public, anon, authenticated;
drop trigger if exists admissions_dedupe on public.admissions_applications;
create trigger admissions_dedupe before insert on public.admissions_applications
for each row execute function public.admissions_block_duplicates();

-- notifications -----------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  message text not null default '',
  type text not null default 'info' check (type in ('info','success','warning','course')),
  read boolean not null default false,
  link text,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);
grant select, update, delete on public.notifications to authenticated;
grant all on public.notifications to service_role;
alter table public.notifications enable row level security;
drop policy if exists "notifications own read" on public.notifications;
create policy "notifications own read" on public.notifications for select to authenticated using (auth.uid() = user_id);
drop policy if exists "notifications own update" on public.notifications;
create policy "notifications own update" on public.notifications for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "notifications own delete" on public.notifications;
create policy "notifications own delete" on public.notifications for delete to authenticated using (auth.uid() = user_id);
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'notifications'
  ) then
    alter publication supabase_realtime add table public.notifications;
  end if;
end $$;

create or replace function public.notify_user(_user_id uuid, _title text, _message text, _type text default 'info', _link text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.notifications (user_id, title, message, type, link)
  values (_user_id, _title, coalesce(_message,''), coalesce(_type,'info'), _link);
end;
$$;
revoke all on function public.notify_user(uuid, text, text, text, text) from public, anon, authenticated;

-- real notification events
create or replace function public.notify_on_enrollment()
returns trigger language plpgsql security definer set search_path = public as $$
declare _title text;
begin
  select c.title into _title from public.courses c where c.id = new.course_id;
  perform public.notify_user(new.user_id, 'Enrolled in ' || coalesce(_title,'a course'),
    'Your enrollment is active. Open your dashboard to continue.', 'course', '/dashboard/courses');
  return new;
end;
$$;
revoke all on function public.notify_on_enrollment() from public, anon, authenticated;
drop trigger if exists enrollments_notify on public.enrollments;
create trigger enrollments_notify after insert on public.enrollments
for each row execute function public.notify_on_enrollment();

create or replace function public.notify_on_certificate()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.notify_user(new.user_id, 'Certificate issued',
    'Certificate ' || new.certificate_number || ' is available in your dashboard.', 'success', '/dashboard/certificates');
  return new;
end;
$$;
revoke all on function public.notify_on_certificate() from public, anon, authenticated;
drop trigger if exists certificates_notify on public.certificates;
create trigger certificates_notify after insert on public.certificates
for each row execute function public.notify_on_certificate();

-- content -----------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'General',
  cover_image text,
  author text not null default 'SkillStack',
  read_minutes int not null default 5,
  tags text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
grant select on public.articles to anon;
grant select, insert, update, delete on public.articles to authenticated;
grant all on public.articles to service_role;
alter table public.articles enable row level security;
drop policy if exists "articles anon read" on public.articles;
create policy "articles anon read" on public.articles for select to anon using (published = true);
drop policy if exists "articles auth read" on public.articles;
create policy "articles auth read" on public.articles for select to authenticated using (published = true or public.is_admin());
drop policy if exists "articles admin write" on public.articles;
create policy "articles admin write" on public.articles for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null default '',
  body text not null default '',
  image_url text,
  source_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
grant select on public.news_items to anon;
grant select, insert, update, delete on public.news_items to authenticated;
grant all on public.news_items to service_role;
alter table public.news_items enable row level security;
drop policy if exists "news public read" on public.news_items;
create policy "news public read" on public.news_items for select using (true);
drop policy if exists "news admin write" on public.news_items;
create policy "news admin write" on public.news_items for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  category text not null default 'Campus',
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.gallery_items to anon;
grant select, insert, update, delete on public.gallery_items to authenticated;
grant all on public.gallery_items to service_role;
alter table public.gallery_items enable row level security;
drop policy if exists "gallery public read" on public.gallery_items;
create policy "gallery public read" on public.gallery_items for select using (true);
drop policy if exists "gallery admin write" on public.gallery_items;
create policy "gallery admin write" on public.gallery_items for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.showcase_projects (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  title text not null,
  description text not null default '',
  image_url text,
  project_url text,
  course text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.showcase_projects to anon;
grant select, insert, update, delete on public.showcase_projects to authenticated;
grant all on public.showcase_projects to service_role;
alter table public.showcase_projects enable row level security;
drop policy if exists "showcase public read" on public.showcase_projects;
create policy "showcase public read" on public.showcase_projects for select using (true);
drop policy if exists "showcase admin write" on public.showcase_projects;
create policy "showcase admin write" on public.showcase_projects for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  avatar_url text,
  rating int not null default 5,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
drop policy if exists "testimonials public read" on public.testimonials;
create policy "testimonials public read" on public.testimonials for select using (true);
drop policy if exists "testimonials admin write" on public.testimonials;
create policy "testimonials admin write" on public.testimonials for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  location text not null default 'Online',
  starts_at timestamptz not null,
  ends_at timestamptz,
  image_url text,
  register_url text,
  created_at timestamptz not null default now()
);
grant select on public.events to anon;
grant select, insert, update, delete on public.events to authenticated;
grant all on public.events to service_role;
alter table public.events enable row level security;
drop policy if exists "events public read" on public.events;
create policy "events public read" on public.events for select using (true);
drop policy if exists "events admin write" on public.events;
create policy "events admin write" on public.events for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  file_url text not null,
  file_type text not null default 'PDF',
  size_label text,
  category text not null default 'Guides',
  downloads_count int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.downloads to anon;
grant select, insert, update, delete on public.downloads to authenticated;
grant all on public.downloads to service_role;
alter table public.downloads enable row level security;
drop policy if exists "downloads public read" on public.downloads;
create policy "downloads public read" on public.downloads for select using (true);
drop policy if exists "downloads admin write" on public.downloads;
create policy "downloads admin write" on public.downloads for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  youtube_id text unique not null,
  title text not null,
  description text not null default '',
  thumbnail_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
grant select on public.videos to anon;
grant select, insert, update, delete on public.videos to authenticated;
grant all on public.videos to service_role;
alter table public.videos enable row level security;
drop policy if exists "videos public read" on public.videos;
create policy "videos public read" on public.videos for select using (true);
drop policy if exists "videos admin write" on public.videos;
create policy "videos admin write" on public.videos for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null,
  entity_id text not null,
  kind text not null check (kind in ('like','bookmark')),
  created_at timestamptz not null default now(),
  unique (user_id, entity_type, entity_id, kind)
);
grant select, insert, delete on public.reactions to authenticated;
grant all on public.reactions to service_role;
alter table public.reactions enable row level security;
drop policy if exists "reactions own" on public.reactions;
create policy "reactions own" on public.reactions for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists articles_published_idx on public.articles (published_at desc);
create index if not exists news_published_idx on public.news_items (published_at desc);
create index if not exists events_starts_idx on public.events (starts_at);
create index if not exists reactions_entity_idx on public.reactions (entity_type, entity_id);

-- blog --------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'manual' check (source in ('manual','youtube','facebook','instagram')),
  external_id text,
  type text not null default 'article' check (type in ('article','video')),
  title text not null,
  slug text unique not null,
  excerpt text not null default '',
  body text not null default '',
  video_url text,
  permalink text,
  thumbnail_url text,
  tags text[] not null default '{}',
  author text not null default 'SkillStack',
  status text not null default 'published' check (status in ('draft','published')),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists blog_posts_source_external_idx on public.blog_posts (source, external_id) where external_id is not null;
create index if not exists blog_posts_published_idx on public.blog_posts (published_at desc);
grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant all on public.blog_posts to service_role;
alter table public.blog_posts enable row level security;
drop policy if exists "blog anon read" on public.blog_posts;
create policy "blog anon read" on public.blog_posts for select to anon using (status = 'published');
drop policy if exists "blog auth read" on public.blog_posts;
create policy "blog auth read" on public.blog_posts for select to authenticated using (status = 'published' or public.is_admin());
drop policy if exists "blog admin write" on public.blog_posts;
create policy "blog admin write" on public.blog_posts for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  parent_id uuid references public.blog_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null default 'Member',
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index if not exists blog_comments_post_idx on public.blog_comments (post_id, created_at);
grant select on public.blog_comments to anon;
grant select, insert, update, delete on public.blog_comments to authenticated;
grant all on public.blog_comments to service_role;
alter table public.blog_comments enable row level security;
drop policy if exists "blog comments read" on public.blog_comments;
create policy "blog comments read" on public.blog_comments for select using (true);
drop policy if exists "blog comments insert own" on public.blog_comments;
create policy "blog comments insert own" on public.blog_comments for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "blog comments update own" on public.blog_comments;
create policy "blog comments update own" on public.blog_comments for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "blog comments delete own" on public.blog_comments;
create policy "blog comments delete own" on public.blog_comments for delete to authenticated using (auth.uid() = user_id or public.is_admin());

create or replace function public.set_comment_author()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  select coalesce(nullif(p.full_name,''), p.username, 'Member') into new.author_name
  from public.profiles p where p.id = new.user_id;
  new.author_name := coalesce(new.author_name, 'Member');
  return new;
end;
$$;
revoke all on function public.set_comment_author() from public, anon, authenticated;
drop trigger if exists blog_comments_author on public.blog_comments;
create trigger blog_comments_author before insert on public.blog_comments
for each row execute function public.set_comment_author();

create table if not exists public.blog_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('like','dislike')),
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);
create index if not exists blog_reactions_post_idx on public.blog_reactions (post_id);
grant select on public.blog_reactions to anon;
grant select, insert, update, delete on public.blog_reactions to authenticated;
grant all on public.blog_reactions to service_role;
alter table public.blog_reactions enable row level security;
drop policy if exists "blog reactions read" on public.blog_reactions;
create policy "blog reactions read" on public.blog_reactions for select using (true);
drop policy if exists "blog reactions own write" on public.blog_reactions;
create policy "blog reactions own write" on public.blog_reactions for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- course videos -----------------------------------------------------
create table if not exists public.course_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null default 'General',
  course_slug text,
  video_path text not null,
  thumbnail_url text,
  duration text,
  is_published boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.course_videos to anon;
grant select, insert, update, delete on public.course_videos to authenticated;
grant all on public.course_videos to service_role;
alter table public.course_videos enable row level security;
drop policy if exists "course videos public read" on public.course_videos;
create policy "course videos public read" on public.course_videos for select using (is_published = true or public.is_admin());
drop policy if exists "course videos admin write" on public.course_videos;
create policy "course videos admin write" on public.course_videos for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "course videos storage read" on storage.objects;
create policy "course videos storage read" on storage.objects for select to authenticated
using (bucket_id = 'course-videos');
drop policy if exists "course videos storage insert" on storage.objects;
create policy "course videos storage insert" on storage.objects for insert to authenticated
with check (bucket_id = 'course-videos' and public.is_admin());
drop policy if exists "course videos storage delete" on storage.objects;
create policy "course videos storage delete" on storage.objects for delete to authenticated
using (bucket_id = 'course-videos' and public.is_admin());

-- avatars storage ---------------------------------------------------
drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read" on storage.objects for select
using (bucket_id = 'avatars');
drop policy if exists "avatars owner insert" on storage.objects;
create policy "avatars owner insert" on storage.objects for insert to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "avatars owner update" on storage.objects;
create policy "avatars owner update" on storage.objects for update to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "avatars owner delete" on storage.objects;
create policy "avatars owner delete" on storage.objects for delete to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------------------------------------------------------------------------
-- Remove legacy policies that authorized via profiles.role (superseded by
-- public.has_role/public.is_admin backed by public.user_roles).
-- ---------------------------------------------------------------------------
drop policy if exists "Published videos are viewable by everyone" on public.course_videos;
drop policy if exists "Admins can insert videos" on public.course_videos;
drop policy if exists "Admins can update videos" on public.course_videos;
drop policy if exists "Admins can delete videos" on public.course_videos;
drop policy if exists "Signed in users can read course videos" on storage.objects;
drop policy if exists "Admins can upload course videos" on storage.objects;
drop policy if exists "Admins can delete course videos" on storage.objects;
drop policy if exists "articles public read" on public.articles;