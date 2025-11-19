import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { generateFilePath } from "@/lib/storage";
import { sendOrderDeliveredEmail } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const orderId = formData.get("orderId") as string;

    if (!file || !orderId) {
      return NextResponse.json(
        { error: "File and order ID are required" },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are accepted" },
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

    // Get order info
    const { data: order } = await supabase
      .from("orders")
      .select("id, customer_id, translated_file_url")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Delete old file if exists
    if (order.translated_file_url) {
      await supabase.storage
        .from("completed_translations")
        .remove([order.translated_file_url]);
    }

    // Generate file path
    const filePath = generateFilePath(user.id, orderId, file.name);

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("completed_translations")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Update order with translated file URL and status
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        translated_file_url: filePath,
        status: "delivered",
        delivered_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Error updating order:", updateError);
      // Try to delete the uploaded file if DB update fails
      await supabase.storage
        .from("completed_translations")
        .remove([filePath]);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }

    // Get customer email for notification
    const { data: customer } = await supabase
      .from("auth.users")
      .select("email")
      .eq("id", order.customer_id)
      .single();

    // Send notification to customer (stub)
    if (customer?.email) {
      const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/order/${orderId}`;
      await sendOrderDeliveredEmail(customer.email, orderId, downloadUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in admin upload-translation route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
