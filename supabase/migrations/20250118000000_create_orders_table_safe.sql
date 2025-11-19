-- Safe migration: Only adds missing columns and objects without dropping existing ones

-- Create orders table only if it doesn't exist
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text,
  customer_name text,
  customer_email text not null,
  source_language text not null,
  target_language text not null,
  document_type text,
  page_count integer not null,
  turnaround text default 'standard',
  price_cents integer not null,
  status text default 'pending',
  download_url text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add missing columns if they don't exist (these will error silently if columns exist)
do $$
begin
  -- Add stripe_session_id if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'stripe_session_id') then
    alter table public.orders add column stripe_session_id text;
  end if;

  -- Add customer_name if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'customer_name') then
    alter table public.orders add column customer_name text;
  end if;

  -- Add customer_email if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'customer_email') then
    alter table public.orders add column customer_email text not null;
  end if;

  -- Add source_language if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'source_language') then
    alter table public.orders add column source_language text not null default 'Unknown';
  end if;

  -- Add target_language if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'target_language') then
    alter table public.orders add column target_language text not null default 'English';
  end if;

  -- Add document_type if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'document_type') then
    alter table public.orders add column document_type text;
  end if;

  -- Add page_count if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'page_count') then
    alter table public.orders add column page_count integer not null default 1;
  end if;

  -- Add turnaround if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'turnaround') then
    alter table public.orders add column turnaround text default 'standard';
  end if;

  -- Add price_cents if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'price_cents') then
    alter table public.orders add column price_cents integer not null default 0;
  end if;

  -- Add notes if missing
  if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'notes') then
    alter table public.orders add column notes text;
  end if;
end $$;

-- Create indexes if they don't exist
create index if not exists orders_stripe_session_id_idx on public.orders(stripe_session_id);
create index if not exists orders_customer_email_idx on public.orders(customer_email);
create index if not exists orders_status_idx on public.orders(status);

-- Enable Row Level Security
alter table public.orders enable row level security;

-- Drop and recreate the service role policy
drop policy if exists "Service role can manage all orders" on public.orders;
create policy "Service role can manage all orders"
  on public.orders
  for all
  to service_role
  using (true)
  with check (true);

-- Ensure the update function exists
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Drop and recreate the trigger
drop trigger if exists update_orders_updated_at on public.orders;
create trigger update_orders_updated_at
  before update on public.orders
  for each row
  execute function public.update_updated_at_column();
