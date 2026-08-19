import type { MetadataRoute } from 'next';
import { createServerClient } from '@/lib/supabase/config';

const BASE_URL = 'https://www.takshstudios.com';

/**
 * Dynamic sitemap generated from Supabase product data.
 *
 * Includes:
 * - Static pages (home, products, about, custom-order, contact, faq, shipping)
 * - Dynamic product pages pulled from the products table
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/custom-order`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic product pages from Supabase directly.
  // Avoid fetching via /api/products here because that adds an unnecessary extra hop.
  let productPages: MetadataRoute.Sitemap = [];

  try {
    const supabase = createServerClient();
    const { data: products } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('in_stock', true);

    if (products) {
      productPages = products.map((product) => ({
        url: `${BASE_URL}/products/${product.slug}`,
        lastModified: new Date(product.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch {
    // If Supabase is unreachable, return sitemap with static pages only
  }

  return [...staticPages, ...productPages];
}
