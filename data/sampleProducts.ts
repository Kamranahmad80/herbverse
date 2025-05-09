import { Product } from '@/types/Product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Lavender Essential Oil',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1595252129375-9349b60eb048',
    category: 'Oils',
    description: 'Pure organic lavender essential oil for relaxation and stress relief. Source from sustainable farms.',
    rating: 4.8,
    reviews: 124,
    stock: 45,
    popular: true,
    benefits: ['Promotes relaxation', 'Reduces stress', 'Improves sleep quality', 'Soothes skin irritation']
  },
  {
    id: '2',
    name: 'Chamomile Tea Blend',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1562547256-2c5ee93b60b7',
    category: 'Teas',
    description: 'Organic chamomile tea blend with hints of lemon balm and rose petals for calm and relaxation.',
    rating: 4.6,
    reviews: 89,
    stock: 120,
    popular: true,
    benefits: ['Promotes sleep', 'Calms nerves', 'Aids digestion', 'Rich in antioxidants']
  },
  {
    id: '3',
    name: 'Hemp Seed Oil',
    price: 19.95,
    image: 'https://images.unsplash.com/photo-1559813114-cee7ebb8b40a',
    category: 'Oils',
    description: 'Cold-pressed hemp seed oil rich in omega fatty acids and vitamins. Great for skin and general health.',
    rating: 4.7,
    reviews: 76,
    stock: 30,
    popular: false,
    benefits: ['Rich in Omega 3-6-9', 'Moisturizes skin', 'Anti-inflammatory', 'Promotes heart health']
  },
  {
    id: '4',
    name: 'Ginger Root Extract',
    price: 18.75,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f6',
    category: 'Extracts',
    description: 'Potent ginger root extract for digestive health and immune system support.',
    rating: 4.5,
    reviews: 52,
    stock: 75,
    popular: false,
    benefits: ['Aids digestion', 'Anti-inflammatory', 'Boosts immunity', 'Relieves nausea']
  },
  {
    id: '5',
    name: 'Echinacea Immune Support',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1594645150097-bf2930587f01',
    category: 'Supplements',
    description: 'Natural echinacea supplement to boost your immune system and fight off seasonal challenges.',
    rating: 4.4,
    reviews: 128,
    stock: 200,
    popular: true,
    benefits: ['Immune support', 'Reduces cold duration', 'Anti-inflammatory', 'Antioxidant properties']
  },
  {
    id: '6',
    name: 'Organic Turmeric Powder',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1615485290618-bebed2473557',
    category: 'Spices',
    description: 'High-curcumin organic turmeric powder for anti-inflammatory benefits and cooking.',
    rating: 4.9,
    reviews: 203,
    stock: 150,
    popular: true,
    benefits: ['Anti-inflammatory', 'Antioxidant rich', 'Supports joint health', 'Improves digestion']
  },
  {
    id: '7',
    name: 'Peppermint Essential Oil',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1543482227-30fb80791ae8',
    category: 'Oils',
    description: 'Refreshing peppermint essential oil for aromatherapy, headache relief, and digestive support.',
    rating: 4.7,
    reviews: 97,
    stock: 60,
    popular: false,
    benefits: ['Relieves headaches', 'Aids digestion', 'Refreshes mind', 'Opens airways']
  },
  {
    id: '8',
    name: 'Ashwagandha Root Capsules',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1612964833318-177de095e59a',
    category: 'Supplements',
    description: 'Organic ashwagandha root capsules for stress relief, improved energy and adrenal support.',
    rating: 4.8,
    reviews: 156,
    stock: 90,
    popular: true,
    benefits: ['Reduces stress', 'Balances hormones', 'Improves energy', 'Supports immune function']
  }
];
