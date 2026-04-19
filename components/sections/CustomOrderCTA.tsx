import { ScrollAnimationWrapper } from '../shared/ScrollAnimationWrapper';
import { ChapterLabel } from '../shared/ChapterLabel';
import Link from 'next/link';
import { MagneticButton } from '../ui/MagneticButton';

export function CustomOrderCTA() {
  return (
    <section id="custom" className="relative w-full h-[80vh] md:h-screen overflow-hidden flex flex-col justify-center bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611078701831-5079a495dbbd?q=80&w=2000&auto=format&fit=crop&grayscale=true)' }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
        <ScrollAnimationWrapper delay={0.1}>
          <ChapterLabel tag="06 / CUSTOM" colorClass="text-white/60" />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.2}>
          <h2 className="font-display font-bold uppercase tracking-[-0.04em] text-white leading-[0.9] text-[11vw] md:text-[5.2vw] mb-6">
            Initiate Custom
            <span className="block text-accent">Fabrication.</span>
          </h2>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.3}>
          <p className="font-sans text-[18px] text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Bring us your idea — sketch, description, or file. We&apos;ll craft it exactly the way you imagined.
          </p>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.4}>
          <MagneticButton className="inline-block">
            <Link 
              href="/custom-order"
              className="inline-block font-sans text-[16px] font-semibold bg-[#09090B] text-white border border-white/20 px-12 py-5 rounded-[3px] hover:bg-black hover:shadow-[0_8px_32px_rgba(255,92,0,0.2)] transition-all duration-300"
            >
              Start Your Custom Order
            </Link>
          </MagneticButton>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
