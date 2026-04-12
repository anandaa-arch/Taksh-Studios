import { HeroSection } from '@/components/sections/HeroSection';
import { PrintingChapter } from '@/components/sections/PrintingChapter';
import { WoodChapter } from '@/components/sections/WoodChapter';
import { ProcessChapter } from '@/components/sections/ProcessChapter';
import { CategoriesChapter } from '@/components/sections/CategoriesChapter';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { CustomOrderCTA } from '@/components/sections/CustomOrderCTA';

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-bg">
      <HeroSection />
      <PrintingChapter />
      <WoodChapter />
      <ProcessChapter />
      <CategoriesChapter />
      <FeaturedProducts />
      <CustomOrderCTA />
    </div>
  );
}
