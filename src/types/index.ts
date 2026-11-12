export type ProductCategory =
  | 'all'
  | 'phone-cases'
  | 'water-bottles'
  | 'arm-straps'
  | 'laptop-cases'
  | 'lunch-boxes'
  | 'earbud-cases';

export type CustomerSegment =
  | 'all'
  | 'runners-gym'
  | 'office-workers'
  | 'students'
  | 'everyday';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  segment: CustomerSegment[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
  highlightSpecs: string[];
  colors: ProductColor[];
  compatibleModels: string[];
  isCustomizable: boolean;
  warranty: string;
  leadTime: string;
}

export interface CustomDesign {
  productType: 'phone-case' | 'water-bottle' | 'arm-strap' | 'laptop-case' | 'lunch-box';
  model: string;
  baseColor: ProductColor;
  accentColor: ProductColor;
  monogramText: string;
  fontStyle: 'bold-sans' | 'editorial-serif' | 'athletic-mono' | 'cyber-script';
  textColor: string;
  textOrientation: 'horizontal' | 'vertical' | 'badge';
  finish: 'matte' | 'glossy' | 'frosted';
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: ProductCategory;
  price: number;
  quantity: number;
  selectedColor: ProductColor;
  selectedModel: string;
  image: string;
  customization?: {
    monogramText: string;
    fontStyle: string;
    accentColorName: string;
    finish: string;
  };
}

export interface BulkOrderQuote {
  companyName: string;
  contactEmail: string;
  organizationType: 'corporate' | 'school-university' | 'sports-club' | 'event';
  productCategory: string;
  quantity: number;
  customLogoNeeded: boolean;
  notes: string;
  estimatedTotal: number;
  discountPercentage: number;
}
