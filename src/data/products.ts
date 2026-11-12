import { Product, ProductColor } from '../types';
import phoneCaseImg from '../assets/images/product_phone_case_1794491769873.jpg';
import waterBottleImg from '../assets/images/product_water_bottle_1794491770312.jpg';
import laptopLunchboxImg from '../assets/images/product_laptop_lunchbox_1794491771500.jpg';

export const COLOR_PALETTE: ProductColor[] = [
  { id: 'sage', name: 'Pastel Sage', hex: '#94A694', secondaryHex: '#7C8E7C' },
  { id: 'sand', name: 'Desert Sand', hex: '#CDBCA6', secondaryHex: '#9E8B75' },
  { id: 'obsidian', name: 'Matte Obsidian', hex: '#262629', secondaryHex: '#141416' },
  { id: 'chalk', name: 'Frost White', hex: '#F3F4F6', secondaryHex: '#D1D5DB' },
  { id: 'cobalt', name: 'Cobalt Shield', hex: '#1D4ED8', secondaryHex: '#172554' },
  { id: 'coral', name: 'Sunset Coral', hex: '#F97316', secondaryHex: '#C2410C' },
  { id: 'lavender', name: 'Lavender Mist', hex: '#C084FC', secondaryHex: '#9333EA' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-impact-phone-case',
    name: 'Kinetiq Pro Impact Phone Case',
    category: 'phone-cases',
    segment: ['runners-gym', 'students', 'everyday'],
    price: 48,
    originalPrice: 58,
    rating: 4.9,
    reviewCount: 1420,
    image: phoneCaseImg,
    badge: 'Bestseller',
    description: 'Engineered with military-spec EcoShock™ air-cushioned corners and MagSafe ultra-lock. Tested to survive 12.8ft drops onto asphalt without screen compromise.',
    highlightSpecs: [
      'EcoShock™ 12.8ft Military Drop Certified',
      'Integrated Dual Lanyard / Strap Anchor Rings',
      'Raised 1.8mm Camera Bezel & Screen Guard',
      'MagSafe & Qi2 Fast Charge Optimized'
    ],
    colors: [
      COLOR_PALETTE[0], // Sage
      COLOR_PALETTE[2], // Obsidian
      COLOR_PALETTE[1], // Sand
      COLOR_PALETTE[3], // Frost
      COLOR_PALETTE[4], // Cobalt
    ],
    compatibleModels: [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 16',
      'iPhone 15 Pro Max',
      'Samsung Galaxy S25 Ultra',
      'Samsung Galaxy S24 Ultra',
      'Google Pixel 9 Pro'
    ],
    isCustomizable: true,
    warranty: '1-Year Manufacturing Defect Warranty',
    leadTime: 'Dispatches within 24 hours'
  },
  {
    id: 'prod-thermal-water-bottle',
    name: 'AeroLock Insulated Thermal Bottle 24oz',
    category: 'water-bottles',
    segment: ['runners-gym', 'office-workers', 'students'],
    price: 42,
    originalPrice: 48,
    rating: 4.95,
    reviewCount: 980,
    image: waterBottleImg,
    badge: 'Montigo-Grade Insulation',
    description: 'Double-walled aerospace stainless steel with interchangeable shockproof silicone boot. Keeps iced drinks cold for 24 hours and steaming hot for 12 hours with zero condensation.',
    highlightSpecs: [
      '24h Cold / 12h Hot Vacuum Seal Lock',
      'Interchangeable Anti-Dent Silicone Grip Boot',
      'Dual-Sip Ergonomic Handle Sports Cap',
      '100% Leak-Proof & BPA-Free Certified'
    ],
    colors: [
      COLOR_PALETTE[1], // Sand
      COLOR_PALETTE[0], // Sage
      COLOR_PALETTE[2], // Obsidian
      COLOR_PALETTE[5], // Coral
      COLOR_PALETTE[6], // Lavender
    ],
    compatibleModels: [
      '24 oz (710 ml) Regular',
      '32 oz (950 ml) XL Active',
      '18 oz (530 ml) Compact'
    ],
    isCustomizable: true,
    warranty: '1-Year Manufacturing Defect Warranty',
    leadTime: 'Dispatches within 24 hours'
  },
  {
    id: 'prod-active-arm-strap',
    name: 'Velocity Pro Runner Arm Strap & Utility Sling',
    category: 'arm-straps',
    segment: ['runners-gym', 'everyday'],
    price: 34,
    rating: 4.88,
    reviewCount: 740,
    image: phoneCaseImg,
    badge: 'Runner Essential',
    description: 'Sweat-wicking breathable neoprene sports arm strap with tactical quick-release alloy carabiners. Converts seamlessly from an arm holster into a crossbody utility chest sling.',
    highlightSpecs: [
      'Dual Function: Bicep Armband + Crossbody Sling',
      'Anti-Slip Perforated Breathable Grip Band',
      'Tactical Aircraft-Grade Aluminum Carabiners',
      'Key / Card / Gel Hidden Pocket'
    ],
    colors: [
      COLOR_PALETTE[2], // Obsidian
      COLOR_PALETTE[0], // Sage
      COLOR_PALETTE[4], // Cobalt
      COLOR_PALETTE[5], // Coral
    ],
    compatibleModels: [
      'Universal Phone Tether Fit (All Sizes)',
      'Armband Size S/M (8" - 13" biceps)',
      'Armband Size L/XL (12" - 18" biceps)'
    ],
    isCustomizable: true,
    warranty: '1-Year Manufacturing Defect Warranty',
    leadTime: 'Dispatches within 24 hours'
  },
  {
    id: 'prod-laptop-armor-case',
    name: 'TitanShield Shock-Absorbing Laptop Casing',
    category: 'laptop-cases',
    segment: ['office-workers', 'students'],
    price: 54,
    originalPrice: 65,
    rating: 4.85,
    reviewCount: 620,
    image: laptopLunchboxImg,
    badge: 'Campus Favorite',
    description: 'Precision-molded polycarbonate protective hard casing with perimeter TPU honeycomb bumpers. Features ventilated cooling grates and rubberized non-slip feet.',
    highlightSpecs: [
      'Corner-Armor Shock Distribution Cell',
      'Engineered Thermal Exhaust Ventilation',
      'Ultra-Slim 1.6mm Profile with Tactile Grip',
      'Anti-Scratch Matte Oleophobic Surface'
    ],
    colors: [
      COLOR_PALETTE[2], // Obsidian
      COLOR_PALETTE[3], // Frost
      COLOR_PALETTE[0], // Sage
      COLOR_PALETTE[4], // Cobalt
    ],
    compatibleModels: [
      'MacBook Air 13" (M2/M3)',
      'MacBook Air 15" (M2/M3)',
      'MacBook Pro 14" (M3/M4)',
      'MacBook Pro 16" (M3/M4)',
      'Dell XPS 13 / 14 / 16'
    ],
    isCustomizable: true,
    warranty: '1-Year Manufacturing Defect Warranty',
    leadTime: 'Dispatches within 24 hours'
  },
  {
    id: 'prod-modular-bento-lunchbox',
    name: 'Modula Therm-Lock Bento Lunch Box',
    category: 'lunch-boxes',
    segment: ['office-workers', 'students', 'everyday'],
    price: 38,
    originalPrice: 45,
    rating: 4.92,
    reviewCount: 510,
    image: laptopLunchboxImg,
    badge: 'Leak-Proof Seal',
    description: 'Stackable 2-tier meal container with airtight silicone vacuum pressure valve. Includes food-grade stainless steel divider compartments and matching cutlery strap.',
    highlightSpecs: [
      '100% Hermetic Leak-Proof Silicone Gasket',
      'Microwave, Dishwasher & Freezer Safe',
      'Modular Stackable 1200ml Dual Chamber',
      'BPA-Free, Eco-Conscious Recyclable Shell'
    ],
    colors: [
      COLOR_PALETTE[3], // Frost / Cream
      COLOR_PALETTE[0], // Sage
      COLOR_PALETTE[1], // Sand
      COLOR_PALETTE[2], // Obsidian
    ],
    compatibleModels: [
      '2-Tier Standard (1200ml)',
      '3-Tier Active Fuel (1800ml)',
      'Snack & Dip Mini (600ml)'
    ],
    isCustomizable: true,
    warranty: '1-Year Manufacturing Defect Warranty',
    leadTime: 'Dispatches within 24 hours'
  },
  {
    id: 'prod-earbud-protective-shell',
    name: 'Kinetiq Drop-Guard Earbud Carabiner Case',
    category: 'earbud-cases',
    segment: ['runners-gym', 'students', 'everyday'],
    price: 26,
    rating: 4.89,
    reviewCount: 430,
    image: phoneCaseImg,
    badge: 'Pocket Armor',
    description: 'Tough hardshell cover with magnetic locking latch to prevent pods from scattering on drop impact. Includes anodized clip for gym bags, belts, and backpacks.',
    highlightSpecs: [
      'Secure Magnetic Lid Lock System',
      'Heavy-Duty Alloy Carabiner Included',
      'Visible LED Charging Indicator Cutout',
      'Wireless Qi Charging Compatible'
    ],
    colors: [
      COLOR_PALETTE[0], // Sage
      COLOR_PALETTE[2], // Obsidian
      COLOR_PALETTE[1], // Sand
      COLOR_PALETTE[4], // Cobalt
    ],
    compatibleModels: [
      'AirPods Pro 2 / Pro',
      'AirPods 4 with ANC',
      'AirPods 3',
      'Samsung Galaxy Buds 3 Pro'
    ],
    isCustomizable: true,
    warranty: '1-Year Manufacturing Defect Warranty',
    leadTime: 'Dispatches within 24 hours'
  }
];

