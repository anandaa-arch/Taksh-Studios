'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/shared/ProductCard';
import type { DbProduct } from '@/lib/supabase/types';

type CategoryFilter = '3d-printing' | 'wood-carving' | 'all';

const VALID_CATEGORIES: CategoryFilter[] = ['all', '3d-printing', 'wood-carving'];

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const rawCategory = resolvedSearchParams.category as CategoryFilter;
  const initialCategory = VALID_CATEGORIES.includes(rawCategory) ? rawCategory : 'all';
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const url = activeCategory === 'all'
          ? '/api/products'
          : `/api/products?category=${activeCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory]);

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="w-[280px] md:w-[320px]">
                  <div className="w-full aspect-[3/4] rounded-[3px] bg-surface animate-pulse mb-5" />
                  <div className="h-4 bg-surface rounded animate-pulse mb-2 w-3/4" />
                  <div className="h-3 bg-surface rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-sans text-[16px] text-text-secondary">No products found in this category.</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
