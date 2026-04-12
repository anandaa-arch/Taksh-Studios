import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border mt-auto w-full">
      <div className="h-[1px] w-full bg-gradient-to-r from-accent via-transparent to-accent-hover" />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-20 text-center">
          <Link href="/" className="font-display font-bold uppercase tracking-[-0.04em] leading-[0.9] text-[11vw] md:text-[4.2vw] text-text-primary mb-4">
            TAKSH STUDIOS
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">Crafted with precision. Built to last.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 font-sans text-sm mb-20">
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-text-primary text-[11px] uppercase tracking-wider mb-2">Products</h4>
            <Link href="/products?category=3d-printing" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">3D Printing</Link>
            <Link href="/products?category=wood-carving" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50-warm transition-colors">Wood Carving</Link>
            <Link href="/custom-order" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Custom Orders</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-text-primary text-[11px] uppercase tracking-wider mb-2">Company</h4>
            <Link href="/about" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">About Us</Link>
            <Link href="/process" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Our Process</Link>
            <Link href="/#collections" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Collections</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-text-primary text-[11px] uppercase tracking-wider mb-2">Support</h4>
            <Link href="/custom-order" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Contact</Link>
            <Link href="/faq" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">FAQ</Link>
            <Link href="/shipping" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Shipping & Returns</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-text-primary text-[11px] uppercase tracking-wider mb-2">Social</h4>
            <a href="#" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Instagram</a>
            <a href="#" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Twitter</a>
            <a href="#" className="text-text-secondary text-text-primary hover:border-b hover:border-text-primary/50 transition-colors">Facebook</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 font-mono text-[11px] text-text-muted gap-4">
          <p>© {new Date().getFullYear()} Taksh Studios. All Rights Reserved.</p>
          <p>Made with ♥ in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
