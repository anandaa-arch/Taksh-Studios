'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProductsByCategory, ProductCategory } from '@/lib/data/products';
import { ProductCard } from '@/components/shared/ProductCard';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const initialCategory = (resolvedSearchParams.category as ProductCategory) || 'all';
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [sortBy, setSortBy] = useState('popular');

  const products = getProductsByCategory(activeCategory);

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return b.id.localeCompare(a.id); // arbitrary logic for placeholder
    // default popular
    return a.popular === b.popular ? 0 : a.popular ? -1 : 1;
  });

  return (
    <div className="w-full min-h-screen bg-bg pt-20">
      {/* Header Banner */}
      <div className="relative w-full h-[280px] bg-surface flex flex-col justify-end px-6 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612404730960-5c71577fca11?q=80&w=2000&auto=format&fit=crop&grayscale=true')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="font-mono text-[11px] text-text-muted uppercase tracking-[3px] mb-4">
            <Link href="/" className="text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Products</span>
          </div>
          <h1 className="font-display font-bold uppercase tracking-[-0.04em] text-5xl md:text-[56px] text-text-primary leading-none">
            Our Collections
          </h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[88px] z-30 w-full bg-surface-elevated/80 backdrop-blur-md border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            {(['all', '3d-printing', 'wood-carving'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[12px] uppercase tracking-wider px-4 py-2 rounded-[3px] transition-all ${
                  activeCategory === cat 
                    ? 'bg-text-primary text-bg' 
                    : 'bg-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 font-sans text-sm text-text-secondary">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-bg border border-border rounded-[3px] px-3 py-1.5 focus:outline-none focus:border-accent text-text-primary"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {sortedProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex justify-center"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
