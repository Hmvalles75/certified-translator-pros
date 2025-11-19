import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Admin client for database operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get order ID from request
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

    // Verify order is assigned to current user
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.assigned_to !== user.id) {
      return NextResponse.json(
        { error: "You are not assigned to this order" },
        { status: 403 }
      );
    }

    // Check if file has been uploaded
    if (!order.completed_file_url) {
      return NextResponse.json(
        { error: "Please upload the completed translation first" },
        { status: 400 }
      );
    }

    // Mark order as completed using admin client
    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()
      .single();

    if (updateError) {
      console.error("Error completing order:", updateError);
      return NextResponse.json(
        { error: "Failed to complete order" },
        { status: 500 }
      );
    }

    // TODO: Send email notification to customer with download link
    console.log("Order completed:", {
      orderId: updatedOrder.id,
      customerEmail: updatedOrder.customer_email,
      downloadUrl: updatedOrder.completed_file_url,
    });

    // Redirect back to assigned orders page for form submissions
    if (!contentType?.includes("application/json")) {
      return NextResponse.redirect(new URL("/dashboard/assigned", req.url));
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error("Complete order error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
