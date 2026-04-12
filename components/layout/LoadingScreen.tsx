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
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] bg-bg flex items-center justify-center pointer-events-none"
        >
          <video
            src="/videos/80f23c9ddf27c39529e86cc817bf6d3a.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-[30vw] h-[30vw] object-cover drop-shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
