-- Create profiles table for user roles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text default 'user' check (role in ('user', 'translator', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policy: Users can read their own profile
create policy "Users can read own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Policy: Service role can manage all profiles
create policy "Service role can manage all profiles"
  on public.profiles
  for all
  to service_role
  using (true)
  with check (true);

-- Function to create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile on user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create index on role for filtering
create index if not exists profiles_role_idx on public.profiles(role);
