import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Require user to be logged in as a translator
 * Redirects to login if not authenticated or not a translator
 */
export async function requireTranslator() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard/translator");
  }

  // Check if user has a translator profile
  const { data: translator } = await supabase
    .from("translators")
    .select("id, name, email, is_active")
    .eq("user_id", user.id)
    .single();

  if (!translator) {
    redirect("/?error=not_a_translator");
  }

  if (!translator.is_active) {
    redirect("/?error=translator_inactive");
  }

  return { user, translator };
}

/**
 * Check if user is a translator (without redirect)
 */
export async function isTranslator() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: translator } = await supabase
    .from("translators")
    .select("id")
    .eq("user_id", user.id)
    .single();

  return !!translator;
}
