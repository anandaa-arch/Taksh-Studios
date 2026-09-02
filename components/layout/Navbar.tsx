'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useCartItemCount } from '@/lib/cart-store';

const links = [
  { name: 'Products', href: '/products' },
  { name: 'Process', href: '/#process' },
  { name: 'Collections', href: '/#collections' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemCount = useCartItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-3 h-16 md:h-20 flex items-center justify-between pointer-events-auto ${isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10'
          : 'bg-transparent border-transparent'
          }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 z-50 group"
          onClick={() => setIsOpen(false)}
        >
          {/* Scaled up the image drastically to ignore its baked-in transparent padding */}
          <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 -ml-3 md:-ml-4">
            <img
              src="/taksh-logo.png"
              alt="Taksh Logo"
              className="w-full h-full object-contain drop-shadow-xl scale-[1.7] md:scale-[2] transition-transform duration-300 group-hover:scale-[1.8] md:group-hover:scale-[2.1]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="font-bold tracking-[0.2em] text-base md:text-lg text-black dark:text-white uppercase transition-transform duration-300 group-hover:translate-x-1">
            TAKSH STUDIOS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <Link href="/cart" className="font-mono text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            Cart ({cartItemCount})
          </Link>
          <MagneticButton className="inline-flex">
            <Link
              href="/custom-order"
              className="font-mono text-[11px] bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 px-4 py-2 rounded-[3px] transition-all uppercase tracking-wider"
            >
              Order Now
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 uppercase font-mono text-[12px] text-black dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-bg pt-32 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-5xl uppercase tracking-wider text-text-primary block hover:border-b hover:border-text-primary/50 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + links.length * 0.1 }}
                className="mt-8"
              >
                <Link
                  href="/custom-order"
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-[14px] bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 px-6 py-3 rounded-[3px] transition-all uppercase tracking-wider inline-block"
                >
                  Start Custom Order
                </Link>
              </motion.div>
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="font-mono text-[14px] uppercase tracking-wider text-text-primary hover:border-b hover:border-text-primary/50 transition-colors"
              >
                Cart ({cartItemCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
