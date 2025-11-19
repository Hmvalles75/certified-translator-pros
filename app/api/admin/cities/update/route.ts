import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const { cityId, name, state, country } = await request.json();

    if (!cityId || !name || !state || !country) {
      return NextResponse.json(
        { error: "City ID, name, state, and country are required" },
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

    // Generate new slug
    const slug = generateSlug(name);

    // Check if slug conflicts with another city
    const { data: existing } = await supabase
      .from("cities")
      .select("id")
      .eq("slug", slug)
      .neq("id", cityId)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "A city with this name already exists" },
        { status: 409 }
      );
    }

    // Update city
    const { error: updateError } = await supabase
      .from("cities")
      .update({
        name,
        state,
        country,
        slug,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cityId);

    if (updateError) {
      console.error("Error updating city:", updateError);
      return NextResponse.json(
        { error: "Failed to update city" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in update city route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
