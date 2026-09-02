import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/config';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth';
import type { DbProduct } from '@/lib/supabase/types';

/**
 * PUT /api/admin/products/[id]
 * Updates an existing product. Accepts partial fields.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = createServerClient();

    // Only allow updating known fields
    const allowedFields = [
      'name', 'slug', 'price', 'category', 'description',
      'images', 'materials', 'finishes', 'popular', 'in_stock',
    ] as const;

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Validate slug format if being updated
    if (updates.slug && typeof updates.slug === 'string') {
      updates.slug = updates.slug.trim().toLowerCase();
    }

    // Validate category if being updated
    if (updates.category && !['3d-printing', 'wood-carving'].includes(updates.category as string)) {
      return NextResponse.json(
        { error: 'Category must be "3d-printing" or "wood-carving"' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A product with this slug already exists' },
          { status: 409 }
        );
      }
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      console.error('[api/admin/products/id] Update error:', error);
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ product: data as DbProduct });
  } catch (err) {
    console.error('[api/admin/products/id] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/products/[id]
 * Deletes a product by ID.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  try {
    const { id } = await params;
    const supabase = createServerClient();

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[api/admin/products/id] Delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[api/admin/products/id] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
