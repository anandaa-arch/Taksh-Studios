'use client';

import { getProducts } from '@/lib/data/products';

export default function AdminProductsPage() {
  const products = getProducts();

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display font-bold uppercase tracking-tight text-4xl text-text-primary mb-2">Products</h1>
          <p className="font-sans text-sm text-text-secondary">Manage your product catalog.</p>
        </div>
        <button className="bg-text-primary text-bg font-sans text-sm px-6 py-2 rounded-[3px] hover:brightness-110 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      <div className="bg-surface border border-border rounded-[3px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-[14px]">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Image</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Name</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Category</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Price</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-bg/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-bg rounded-[3px] overflow-hidden">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-sans text-text-primary">{product.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-[3px] bg-bg text-text-secondary border border-border text-[12px]">
                      {product.category.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-text-primary">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-text-muted hover:text-text-primary px-2 transition-colors">Edit</button>
                    <button className="text-text-muted hover:text-destructive px-2 transition-colors ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
