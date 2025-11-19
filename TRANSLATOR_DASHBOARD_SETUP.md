# Translator Dashboard - Setup Guide

Complete internal translator dashboard for managing certified translation orders.

## Overview

The translator dashboard allows authenticated translators (or admins) to:

1. View all unassigned paid orders
2. Assign orders to themselves
3. Upload completed translation PDFs
4. Mark orders as completed

All dashboard routes are protected and require authentication via Supabase email OTP.

## Setup Instructions

### 1. Run Database Migrations

Run these migrations in your Supabase SQL Editor (in order):

#### Migration 1: Add Translator Fields

```sql
-- File: supabase/migrations/20250118000001_add_translator_fields.sql

-- Add assigned_to column (references auth.users)
alter table public.orders
add column if not exists assigned_to uuid references auth.users(id);

-- Add completed_file_url for storing the uploaded translation
alter table public.orders
add column if not exists completed_file_url text;

-- Add completed_at timestamp
alter table public.orders
add column if not exists completed_at timestamptz;

-- Add indexes
create index if not exists orders_assigned_to_idx on public.orders(assigned_to);
create index if not exists orders_status_assigned_idx on public.orders(status, assigned_to);

-- RLS policies
create policy "Authenticated users can read assigned orders"
  on public.orders for select to authenticated
  using (assigned_to = auth.uid());

create policy "Authenticated users can update assigned orders"
  on public.orders for update to authenticated
  using (assigned_to = auth.uid())
  with check (assigned_to = auth.uid());

create policy "Authenticated users can assign themselves"
  on public.orders for update to authenticated
  using (status = 'paid' and assigned_to is null)
  with check (assigned_to = auth.uid());
```

#### Migration 2: Create Storage Bucket

```sql
-- File: supabase/migrations/20250118000002_create_storage_bucket.sql

insert into storage.buckets (id, name, public)
values ('completed-translations', 'completed-translations', false)
on conflict (id) do nothing;

-- Storage policies
create policy "Service role can manage files"
  on storage.objects for all to service_role
  using (bucket_id = 'completed-translations')
  with check (bucket_id = 'completed-translations');

create policy "Authenticated users can upload translations"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'completed-translations' and auth.role() = 'authenticated');

create policy "Authenticated users can read translations"
  on storage.objects for select to authenticated
  using (bucket_id = 'completed-translations');
```

### 2. Create Translator User

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Invite User" or "Add User"
3. Enter the translator's email address
4. They will receive an email invitation
5. Alternatively, they can sign up via the login page at `/auth/login`

### 3. Verify Environment Variables

Ensure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Routes

### Public Routes
- `/auth/login` - Email OTP login page

### Protected Routes (Authentication Required)
- `/dashboard` - Main dashboard showing unassigned orders
- `/dashboard/assigned` - Orders assigned to current user with upload functionality

## Features

### 1. Authentication (`/auth/login`)
- Email-based OTP (One-Time Password) login
- No passwords required
- Redirects to `/dashboard` after successful login
- Supports redirect after login (e.g., if user tried to access `/dashboard` before logging in)

### 2. Main Dashboard (`/dashboard`)

**Shows:**
- Stats cards: Available orders, My assignments
- Table of unassigned orders with:
  - Order ID (truncated)
  - Customer name and email
  - Source → Target languages
  - Page count
  - Turnaround (Rush or Standard)
  - Created date
  - "Assign to Me" button

**Features:**
- Clicking "Assign to Me" assigns the order to the current user
- Sets order status to `in_progress`
- Redirects to `/dashboard/assigned`
- Logout button
- Link to "My Assignments"

### 3. Assigned Orders Page (`/dashboard/assigned`)

**Shows:**
- All orders assigned to current user
- Filter: status = `in_progress` OR `completed`

**For Each Order:**
- Customer information
- Order details (pages, price, dates)
- Customer notes (if any)
- Upload section:
  - File input (PDF only)
  - Shows upload success with file preview link
  - "Mark as Completed" button (appears after file upload)

