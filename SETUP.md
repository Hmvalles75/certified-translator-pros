# Certified Translation Order Flow - Setup Guide

Complete setup guide for the Stripe + Supabase order flow for certified translations.

## Prerequisites

- Node.js 18+ and npm
- Supabase account (https://supabase.com)
- Stripe account (https://stripe.com)

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Where to Find These Values:

#### Supabase:
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

#### Stripe:
1. Go to https://dashboard.stripe.com
2. Navigate to **Developers** → **API keys**
3. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY` (⚠️ Keep this secret!)
4. For `STRIPE_WEBHOOK_SECRET`, see step 3 below

## 2. Database Setup

Run the database migration to create the `orders` table:

### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `supabase/migrations/20250118000000_create_orders_table.sql`
5. Click **Run**

### Option B: Using Supabase CLI
```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## 3. Stripe Webhook Setup

### For Development (Local Testing)

1. Install the Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows
   scoop install stripe

   # Or download from https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copy the webhook signing secret that appears (starts with `whsec_`) and add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`

5. Keep this terminal running while developing

### For Production

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Enter your production URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded` (optional)
   - `payment_intent.payment_failed` (optional)
5. Click **Add endpoint**
6. Copy the **Signing secret** and add it to your production environment variables as `STRIPE_WEBHOOK_SECRET`

## 4. Install Dependencies

```bash
npm install
```

## 5. Running the Application

### Development Mode

```bash
npm run dev
```

### With Stripe Webhook Forwarding

In separate terminals:

Terminal 1:
```bash
npm run dev
```

Terminal 2:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Open http://localhost:3000

## 6. Testing the Order Flow

1. Go to http://localhost:3000/order/certified
2. Fill out the order form
3. Use Stripe test card: `4242 4242 4242 4242`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC (e.g., 123)
   - Use any ZIP code (e.g., 12345)
4. Complete the payment
5. You should be redirected to the success page
6. Check your terminal for the webhook event log
7. Verify the order in Supabase:
   - Go to **Table Editor** → **orders**
   - You should see your order with `status = 'paid'`

## 7. Production Deployment

### Update Environment Variables

When deploying to production (Vercel, Netlify, etc.):

1. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g., `https://certifiedtranslatorpros.com`)
2. Use **live** Stripe keys (start with `sk_live_` and `pk_live_`)
3. Set up production webhook endpoint (see step 3 above)
4. Ensure all other environment variables are properly set

### Stripe Live Mode

Before going live:
1. Complete Stripe account activation
2. Switch to live API keys in your environment variables
3. Test the complete flow in production
4. Monitor the Stripe dashboard for incoming payments

## 8. Files Created/Modified

### New Files:
- `supabase/migrations/20250118000000_create_orders_table.sql` - Database schema
- `app/order/certified/page.tsx` - Order form with live pricing
- `app/api/checkout/certified/route.ts` - Checkout API endpoint
- `app/api/webhooks/stripe/route.ts` - Stripe webhook handler
- `app/order/success/page.tsx` - Order success page
- `app/order/cancelled/page.tsx` - Order cancelled page

### Modified Files:
- `app/components/Hero.tsx` - Updated CTA buttons to `/order/certified`
- `app/components/FinalCTA.tsx` - Updated CTA buttons to `/order/certified`
- `app/components/PricingSection.tsx` - Updated order button to `/order/certified`

## 9. Email Notifications (TODO)

The webhook currently logs order details to the console. To add email notifications:

1. Install an email service (e.g., SendGrid, Resend, Postmark)
2. Add email sending logic in `app/api/webhooks/stripe/route.ts`
3. Send confirmation email to customer
4. Send notification email to admin

Example with Resend:
```bash
npm install resend
```

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In webhook handler after order is paid
await resend.emails.send({
  from: 'orders@certifiedtranslatorpros.com',
  to: order.customer_email,
  subject: 'Order Confirmation - Certified Translation',
  html: `<p>Your order has been received...</p>`
});
```

## 10. File Upload (TODO)

The order form has a file upload field, but file storage is not yet implemented. To add this:

### Option A: Supabase Storage
```typescript
// Upload file to Supabase Storage
const { data, error } = await supabase.storage
  .from('documents')
  .upload(`orders/${orderId}/${file.name}`, file);
```

### Option B: AWS S3, Cloudinary, or other cloud storage

## Support

If you encounter issues:
- Check that all environment variables are set correctly
- Verify the database migration ran successfully
- Check the browser console and server logs for errors
- Ensure Stripe webhook is receiving events (check Stripe Dashboard → Developers → Webhooks)

## Security Notes

⚠️ **Never commit the following to version control:**
- `.env.local`
- Stripe secret keys
- Supabase service role key

✅ **Always:**
- Use environment variables for sensitive data
- Keep service role keys server-side only
- Validate all inputs server-side
- Use HTTPS in production
