"use client";

import { useState, useEffect } from "react";

export function MiddleCountdown() {
  // TEST TIMER: 30 Seconds from load
  const [targetTime] = useState(() => {
    const target = new Date();
    // Sets the launch time to exactly 7:30 PM today (19:30:00)
    target.setHours(19, 45, 0, 0);
    return target.getTime();
  });
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setIsOnline(true);
      } else {
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({
          h: h.toString().padStart(2, "0"),
          m: m.toString().padStart(2, "0"),
          s: s.toString().padStart(2, "0")
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // Lock scroll while countdown is active
  useEffect(() => {
    if (!isOnline) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOnline]);

  // Vanish when time is up
  if (isOnline) return null;

  return (
    <div className="fixed inset-0 z-[100] h-screen w-screen flex flex-col items-center justify-center bg-white/10 dark:bg-black/40 backdrop-blur-3xl">
      <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-black/80 dark:bg-white/10 border border-white/10 rounded-sm shadow-2xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-6">
          LAUNCH COUNTDOWN // T-MINUS
        </div>
        <div className="flex items-center gap-4 text-[#FF4400] font-mono font-bold drop-shadow-[0_0_15px_rgba(255,68,0,0.4)]">
          <div className="flex flex-col items-center">
            <span className="text-6xl md:text-8xl leading-none">{timeLeft.h}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-2">Hours</span>
          </div>
          <span className="text-4xl text-zinc-500 animate-pulse mb-6">:</span>
          <div className="flex flex-col items-center">
            <span className="text-6xl md:text-8xl leading-none">{timeLeft.m}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-2">Minutes</span>
          </div>
          <span className="text-4xl text-zinc-500 animate-pulse mb-6">:</span>
          <div className="flex flex-col items-center">
            <span className="text-6xl md:text-8xl leading-none">{timeLeft.s}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-2">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}
