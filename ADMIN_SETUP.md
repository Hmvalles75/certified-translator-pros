# Admin Dashboard Setup Guide

## ✅ Completed Setup

You've successfully run the admin schema! Here's what's been created:

### Database Tables
- ✅ `profiles` - Role-based access control
- ✅ `translators` - Extended with admin fields
- ✅ `cities` - Location management
- ✅ `leads` - Translator inquiry tracking

### Admin Pages Built
- ✅ `/admin` - Dashboard overview with stats
- ✅ `/admin/orders` - Orders list with filters
- ✅ `/admin/orders/[id]` - Order detail with assignment
- ✅ `/admin/translators` - Translators list
- ✅ `/admin/translators/[id]` - Translator detail and edit
- ✅ `/admin/leads` - Leads management
- ✅ `/admin/leads/[id]` - Lead detail
- ✅ `/admin/cities` - Cities management
- ✅ `/admin/cities/[id]` - City edit

## 🔐 Create Your Admin Account

### Step 1: Sign up a user
1. Start your dev server: `npm run dev`
2. Go to: http://localhost:3000/login
3. Sign up with email and password

### Step 2: Make yourself admin
In Supabase SQL Editor, run:

```sql
-- Replace with your email
UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users
  WHERE email = 'your-email@example.com'
);
```

### Step 3: Verify
```sql
-- Check your admin status
SELECT u.email, p.role, p.created_at
FROM auth.users u
JOIN profiles p ON u.id = p.id;
```

You should see your user with `role = 'admin'`.

## 🚀 Access the Dashboard

1. Make sure you're logged in at http://localhost:3000/login
2. Navigate to: http://localhost:3000/admin
3. You should see the admin dashboard!

## 📋 Admin Features

### Orders Management
- View all orders with status filters
- Assign translators to orders
- Update order status (in progress → completed)
- View order details and uploaded files

### Translators Management
- View all translators
- Filter by city and public/private status
- Edit translator pricing and settings
- Toggle public profile visibility

### Leads Management
- View translator inquiries
- Mark leads as handled/pending
- View lead details and messages

### Cities Management
- Add new cities
- Edit city information
- View translators per city
- Delete cities

## 🧪 Test Data (Optional)

Want to test the admin dashboard with sample data? Run these in Supabase SQL Editor:

```sql
-- Add a sample translator
INSERT INTO translators (user_id, name, email, languages, specializations, city, state, country, is_active, is_public)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Maria Garcia',
  'maria@example.com',
  ARRAY['English', 'Spanish'],
  ARRAY['legal_document', 'medical_document'],
  'Los Angeles',
  'CA',
  'USA',
  true,
  true
);

-- Add a sample city
INSERT INTO cities (name, slug, state, country, translator_count)
VALUES ('Los Angeles', 'los-angeles', 'CA', 'USA', 1);

-- Add a sample lead
INSERT INTO leads (name, email, phone, message, city)
VALUES (
  'John Doe',
  'john@example.com',
  '555-0123',
  'I need a certified translator for my birth certificate.',
  'Los Angeles'
);
```

## 🔒 Security Features

- All admin routes protected with `requireAdmin()`
- Non-admin users redirected to homepage
- RLS policies on all tables
- Server-side authentication checks

## 🐛 Troubleshooting

**Can't access /admin?**
- Make sure you're logged in
- Verify your user has `role = 'admin'` in profiles table
- Check browser console for errors

**Getting redirected?**
- Clear cookies and log in again
- Verify Supabase environment variables in `.env.local`

**Database errors?**
- Make sure you ran both `schema.sql` AND `admin-schema.sql`
- Check Supabase logs for RLS policy issues

## 📚 Next Steps

1. Create your admin account (see above)
2. Test the dashboard features
3. Add some sample data
4. Start managing orders and translators!

Need help? Check the code in:
- `app/admin/*` - All admin pages
- `lib/auth/admin.ts` - Admin authentication
- `components/admin/AdminNav.tsx` - Admin navigation
