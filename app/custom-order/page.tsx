'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CustomOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [type, setType] = useState<'3d-printing' | 'wood-carving'>('3d-printing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="relative isolate w-full min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
        <video
          src="/videos/80f23c9ddf27c39529e86cc817bf6d3a.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover opacity-40 -z-10"
        />
        <div className="absolute inset-0 z-0 bg-black/55 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 rounded-[3px] bg-text-primary text-bg/10 border border-accent flex items-center justify-center mb-8"
          >
            <motion.svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-12 h-12 text-text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>

          <h2 className="font-display font-bold uppercase tracking-tight text-4xl md:text-5xl text-text-primary mb-6">
            We&apos;ve Received Your Vision.
          </h2>
          <p className="font-sans text-[16px] text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
            Our team will reach out within 24 hours to discuss your order and provide a direct quote.
          </p>

          <Link 
            href="/"
            className="font-sans text-[14px] text-text-muted text-text-primary hover:border-b hover:border-text-primary/50 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate w-full min-h-screen bg-bg pt-20 pb-32">
      <video
        src="/videos/80f23c9ddf27c39529e86cc817bf6d3a.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-40 -z-10"
      />
      <div className="absolute inset-0 z-0 bg-black/60 pointer-events-none" />

      {/* Hero Banner */}
      <div className="relative z-10 w-full h-[320px] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-surface/40 border-y border-border">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg to-transparent" />
        <div className="relative z-10">
          <h1 className="font-display font-bold uppercase tracking-tight text-5xl md:text-[56px] text-text-primary mb-4">
            Tell Us Your Vision
          </h1>
          <p className="font-sans text-[16px] text-text-secondary">
            We craft it. Exactly as you imagine.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-[680px] mx-auto px-6 mt-16">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] text-text-primary">Full Name</label>
              <input required type="text" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none transition-colors" placeholder="Yuvraj Singh" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] text-text-primary">Email Address</label>
              <input required type="email" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none transition-colors" placeholder="yuvraj@example.com" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-[14px] text-text-primary">Phone Number</label>
            <input required type="tel" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none transition-colors" placeholder="+91 XXXXX XXXXX" />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <label className="font-sans text-[14px] text-text-primary">Product Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setType('3d-printing')}
                className={`p-6 border rounded-[3px] cursor-pointer transition-all ${type === '3d-printing' ? 'border-accent bg-text-primary text-bg/5' : 'border-border bg-surface hover:border-text-secondary'}`}
              >
                <div className={`font-mono text-[12px] uppercase ${type === '3d-printing' ? 'text-text-primary' : 'text-text-primary'} mb-2`}>3D Printed Product</div>
                <div className="font-sans text-[13px] text-text-secondary">PLA, PETG, Resin. Great for prototypes, cosplay, and gifts.</div>
              </div>
              
              <div 
                onClick={() => setType('wood-carving')}
                className={`p-6 border rounded-[3px] cursor-pointer transition-all ${type === 'wood-carving' ? 'border-accent bg-text-primary text-bg/5' : 'border-border bg-surface hover:border-text-secondary'}`}
              >
                <div className={`font-mono text-[12px] uppercase ${type === 'wood-carving' ? 'text-text-primary' : 'text-text-primary'} mb-2`}>Wood Carving</div>
                <div className="font-sans text-[13px] text-text-secondary">Teak, Rosewood. Hand-carved artwork, nameplates, panels.</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-[14px] text-text-primary">Describe Your Idea</label>
            <textarea required className="w-full min-h-[160px] bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none transition-colors resize-y" placeholder="Describe the dimensions, specific features, or text you want..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-[14px] text-text-primary">Upload Reference (Optional)</label>
            <div className="w-full p-10 border border-dashed border-border rounded-[3px] flex flex-col items-center text-center bg-surface hover:border-accent/50 transition-colors cursor-pointer group">
              <svg className="w-8 h-8 text-text-muted group-text-text-primary hover:border-b hover:border-text-primary/50 transition-colors mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <div className="font-sans text-[15px] text-text-primary mb-2">Drop your file here or click to browse</div>
              <div className="font-sans text-[13px] text-text-muted">Accepts: .STL, .OBJ, .JPG, .PNG, .PDF — Max 25MB</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] text-text-primary">Preferred Material / Finish</label>
              <select className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none appearance-none">
                <option value="recommend">Recommend for me</option>
                {type === '3d-printing' ? (
                  <>
                    <option value="pla">Standard PLA (Matte/Glossy)</option>
                    <option value="resin">High-Detail Resin</option>
                  </>
                ) : (
                  <>
                    <option value="teak">Premium Teak Wood</option>
                    <option value="rosewood">Rosewood</option>
                  </>
                )}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] text-text-primary">Quantity</label>
              <input type="number" min="1" defaultValue="1" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] text-text-primary">Required By (Optional)</label>
              <input type="date" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] text-text-primary">Budget Range (Optional)</label>
              <select className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none appearance-none">
                <option value="no-budget">No specific budget</option>
                <option value="under-2k">Under ₹2,000</option>
                <option value="2k-5k">₹2,000 - ₹5,000</option>
                <option value="5k-10k">₹5,000 - ₹10,000</option>
                <option value="10k-plus">₹10,000+</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-text-primary text-bg font-sans font-semibold text-[18px] py-4 rounded-[3px] hover:brightness-110 hover:shadow-[0_0_24px_rgba(255,92,0,0.2)] transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit My Order Request'}
          </button>
          
        </form>
      </div>
    </div>
  );
}
