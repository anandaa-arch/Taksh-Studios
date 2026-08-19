import { createServerClient } from '@/lib/supabase/config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { DbProduct } from '@/lib/supabase/types';
import { AddToCartPanel } from '@/components/cart/AddToCartPanel';

/**
 * Generate static params from Supabase for build-time rendering.
 * Falls back to dynamic rendering if Supabase is not configured.
 */
export async function generateStaticParams() {
  try {
    const supabase = createServerClient();
    const { data } = await supabase.from('products').select('slug');
    return (data || []).map((p) => ({ slug: p.slug }));
  } catch {
    // Supabase not configured yet — skip static generation
    return [];
  }
}

/**
 * Dynamic metadata for SEO — product name and description in title/meta tags.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const supabase = createServerClient();
    const { data: product } = await supabase
      .from('products')
      .select('name, description, category, price, images')
      .eq('slug', slug)
      .single();

    if (!product) {
      return { title: 'Product Not Found' };
    }

    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: `${product.name} | Taksh Studios`,
        description: product.description,
        images: product.images?.[0] ? [{ url: product.images[0] }] : [],
      },
    };
  } catch {
    return { title: 'Product' };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: DbProduct | null = null;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      notFound();
    }
    product = data as DbProduct;
  } catch {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <div className="font-mono text-[11px] text-text-muted uppercase tracking-[3px] mb-8">
          <Link href="/" className="text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* Left — Image Gallery (60%) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-surface rounded-[3px] overflow-hidden relative">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
            </div>
            {/* Thumbnail row */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, i) => (
                <div key={i} className={`w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-surface rounded-[3px] overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-accent' : 'border-transparent'}`}>
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Info (40%) */}
          <div className="w-full lg:w-[45%] flex flex-col pt-4">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-text-primary mb-4">
              {product.category.replace('-', ' ')}
            </div>
            
            <h1 className="font-display font-bold uppercase tracking-tight text-4xl md:text-5xl text-text-primary leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="font-mono text-[28px] text-text-primary mb-8">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            
            <div className="w-full h-[1px] bg-border mb-8" />
            
            <p className="font-sans text-[16px] text-text-secondary leading-[1.8] mb-10">
              {product.description}
            </p>
            
            {/* Stock Status */}
            {!product.in_stock && (
              <div className="flex items-center gap-2 text-destructive font-sans text-[14px] mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Currently out of stock
              </div>
            )}

            <div className="flex items-center gap-3 text-text-secondary font-sans text-[14px] mb-8 bg-surface p-4 rounded-[3px] border border-border/50">
              <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Ships in 5–8 working days · Pan-India delivery</span>
            </div>

            <AddToCartPanel product={product} />
            <Link href="/custom-order" className="text-center font-sans text-[14px] text-text-muted hover:text-text-primary transition-colors">
              Need a custom variation? →
            </Link>
          </div>
        </div>

        {/* JSON-LD Product Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              description: product.description,
              image: product.images,
              offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'INR',
                availability: product.in_stock
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
                seller: {
                  '@type': 'Organization',
                  name: 'Taksh Studios',
                },
              },
              category: product.category === '3d-printing' ? '3D Printed Products' : 'Wood Carved Products',
            }),
          }}
        />
      </div>
    </div>
  );
}
