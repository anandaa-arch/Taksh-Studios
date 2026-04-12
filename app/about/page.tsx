import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-bg pt-20">
      {/* Hero */}
      <div className="relative w-full h-[60vh] flex flex-col justify-end px-6 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507908708918-778587c9e563?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-multiply opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <div className="font-mono text-[11px] text-text-primary uppercase tracking-[3px] mb-6">
            Our Story
          </div>
          <h1 className="font-display font-bold uppercase tracking-[-0.04em] text-5xl md:text-[72px] text-text-primary leading-[0.95] mb-6">
            Tradition Meets <br /> Technology.
          </h1>
          <p className="font-sans text-[18px] text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Founded in Yamunanagar, Haryana — a region renowned for its woodworking heritage. Taksh Studios bridges the gap between ancestral craftsmanship and modern precision manufacturing.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col gap-24">
        
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-bold uppercase tracking-tight text-4xl text-text-primary mb-6">The Wood Carving Heritage</h2>
            <p className="font-sans text-[16px] text-text-secondary leading-relaxed mb-4">
              Yamunanagar has stood as a beacon of timber and woodwork in India for decades. We grew up surrounded by artisans who could breathe life into a block of wood with just a chisel and hammer.
            </p>
            <p className="font-sans text-[16px] text-text-secondary leading-relaxed">
              Today, we employ those same master artisans, giving them a platform to share their generational craft with the entire country. Every wooden panel, nameplate, and sculpture we produce carries the soul of this land.
            </p>
          </div>
          <div className="aspect-square bg-surface border border-border/50 rounded-[3px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1611077544805-5926c483fe64?auto=format&fit=crop&q=80" alt="Wood Carving" className="w-full h-full object-cover grayscale opacity-80" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 aspect-[4/3] bg-surface border border-border/50 rounded-[3px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80" alt="3D Printing" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display font-bold uppercase tracking-tight text-4xl text-text-primary mb-6">The 3D Printing Revolution</h2>
            <p className="font-sans text-[16px] text-text-secondary leading-relaxed mb-4">
              While we honor tradition, we don&apos;t ignore the future. 3D printing represents the ultimate democratisation of manufacturing.
            </p>
            <p className="font-sans text-[16px] text-text-secondary leading-relaxed">
              We&apos;ve invested in industrial-grade FDM and highly precise Resin printers to build a farm that operates 24/7. From rapid prototyping for engineers to custom gifts for loved ones, we turn digital files into physical reality with micrometer accuracy.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="pt-12 border-t border-border">
          <h2 className="font-display font-bold uppercase tracking-tight text-4xl text-text-primary mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface rounded-[3px]">
              <div className="font-mono text-[14px] text-text-primary mb-4">01. Precision</div>
              <h3 className="font-sans text-[18px] text-text-primary mb-2">Compromise Nothing</h3>
              <p className="font-sans text-[14px] text-text-secondary">If a print fails by a millimeter, or a carving lacks depth, it doesn&apos;t leave our studio.</p>
            </div>
            
            <div className="p-8 bg-surface rounded-[3px]">
              <div className="font-mono text-[14px] text-text-primary mb-4">02. Heritage</div>
              <h3 className="font-sans text-[18px] text-text-primary mb-2">Respect the Craft</h3>
              <p className="font-sans text-[14px] text-text-secondary">We pay our artisans fairly and celebrate the traditional techniques passed down through generations.</p>
            </div>
            
            <div className="p-8 bg-surface rounded-[3px]">
              <div className="font-mono text-[14px] text-text-muted mb-4 uppercase">03. Innovation</div>
              <h3 className="font-sans text-[18px] text-text-primary mb-2">Push Boundaries</h3>
              <p className="font-sans text-[14px] text-text-secondary">We constantly experiment with new filaments, post-processing techniques, and wood finishes.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
