import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { cityId } = await request.json();

    if (!cityId) {
      return NextResponse.json(
        { error: "City ID is required" },
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

    // Delete city
    const { error: deleteError } = await supabase
      .from("cities")
      .delete()
      .eq("id", cityId);

    if (deleteError) {
      console.error("Error deleting city:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete city" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in delete city route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
