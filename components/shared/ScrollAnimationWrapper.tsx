'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function ScrollAnimationWrapper({ children, delay = 0, className = "", direction = 'up' }: Props) {
  let initial = {};
  if (direction === 'up') initial = { opacity: 0, y: 24 };
  else if (direction === 'down') initial = { opacity: 0, y: -24 };
  else if (direction === 'left') initial = { opacity: 0, x: 24 };
  else if (direction === 'right') initial = { opacity: 0, x: -24 };
  else initial = { opacity: 0 };
  
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
