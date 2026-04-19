'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const inactiveIcon = 'text-black/45 dark:text-white/45';

  return (
    <div className="relative flex items-center rounded-full p-1 border border-black/15 dark:border-white/20 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <motion.div
        className="absolute left-1 top-1 h-8 w-8 rounded-full bg-black/10 dark:bg-white/15"
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      />

      <button
        type="button"
        aria-label="Switch to light theme"
        onClick={() => setTheme('light')}
        className={`relative z-10 flex h-8 w-8 items-center justify-center transition-colors ${!isDark ? 'text-black' : inactiveIcon}`}
      >
        <Sun size={16} strokeWidth={2.2} />
      </button>

      <button
        type="button"
        aria-label="Switch to dark theme"
        onClick={() => setTheme('dark')}
        className={`relative z-10 flex h-8 w-8 items-center justify-center transition-colors ${isDark ? 'text-white' : inactiveIcon}`}
      >
        <Moon size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}
