import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Ignore
          }
        },
        remove(name: string, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // Ignore
          }
        },
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await getSupabaseClient();

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get order ID from form data or JSON
    const contentType = req.headers.get("content-type");
    let orderId: string;

    if (contentType?.includes("application/json")) {
      const body = await req.json();
      orderId = body.orderId;
    } else {
      const formData = await req.formData();
      orderId = formData.get("orderId") as string;
    }

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Check if order exists and is unassigned
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.assigned_to) {
      return NextResponse.json(
        { error: "Order already assigned" },
        { status: 400 }
      );
    }

    if (order.status !== "paid") {
      return NextResponse.json(
        { error: "Order is not in paid status" },
        { status: 400 }
      );
    }

    // Assign order to current user
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update({
        assigned_to: user.id,
        status: "in_progress",
      })
      .eq("id", orderId)
      .select()
      .single();

    if (updateError) {
      console.error("Error assigning order:", updateError);
      return NextResponse.json(
        { error: "Failed to assign order" },
        { status: 500 }
      );
    }

    // Redirect back to dashboard for form submissions
    if (!contentType?.includes("application/json")) {
      return NextResponse.redirect(new URL("/dashboard/assigned", req.url));
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error("Assign order error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
