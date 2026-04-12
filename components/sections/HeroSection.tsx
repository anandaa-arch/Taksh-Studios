'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate w-full min-h-[96vh] overflow-hidden flex items-start justify-center px-6 pt-20 pb-56 md:pt-24 md:pb-64">
      <video
        src="/videos/12972891_1920_1080_25fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 -z-20"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-black/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative z-10 w-full max-w-6xl text-center"
      >
        <p className="font-mono text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-text-muted mb-8">
          Premium Custom Fabrication // Delivered Pan-India
        </p>

        <h1 className="font-display font-bold uppercase tracking-[-0.04em] text-text-primary leading-[0.9] text-[13vw] md:text-[7.2vw]">
          Custom <span className="text-text-primary">3D Printing</span> &
          <span className="block text-text-primary">Woodcraft.</span>
        </h1>

        <p className="mt-8 max-w-3xl mx-auto font-sans text-[15px] md:text-[18px] leading-relaxed text-text-secondary">
          Bring your ideas to life. We specialize in high-precision FDM/Resin 3D printing and artisan CNC wood carving for gifts, prototypes, and decor.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/custom-order"
            className="inline-flex items-center justify-center border border-white bg-white text-black rounded-none px-7 py-4 font-sans font-semibold text-[12px] uppercase tracking-[0.12em] hover:bg-accent hover:border-accent hover:text-black transition-colors duration-100"
            data-cursor-label="CLICK"
          >
            Start Your Custom Order
          </Link>
          <Link
            href="/#collections"
            className="inline-flex items-center justify-center border border-white text-white rounded-none px-7 py-4 font-sans font-semibold text-[12px] uppercase tracking-[0.12em] hover:border-accent hover:text-accent transition-colors duration-100"
            data-cursor-label="VIEW"
          >
            Explore Collections
          </Link>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-[-42px] md:bottom-[-56px] z-20 flex justify-center px-6">
        <div className="flex items-end">
          <motion.div
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative z-10 h-64 w-44 md:h-72 md:w-56 overflow-hidden rounded-lg border border-white/20 shadow-2xl shadow-black/50 -rotate-6 hover:z-30"
          >
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop&grayscale=true"
              alt="3D printed showcase"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">3D Printing</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative z-20 h-64 w-44 md:h-72 md:w-56 overflow-hidden rounded-lg border border-white/20 shadow-2xl shadow-black/50 -ml-10 rotate-6 hover:z-30"
          >
            <img
              src="https://images.unsplash.com/photo-1621255561081-34440c9d72dc?q=80&w=800&auto=format&fit=crop&grayscale=true"
              alt="Wood carving showcase"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">Woodcraft</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
