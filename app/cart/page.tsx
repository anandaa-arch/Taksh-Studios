'use client';

import Link from 'next/link';
import { useCartItemCount, useCartStore, useCartTotal } from '@/lib/cart-store';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartTotal = useCartTotal();
  const cartItemCount = useCartItemCount();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-bg pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-text-muted mb-4">Cart · 0 items</p>
          <h1 className="font-display font-bold uppercase tracking-tight text-4xl md:text-5xl text-text-primary mb-6">Your Cart Is Empty</h1>
          <Link href="/products" className="inline-flex bg-text-primary text-bg font-sans font-semibold px-6 py-3 rounded-[3px] hover:brightness-110 transition-all">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[3px] text-text-muted mb-4">Cart · {cartItemCount} items</p>
            <h1 className="font-display font-bold uppercase tracking-tight text-4xl md:text-5xl text-text-primary">Your Selection</h1>
          </div>
          <button type="button" onClick={clearCart} className="font-sans text-[13px] text-text-muted hover:text-text-primary transition-colors">
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col border-y border-border">
          {items.map((item) => (
            <div key={`${item.productId}-${item.material ?? ''}-${item.finish ?? ''}`} className="flex flex-col sm:flex-row gap-5 py-6 border-b border-border last:border-b-0">
              <img src={item.image} alt={item.name} className="w-24 h-28 object-cover rounded-[3px] bg-surface" />
              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={`/products/${item.slug}`} className="font-sans text-[16px] text-text-primary hover:border-b hover:border-text-primary/50">
                      {item.name}
                    </Link>
                    {(item.material || item.finish) && (
                      <p className="font-mono text-[11px] text-text-muted mt-2">
                        {[item.material, item.finish].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-[14px] text-text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted" htmlFor={`quantity-${item.productId}-${item.material ?? 'none'}-${item.finish ?? 'none'}`}>
                    Qty
                  </label>
                  <input
                    id={`quantity-${item.productId}-${item.material ?? 'none'}-${item.finish ?? 'none'}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.productId, Number(event.target.value), item.material, item.finish)}
                    className="w-16 bg-surface border border-border rounded-[3px] px-2 py-2 text-center font-mono text-[13px] text-text-primary focus:outline-none focus:border-accent"
                  />
                  <button type="button" onClick={() => removeItem(item.productId, item.material, item.finish)} className="font-sans text-[13px] text-text-muted hover:text-destructive transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <div className="w-full sm:w-72 flex items-center justify-between border-t border-text-primary pt-4">
            <span className="font-mono text-[12px] uppercase tracking-wider text-text-muted">Subtotal</span>
            <span className="font-mono text-lg text-text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <p className="font-sans text-[13px] text-text-muted mt-8 text-right">Checkout and payment will be added next.</p>
      </div>
    </main>
  );
}
