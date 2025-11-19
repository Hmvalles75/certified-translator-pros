# CertifiedTranslatorPros

A production-ready Next.js 14 website for certified translation services with complete order flow, payment processing, and admin management.

## Features

### Frontend
- **Modern Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **10 Homepage Sections**:
  1. Hero with CTA buttons and trust badges
  2. How It Works (4-step process)
  3. Why Choose Us (4 key features)
  4. Services (6 document types)
  5. Find a Local Translator (search form UI)
  6. Who We Serve (4 audience types)
  7. Quality & Security (4 guarantees)
  8. Testimonials (3 client reviews)
  9. FAQ (accordion with 6 questions)
  10. Final CTA strip

### Backend & Features
- **Complete Order Flow**: `/order` → `/order/review/[id]` → Stripe Checkout → `/order/success`
- **Supabase Integration**: Authentication, PostgreSQL database, file storage
- **Stripe Payments**: Secure checkout sessions and webhook handling
- **File Upload**: PDF, JPG, PNG support up to 10MB
- **Dynamic Pricing**: Automatic calculation with rush fee options
- **Admin Panel**: Translator assignment and order management
- **Notifications**: Real-time order status updates
- **Row Level Security**: Database-level access control

## Brand Colors

- Primary: `#0B1C3D` (deep navy)
- Accent: `#1DB39B` (emerald/teal)
- Background: `#F4F5F7` (light gray)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase and Stripe credentials. See [SETUP.md](SETUP.md) for detailed instructions.

### 3. Set up database

Run the SQL schema in your Supabase project (see [SETUP.md](SETUP.md))

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for production

```bash
npm run build
npm start
```

📖 **For complete setup instructions, see [SETUP.md](SETUP.md)**

## Project Structure

```
app/
├── api/
│   ├── checkout/                    # Stripe checkout session
│   ├── stripe/webhook/              # Stripe webhook handler
│   └── admin/assign-translator/     # Admin API routes
├── components/                      # Homepage UI components
│   ├── Button.tsx
│   ├── Hero.tsx, HowItWorks.tsx, etc.
├── order/
│   ├── page.tsx                     # Order form with file upload
│   ├── review/[id]/                 # Order review & pricing
│   └── success/                     # Success confirmation
├── admin/orders/[id]/               # Admin assignment panel
├── login/                           # Authentication
└── auth/callback/                   # OAuth callback

lib/
├── supabase/                        # Supabase clients & middleware
├── stripe.ts                        # Stripe configuration
├── pricing.ts                       # Price calculation logic
├── constants.ts                     # App constants
└── types/database.ts                # TypeScript types

supabase/
└── schema.sql                       # Database schema
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Stripe Checkout + Webhooks
- **Deployment**: Vercel (recommended)

## Key Workflows

### Order Flow
1. Customer uploads document at `/order`
2. File stored in Supabase Storage
3. Order created with `pending_review` status
4. Customer reviews pricing at `/order/review/[id]`
5. Stripe Checkout for payment
6. Webhook updates order to `paid`
7. Success page at `/order/success`

### Admin Flow
1. Admin views paid orders
2. Assigns translator at `/admin/orders/[id]`
3. Order status updated to `assigned`
4. Notification sent to translator
5. Translator completes work
6. Customer receives translation

## Environment Variables

Required variables (see `.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Contributing

This is a proprietary project for CertifiedTranslatorPros.

## License

Proprietary - CertifiedTranslatorPros
