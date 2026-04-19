"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function AnnouncementBanner() {
  const [timeLeft, setTimeLeft] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(9999);
  const [hasLaunched, setHasLaunched] = useState(false);
  
  // TEST TIMER: 30 Seconds from load
  const [targetTime] = useState(() => {
    const target = new Date();
    // Sets the launch time to exactly 7:30 PM today (19:30:00)
    target.setHours(19, 30, 0, 0); 
    return target.getTime();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTotalSeconds(0);
        
        if (!hasLaunched) {
          setHasLaunched(true);
          triggerFireworks();
        }
      } else {
        const sec = Math.floor(difference / 1000);
        setTotalSeconds(sec);

        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasLaunched, targetTime]);

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999999 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const fireInterval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(fireInterval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const isOnline = totalSeconds <= 0;
  const showTakeover = totalSeconds <= 10 && totalSeconds > 0;

  if (isOnline) return null;

  return (
    <>
      <div className="w-full bg-[#FF4400] text-[#09090B] font-mono text-xs font-bold tracking-widest py-2 px-4 flex justify-center items-center relative z-[60]">
        <span className="w-2 h-2 rounded-full bg-black animate-pulse mr-2"></span>
        [ SYSTEM STATUS: PRE-LAUNCH PROTOCOLS // T-MINUS {timeLeft} ]
      </div>

      <AnimatePresence>
        {showTakeover && (
          <motion.div
            className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={totalSeconds}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-[35vw] leading-none font-bold text-[#FF4400] tracking-tighter"
            >
              {totalSeconds}
            </motion.div>
            <div className="font-mono text-zinc-500 tracking-[0.3em] uppercase mt-8 text-sm md:text-xl">
              [ INITIATING LAUNCH SEQUENCE ]
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
