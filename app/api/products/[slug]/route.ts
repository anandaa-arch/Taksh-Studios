import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/config';
import type { DbProduct } from '@/lib/supabase/types';

/**
 * GET /api/products/[slug]
 * Returns a single product by its slug.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: data as DbProduct });
  } catch (err) {
    console.error('[api/products/slug] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
