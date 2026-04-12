'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/lib/data/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col w-[280px] md:w-[320px] shrink-0">
      <Link href={`/products/${product.slug}`} className="block w-full">
        {/* Aspect Ratio 3:4 */}
        <div className="relative w-full aspect-[3/4] rounded-[3px] overflow-hidden bg-surface mb-5 group-hover:scale-[1.02] transition-transform duration-500 will-change-transform">
          <motion.div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <motion.img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </motion.div>
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent pointer-events-none" />
          
          {/* Category Pill */}
          <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[2px] uppercase bg-surface-elevated/80 backdrop-blur-sm px-3 py-1.5 rounded-[3px]-sm text-text-primary border border-border">
            {product.category.replace('-', ' ')}
          </div>
          
          {/* Hover Glow Edge Effect */}
          <div className="absolute inset-0 border border-transparent group-hover:border-white/40 rounded-[3px] group-hover:shadow-[0_0_24px_rgba(240,237,232,0.12)] transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start gap-4">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-sans text-[16px] text-text-primary group-text-text-primary hover:border-b hover:border-text-primary/50 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <span className="font-mono text-[14px] text-text-primary shrink-0">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
        
        <Link 
          href={`/products/${product.slug}`}
          className="font-sans text-[13px] text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors w-max"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
