import { createServerSupabaseClient } from "./supabase/server";
import { createClient } from "./supabase/client";

/**
 * Generate a signed URL for downloading a file from Supabase Storage
 * @param bucket - Storage bucket name
 * @param path - File path in the bucket
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 */
export async function getSignedDownloadUrl(
  bucket: string,
  path: string,
  expiresIn: number = 3600
): Promise<string | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error("Error creating signed URL:", error);
    return null;
  }

  return data.signedUrl;
}

/**
 * Upload a file to Supabase Storage (server-side)
 * @param bucket - Storage bucket name
 * @param path - Destination path in the bucket
 * @param file - File to upload (File or Blob)
 */
export async function uploadFileServer(
  bucket: string,
  path: string,
  file: File | Blob
): Promise<{ url: string | null; error: Error | null }> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { url: null, error };
  }

  return { url: data.path, error: null };
}

/**
 * Upload a file to Supabase Storage (client-side)
 * @param bucket - Storage bucket name
 * @param path - Destination path in the bucket
 * @param file - File to upload
 */
export async function uploadFileClient(
  bucket: string,
  path: string,
  file: File
): Promise<{ url: string | null; error: Error | null }> {
  const supabase = createClient();

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { url: null, error };
  }

  return { url: data.path, error: null };
}

/**
 * Delete a file from Supabase Storage
 * @param bucket - Storage bucket name
 * @param path - File path to delete
 */
export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ success: boolean; error: Error | null }> {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    return { success: false, error };
  }

  return { success: true, error: null };
}

/**
 * Get the public URL for a file (works only for public buckets)
 * @param bucket - Storage bucket name
 * @param path - File path in the bucket
 */
export function getPublicUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Generate a unique file path for uploads
 * @param userId - User ID
 * @param orderId - Order ID
 * @param filename - Original filename
 */
export function generateFilePath(
  userId: string,
  orderId: string,
  filename: string
): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `${userId}/${orderId}/${timestamp}-${sanitizedFilename}`;
}
