# 🚀 Admin Dashboard - Quick Start Guide

## 📌 First Time Setup (Do This Once)

### 1. Make Sure Server is Running
```bash
npm run dev
```
Server should be at: http://localhost:3000

### 2. Create Your Admin Account

**a) Sign up:**
- Go to http://localhost:3000/login
- Enter email and password
- Click "Sign Up"

**b) Promote to admin (in Supabase SQL Editor):**
```sql
-- Replace with YOUR email
UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users
  WHERE email = 'your-email@example.com'
);
```

**c) Verify:**
```sql
-- Should show your user with role = 'admin'
SELECT u.email, p.role
FROM auth.users u
JOIN profiles p ON u.id = p.id;
```

### 3. Access Dashboard
- Go to http://localhost:3000/admin
- You should see the admin dashboard! 🎉

---

## 🎯 Common Admin Tasks

### Managing Orders

**View all orders:**
- Go to `/admin/orders`
- Filter by status if needed

**Assign a translator to an order:**
1. Click "View Details" on an order
2. Scroll to "Translator Assignment" section
3. Select translator from dropdown
4. Click "Assign Translator"
5. ✅ Status automatically updates to "assigned"

**Update order status:**
1. Go to order detail page
2. Scroll to "Order Status Actions"
3. Click "Mark as In Progress" (when assigned)
4. Later, click "Mark as Completed"

---

### Managing Translators

**View all translators:**
- Go to `/admin/translators`
- Filter by city or public/private

**Edit a translator:**
1. Click translator name
2. Scroll to "Edit Translator" section
3. Update pricing or toggle public/active status
4. Click "Save Changes"

**Make translator public (visible on website):**
1. Go to translator detail page
2. Check "Public Profile" checkbox
3. Click "Save Changes"

---

### Managing Leads

**View translator inquiries:**
- Go to `/admin/leads`
- Filter by pending/handled

**Handle a lead:**
1. Click lead to view details
2. Read the message and contact info
3. Contact the customer externally
4. Click "Mark as Handled"
5. ✅ Lead moves to handled list

---

### Managing Cities

**Add a new city:**
1. Go to `/admin/cities`
2. Use form on left side
3. Enter: City Name, State, Country
4. Click "Add City"
5. ✅ Slug auto-generated (e.g., "Los Angeles" → "los-angeles")

**Edit a city:**
1. Click "Edit" next to city
2. Update details
3. Click "Save Changes"

**Delete a city:**
1. Go to city edit page
2. Scroll to "Danger Zone"
3. Click "Delete City"
4. Confirm deletion

---

## 📊 Understanding the Dashboard Stats

**Total Orders (last 30 days):**
- Shows all orders created in the last month
- Helps track business growth

**Pending Assignment:**
- Orders with status = "paid" waiting for translator
- These need immediate attention

**Total Translators:**
- All translators in system
- Shows public count (visible on website)

**Total Leads:**
- Translator inquiry submissions
- Check `/admin/leads` to handle them

**Cities:**
- Number of cities in database
- Used for location-based translator search

---

## 🔍 Quick Filters

### Orders Page
- **All Orders** - Everything
- **Paid** - Needs assignment
- **Assigned** - Ready to start
- **In Progress** - Being worked on
- **Completed** - Finished

### Translators Page
- **By City** - Filter by location
- **All / Public / Private** - Visibility status

### Leads Page
- **All Leads** - Everything
- **Pending** - Need attention ⚠️
- **Handled** - Already contacted ✅

---

## 🎨 Navigation

**Top Nav Bar (on all admin pages):**
- **Dashboard** - Overview stats
- **Orders** - Manage orders
- **Translators** - Manage translators
- **Leads** - Handle inquiries
- **Cities** - Location management
- **View Site** - Go to public homepage
- **Logout** - Sign out

**Mobile:**
- Nav collapses to mobile menu
- All features still accessible

---

## 💡 Tips & Best Practices

### Order Management
- ✅ Assign orders to translators as soon as they're paid
- ✅ Update status regularly (assigned → in progress → completed)
- ✅ Check pending assignments daily

### Translator Management
- ✅ Keep translator profiles up to date
- ✅ Toggle "is_public" to control website visibility
- ✅ Set pricing for new translators
- ✅ Verify certifications before making public

### Lead Handling
- ✅ Respond to leads within 24 hours
- ✅ Mark as handled after contacting
- ✅ Check pending leads daily

### City Management
- ✅ Add cities before adding translators in that city
- ✅ Use proper capitalization (e.g., "Los Angeles" not "los angeles")
- ✅ Keep state abbreviations consistent (e.g., "CA" not "California")

---

## 🐛 Troubleshooting

**Can't access /admin?**
- Make sure you're logged in
- Check your role is "admin" in profiles table
- Clear browser cookies and try again

**Getting "Unauthorized" error?**
- Your user role might not be "admin"
- Run the SQL query again to update role
- Log out and log back in

**Changes not showing?**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Check browser console for errors
- Verify Supabase credentials in .env.local

**Orders not loading?**
- Check Supabase connection
- Verify schema.sql and admin-schema.sql were both run
- Check RLS policies in Supabase dashboard

---

## 📞 Need Help?

**Common Issues:**

1. **Can't see orders** → Check RLS policies allow admin access
2. **Can't assign translators** → Verify translator is `is_active = true`
3. **Cities not updating** → Check database trigger is created
4. **Leads not showing** → Verify admin-schema.sql was run

**Check Your Setup:**
```sql
-- Verify all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Should include: profiles, cities, leads, orders, translators, etc.
```

---

## 🎓 Advanced Usage

### Bulk Operations (via SQL)

**Make all translators in a city public:**
```sql
UPDATE translators
SET is_public = true
WHERE city = 'Los Angeles';
```

**Mark all old leads as handled:**
```sql
UPDATE leads
SET is_handled = true, handled_at = NOW()
WHERE created_at < NOW() - INTERVAL '30 days';
```

**Get order statistics:**
```sql
SELECT status, COUNT(*) as count
FROM orders
GROUP BY status
ORDER BY count DESC;
```

---

## ✅ Daily Admin Checklist

- [ ] Check pending orders (need assignment)
- [ ] Review new leads (mark as handled after contact)
- [ ] Update order statuses (move to next stage)
- [ ] Verify new translator profiles
- [ ] Respond to customer inquiries

---

## 🚀 You're All Set!

Your admin dashboard is fully functional. Navigate to:

**http://localhost:3000/admin**

And start managing your translation platform!

For detailed documentation, see: [ADMIN_DASHBOARD_COMPLETE.md](ADMIN_DASHBOARD_COMPLETE.md)
