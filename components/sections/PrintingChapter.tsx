'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function PrintingChapter() {
  const cards = [
    {
      code: '[ SYS.01 ]',
      title: 'Layer Strategy',
      desc: 'Optimized slicing profiles for strength, finish quality, and cycle-time efficiency.',
      image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2000&auto=format&fit=crop&grayscale=true',
      isAdditive: true,
      overlayClass: 'absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0',
      span: 'md:col-span-2',
    },
    {
      code: '[ SYS.02 ]',
      title: 'Material Control',
      desc: 'Material presets tuned per use case, from durable utility parts to display-grade models.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2000&auto=format&fit=crop&grayscale=true',
      span: '',
    },
  ];

  return (
    <section id="craft" className="w-full py-20 md:py-24 bg-bg">
      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="mb-10"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted mb-4">[ CHAPTER 01 ]</div>
          <h2 className="font-display font-bold uppercase tracking-[-0.04em] text-text-primary leading-[0.9] text-[12vw] md:text-[5.2vw]">
            01 // Additive
            <span className="block text-accent">Manufacturing</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px]">
          {cards.map((card, idx) => (
            <motion.article
              key={card.code}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30, delay: idx * 0.05 }}
              className={`group relative overflow-hidden rounded-[4px] border border-border bg-surface p-6 ${card.span} hover:border-accent hover:shadow-[0_0_24px_rgba(255,68,0,0.2)] transition-all duration-100`}
            >
              {card.isAdditive ? (
                <>
                  <video
                    src="/videos/12972891_1920_1080_25fps.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 hidden md:block w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <video
                    src="/videos/11976804_2160_3840_30fps.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80 block md:hidden"
                  />
                </>
              ) : (
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-100"
                />
              )}
              <div className={card.overlayClass ?? 'absolute inset-0 z-0 bg-gradient-to-t from-black via-black/50 to-transparent'} />

              <div className="relative z-10 h-full flex flex-col">
                <span className="self-end font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted">
                  {card.code}
                </span>
                <h3 className="mt-auto font-display font-bold uppercase tracking-tight text-[28px] md:text-[34px] leading-[0.95] text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-text-secondary max-w-md">
                  {card.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/products?category=3d-printing"
            className="inline-flex items-center justify-center border border-white text-white rounded-none px-6 py-3 font-sans font-semibold text-[12px] uppercase tracking-[0.12em] hover:border-accent hover:text-accent transition-colors duration-100"
          >
            View Additive Specs
          </Link>
        </div>
      </div>
    </section>
  );
}
