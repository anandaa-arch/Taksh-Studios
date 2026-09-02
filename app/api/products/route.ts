import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase/config';
import type { DbProduct } from '@/lib/supabase/types';

/**
 * GET /api/products
 * Query params:
 *   - category: '3d-printing' | 'wood-carving' | 'all' (default: 'all')
 *   - popular: 'true' to filter popular products only
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const popular = searchParams.get('popular');

    let query = supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (popular === 'true') {
      query = query.eq('popular', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[api/products] Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json({ products: data as DbProduct[] });
  } catch (err) {
    console.error('[api/products] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
