'use client';

import { ScrollAnimationWrapper } from '../shared/ScrollAnimationWrapper';
import { ChapterLabel } from '../shared/ChapterLabel';
import { ProductCard } from '../shared/ProductCard';
import { getPopularProducts } from '@/lib/data/products';
import useEmblaCarousel from 'embla-carousel-react';

export function FeaturedProducts() {
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps',
    dragFree: true
  });
  
  const popularProducts = getPopularProducts();

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
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
