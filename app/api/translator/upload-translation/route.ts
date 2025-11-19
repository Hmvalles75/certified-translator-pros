import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { generateFilePath } from "@/lib/storage";
import { sendOrderDeliveredEmail } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const orderId = formData.get("orderId") as string;
    const isRevision = formData.get("isRevision") === "true";

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

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get translator profile
    const { data: translator } = await supabase
      .from("translators")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!translator) {
      return NextResponse.json({ error: "Not a translator" }, { status: 403 });
    }

    // Verify order is assigned to this translator
    const { data: order } = await supabase
      .from("orders")
      .select("id, translator_id, status, customer_id, translated_file_url")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.translator_id !== translator.id) {
      return NextResponse.json(
        { error: "This order is not assigned to you" },
        { status: 403 }
      );
    }

    if (
      !["in_progress", "revision_requested"].includes(order.status)
    ) {
      return NextResponse.json(
        { error: "Order is not in a valid status for upload" },
        { status: 400 }
      );
    }

    // Delete old file if this is a revision
    if (isRevision && order.translated_file_url) {
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
    const updateData: any = {
      translated_file_url: filePath,
      status: "delivered",
      delivered_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Clear revision fields if this is a revision
    if (isRevision) {
      updateData.needs_revision = false;
      updateData.revision_message = null;
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update(updateData)
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
    console.error("Error in upload-translation route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
