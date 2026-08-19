import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServerClient } from '@/lib/supabase/config';

const ALLOWED_EXTENSIONS = ['.stl', '.obj', '.jpg', '.jpeg', '.png', '.pdf'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL;

    if (!apiKey || !notificationEmail) {
      console.error(
        '[custom-order] Missing environment variables:',
        !apiKey ? 'RESEND_API_KEY' : '',
        !notificationEmail ? 'ORDER_NOTIFICATION_EMAIL' : ''
      );
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the studio directly.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    // Extract fields
    const fullName = formData.get('fullName') as string | null;
    const email = formData.get('email') as string | null;
    const phone = formData.get('phone') as string | null;
    const productType = formData.get('productType') as string | null;
    const description = formData.get('description') as string | null;
    const material = formData.get('material') as string | null;
    const quantity = formData.get('quantity') as string | null;
    const deadline = formData.get('deadline') as string | null;
    const budget = formData.get('budget') as string | null;
    const referenceFile = formData.get('referenceFile') as File | null;

    // Validate required fields
    const errors: string[] = [];
    if (!fullName?.trim()) errors.push('Full Name is required');
    if (!email?.trim()) errors.push('Email is required');
    if (!phone?.trim()) errors.push('Phone Number is required');
    if (!productType || !['3d-printing', 'wood-carving'].includes(productType)) {
      errors.push('Product Type must be "3d-printing" or "wood-carving"');
    }
    if (!description?.trim()) errors.push('Description is required');

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Invalid email address');
    }

    // Validate file if provided BEFORE inserting to database
    let fileAttachment: { filename: string; content: Buffer } | undefined;

    if (referenceFile && referenceFile.size > 0) {
      const fileName = referenceFile.name.toLowerCase();
      const extension = '.' + fileName.split('.').pop();

      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        errors.push(`File type not allowed. Accepted: ${ALLOWED_EXTENSIONS.join(', ')}`);
      }

      if (referenceFile.size > MAX_FILE_SIZE) {
        errors.push('File size exceeds 25MB limit');
      }

      if (errors.length === 0) {
        const arrayBuffer = await referenceFile.arrayBuffer();
        fileAttachment = {
          filename: referenceFile.name,
          content: Buffer.from(arrayBuffer),
        };
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
    }

    const supabase = createServerClient();

    const { data: savedOrder, error: insertError } = await supabase
      .from('custom_orders')
      .insert({
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
        product_type: productType,
        description,
        material: material || null,
        quantity: Math.max(1, parseInt(quantity || '1', 10) || 1),
        deadline: deadline || null,
        budget: budget || null,
        reference_file_name: referenceFile?.name || null,
        status: 'new',
      })
      .select('order_id')
      .single();

    if (insertError) {
      console.error('[custom-order] Failed to save custom order:', insertError);
      return NextResponse.json(
        { error: 'Failed to save your order request. Please try again.' },
        { status: 500 }
      );
    }

    // Format values for display
    const productTypeLabel = productType === '3d-printing' ? '3D Printing' : 'Wood Carving';
    const materialLabel = material || 'Recommend for me';
    const quantityLabel = quantity || '1';
    const deadlineLabel = deadline || 'No specific deadline';
    const budgetLabels: Record<string, string> = {
      'no-budget': 'No specific budget',
      'under-2k': 'Under ₹2,000',
      '2k-5k': '₹2,000 – ₹5,000',
      '5k-10k': '₹5,000 – ₹10,000',
      '10k-plus': '₹10,000+',
    };
    const budgetLabel = budget ? (budgetLabels[budget] || budget) : 'No specific budget';

    // Build email HTML
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 4px; overflow: hidden;">
        <div style="background: #111111; padding: 32px; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">New Custom Order Request</h1>
          <p style="margin: 8px 0 0; font-size: 13px; color: #888888;">Received ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}</p>
        </div>
        
        <div style="padding: 32px;">
          <h2 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #FF4400; margin: 0 0 16px;">Customer Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888888; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888888;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #FF4400; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888888;">Phone</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${phone}" style="color: #FF4400; text-decoration: none;">${phone}</a></td>
            </tr>
          </table>
          
          <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 24px 0;"></div>
          
          <h2 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #FF4400; margin: 0 0 16px;">Order Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888888; width: 120px;">Product Type</td>
              <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">${productTypeLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888888;">Material</td>
              <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">${materialLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888888;">Quantity</td>
              <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">${quantityLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888888;">Deadline</td>
              <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">${deadlineLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888888;">Budget</td>
              <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">${budgetLabel}</td>
            </tr>
          </table>

          <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 24px 0;"></div>
          
          <h2 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #FF4400; margin: 0 0 12px;">Description</h2>
          <div style="background: #111111; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 16px; font-size: 14px; line-height: 1.6; color: #ffffff; white-space: pre-wrap;">${description}</div>

          ${fileAttachment ? `
          <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 24px 0;"></div>
          <h2 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #FF4400; margin: 0 0 12px;">Reference File</h2>
          <p style="font-size: 13px; color: #888888;">📎 ${fileAttachment.filename} (${(fileAttachment.content.length / 1024).toFixed(1)} KB) — attached to this email</p>
          ` : ''}
        </div>
        
        <div style="padding: 24px 32px; background: #111111; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #444444;">
          Taksh Studios — Custom Order System
        </div>
      </div>
    `;

    // Send email via Resend as a best-effort notification only.
    // The order is already saved in Supabase, so mail failures should not block success.
    try {
      const resend = new Resend(apiKey);
      const { error: sendError } = await resend.emails.send({
        from: 'Taksh Studios <orders@takshstudios.com>',
        to: [notificationEmail],
        subject: `New Custom Order: ${productTypeLabel} — ${fullName} (${savedOrder.order_id})`,
        html: emailHtml,
        replyTo: email!,
        ...(fileAttachment
          ? { attachments: [fileAttachment] }
          : {}),
      });

      if (sendError) {
        console.error('[custom-order] Resend error:', sendError);
      }
    } catch (emailError) {
      console.error('[custom-order] Failed to send email notification:', emailError);
    }

    return NextResponse.json({ success: true, orderId: savedOrder.order_id });
  } catch (err) {
    console.error('[custom-order] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
