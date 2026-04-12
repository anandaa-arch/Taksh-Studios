'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';

const links = [
  { name: 'Products', href: '/products' },
  { name: 'Process', href: '/#process' },
  { name: 'Collections', href: '/#collections' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-auto">
        <Link 
          href="/" 
          className="font-mono text-[13px] tracking-[3px] text-text-primary uppercase z-50 mix-blend-difference"
          onClick={() => setIsOpen(false)}
        >
          Taksh Studios
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 mix-blend-difference">
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="font-sans text-[13px] text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <MagneticButton className="inline-flex">
            <Link 
              href="/custom-order" 
              className="font-mono text-[11px] bg-text-primary text-bg px-4 py-2 rounded-[3px] hover:bg-opacity-90 transition-all uppercase tracking-wider"
            >
              Order Now
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 uppercase font-mono text-[12px] text-text-primary mix-blend-difference"
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
                    className="font-display text-5xl uppercase tracking-wider text-text-primary block text-text-primary hover:border-b hover:border-text-primary/50 transition-colors"
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
                  className="font-mono text-[14px] bg-text-primary text-bg px-6 py-3 rounded-[3px] hover:bg-opacity-90 transition-all uppercase tracking-wider inline-block"
                >
                  Start Custom Order
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
