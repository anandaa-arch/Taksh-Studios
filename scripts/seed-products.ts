/**
 * Seed script: migrates existing static products to Supabase.
 * 
 * Usage:
 *   1. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   2. Run: npx tsx scripts/seed-products.ts
 * 
 * This script is idempotent — it uses ON CONFLICT (slug) DO NOTHING,
 * so running it multiple times won't create duplicates.
 */

import { createClient } from '@supabase/supabase-js';
import { products } from '../lib/data/products';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log(`\n🌱 Seeding ${products.length} products to Supabase...\n`);

  let inserted = 0;
  let skipped = 0;

  for (const product of products) {
    const row = {
      slug: product.slug,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      images: product.images,
      materials: product.materials,
      finishes: product.finishes,
      popular: product.popular ?? false,
      in_stock: true,
    };

    const { error } = await supabase
      .from('products')
      .upsert(row, { onConflict: 'slug', ignoreDuplicates: true });

    if (error) {
      console.error(`  ❌ Failed: ${product.name}`, error.message);
    } else {
      // Check if it was actually inserted or skipped
      const { data } = await supabase
        .from('products')
        .select('id')
        .eq('slug', product.slug)
        .single();

      if (data) {
        console.log(`  ✅ ${product.name} (${product.category})`);
        inserted++;
      }
    }
  }

  skipped = products.length - inserted;

  console.log(`\n📊 Results:`);
  console.log(`   Inserted: ${inserted}`);
  if (skipped > 0) console.log(`   Skipped (already exist): ${skipped}`);
  console.log(`\n✨ Done!\n`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
