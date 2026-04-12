import { getProductBySlug, products } from '@/lib/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <div className="font-mono text-[11px] text-text-muted uppercase tracking-[3px] mb-8">
          <Link href="/" className="text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* Left — Image Gallery (60%) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-surface rounded-[3px] overflow-hidden relative">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
            </div>
            {/* Thumbnail row placeholder */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {[product.images[0], product.images[0], product.images[0]].map((img, i) => (
                <div key={i} className={`w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-surface rounded-[3px] overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-accent' : 'border-transparent'}`}>
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Info (40%) */}
          <div className="w-full lg:w-[45%] flex flex-col pt-4">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-text-primary mb-4">
              {product.category.replace('-', ' ')}
            </div>
            
            <h1 className="font-display font-bold uppercase tracking-tight text-4xl md:text-5xl text-text-primary leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="font-mono text-[28px] text-text-primary mb-8">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            
            <div className="w-full h-[1px] bg-border mb-8" />
            
            <p className="font-sans text-[16px] text-text-secondary leading-[1.8] mb-10">
              {product.description}
            </p>
            
            {/* Options */}
            <div className="flex flex-col gap-8 mb-10">
              <div>
                <h4 className="font-mono text-[11px] text-text-primary uppercase tracking-[2px] mb-3">Material</h4>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map((mat, i) => (
                    <button key={mat} className={`px-4 py-2 border rounded-[3px] font-sans text-[13px] transition-all ${i === 0 ? 'border-accent text-text-primary bg-text-primary text-bg/5' : 'border-transparent border-[1.5px] border-text-primary/20 text-text-primary hover:border-text-primary'}`}>
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-mono text-[11px] text-text-primary uppercase tracking-[2px] mb-3">Finish</h4>
                <div className="flex flex-wrap gap-3">
                  {product.finishes.map((fin, i) => (
                    <button key={fin} className={`px-4 py-2 border rounded-[3px] font-sans text-[13px] transition-all ${i === 0 ? 'border-accent text-text-primary bg-text-primary text-bg/5' : 'border-transparent border-[1.5px] border-text-primary/20 text-text-primary hover:border-text-primary'}`}>
                      {fin}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-text-secondary font-sans text-[14px] mb-8 bg-surface p-4 rounded-[3px] border border-border/50">
              <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Ships in 5–8 working days · Pan-India delivery</span>
            </div>

            <button className="w-full bg-text-primary text-bg font-sans font-semibold text-[16px] py-4 rounded-[3px] hover:brightness-110 transition-all mb-4">
              Order This Product
            </button>
            <Link href="/custom-order" className="text-center font-sans text-[14px] text-text-muted hover:text-text-primary transition-colors">
              Need a custom variation? →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
