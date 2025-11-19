import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { translatorId, price_per_page, hourly_rate, is_public, is_active } =
      await request.json();

    if (!translatorId) {
      return NextResponse.json(
        { error: "Translator ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Verify user is authenticated and is an admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update translator
    const { error: updateError } = await supabase
      .from("translators")
      .update({
        price_per_page,
        hourly_rate,
        is_public,
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", translatorId);

    if (updateError) {
      console.error("Error updating translator:", updateError);
      return NextResponse.json(
        { error: "Failed to update translator" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in update translator route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