export const VALUE_PROPOSITIONS = [
  {
    title: 'Uniquely Designed By You',
    subtitle: 'Interactive Custom Studio',
    description: 'Choose your signature base colors, accent protective boots, and custom laser monograms with live real-time 3D styling preview.'
  },
  {
    title: 'Active Lifestyle Drop Armor',
    subtitle: 'Engineered for Real Impact',
    description: 'Military-grade shock protection and double-vacuum temperature insulation built for runners, gyms, campuses, and commutes.'
  },
  {
    title: '30-Day Money-Back Guarantee',
    subtitle: 'Zero Risk Experimentation',
    description: 'Test your gear in real workouts, trail runs, and commutes. Love the protection and style or receive a 100% full refund.'
  },
  {
    title: '1-Year Defect Warranty',
    subtitle: 'Direct Manufacturer Coverage',
    description: 'Full comprehensive coverage against manufacturing defects, silicone fatigue, or hardware wear for 365 days.'
  }
];

export const REVIEWS = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    role: 'Marathon Runner & Tech Lead',
    segment: 'Runners',
    rating: 5,
    title: 'Surviving 20-mile trail runs without a scratch',
    comment: 'The Velocity arm strap combined with the Impact case is genuinely elite. The carabiner doesn’t bounce, phone stays bone-dry, and the custom monogram font looks just like Montigo & Casetify quality.',
    verified: true,
    productName: 'Kinetiq Pro Impact Phone Case + Velocity Arm Strap'
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    role: 'Architecture Student',
    segment: 'Students',
    rating: 5,
    title: 'Matches my aesthetic while protecting my MacBook',
    comment: 'I customized the Sage green laptop casing and the matching 24oz bottle. Kept my matcha ice cold throughout an 8-hour studio critique. Everyone in my cohort asked where I got it.',
    verified: true,
    productName: 'TitanShield Laptop Casing & AeroLock 24oz'
  },
  {
    id: 'rev-3',
    name: 'David Chen',
    role: 'Corporate Operations Director',
    segment: 'Office Workers & Corporate',
    rating: 5,
    title: 'Ordered 150 custom-branded sets for our annual retreat',
    comment: 'The B2B bulk ordering portal gave us instant tier pricing. Delivery came in 10 business days with our company emblem crisply laser-etched onto both bottles and bento boxes. Flawless execution.',
    verified: true,
    productName: 'B2B Custom Corporate Hydration & Bento Suite'
  }
];
