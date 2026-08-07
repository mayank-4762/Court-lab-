export type Category = 'all' | 'men' | 'women' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface SpecSheet {
  breathabilityRating: string; // e.g., "98.4%"
  elasticityCoefficient: string; // e.g., "4.8x"
  weightGrams: number; // e.g., 142
  airflowDragCoeff: string; // e.g., "0.18 Cd"
  fabricComposition: string; // e.g., "82% Recycled Aero-Poly, 18% Elastane"
  thermalDissipation: string; // e.g., "-3.2°C Active Cooling"
  durabilityIndex: string; // e.g., "50,000+ Martindale Rubs"
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'men' | 'women' | 'accessories';
  collection: string; // e.g., 'The Apex Collection', 'The Kinetic Series'
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  longDescription: string;
  specSheet: SpecSheet;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  pairedProductId?: string; // for "Complete the Kit"
}

export interface CartItem {
  id: string; // composite id: productId-color-size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface PlayerCalibration {
  heightCm: number;
  weightKg: number;
  playStyle: 'dinker' | 'balanced' | 'power-driver';
  climate: 'hot-humid' | 'indoor' | 'cooler';
  recommendedSize: string;
  recommendedSeries: string;
}

export type PageView =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'anatomy'
  | 'shopify'
  | 'science'
  | 'about'
  | 'policies'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'order-tracking'
  | 'order-history'
  | 'contact';

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  hasPostPurchaseUpsell?: boolean;
  createdAt: string;
  trackingNumber: string;
  status: 'In Deployment' | 'Calibrating Cargo' | 'Out for Delivery' | 'Delivered';
}
