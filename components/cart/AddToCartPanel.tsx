'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { DbProduct } from '@/lib/supabase/types';
import { useCartStore } from '@/lib/cart-store';

export function AddToCartPanel({ product }: { product: DbProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const [material, setMaterial] = useState(product.materials[0]);
  const [finish, setFinish] = useState(product.finishes[0]);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? '',
      material,
      finish,
    });
    setAdded(true);
  }

  return (
    <>
      <div className="flex flex-col gap-8 mb-10">
        <div>
          <h4 className="font-mono text-[11px] text-text-primary uppercase tracking-[2px] mb-3">Material</h4>
          <div className="flex flex-wrap gap-3">
            {product.materials.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMaterial(option)}
                className={`px-4 py-2 border rounded-[3px] font-sans text-[13px] transition-all ${material === option ? 'border-accent text-text-primary bg-text-primary text-bg/5' : 'border-transparent border-[1.5px] border-text-primary/20 text-text-primary hover:border-text-primary'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-mono text-[11px] text-text-primary uppercase tracking-[2px] mb-3">Finish</h4>
          <div className="flex flex-wrap gap-3">
            {product.finishes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFinish(option)}
                className={`px-4 py-2 border rounded-[3px] font-sans text-[13px] transition-all ${finish === option ? 'border-accent text-text-primary bg-text-primary text-bg/5' : 'border-transparent border-[1.5px] border-text-primary/20 text-text-primary hover:border-text-primary'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!product.in_stock}
        onClick={handleAddToCart}
        className="w-full bg-text-primary text-bg font-sans font-semibold text-[16px] py-4 rounded-[3px] hover:brightness-110 transition-all mb-4 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {product.in_stock ? (added ? 'Added to Cart' : 'Add to Cart') : 'Out of Stock'}
      </button>
      {added && (
        <Link href="/cart" className="block text-center font-sans text-[14px] text-accent hover:text-text-primary transition-colors">
          View Cart →
        </Link>
      )}
    </>
  );
}
