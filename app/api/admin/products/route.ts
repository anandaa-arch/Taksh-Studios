import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/config';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth';
import type { DbProduct } from '@/lib/supabase/types';

/**
 * GET /api/admin/products
 * Returns ALL products (including out-of-stock) for admin management.
 */
export async function GET(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[api/admin/products] Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json({ products: data as DbProduct[] });
  } catch (err) {
    console.error('[api/admin/products] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/products
 * Creates a new product.
 */
export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { name, slug, price, category, description, images, materials, finishes, popular, in_stock } = body;

    // Validate required fields
    const errors: string[] = [];
    if (!name?.trim()) errors.push('Name is required');
    if (!slug?.trim()) errors.push('Slug is required');
    if (typeof price !== 'number' || price <= 0) errors.push('Price must be a positive number');
    if (!category || !['3d-printing', 'wood-carving'].includes(category)) {
      errors.push('Category must be "3d-printing" or "wood-carving"');
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        price,
        category,
        description: description?.trim() || '',
        images: images || [],
        materials: materials || [],
        finishes: finishes || [],
        popular: popular ?? false,
        in_stock: in_stock ?? true,
      })
      .select()
      .single();

    if (error) {
      // Handle unique slug violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A product with this slug already exists' },
          { status: 409 }
        );
      }
      console.error('[api/admin/products] Insert error:', error);
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ product: data as DbProduct }, { status: 201 });
  } catch (err) {
    console.error('[api/admin/products] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
