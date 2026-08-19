import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/config';

const ALLOWED_EXTENSIONS = ['.stl', '.obj', '.jpg', '.jpeg', '.png', '.pdf', '.webp'];
const ALLOWED_BUCKETS = ['product-images', 'order-files'] as const;
type AllowedBucket = (typeof ALLOWED_BUCKETS)[number];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

/**
 * POST /api/upload
 * Uploads a file to Supabase Storage.
 * Form data fields:
 *   - file: File (required)
 *   - bucket: 'product-images' | 'order-files' (default: 'order-files')
 *
 * Returns: { url: string, fileName: string }
 */
export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const requestedBucket = formData.get('bucket') as string | null;
    const bucket: AllowedBucket = requestedBucket && (ALLOWED_BUCKETS as readonly string[]).includes(requestedBucket)
      ? (requestedBucket as AllowedBucket)
      : 'order-files';

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file extension
    const fileName = file.name.toLowerCase();
    const extension = '.' + fileName.split('.').pop();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        { error: `File type not allowed. Accepted: ${ALLOWED_EXTENSIONS.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 25MB limit' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `${timestamp}_${safeName}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('[api/upload] Storage error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(storagePath);

    return NextResponse.json({
      url: urlData.publicUrl,
      fileName: file.name,
      storagePath,
    });
  } catch (err) {
    console.error('[api/upload] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