**Workflow:**
1. Translator views assigned order
2. Uploads completed PDF translation
3. File is stored in Supabase Storage (`completed-translations` bucket)
4. `completed_file_url` is saved to database
5. Translator clicks "Mark as Completed"
6. Order status → `completed`
7. `completed_at` timestamp is set

### 4. Middleware Protection

All routes under `/dashboard/*` are protected by middleware that:
- Checks for valid Supabase session
- Redirects to `/auth/login` if not authenticated
- Includes `redirectTo` parameter to return user after login

## API Routes

### POST `/api/orders/assign`
Assigns an unassigned order to the current user.

**Body:**
```json
{
  "orderId": "uuid"
}
```

**Returns:**
```json
{
  "success": true,
  "order": { /* updated order */ }
}
```

### POST `/api/orders/upload`
Uploads completed translation PDF to Supabase Storage.

**Body:** FormData
- `orderId`: string
- `file`: File (PDF only)

**Returns:**
```json
{
  "success": true,
  "fileUrl": "https://..."
}
```

### POST `/api/orders/complete`
Marks an order as completed.

**Body:**
```json
{
  "orderId": "uuid"
}
```

**Returns:**
```json
{
  "success": true,
  "order": { /* completed order */ }
}
```

## Security

### Row Level Security (RLS)
- Translators can only view/edit orders assigned to them
- Service role bypasses RLS for admin operations
- Unassigned orders visible to all authenticated users (for assignment)

### Storage Security
- Private bucket (not publicly accessible)
- Only authenticated users can upload/read
- Service role manages all storage operations

### Middleware
- All `/dashboard/*` routes require authentication
- Session validation on every request
- Auto-redirect to login with return URL

## Testing the Flow

1. **Login as Translator**
   - Go to `/auth/login`
   - Enter email address
   - Receive OTP code in email
   - Enter code to login
   - Redirected to `/dashboard`

2. **Assign an Order**
   - View unassigned orders in dashboard
   - Click "Assign to Me" on any order
   - Order status changes to `in_progress`
   - Redirected to `/dashboard/assigned`

3. **Upload Translation**
   - Select PDF file for the assigned order
   - File uploads to Supabase Storage
   - See success message with file link

4. **Complete Order**
   - Click "Mark as Completed"
   - Confirm action
   - Order status changes to `completed`
   - `completed_at` timestamp is set

## TODO / Future Enhancements

### Email Notifications
Currently, the complete API route logs to console. To add email notifications:

```typescript
// In app/api/orders/complete/route.ts
// After marking order as completed:

import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'orders@certifiedtranslatorpros.com',
  to: updatedOrder.customer_email,
  subject: 'Your Certified Translation is Ready',
  html: `
    <p>Dear ${updatedOrder.customer_name},</p>
    <p>Your certified translation is complete!</p>
    <p><a href="${updatedOrder.completed_file_url}">Download Translation</a></p>
  `
});
```

### Admin Dashboard Features
- View all translators and their workload
- Reassign orders
- View completion metrics
- Revenue tracking

### Customer Portal
- Allow customers to track order status
- Download completed translations
- View order history

## Files Created

### Authentication
- `middleware.ts` - Route protection
- `app/auth/login/page.tsx` - Login page with OTP

### Dashboard Pages
- `app/dashboard/page.tsx` - Main dashboard (unassigned orders)
- `app/dashboard/assigned/page.tsx` - Assigned orders with upload

### API Routes
- `app/api/orders/assign/route.ts` - Assign order to translator
- `app/api/orders/upload/route.ts` - Upload completed PDF
- `app/api/orders/complete/route.ts` - Mark order as completed

### Database
- `supabase/migrations/20250118000001_add_translator_fields.sql`
- `supabase/migrations/20250118000002_create_storage_bucket.sql`

## Support

For issues or questions:
- Check Supabase logs for database/auth errors
- Check browser console for client-side errors
- Check server logs for API errors
- Verify RLS policies are applied correctly
