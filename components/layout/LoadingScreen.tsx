'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if it's the first time loading in this session
    const hasLoaded = sessionStorage.getItem('taksh_initial_load');
    
    if (hasLoaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
      return;
    }

    // Set a flag in session storage
    sessionStorage.setItem('taksh_initial_load', 'true');
    
    // Auto-hide after the animation sequence completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 1.5s hold + fade in

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
          className="fixed inset-0 z-[100] bg-bg flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tight text-black dark:text-white">
              TAKSH STUDIOS
            </h1>
            <p className="font-mono text-[12px] tracking-widest text-zinc-500">
              [ SYSTEM INITIALIZATION ... ]
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
