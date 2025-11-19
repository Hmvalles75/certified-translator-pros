# Delivery Workflow - Quick Reference Card

## 🚀 Getting Started

### Step 1: Run Migration
```sql
-- In Supabase SQL Editor, paste:
supabase/delivery-workflow-migration.sql
```

### Step 2: Create Translator Account
```sql
-- After signup, create translator profile:
INSERT INTO translators (user_id, name, email, languages, specializations, is_active)
VALUES ('USER_ID', 'Translator Name', 'email@test.com',
        ARRAY['English', 'Spanish'],
        ARRAY['legal_document'], true);
```

### Step 3: Test the Flow
1. Admin assigns order
2. Translator uploads PDF
3. Customer downloads
4. Done!

---

## 📍 Key URLs

| Role | Action | URL |
|------|--------|-----|
| Translator | View assignments | `/dashboard/translator/assignments` |
| Translator | Work on order | `/dashboard/translator/assignments/[orderId]` |
| Customer | View/download order | `/order/[orderId]` |
| Admin | Manage order | `/admin/orders/[id]` |

---

## 🔄 Status Flow

```
paid → assigned → in_progress → delivered → completed
                                    ↓
                           revision_requested
                                    ↓
                              (back to delivered)
```

---

## 📧 Email Stubs

Check console output when these trigger:
- Order assigned → Translator notified
- Work started → Customer notified
- Translation delivered → Customer gets download link
- Revision requested → Translator notified
- Order completed → Customer thanked

To enable real emails, edit `lib/notifications.ts`

---

## 🔑 Authentication

| Page | Guard Function | Requirement |
|------|----------------|-------------|
| Translator pages | `requireTranslator()` | Translator profile + is_active |
| Customer pages | `getUser()` | customer_id matches user.id |
| Admin pages | `requireAdmin()` | role = 'admin' |

---

## 📦 Storage Buckets

| Bucket | Access | Content |
|--------|--------|---------|
| `order_files` | Private | Customer uploads |
| `completed_translations` | Private | Final PDFs |

Use signed URLs (1hr expiration) for downloads

---

## ⚡ Common Actions

### Translator: Upload Translation
1. Go to order page
2. Select PDF (max 10MB)
3. Click "Upload & Mark as Delivered"
4. ✅ Customer gets email

### Customer: Download Translation
1. Go to `/order/[orderId]`
2. Click green download button
3. ✅ PDF downloads instantly

### Customer: Request Revision
1. On order page, click "Request a Revision"
2. Describe needed changes
3. Submit
4. ✅ Translator gets notified

### Admin: Override Status
1. Go to `/admin/orders/[id]`
2. Scroll to "Admin Controls"
3. Use override buttons
4. ✅ Status updated immediately

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Not a translator" | Create translator profile in database |
| Upload fails | Check file is PDF, < 10MB |
| Can't download | Refresh page for new signed URL |
| Access denied | Check logged in as correct user |

---

## 📊 Database Fields

| Field | When Set | Who Sets |
|-------|----------|----------|
| `translated_file_url` | Upload | Translator/Admin |
| `delivered_at` | Upload | System |
| `customer_viewed_at` | First download | System |
| `needs_revision` | Revision request | Customer |
| `revision_message` | Revision request | Customer |
| `admin_note` | Anytime | Admin |

---

## 🎯 Order Statuses

| Status | Meaning | Next Action |
|--------|---------|-------------|
| `paid` | Payment done | Admin assigns |
| `assigned` | Translator set | Translator starts |
| `in_progress` | Work started | Translator uploads |
| `delivered` | PDF uploaded | Customer downloads |
| `revision_requested` | Changes needed | Translator re-uploads |
| `completed` | Finalized | None (archived) |

---

## 📁 File Structure Cheat Sheet

```
app/
├── dashboard/translator/assignments/     # Translator portal
├── order/[orderId]/                      # Customer portal
├── admin/orders/[id]/                    # Admin portal
└── api/
    ├── translator/*                      # Translator actions
    ├── customer/*                        # Customer actions
    └── admin/orders/*                    # Admin actions

lib/
├── auth/translator.ts                    # Translator guard
├── storage.ts                            # File helpers
└── notifications.ts                      # Email stubs
```

---

## 🔒 Security Checklist

- ✅ All routes check authentication
- ✅ Role-based access control
- ✅ Private storage buckets
- ✅ Signed URLs (1hr expiration)
- ✅ File type/size validation
- ✅ SQL injection prevention
- ✅ XSS protection

---

## 💻 Dev Server Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# View build output
npm run start
```

Server runs at: **http://localhost:3000**

---

## 📝 Testing Checklist

- [ ] Migration SQL executed
- [ ] Storage buckets created
- [ ] Test translator created
- [ ] Order assigned
- [ ] Translation uploaded
- [ ] Customer downloaded
- [ ] Revision tested
- [ ] Admin overrides tested

---

## 🚀 Production Deploy

1. Run migration in production Supabase
2. Create storage buckets
3. Add real email service
4. Set `NEXT_PUBLIC_APP_URL` env var
5. Test end-to-end
6. Deploy!

---

## 📚 Full Documentation

- `DELIVERY_WORKFLOW.md` - Technical details
- `DELIVERY_SETUP.md` - Setup guide
- `DELIVERY_WORKFLOW_SUMMARY.md` - Overview

---

**Questions? Check the full documentation files! 📖**
