-- Create storage bucket for completed translations
insert into storage.buckets (id, name, public)
values ('completed-translations', 'completed-translations', false)
on conflict (id) do nothing;

-- Policy: Service role can do everything
create policy "Service role can manage files"
  on storage.objects
  for all
  to service_role
  using (bucket_id = 'completed-translations')
  with check (bucket_id = 'completed-translations');

-- Policy: Authenticated users can upload to their assigned orders
create policy "Authenticated users can upload translations"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'completed-translations' and
    auth.role() = 'authenticated'
  );

-- Policy: Authenticated users can read files they uploaded
create policy "Authenticated users can read translations"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'completed-translations');
