export type DocumentType =
  | "birth_certificate"
  | "marriage_certificate"
  | "academic_transcript"
  | "legal_document"
  | "medical_document"
  | "other";

export type OrderStatus =
  | "pending_review"
  | "checkout_initiated"
  | "paid"
  | "assigned"
  | "in_progress"
  | "delivered"
  | "revision_requested"
  | "completed"
  | "cancelled";

export type Urgency = "standard" | "rush";

export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  customer_id: string;
  translator_id: string | null;
  status: OrderStatus;
  source_language: string;
  target_language: string;
  document_type: DocumentType;
  urgency: Urgency;
  notes: string | null;
  price_cents: number | null;
  pages: number;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  // Delivery workflow fields
  translated_file_url: string | null;
  delivered_at: string | null;
  customer_viewed_at: string | null;
  needs_revision: boolean;
  revision_message: string | null;
  revision_submitted_at: string | null;
  admin_note: string | null;
}

export interface OrderFile {
  id: string;
  created_at: string;
  order_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
}

export interface Translator {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  country: string;
  languages: string[];
  specializations: DocumentType[];
  services: string[];
  certifications: string[];
  bio: string | null;
  profile_photo: string | null;
  website: string | null;
  price_per_page: number | null;
  hourly_rate: number | null;
  is_public: boolean;
  is_active: boolean;
}

export interface Notification {
  id: string;
  created_at: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  related_order_id: string | null;
}

export interface Profile {
  id: string;
  role: "customer" | "admin" | "translator";
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  state: string;
  country: string;
  translator_count: number;
}

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  translator_id: string | null;
  city: string | null;
  is_handled: boolean;
  handled_at: string | null;
  handled_by: string | null;
}
