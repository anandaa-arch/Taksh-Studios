'use client';

import { useState, useEffect } from 'react';
import { ScrollAnimationWrapper } from '../shared/ScrollAnimationWrapper';
import { ChapterLabel } from '../shared/ChapterLabel';
import { ProductCard } from '../shared/ProductCard';
import type { DbProduct } from '@/lib/supabase/types';
import useEmblaCarousel from 'embla-carousel-react';

export function FeaturedProducts() {
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch('/api/products?popular=true');
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPopular();
  }, []);

  return (
    <section id="popular" className="relative w-full py-24 md:h-screen md:py-0 flex flex-col justify-center bg-bg">
      <div className="w-full max-w-7xl mx-auto px-6 mb-12">
        <ScrollAnimationWrapper delay={0.1}>
          <ChapterLabel tag="05 / POPULAR" />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.2}>
          <h2 className="font-display font-bold uppercase tracking-[-0.04em] text-text-primary leading-[0.9] text-[11vw] md:text-[4.8vw]">
            Loved by
            <span className="block text-accent">Customers</span>
          </h2>
        </ScrollAnimationWrapper>
      </div>

      <ScrollAnimationWrapper delay={0.4} className="w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex px-6 md:px-[calc(50vw-40rem)] gap-8 will-change-transform cursor-grab active:cursor-grabbing">
            {isLoading ? (
              // Loading skeletons matching ProductCard dimensions
              [...Array(4)].map((_, i) => (
                <div key={i} className="w-[280px] md:w-[320px] shrink-0">
                  <div className="w-full aspect-[3/4] rounded-[3px] bg-surface animate-pulse mb-5" />
                  <div className="h-4 bg-surface rounded animate-pulse mb-2 w-3/4" />
                  <div className="h-3 bg-surface rounded animate-pulse w-1/2" />
                </div>
              ))
            ) : products.length === 0 ? (
              <div className="text-text-secondary font-sans text-sm px-6">
                No featured products yet.
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
