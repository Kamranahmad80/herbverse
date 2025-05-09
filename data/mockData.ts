import { Product } from '@/types/Product';
import { Order } from '@/types/Order';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Echinacea Plant',
    description: 'Echinacea is a powerful immune system booster that helps fight off infections. It\'s commonly used to prevent colds and flu, and can help reduce symptoms and recovery time.',
    price: 15.99,
    image: 'https://images.pexels.com/photos/5490850/pexels-photo-5490850.jpeg',
    category: 'plants',
    rating: 4.5,
    reviews: 128,
    stock: 25,
    popular: true,
    benefits: [
      'Boosts immune system',
      'Reduces cold and flu symptoms',
      'Anti-inflammatory properties',
      'Helps with pain relief'
    ]
  },
  {
    id: '2',
    name: 'Lavender Essential Oil',
    description: 'Pure lavender essential oil with calming properties. Known for its relaxing aroma, this oil helps reduce anxiety and promotes better sleep.',
    price: 18.99,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
    category: 'oils',
    rating: 4.8,
    reviews: 243,
    stock: 42,
    popular: true,
    benefits: [
      'Promotes relaxation and sleep',
      'Reduces anxiety and stress',
      'Soothes skin irritations',
      'Natural fragrance for home'
    ]
  },
  {
    id: '3',
    name: 'Chamomile Tea',
    description: 'Organic chamomile tea made from premium dried flowers. This gentle herbal tea has calming effects and is perfect for evening relaxation.',
    price: 12.50,
    image: 'https://images.pexels.com/photos/6087288/pexels-photo-6087288.jpeg',
    category: 'teas',
    rating: 4.6,
    reviews: 189,
    stock: 56,
    popular: false,
    benefits: [
      'Improves sleep quality',
      'Reduces stress and anxiety',
      'Soothes digestive issues',
      'Contains antioxidants'
    ]
  },
  {
    id: '4',
    name: 'Turmeric Capsules',
    description: 'High-potency turmeric capsules with curcumin and black pepper for maximum absorption. These supplements provide powerful anti-inflammatory benefits.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/6693601/pexels-photo-6693601.jpeg',
    category: 'capsules',
    rating: 4.7,
    reviews: 312,
    stock: 38,
    popular: true,
    benefits: [
      'Reduces inflammation',
      'Improves joint health',
      'Supports immune function',
      'Powerful antioxidant properties'
    ]
  },
  {
    id: '5',
    name: 'Aloe Vera Gel',
    description: 'Pure organic aloe vera gel harvested from mature plants. This versatile gel soothes sunburns, moisturizes skin, and can even be used for hair care.',
    price: 14.50,
    image: 'https://images.pexels.com/photos/7195133/pexels-photo-7195133.jpeg',
    category: 'skincare',
    rating: 4.9,
    reviews: 276,
    stock: 47,
    popular: true,
    benefits: [
      'Soothes sunburns and skin irritations',
      'Natural moisturizer',
      'Reduces skin inflammation',
      'Supports wound healing'
    ]
  },
  {
    id: '6',
    name: 'Peppermint Oil',
    description: 'Concentrated peppermint essential oil for aromatherapy and topical use. This refreshing oil helps with digestion, headaches, and provides mental clarity.',
    price: 16.99,
    image: 'https://images.pexels.com/photos/6694788/pexels-photo-6694788.jpeg',
    category: 'oils',
    rating: 4.6,
    reviews: 198,
    stock: 33,
    popular: false,
    benefits: [
      'Relieves headaches',
      'Improves digestion',
      'Enhances mental focus',
      'Soothes muscle aches'
    ]
  },
  {
    id: '7',
    name: 'Ginger Root',
    description: 'Fresh organic ginger root for cooking and herbal preparations. Ginger has powerful digestive benefits and anti-inflammatory properties.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/5652354/pexels-photo-5652354.jpeg',
    category: 'plants',
    rating: 4.5,
    reviews: 143,
    stock: 62,
    popular: false,
    benefits: [
      'Aids digestion',
      'Reduces nausea',
      'Anti-inflammatory properties',
      'Supports immune health'
    ]
  },
  {
    id: '8',
    name: 'Eucalyptus Shower Steamers',
    description: 'Aromatherapy shower steamers infused with eucalyptus essential oil. These tablets release invigorating vapors during your shower to clear sinuses and refresh the mind.',
    price: 19.99,
    image: 'https://images.pexels.com/photos/8365688/pexels-photo-8365688.jpeg',
    category: 'aromatherapy',
    rating: 4.7,
    reviews: 167,
    stock: 28,
    popular: false,
    benefits: [
      'Clears sinuses and airways',
      'Invigorating aromatherapy',
      'Relieves congestion',
      'Enhances shower experience'
    ]
  }
];

