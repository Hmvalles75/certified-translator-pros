-- Add translator assignment and completion fields to orders table

-- Add assigned_to column (references auth.users)
alter table public.orders
add column if not exists assigned_to uuid references auth.users(id);

-- Add completed_file_url for storing the uploaded translation
alter table public.orders
add column if not exists completed_file_url text;

-- Add completed_at timestamp
alter table public.orders
add column if not exists completed_at timestamptz;

-- Add index for efficient querying of assigned orders
create index if not exists orders_assigned_to_idx on public.orders(assigned_to);

-- Add index for status + assigned_to queries
create index if not exists orders_status_assigned_idx on public.orders(status, assigned_to);

-- Update RLS policies to allow authenticated users to read and update assigned orders
-- Policy: Authenticated users can read orders assigned to them
create policy "Authenticated users can read assigned orders"
  on public.orders
  for select
  to authenticated
  using (assigned_to = auth.uid());

-- Policy: Authenticated users can update orders assigned to them
create policy "Authenticated users can update assigned orders"
  on public.orders
  for update
  to authenticated
  using (assigned_to = auth.uid())
  with check (assigned_to = auth.uid());

-- Policy: Authenticated users can assign themselves to unassigned paid orders
create policy "Authenticated users can assign themselves"
  on public.orders
  for update
  to authenticated
  using (status = 'paid' and assigned_to is null)
  with check (assigned_to = auth.uid());
