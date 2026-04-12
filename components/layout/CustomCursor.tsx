'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CURSOR_SIZE = 12;
const CURSOR_HOVER_SIZE = 60;

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState<'VIEW' | 'CLICK'>('VIEW');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 700, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 700, damping: 40, mass: 0.4 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor]') as HTMLElement | null;
      if (!interactive) {
        setIsHovering(false);
        return;
      }

      const explicit = interactive.getAttribute('data-cursor-label');
      if (explicit === 'CLICK' || explicit === 'VIEW') {
        setLabel(explicit);
      } else if (interactive.tagName === 'BUTTON') {
        setLabel('CLICK');
      } else {
        setLabel('VIEW');
      }

      setIsHovering(true);
    };

    const handleOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{ x: springX, y: springY }}
      animate={{
        width: isHovering ? CURSOR_HOVER_SIZE : CURSOR_SIZE,
        height: isHovering ? CURSOR_HOVER_SIZE : CURSOR_SIZE,
        backgroundColor: isHovering ? 'rgba(0, 0, 0, 0)' : 'var(--text-primary)',
        borderWidth: isHovering ? 1 : 0,
        borderColor: isHovering ? '#FFFFFF' : 'rgba(255, 255, 255, 0)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.span
        className="font-mono text-[9px] tracking-[2px] text-white"
        initial={false}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
