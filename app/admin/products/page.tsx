'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DbProduct } from '@/lib/supabase/types';

type ProductFormData = {
  name: string;
  slug: string;
  price: string;
  category: '3d-printing' | 'wood-carving';
  description: string;
  images: string[];
  materials: string[];
  finishes: string[];
  popular: boolean;
  in_stock: boolean;
};

const EMPTY_FORM: ProductFormData = {
  name: '',
  slug: '',
  price: '',
  category: '3d-printing',
  description: '',
  images: [],
  materials: [],
  finishes: [],
  popular: false,
  in_stock: true,
};


export default function AdminProductsPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<DbProduct | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Temp inputs for array fields
  const [materialInput, setMaterialInput] = useState('');
  const [finishInput, setFinishInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Auto-generate slug from name
  function handleNameChange(name: string) {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug === '' || prev.slug === toSlug(prev.name) ? toSlug(name) : prev.slug,
    }));
  }

  function toSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Array field helpers
  function addToArray(field: 'materials' | 'finishes' | 'images', value: string) {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));
  }

  function removeFromArray(field: 'materials' | 'finishes' | 'images', index: number) {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }

  // Open edit modal
  function openEditModal(product: DbProduct) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      images: [...product.images],
      materials: [...product.materials],
      finishes: [...product.finishes],
      popular: product.popular,
      in_stock: product.in_stock,
    });
    setFormError(null);
  }

  // Open create modal
  function openCreateModal() {
    setShowCreateModal(true);
    setFormData(EMPTY_FORM);
    setFormError(null);
  }

  // Close all modals
  function closeModals() {
    setShowCreateModal(false);
    setEditingProduct(null);
    setDeletingProduct(null);
    setFormData(EMPTY_FORM);
    setFormError(null);
    setMaterialInput('');
    setFinishInput('');
    setImageInput('');
  }

  // Create product
  async function handleCreate() {
    setIsSaving(true);
    setFormError(null);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create product');

      closeModals();
      fetchProducts();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setIsSaving(false);
    }
  }

  // Update product
  async function handleUpdate() {
    if (!editingProduct) return;
    setIsSaving(true);
    setFormError(null);

    try {
      const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update product');

      closeModals();
      fetchProducts();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setIsSaving(false);
    }
  }

  // Delete product
  async function handleDelete() {
    if (!deletingProduct) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/products/${deletingProduct.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete product');

      closeModals();
      fetchProducts();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setIsSaving(false);
    }
  }

  // Shared form fields component
  function renderForm() {
    return (
      <div className="flex flex-col gap-5 max-h-[70vh] overflow-y-auto pr-2">
        {formError && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-[3px] px-4 py-3 text-sm">
            {formError}
          </div>
        )}

        {/* Name + Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-bg border border-border rounded-[3px] px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent"
              placeholder="Geometric Planter"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
              className="w-full bg-bg border border-border rounded-[3px] px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent font-mono"
              placeholder="geometric-planter"
            />
          </div>
        </div>

        {/* Price + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">Price (₹) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
              className="w-full bg-bg border border-border rounded-[3px] px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent font-mono"
              placeholder="1200"
              min="0"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value as ProductFormData['category'] }))}
              className="w-full bg-bg border border-border rounded-[3px] px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="3d-printing">3D Printing</option>
              <option value="wood-carving">Wood Carving</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            rows={3}
            className="w-full bg-bg border border-border rounded-[3px] px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent resize-none"
            placeholder="Product description..."
          />
        </div>

        {/* Image URLs */}
        <div>
          <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">Image URLs</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addToArray('images', imageInput);
                  setImageInput('');
                }
              }}
              className="flex-1 bg-bg border border-border rounded-[3px] px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
              placeholder="https://..."
            />
            <button
              type="button"
              onClick={() => { addToArray('images', imageInput); setImageInput(''); }}
              className="px-3 py-2 bg-surface border border-border rounded-[3px] text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.images.map((img, i) => (
              <div key={i} className="flex items-center gap-1 bg-bg border border-border rounded-[3px] px-2 py-1 text-[12px] text-text-secondary">
                <span className="max-w-[200px] truncate">{img}</span>
                <button onClick={() => removeFromArray('images', i)} className="text-text-muted hover:text-destructive ml-1">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div>
          <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">Materials</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={materialInput}
              onChange={(e) => setMaterialInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addToArray('materials', materialInput);
                  setMaterialInput('');
                }
              }}
              className="flex-1 bg-bg border border-border rounded-[3px] px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
              placeholder="PLA, PETG, Resin..."
            />
            <button
              type="button"
              onClick={() => { addToArray('materials', materialInput); setMaterialInput(''); }}
              className="px-3 py-2 bg-surface border border-border rounded-[3px] text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.materials.map((mat, i) => (
              <span key={i} className="flex items-center gap-1 bg-bg border border-border rounded-[3px] px-2 py-1 text-[12px] text-text-secondary">
                {mat}
                <button onClick={() => removeFromArray('materials', i)} className="text-text-muted hover:text-destructive ml-1">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Finishes */}
        <div>
          <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">Finishes</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={finishInput}
              onChange={(e) => setFinishInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addToArray('finishes', finishInput);
                  setFinishInput('');
                }
              }}
              className="flex-1 bg-bg border border-border rounded-[3px] px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
              placeholder="Raw, Matte, Glossy..."
            />
            <button
              type="button"
              onClick={() => { addToArray('finishes', finishInput); setFinishInput(''); }}
              className="px-3 py-2 bg-surface border border-border rounded-[3px] text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.finishes.map((fin, i) => (
              <span key={i} className="flex items-center gap-1 bg-bg border border-border rounded-[3px] px-2 py-1 text-[12px] text-text-secondary">
                {fin}
                <button onClick={() => removeFromArray('finishes', i)} className="text-text-muted hover:text-destructive ml-1">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.popular}
              onChange={(e) => setFormData((p) => ({ ...p, popular: e.target.checked }))}
              className="accent-accent w-4 h-4"
            />
            <span className="text-sm text-text-secondary">Popular</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.in_stock}
              onChange={(e) => setFormData((p) => ({ ...p, in_stock: e.target.checked }))}
              className="accent-accent w-4 h-4"
            />
            <span className="text-sm text-text-secondary">In Stock</span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display font-bold uppercase tracking-tight text-4xl text-text-primary mb-2">Products</h1>
          <p className="font-sans text-sm text-text-secondary">
            {isLoading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} in catalog`}
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-text-primary text-bg font-sans text-sm px-6 py-2 rounded-[3px] hover:brightness-110 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-[3px] px-4 py-3 text-sm mb-6">
          {error}
          <button onClick={fetchProducts} className="ml-3 underline">Retry</button>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-surface border border-border rounded-[3px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-[14px]">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Image</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Name</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Category</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Price</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Status</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="w-12 h-12 bg-bg rounded-[3px] animate-pulse" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-bg rounded animate-pulse w-32" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-bg rounded animate-pulse w-20" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-bg rounded animate-pulse w-16" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-bg rounded animate-pulse w-16" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-bg rounded animate-pulse w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                    No products yet. Click &quot;Add Product&quot; to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-bg/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-bg rounded-[3px] overflow-hidden">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-80" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-muted text-[10px]">No img</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-sans text-text-primary">{product.name}</div>
                      <div className="font-mono text-[11px] text-text-muted mt-0.5">/{product.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-[3px] bg-bg text-text-secondary border border-border text-[12px]">
                        {product.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-text-primary">₹{product.price.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.in_stock ? (
                          <span className="px-2 py-0.5 rounded-[3px] bg-green-500/10 text-green-400 border border-green-500/20 text-[11px]">In Stock</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-[3px] bg-destructive/10 text-destructive border border-destructive/20 text-[11px]">Out of Stock</span>
                        )}
                        {product.popular && (
                          <span className="px-2 py-0.5 rounded-[3px] bg-accent/10 text-accent border border-accent/20 text-[11px]">★ Popular</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEditModal(product)} className="text-text-muted hover:text-text-primary px-2 transition-colors">Edit</button>
                      <button onClick={() => setDeletingProduct(product)} className="text-text-muted hover:text-destructive px-2 transition-colors ml-2">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ CREATE MODAL ============ */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-[3px] w-full max-w-xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-bold uppercase tracking-tight text-xl text-text-primary">New Product</h2>
              <button onClick={closeModals} className="text-text-muted hover:text-text-primary text-xl leading-none">&times;</button>
            </div>
            
            {renderForm()}

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button onClick={closeModals} className="px-5 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={isSaving || !formData.name || !formData.slug || !formData.price}
                className="px-5 py-2 bg-text-primary text-bg text-sm rounded-[3px] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ EDIT MODAL ============ */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-[3px] w-full max-w-xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-bold uppercase tracking-tight text-xl text-text-primary">Edit Product</h2>
              <button onClick={closeModals} className="text-text-muted hover:text-text-primary text-xl leading-none">&times;</button>
            </div>
            
            {renderForm()}

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button onClick={closeModals} className="px-5 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isSaving || !formData.name || !formData.slug || !formData.price}
                className="px-5 py-2 bg-text-primary text-bg text-sm rounded-[3px] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ DELETE CONFIRMATION ============ */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-[3px] w-full max-w-md p-6 shadow-2xl">
            <h2 className="font-display font-bold uppercase tracking-tight text-xl text-text-primary mb-4">Delete Product</h2>
            <p className="font-sans text-sm text-text-secondary mb-2">
              Are you sure you want to delete <strong className="text-text-primary">{deletingProduct.name}</strong>?
            </p>
            <p className="font-sans text-[13px] text-destructive mb-6">
              This action cannot be undone.
            </p>

            {formError && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-[3px] px-4 py-3 text-sm mb-4">
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button onClick={closeModals} className="px-5 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="px-5 py-2 bg-destructive text-white text-sm rounded-[3px] hover:brightness-110 transition-all disabled:opacity-40"
              >
                {isSaving ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
