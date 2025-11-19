# Delivery Workflow - Quick Setup Guide

## ✅ Step 1: Run the Database Migration

In your Supabase SQL Editor, run:

```sql
-- Copy and paste the contents of:
supabase/delivery-workflow-migration.sql
```

This adds:
- New columns to `orders` table (translated_file_url, delivered_at, etc.)
- Order status constraint validation
- Storage bucket for completed translations
- RLS policies for secure access
- Indexes for performance

---

## ✅ Step 2: Verify Storage Buckets

Check in Supabase Dashboard → Storage:

### Should have these buckets:
1. **order_files** (private) - Original customer uploads
2. **completed_translations** (private) - Final translations

If missing, create them:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('completed_translations', 'completed_translations', false)
ON CONFLICT (id) DO NOTHING;
```

---

## ✅ Step 3: Create a Test Translator Account

### 3a. Sign up as translator
1. Go to `/login`
2. Sign up with email `translator@test.com`

### 3b. Create translator profile (SQL)
```sql
-- Get the user ID first
SELECT id, email FROM auth.users WHERE email = 'translator@test.com';

-- Then create translator profile (replace USER_ID)
INSERT INTO translators (
  user_id,
  name,
  email,
  languages,
  specializations,
  is_active
) VALUES (
  'USER_ID_HERE',
  'Test Translator',
  'translator@test.com',
  ARRAY['English', 'Spanish'],
  ARRAY['legal_document', 'birth_certificate'],
  true
);
```

---

## ✅ Step 4: Test the Complete Flow

### As Admin:
1. Go to `/admin/orders`
2. Find a paid order
3. Click "View Details"
4. Assign to "Test Translator"
5. ✅ Order status: `paid` → `assigned`

### As Translator:
1. Login as `translator@test.com`
2. Go to `/dashboard/translator/assignments`
3. ✅ Should see assigned order
4. Click "Open" → View order details
5. Click "Start Working on This Order"
6. ✅ Status changes to `in_progress`
7. Upload a test PDF (any PDF < 10MB)
8. Click "Upload & Mark as Delivered"
9. ✅ Status changes to `delivered`

### As Customer:
1. Login as the customer who placed the order
2. Go to `/order/[orderId]` (use actual order ID)
3. ✅ See "Your translation is ready!" message
4. Click "Download Certified Translation"
5. ✅ PDF downloads, `customer_viewed_at` is set
6. (Optional) Click "Request a Revision"
7. Enter feedback and submit
8. ✅ Status changes to `revision_requested`

### As Translator (Revision):
1. Go back to `/dashboard/translator/assignments/[orderId]`
2. ✅ See red alert with customer feedback
3. Upload corrected PDF
4. ✅ Status returns to `delivered`, revision cleared

### As Admin (Completion):
1. Go to `/admin/orders/[id]`
2. Scroll to "Admin Controls"
3. Click "Mark as Completed"
4. ✅ Order status: `delivered` → `completed`

---

## 🎯 What You Can Test

### Translator Features:
- ✅ View all assigned orders
- ✅ Filter by status (assigned/in progress/revision/delivered)
- ✅ Download original customer documents
- ✅ Start work on order
- ✅ Upload completed translation
- ✅ See revision requests with customer feedback
- ✅ Re-upload corrected translations

### Customer Features:
- ✅ View order status
- ✅ Download completed translation
- ✅ Track when translation was delivered
- ✅ Request revisions with detailed feedback
- ✅ Download corrected translations

### Admin Features:
- ✅ All normal admin functions (assign, track)
- ✅ Manual status overrides (mark delivered/completed)
- ✅ Upload translation on behalf of translator
- ✅ Clear revision requests
- ✅ Add internal admin notes
- ✅ View all order lifecycle data

---

## 📧 Email Notifications (Currently Stubs)

All emails currently log to server console. Check:
```bash
# In terminal where npm run dev is running:
# You'll see:
📧 [EMAIL STUB] Order Delivered
  To: customer@email.com
  Order ID: abc-123
  Download URL: /order/abc-123
```

To implement real emails, edit `lib/notifications.ts` and add your email service (SendGrid, Resend, etc.)

---

## 🗂️ Key URLs

### Translator Dashboard:
- Assignments List: `/dashboard/translator/assignments`
- Order Detail: `/dashboard/translator/assignments/[orderId]`

### Customer Order View:
- Order & Download: `/order/[orderId]`

### Admin Order Management:
- All Orders: `/admin/orders`
- Order Detail: `/admin/orders/[id]`

---

## 🐛 Common Issues

### "Not a translator" error
**Problem:** User doesn't have translator profile
**Fix:** Run SQL to create translator profile (see Step 3b)

### File upload fails
**Problem:** Storage bucket not created or RLS policy missing
**Fix:** Run migration SQL again, check Supabase Storage dashboard

### "Order not found" for customer
**Problem:** Customer trying to access someone else's order
**Fix:** Make sure logged in as correct customer, or check `customer_id` in database

### Download URL expired
**Problem:** Signed URL valid for 1 hour only
**Fix:** Refresh the page to generate new signed URL

---

## ✅ Success Checklist

- [ ] Migration SQL executed
- [ ] Storage buckets created
- [ ] Test translator account created
- [ ] Assigned order to translator
- [ ] Translator started work
- [ ] Translator uploaded translation
- [ ] Customer downloaded translation
- [ ] (Optional) Revision requested
- [ ] (Optional) Corrected translation uploaded
- [ ] Admin marked as completed

If all checkboxes are ✅, your delivery workflow is fully functional!

---

## 📚 Next Steps

1. **Integrate Real Emails:**
   - Edit `lib/notifications.ts`
   - Add SendGrid/Resend API key
   - Replace console.log with actual email sending

2. **Customize Upload Validation:**
   - Edit `app/api/translator/upload-translation/route.ts`
   - Add custom PDF validation (check for certification seal, etc.)

3. **Add Analytics:**
   - Track average delivery time
   - Monitor revision rates
   - Measure customer satisfaction

4. **Enhance UX:**
   - Add progress bars for uploads
   - Show upload previews
   - Add file thumbnails

---

Your complete order delivery workflow is now ready! 🎉
