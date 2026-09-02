'use client';

import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  // On mount: restore session if it was already authenticated
  useEffect(() => {
    const stored = sessionStorage.getItem('admin_auth');
    if (stored) setAuthed(true);
    setChecking(false);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Build the Basic Auth token: "admin:password" → base64
    const token = 'Basic ' + btoa(`admin:${password}`);

    // Verify the password against the real API
    const res = await fetch('/api/admin/products', {
      headers: { Authorization: token },
    });

    if (res.ok || res.status === 200) {
      sessionStorage.setItem('admin_auth', token);
      setAuthed(true);
    } else if (res.status === 401) {
      setError('Wrong password. Try again.');
    } else {
      setError('Something went wrong. Check the dev server.');
    }
  }

  // While we're reading sessionStorage, show nothing to avoid flicker
  if (checking) return null;

  // Login gate
  if (!authed) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center font-sans">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="font-display font-bold uppercase tracking-tight text-3xl text-text-primary">TAKSH</h1>
            <p className="font-mono text-[10px] uppercase text-text-muted tracking-widest mt-1">Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="bg-surface border border-border rounded-[3px] p-8 flex flex-col gap-5">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">
                Password
              </label>
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg border border-border rounded-[3px] px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p className="text-[13px] text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={!password}
              className="w-full bg-text-primary text-bg font-sans text-sm py-2.5 rounded-[3px] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated – show the full admin shell
  return (
    <div className="min-h-screen bg-bg flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="font-display font-bold uppercase tracking-tight text-2xl text-text-primary">
            TAKSH
          </Link>
          <div className="font-mono text-[10px] uppercase text-text-primary tracking-widest mt-1">Admin Panel</div>
        </div>

        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          <Link href="/admin/orders" className="px-4 py-3 rounded-[3px] hover:bg-bg text-[14px] text-text-secondary hover:text-text-primary transition-colors flex items-center gap-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Orders
          </Link>
          <Link href="/admin/products" className="px-4 py-3 rounded-[3px] hover:bg-bg text-[14px] text-text-secondary hover:text-text-primary transition-colors flex items-center gap-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Products
          </Link>
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false); }}
            className="w-full text-left px-4 py-2 rounded-[3px] text-[13px] text-text-muted hover:text-destructive hover:bg-bg transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-bg">
        <header className="md:hidden p-4 border-b border-border bg-surface flex justify-between items-center">
          <div className="font-display font-bold uppercase tracking-tight text-xl text-text-primary">TAKSH</div>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false); }}
            className="text-text-secondary text-sm"
          >
            Sign out
          </button>
        </header>

        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
