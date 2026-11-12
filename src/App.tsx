import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValuePillars } from './components/ValuePillars';
import { CustomizerStudio } from './components/CustomizerStudio';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { B2BCorporateModal } from './components/B2BCorporateModal';
import { ReviewSection } from './components/ReviewSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kinetiq_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default starter item for immediate e-commerce exploration
    return [
      {
        id: 'starter-1',
        productId: 'prod-impact-phone-case',
        name: 'Kinetiq Pro Impact Phone Case',
        category: 'phone-cases',
        price: 48,
        quantity: 1,
        selectedColor: PRODUCTS[0].colors[0],
        selectedModel: 'iPhone 16 Pro Max',
        image: PRODUCTS[0].image,
        customization: {
          monogramText: 'ALEX',
          fontStyle: 'bold-sans',
          accentColorName: 'Matte Obsidian',
          finish: 'matte',
        },
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isB2BOpen, setIsB2BOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('kinetiq_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.selectedColor.id === item.selectedColor.id &&
          i.selectedModel === item.selectedModel &&
          i.customization?.monogramText === item.customization?.monogramText
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += item.quantity;
        return next;
      }
      return [item, ...prev];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCategoryNav = (catId: string) => {
    setSelectedCategory(catId as ProductCategory);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCustomizer = () => {
    const customizerEl = document.getElementById('custom-lab');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSearch = () => {
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
      const searchInput = catalogElement.querySelector('input');
      if (searchInput) searchInput.focus();
    }
  };

  const handleOpenProductById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) setQuickViewProduct(found);
  };

  const handleOrderComplete = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner with Warranty & Free Delivery */}
      <AnnouncementBar />

      {/* Main Top Navigation (adheres to 3-Zone Top Bar Contract) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenB2B={() => setIsB2BOpen(true)}
        onSelectCategory={handleCategoryNav}
        onScrollToCustomizer={handleScrollToCustomizer}
        onToggleSearch={handleToggleSearch}
      />

      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero
          onExploreClick={() => handleCategoryNav('all')}
          onCustomizerClick={handleScrollToCustomizer}
          onProductClick={handleOpenProductById}
        />

        {/* 4 Core Value Propositions from Business Model Canvas */}
        <ValuePillars />

        {/* Flagship Interactive Custom Lab (Casetify & Montigo Studio) */}
        <CustomizerStudio onAddToCart={handleAddToCart} />

        {/* Curated Product Catalog & Collections */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={handleAddToCart}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Customer Proof & Verified Athlete Reviews */}
        <ReviewSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenB2B={() => setIsB2BOpen(true)}
        onSelectCategory={handleCategoryNav}
        onScrollToCustomizer={handleScrollToCustomizer}
      />

      {/* Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={handleOrderComplete}
      />

      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <B2BCorporateModal
        isOpen={isB2BOpen}
        onClose={() => setIsB2BOpen(false)}
      />
    </div>
  );
}
