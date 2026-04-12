export type ProductCategory = '3d-printing' | 'wood-carving';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  images: string[];
  materials: string[];
  finishes: string[];
  popular?: boolean;
}

export const products: Product[] = [
  // 3D Printed Products
  {
    id: 'p-001',
    slug: 'geometric-planter',
    name: 'Geometric Planter',
    price: 1200,
    category: '3d-printing',
    description: 'A modern, geometric design planter perfect for succulents or small indoor plants. 3D printed with durable PLA material, it combines functionality with a sleek aesthetic.',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1000',
    ],
    materials: ['PLA', 'PETG', 'Resin'],
    finishes: ['Raw', 'Matte Painted', 'Glossy'],
    popular: true,
  },
  {
    id: 'p-002',
    slug: 'custom-mechanical-keyboard-case',
    name: 'Custom Mechanical Keyboard Case',
    price: 4500,
    category: '3d-printing',
    description: 'High-precision 3D printed cases for custom mechanical keyboards. Available in multiple layouts including 60%, 65%, and TKL. Built for maximum thock and durability.',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000',
    ],
    materials: ['PETG', 'ABS', 'Resin'],
    finishes: ['Raw', 'Sanded', 'Polished'],
  },
  {
    id: 'p-003',
    slug: 'fantasy-tabletop-miniatures',
    name: 'Fantasy Tabletop Miniatures',
    price: 800,
    category: '3d-printing',
    description: 'Highly detailed resin prints for your next D&D campaign. Capturing the finest details using 8K resin printers, ready to be painted or used straight away.',
    images: [
      'https://images.unsplash.com/photo-1581446825135-266181fa8b57?auto=format&fit=crop&q=80&w=1000',
    ],
    materials: ['Standard Resin', 'Tough Resin'],
    finishes: ['Raw Grey', 'Primed'],
    popular: true,
  },
  {
    id: 'p-004',
    slug: 'headphone-stand-minimalist',
    name: 'Minimalist Headphone Stand',
    price: 1500,
    category: '3d-printing',
    description: 'Sleek headphone stand designed to complement any premium desk setup. Sturdy base with a gentle curve to protect headband padding.',
    images: [
      'https://images.unsplash.com/photo-1599669500516-b600f2048714?auto=format&fit=crop&q=80&w=1000',
    ],
    materials: ['PLA', 'CF-PETG'],
    finishes: ['Raw', 'Matte Black', 'Wood Fiber'],
  },

  // Wood Carving Products
  {
    id: 'w-001',
    slug: 'hand-carved-mandala-panel',
    name: 'Hand-Carved Mandala Panel',
    price: 8500,
    category: 'wood-carving',
    description: 'Intricate wooden mandala wall art, carved entirely by hand. Featuring complex sacred geometry patterns that bring peaceful energy to any space.',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1000',
    ],
    materials: ['Teak', 'Rosewood', 'Mango Wood'],
    finishes: ['Natural Oil', 'Dark Stain', 'Distressed'],
    popular: true,
  },
  {
    id: 'w-002',
    slug: 'traditional-elephant-figurine',
    name: 'Traditional Elephant Figurine',
    price: 3200,
    category: 'wood-carving',
    description: 'A symbol of wisdom and luck, this elephant figurine is carved by master artisans showcasing traditional Indian motifs and exceptional craftsmanship.',
    images: [
      'https://images.unsplash.com/photo-1582200388701-4ec4ca53696a?auto=format&fit=crop&q=80&w=1000',
    ],
    materials: ['Sandalwood', 'Rosewood'],
    finishes: ['Polished', 'Matte'],
    popular: true,
  },
  {
    id: 'w-003',
    slug: 'custom-nameplate-with-motifs',
    name: 'Custom Wooden Nameplate',
    price: 2800,
    category: 'wood-carving',
    description: 'Warm, inviting nameplates for your home. Deep carved lettering accompanied by floral or geometric border motifs, finished for outdoor weather resistance.',
    images: [
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=1000',
    ],
    materials: ['Teak Wood'],
    finishes: ['Weatherproof Varnish', 'PU Coat'],
  },
  {
    id: 'w-004',
    slug: 'abstract-sculpture-centerpiece',
    name: 'Abstract Sculpture Centerpiece',
    price: 12000,
    category: 'wood-carving',
    description: 'A striking abstract piece designed as a conversation starter. Smooth, flowing lines carved from a single solid block of premium wood.',
    images: [
      'https://images.unsplash.com/photo-1513511110034-77db8688849b?auto=format&fit=crop&q=80&w=1000',
    ],
    materials: ['Walnut', 'Teak'],
    finishes: ['Danish Oil', 'High Gloss', 'Matte Wax'],
  }
];

export const getProducts = () => products;
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getPopularProducts = () => products.filter((p) => p.popular);
export const getProductsByCategory = (category: ProductCategory | 'all') => 
  category === 'all' ? products : products.filter((p) => p.category === category);
