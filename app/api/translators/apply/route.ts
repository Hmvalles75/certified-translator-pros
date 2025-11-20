import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      full_name,
      email,
      phone,
      country,
      time_zone,
      languages,
      rate_per_page,
      max_pages_per_day,
      can_rush,
      can_notarize,
      bio,
    } = body;

    // Validate required fields
    if (!full_name || !email || !languages || languages.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if translator already exists
    const { data: existing } = await supabaseAdmin
      .from("translators")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "An application with this email already exists" },
        { status: 400 }
      );
    }

    // Create translator application
    const { data: translator, error } = await supabaseAdmin
      .from("translators")
      .insert({
        full_name,
        email,
        phone,
        country,
        time_zone,
        languages,
        rate_per_page: parseFloat(rate_per_page),
        max_pages_per_day: parseInt(max_pages_per_day),
        can_rush: can_rush || false,
        can_notarize: can_notarize || false,
        bio,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating translator:", error);
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      );
    }

    // TODO: Send notification email to admin

    return NextResponse.json({
      success: true,
      translator,
    });
  } catch (error: any) {
    console.error("Error in translator application:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
