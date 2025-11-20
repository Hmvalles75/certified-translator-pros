-- Create translators table
create table if not exists public.translators (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  languages jsonb not null default '[]'::jsonb, -- Array of language pairs like ["es → en", "fr → en"]
  rate_per_page decimal(10,2) not null default 0,
  can_rush boolean default false,
  can_notarize boolean default false,
  time_zone text default 'UTC',
  max_pages_per_day integer default 10,
  sample_certification text, -- file path to sample work
  certification_signature text, -- digital signature or path to signature file
  status text default 'pending' check (status in ('pending', 'active', 'inactive')),
  bio text,
  phone text,
  country text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.translators enable row level security;

-- Admins can do everything
create policy "Admins can manage all translators"
  on public.translators
  for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Translators can read and update their own profile
create policy "Translators can read own profile"
  on public.translators
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "Translators can update own profile"
  on public.translators
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Service role has full access
create policy "Service role can manage all translators"
  on public.translators
  for all
  to service_role
  using (true)
  with check (true);

-- Create index for faster lookups
create index translators_user_id_idx on public.translators(user_id);
create index translators_status_idx on public.translators(status);
create index translators_email_idx on public.translators(email);

-- Add updated_at trigger
create trigger handle_translators_updated_at before update on public.translators
  for each row execute procedure moddatetime (updated_at);
