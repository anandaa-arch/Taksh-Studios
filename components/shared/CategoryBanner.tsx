'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  href: string;
  bgImage: string;
  theme: 'orange' | 'gold';
}

export function CategoryBanner({ title, subtitle, href, bgImage, theme }: CategoryBannerProps) {
  const isGold = theme === 'gold';
  
  return (
    <Link href={href} className="flex-1 w-full relative group block h-[480px] rounded-[3px] overflow-hidden shrink-0">
      <motion.div
        className="absolute inset-x-0 bottom-0 overflow-hidden"
        initial={{ height: '0%' }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ backgroundImage: `url(${bgImage})` }}
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-t ${isGold ? 'from-bg/90 via-bg/40' : 'from-bg/90 via-bg/50'} to-transparent`} />
      
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end">
        <h3 className="font-display font-bold uppercase tracking-tight text-4xl md:text-[42px] text-text-primary mb-3">
          {title}
        </h3>
        <p className="font-sans text-[15px] text-text-secondary">
          {subtitle}
        </p>
      </div>
      
      <div className={`absolute inset-0 border border-transparent transition-colors duration-500 rounded-[3px] pointer-events-none ${isGold ? 'group-hover:border-accent-hover/50' : 'group-hover:border-accent/50'}`} />
    </Link>
  );
}