export const mockOrders: Order[] = [
  {
    id: '1245',
    customer: {
      id: 'cust123',
      name: 'John Smith',
      email: 'john@example.com',
      address: '123 Main St, New York, NY 10001'
    },
    items: [
      {
        id: '1',
        name: 'Echinacea Plant',
        price: 15.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/5490850/pexels-photo-5490850.jpeg'
      },
      {
        id: '2',
        name: 'Lavender Essential Oil',
        price: 18.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'
      }
    ],
    total: 50.97,
    status: 'Processing',
    date: 'May 15, 2025',
    deliveryDate: 'May 22, 2025'
  },
  {
    id: '1246',
    customer: {
      id: 'cust456',
      name: 'Emma Johnson',
      email: 'emma@example.com',
      address: '456 Park Ave, Boston, MA 02215'
    },
    items: [
      {
        id: '4',
        name: 'Turmeric Capsules',
        price: 24.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/6693601/pexels-photo-6693601.jpeg'
      },
      {
        id: '5',
        name: 'Aloe Vera Gel',
        price: 14.50,
        quantity: 2,
        image: 'https://images.pexels.com/photos/7195133/pexels-photo-7195133.jpeg'
      }
    ],
    total: 53.99,
    status: 'Shipped',
    date: 'May 14, 2025',
    deliveryDate: 'May 19, 2025'
  },
  {
    id: '1247',
    customer: {
      id: 'cust789',
      name: 'Michael Brown',
      email: 'michael@example.com',
      address: '789 Oak St, Chicago, IL 60607'
    },
    items: [
      {
        id: '3',
        name: 'Chamomile Tea',
        price: 12.50,
        quantity: 3,
        image: 'https://images.pexels.com/photos/6087288/pexels-photo-6087288.jpeg'
      }
    ],
    total: 37.50,
    status: 'Delivered',
    date: 'May 10, 2025',
    deliveryDate: 'May 15, 2025'
  },
  {
    id: '1248',
    customer: {
      id: 'cust101',
      name: 'Sophia Garcia',
      email: 'sophia@example.com',
      address: '101 Pine St, Seattle, WA 98101'
    },
    items: [
      {
        id: '6',
        name: 'Peppermint Oil',
        price: 16.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/6694788/pexels-photo-6694788.jpeg'
      },
      {
        id: '8',
        name: 'Eucalyptus Shower Steamers',
        price: 19.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/8365688/pexels-photo-8365688.jpeg'
      }
    ],
    total: 56.97,
    status: 'Delivered',
    date: 'May 5, 2025',
    deliveryDate: 'May 10, 2025'
  },
  {
    id: '1249',
    customer: {
      id: 'cust202',
      name: 'William Lee',
      email: 'william@example.com',
      address: '202 Cedar St, Austin, TX 78701'
    },
    items: [
      {
        id: '7',
        name: 'Ginger Root',
        price: 8.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/5652354/pexels-photo-5652354.jpeg'
      },
      {
        id: '1',
        name: 'Echinacea Plant',
        price: 15.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/5490850/pexels-photo-5490850.jpeg'
      }
    ],
    total: 33.97,
    status: 'Processing',
    date: 'May 16, 2025',
    deliveryDate: 'May 23, 2025'
  }
];