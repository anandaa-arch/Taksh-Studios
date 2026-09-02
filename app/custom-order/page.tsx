'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ALLOWED_EXTENSIONS = ['.stl', '.obj', '.jpg', '.jpeg', '.png', '.pdf'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export default function CustomOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [type, setType] = useState<'3d-printing' | 'wood-carving'>('3d-printing');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function validateFile(file: File): string | null {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return `File type "${extension}" is not supported. Accepted: ${ALLOWED_EXTENSIONS.join(', ')}`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File is too large (${formatFileSize(file.size)}). Maximum size is 25MB.`;
    }
    return null;
  }

  function handleFileSelect(file: File) {
    setFileError('');
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleRemoveFile() {
    setSelectedFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    // Append the product type (synced from state, not a native form element)
    formData.set('productType', type);

    // Append the file if selected
    if (selectedFile) {
      formData.set('referenceFile', selectedFile);
    }

    try {
      const res = await fetch('/api/custom-order', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="relative isolate w-full min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
        <video
          src="/videos/80f23c9ddf27c39529e86cc817bf6d3a.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0 pointer-events-none" />

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

          <h2 className="font-display font-bold uppercase tracking-tight text-4xl md:text-5xl text-white mb-6">
            We&apos;ve Received Your Vision.
          </h2>
          <p className="font-sans text-[16px] text-white/80 max-w-md mx-auto mb-10 leading-relaxed">
            Our team will reach out within 24 hours to discuss your order and provide a direct quote.
          </p>

          <Link 
            href="/"
            className="font-sans text-[14px] text-white/80 hover:border-b hover:border-white/60 transition-colors"
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
        className="fixed inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0 pointer-events-none" />

      {/* Hero Banner */}
      <div className="relative z-10 w-full h-[320px] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-surface/40 border-y border-border">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg to-transparent" />
        <div className="relative z-10">
          <h1 className="font-display font-bold uppercase tracking-tight text-5xl md:text-[56px] text-white mb-4">
            Tell Us Your Vision
          </h1>
          <p className="font-sans text-[16px] text-white/80">
            We craft it. Exactly as you imagine.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-[680px] mx-auto px-6 mt-16">
        {/* Error Banner */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-[3px] flex items-start gap-3"
          >
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.27 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="font-sans text-[14px] text-red-400">{errorMessage}</p>
            </div>
          </motion.div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="font-sans text-[14px] text-text-primary">Full Name</label>
              <input required id="fullName" name="fullName" type="text" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none transition-colors" placeholder="Yuvraj Singh" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans text-[14px] text-text-primary">Email Address</label>
              <input required id="email" name="email" type="email" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none transition-colors" placeholder="yuvraj@example.com" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-sans text-[14px] text-text-primary">Phone Number</label>
            <input required id="phone" name="phone" type="tel" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none transition-colors" placeholder="+91 XXXXX XXXXX" />
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
            <label htmlFor="description" className="font-sans text-[14px] text-text-primary">Describe Your Idea</label>
            <textarea required id="description" name="description" className="w-full min-h-[160px] bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none transition-colors resize-y" placeholder="Describe the dimensions, specific features, or text you want..." />
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-[14px] text-text-primary">Upload Reference (Optional)</label>
            <input
              ref={fileInputRef}
              type="file"
              name="referenceFile"
              accept=".stl,.obj,.jpg,.jpeg,.png,.pdf"
              onChange={handleFileInputChange}
              className="hidden"
              id="referenceFile"
            />

            {selectedFile ? (
              <div className="w-full p-6 border border-accent/50 rounded-[3px] bg-surface flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <svg className="w-6 h-6 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="min-w-0">
                    <div className="font-sans text-[14px] text-text-primary truncate">{selectedFile.name}</div>
                    <div className="font-sans text-[12px] text-text-muted">{formatFileSize(selectedFile.size)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="flex-shrink-0 ml-4 p-1.5 text-text-muted hover:text-red-400 transition-colors"
                  aria-label="Remove file"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full p-10 border border-dashed rounded-[3px] flex flex-col items-center text-center transition-colors cursor-pointer group ${
                  isDragging
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-surface hover:border-accent/50'
                }`}
              >
                <svg className="w-8 h-8 text-text-muted group-hover:text-text-primary transition-colors mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <div className="font-sans text-[15px] text-text-primary mb-2">
                  {isDragging ? 'Drop your file here' : 'Drop your file here or click to browse'}
                </div>
                <div className="font-sans text-[13px] text-text-muted">Accepts: .STL, .OBJ, .JPG, .PNG, .PDF — Max 25MB</div>
              </div>
            )}

            {fileError && (
              <p className="font-sans text-[13px] text-red-400 mt-1">{fileError}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="material" className="font-sans text-[14px] text-text-primary">Preferred Material / Finish</label>
              <select id="material" name="material" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none appearance-none">
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
              <label htmlFor="quantity" className="font-sans text-[14px] text-text-primary">Quantity</label>
              <input id="quantity" name="quantity" type="number" min="1" defaultValue="1" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="deadline" className="font-sans text-[14px] text-text-primary">Required By (Optional)</label>
              <input id="deadline" name="deadline" type="date" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="font-sans text-[14px] text-text-primary">Budget Range (Optional)</label>
              <select id="budget" name="budget" className="w-full bg-surface border border-border rounded-[3px] px-4 py-3.5 text-text-primary font-sans text-[15px] focus:border-accent focus:outline-none appearance-none">
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
