'use client';

import { motion } from 'framer-motion';

export function ProcessChapter() {
  const cards = [
    {
      code: '[ SYS.01 ]',
      title: 'Digital Intake',
      desc: 'Upload CAD, STL, or concept references. We parse tolerance, geometry and material constraints instantly.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2000&auto=format&fit=crop&grayscale=true',
      video: '/videos/13068031_1920_1080_25fps.mp4',
      videoClass: 'absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500',
      overlayClass: 'absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      code: '[ SYS.02 ]',
      title: 'Toolpath Simulation',
      desc: 'Production logic is validated before machine time to eliminate drift and failed batches.',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2000&auto=format&fit=crop&grayscale=true',
      span: '',
    },
    {
      code: '[ SYS.03 ]',
      title: 'Final QA + Dispatch',
      desc: 'Every piece is inspected, logged, and dispatched with full production traceability.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313a9f4eb5b?q=80&w=2000&auto=format&fit=crop&grayscale=true',
      span: '',
    }
  ];

  return (
    <section id="process" className="w-full py-20 md:py-24 bg-bg">
      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="mb-10"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted mb-4">[ PROCESS MATRIX ]</div>
          <h2 className="font-display font-bold uppercase tracking-tight text-[12vw] md:text-[5vw] leading-[0.9] text-text-primary">
            Manufacturing
            <span className="block text-accent">Pipeline</span>
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
              {card.video ? (
                <video
                  src={card.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={card.videoClass}
                />
              ) : (
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-100"
                />
              )}

              <div className={card.overlayClass ?? 'absolute inset-0 z-0 bg-gradient-to-t from-black via-black/50 to-transparent'} />

              <div className="relative z-10 h-full flex flex-col">
                <span className="self-end font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
                  {card.code}
                </span>
                <h3 className="mt-auto font-display font-bold uppercase tracking-tight text-[28px] md:text-[34px] leading-[0.95] text-white">
                  {card.title}
                </h3>
                <p className="mt-3 font-sans text-[14px] leading-relaxed max-w-md text-white/80">
                  {card.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
