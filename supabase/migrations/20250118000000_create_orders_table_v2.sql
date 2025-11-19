-- Drop existing table and related objects if they exist
drop trigger if exists update_orders_updated_at on public.orders;
drop policy if exists "Service role can manage all orders" on public.orders;
drop policy if exists "Users can read their own orders" on public.orders;
drop table if exists public.orders;

-- Create orders table for certified translation orders
create table public.orders (
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

-- Add index on stripe_session_id for faster webhook lookups
create index orders_stripe_session_id_idx on public.orders(stripe_session_id);

-- Add index on customer_email for customer lookups
create index orders_customer_email_idx on public.orders(customer_email);

-- Add index on status for filtering
create index orders_status_idx on public.orders(status);

-- Enable Row Level Security
alter table public.orders enable row level security;

-- Policy: Service role can do everything
create policy "Service role can manage all orders"
  on public.orders
  for all
  to service_role
  using (true)
  with check (true);

-- Function to update updated_at timestamp (only create if it doesn't exist)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger update_orders_updated_at
  before update on public.orders
  for each row
  execute function public.update_updated_at_column();
