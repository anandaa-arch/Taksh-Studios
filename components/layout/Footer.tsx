import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 mt-auto w-full">
      <div className="h-[1px] w-full bg-gradient-to-r from-accent via-transparent to-accent" />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-20 text-center">
          <Link href="/" className="font-display font-bold uppercase tracking-[-0.04em] leading-[0.9] text-[11vw] md:text-[4.2vw] text-white mb-4">
            TAKSH STUDIOS
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">Crafted with precision. Built to last.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 font-sans text-sm mb-20">
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-white text-[11px] uppercase tracking-wider mb-2">Products</h4>
            <Link href="/products?category=3d-printing" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">3D Printing</Link>
            <Link href="/products?category=wood-carving" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Wood Carving</Link>
            <Link href="/custom-order" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Custom Orders</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-white text-[11px] uppercase tracking-wider mb-2">Company</h4>
            <Link href="/about" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">About Us</Link>
            <Link href="/process" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Our Process</Link>
            <Link href="/#collections" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Collections</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-white text-[11px] uppercase tracking-wider mb-2">Support</h4>
            <Link href="/custom-order" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Contact</Link>
            <Link href="/faq" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">FAQ</Link>
            <Link href="/shipping" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Shipping & Returns</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-white text-[11px] uppercase tracking-wider mb-2">Social</h4>
            <a href="#" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Instagram</a>
            <a href="#" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Twitter</a>
            <a href="#" className="text-white/70 hover:text-white hover:border-b hover:border-white/40 transition-colors">Facebook</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-mono text-[11px] text-white/55 gap-4">
          <p>© {new Date().getFullYear()} Taksh Studios. All Rights Reserved.</p>
          <p>Made with ♥ in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
