export const STARTING_PRICE_PER_PAGE = 2900; // $29.00 in cents
export const RUSH_MULTIPLIER = 1.5;
export const DEFAULT_PAGES = 1;

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ar", label: "Arabic" },
  { value: "ru", label: "Russian" },
  { value: "pt", label: "Portuguese" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "hi", label: "Hindi" },
  { value: "other", label: "Other" },
];

export const DOCUMENT_TYPES = [
  { value: "birth_certificate", label: "Birth Certificate" },
  { value: "marriage_certificate", label: "Marriage Certificate" },
  { value: "academic_transcript", label: "Academic Transcript / Diploma" },
  { value: "legal_document", label: "Legal / Court Document" },
  { value: "medical_document", label: "Medical Record" },
  { value: "other", label: "Other" },
];

export const URGENCY_OPTIONS = [
  { value: "standard", label: "Standard (24-48 hours)", price: "Base price" },
  { value: "rush", label: "Rush (12-24 hours)", price: "+50%" },
];

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
