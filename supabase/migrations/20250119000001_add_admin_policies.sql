-- Add policy for authenticated users with admin role to read all orders
create policy "Admins can read all orders"
  on public.orders
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Add policy for authenticated users with admin role to update orders
create policy "Admins can update all orders"
  on public.orders
  for update
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

-- Add policy for translators to read orders assigned to them
create policy "Translators can read assigned orders"
  on public.orders
  for select
  to authenticated
  using (
    assigned_to = auth.uid()
  );

-- Add policy for translators to update orders assigned to them
create policy "Translators can update assigned orders"
  on public.orders
  for update
  to authenticated
  using (
    assigned_to = auth.uid()
  )
  with check (
    assigned_to = auth.uid()
  );
