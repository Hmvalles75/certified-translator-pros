-- =====================================================
-- DELIVERY WORKFLOW MIGRATION
-- =====================================================
-- Run this in Supabase SQL Editor
-- DO NOT run if columns already exist

-- Add delivery and revision fields to orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS translated_file_url TEXT,
ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS customer_viewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS needs_revision BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS revision_message TEXT,
ADD COLUMN IF NOT EXISTS revision_submitted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS admin_note TEXT;

-- Update order status type to include new statuses
-- Note: PostgreSQL doesn't have ENUM for text columns, so we use CHECK constraint
-- First, drop existing constraint if it exists
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Add constraint for valid order statuses
ALTER TABLE orders
ADD CONSTRAINT orders_status_check CHECK (
  status IN (
    'pending_review',
    'checkout_initiated',
    'paid',
    'assigned',
    'in_progress',
    'delivered',
    'revision_requested',
    'completed',
    'cancelled'
  )
);

-- Create index for translator assignments query
CREATE INDEX IF NOT EXISTS orders_translator_id_status_idx
  ON orders(translator_id, status)
  WHERE translator_id IS NOT NULL;

-- Create index for customer order lookups
CREATE INDEX IF NOT EXISTS orders_customer_id_idx
  ON orders(customer_id);

-- Update RLS policies for customer order access
CREATE POLICY IF NOT EXISTS "Customers can view their delivered orders"
  ON orders FOR SELECT
  USING (auth.uid() = customer_id AND status IN ('delivered', 'revision_requested', 'completed'));

-- Create storage bucket for completed translations
INSERT INTO storage.buckets (id, name, public)
VALUES ('completed_translations', 'completed_translations', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for completed translations
CREATE POLICY "Translators can upload completed translations"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'completed_translations' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Customers can download their completed translations"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'completed_translations' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admins can manage completed translations"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'completed_translations' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Add helpful comment
COMMENT ON COLUMN orders.translated_file_url IS 'Storage path for the completed certified translation';
COMMENT ON COLUMN orders.delivered_at IS 'Timestamp when translator uploaded the completed translation';
COMMENT ON COLUMN orders.customer_viewed_at IS 'Timestamp when customer first viewed/downloaded the translation';
COMMENT ON COLUMN orders.needs_revision IS 'Whether customer has requested revisions';
COMMENT ON COLUMN orders.revision_message IS 'Customer message explaining what needs to be revised';
COMMENT ON COLUMN orders.admin_note IS 'Internal note visible only to admins';
