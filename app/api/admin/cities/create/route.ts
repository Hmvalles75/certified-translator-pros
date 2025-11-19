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
    const { name, state, country } = await request.json();

    if (!name || !state || !country) {
      return NextResponse.json(
        { error: "Name, state, and country are required" },
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

    // Generate slug
    const slug = generateSlug(name);

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("cities")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "A city with this name already exists" },
        { status: 409 }
      );
    }

    // Create city
    const { error: createError } = await supabase.from("cities").insert({
      name,
      state,
      country,
      slug,
      translator_count: 0,
    });

    if (createError) {
      console.error("Error creating city:", createError);
      return NextResponse.json(
        { error: "Failed to create city" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in create city route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
