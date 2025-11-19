/**
 * Email Notification Stubs
 *
 * These are placeholder functions for email notifications.
 * In production, integrate with SendGrid, Resend, or your email service.
 */

export async function sendOrderDeliveredEmail(
  customerEmail: string,
  orderId: string,
  downloadUrl: string
): Promise<void> {
  console.log("📧 [EMAIL STUB] Order Delivered");
  console.log(`  To: ${customerEmail}`);
  console.log(`  Subject: Your certified translation is ready!`);
  console.log(`  Order ID: ${orderId}`);
  console.log(`  Download URL: ${downloadUrl}`);

  // TODO: Implement actual email sending
  // Example with Resend:
  // await resend.emails.send({
  //   from: 'noreply@certifiedtranslatorpros.com',
  //   to: customerEmail,
  //   subject: 'Your Certified Translation is Ready!',
  //   html: `
  //     <h1>Your translation is ready for download!</h1>
  //     <p>Order #${orderId}</p>
  //     <a href="${downloadUrl}">Download your certified translation</a>
  //   `
  // });
}

export async function sendRevisionRequestedEmail(
  translatorEmail: string,
  orderId: string,
  revisionMessage: string
): Promise<void> {
  console.log("📧 [EMAIL STUB] Revision Requested");
  console.log(`  To: ${translatorEmail}`);
  console.log(`  Subject: Revision requested for order ${orderId}`);
  console.log(`  Message: ${revisionMessage}`);

  // TODO: Implement actual email sending
  // await resend.emails.send({
  //   from: 'noreply@certifiedtranslatorpros.com',
  //   to: translatorEmail,
  //   subject: `Revision Requested - Order #${orderId}`,
  //   html: `
  //     <h1>A customer has requested revisions</h1>
  //     <p>Order #${orderId}</p>
  //     <p><strong>Customer feedback:</strong></p>
  //     <p>${revisionMessage}</p>
  //     <a href="https://app.com/dashboard/translator/assignments/${orderId}">
  //       View order and upload corrected translation
  //     </a>
  //   `
  // });
}

export async function sendOrderAssignedEmail(
  translatorEmail: string,
  orderId: string,
  orderDetails?: {
    sourceLanguage: string;
    targetLanguage: string;
    documentType: string;
  }
): Promise<void> {
  console.log("📧 [EMAIL STUB] Order Assigned");
  console.log(`  To: ${translatorEmail}`);
  console.log(`  Subject: New translation order assigned to you`);
  console.log(`  Order ID: ${orderId}`);
  if (orderDetails) {
    console.log(`  Details: ${orderDetails.sourceLanguage} → ${orderDetails.targetLanguage}`);
  }

  // TODO: Implement actual email sending
  // await resend.emails.send({
  //   from: 'noreply@certifiedtranslatorpros.com',
  //   to: translatorEmail,
  //   subject: `New Order Assignment #${orderId}`,
  //   html: `
  //     <h1>You have a new translation assignment!</h1>
  //     <p>Order #${orderId}</p>
  //     ${orderDetails ? `
  //       <p>
  //         <strong>Languages:</strong> ${orderDetails.sourceLanguage} → ${orderDetails.targetLanguage}<br>
  //         <strong>Document Type:</strong> ${orderDetails.documentType}
  //       </p>
  //     ` : ''}
  //     <a href="https://app.com/dashboard/translator/assignments/${orderId}">
  //       View order details
  //     </a>
  //   `
  // });
}

export async function sendOrderCompletedEmail(
  customerEmail: string,
  orderId: string
): Promise<void> {
  console.log("📧 [EMAIL STUB] Order Completed");
  console.log(`  To: ${customerEmail}`);
  console.log(`  Subject: Your order has been completed`);
  console.log(`  Order ID: ${orderId}`);

  // TODO: Implement actual email sending
  // await resend.emails.send({
  //   from: 'noreply@certifiedtranslatorpros.com',
  //   to: customerEmail,
  //   subject: `Order Completed #${orderId}`,
  //   html: `
  //     <h1>Thank you for using our service!</h1>
  //     <p>Order #${orderId} has been marked as completed.</p>
  //     <p>We hope you're satisfied with your certified translation.</p>
  //   `
  // });
}

export async function sendOrderStartedEmail(
  customerEmail: string,
  orderId: string
): Promise<void> {
  console.log("📧 [EMAIL STUB] Order Started");
  console.log(`  To: ${customerEmail}`);
  console.log(`  Subject: Your translator has started working on your order`);
  console.log(`  Order ID: ${orderId}`);

  // TODO: Implement actual email sending
}
