import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-bg">
        <header className="md:hidden p-4 border-b border-border bg-surface flex justify-between items-center">
          <div className="font-display font-bold uppercase tracking-tight text-xl text-text-primary">TAKSH</div>
          <button className="text-text-secondary text-sm">Menu</button>
        </header>
        
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
