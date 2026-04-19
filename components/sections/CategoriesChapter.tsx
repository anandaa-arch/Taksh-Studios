'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CategoriesChapter() {
  const cards = [
    {
      code: '[ SYS.01 ]',
      title: '3D Printing',
      subtitle: 'Production grade FDM, resin, and rapid iteration.',
      href: '/products?category=3d-printing',
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop&grayscale=true',
      span: 'md:col-span-2',
      darkCard: true,
    },
    {
      code: '[ SYS.02 ]',
      title: 'Wood Carving',
      subtitle: 'CNC-assisted artisan carving for premium surfaces.',
      href: '/products?category=wood-carving',
      image: 'https://images.unsplash.com/photo-1596769066601-cb86807f43cb?q=80&w=2000&auto=format&fit=crop&grayscale=true',
      span: '',
      darkCard: true,
    },
    {
      code: '[ SYS.03 ]',
      title: 'Prototyping',
      subtitle: 'Concept-to-sample cycles optimized for speed and precision.',
      href: '/custom-order',
      image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2000&auto=format&fit=crop&grayscale=true',
      span: '',
    },
  ];

  return (
    <section id="collections" className="w-full py-20 md:py-24 bg-bg">
      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="mb-10"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted mb-4">[ COLLECTION GRID ]</div>
          <h2 className="font-display font-bold uppercase tracking-tight text-[12vw] md:text-[5vw] leading-[0.9] text-text-primary">
            Product
            <span className="block text-accent">Architecture</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px]">
          {cards.map((card, idx) => (
            <motion.div
              key={card.code}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30, delay: idx * 0.05 }}
              className={card.span}
            >
              <Link
                href={card.href}
                className={`group relative block h-full overflow-hidden rounded-[4px] border bg-surface p-6 transition-all duration-100 ${card.darkCard ? 'border-white/10 hover:border-white/20' : 'border-border hover:border-accent hover:shadow-[0_0_24px_rgba(255,68,0,0.2)]'}`}
                data-cursor-label="VIEW"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

                <div className="relative z-10 h-full flex flex-col">
                  <span className={`self-end font-mono text-[10px] uppercase tracking-[0.24em] ${card.darkCard ? 'text-white/50' : 'text-text-muted'}`}>
                    {card.code}
                  </span>
                  <h3 className={`mt-auto font-display font-bold uppercase tracking-tight text-[32px] md:text-[38px] leading-[0.95] ${card.darkCard ? 'text-white' : 'text-text-primary'}`}>
                    {card.title}
                  </h3>
                  <p className={`mt-3 font-sans text-[14px] leading-relaxed max-w-sm ${card.darkCard ? 'text-white/80' : 'text-text-secondary'}`}>
                    {card.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
