import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Product, ProductCategory, CustomerSegment, CartItem } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenQuickView,
  onAddToCart,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedSegment, setSelectedSegment] = useState<CustomerSegment>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Gear' },
    { id: 'phone-cases', label: 'Phone Cases' },
    { id: 'water-bottles', label: 'Water Bottles' },
    { id: 'arm-straps', label: 'Arm Straps & Slings' },
    { id: 'laptop-cases', label: 'Laptop Hard Shells' },
    { id: 'lunch-boxes', label: 'Bento Lunch Boxes' },
    { id: 'earbud-cases', label: 'Earbud Armor' },
  ];

  const segments: { id: CustomerSegment; label: string }[] = [
    { id: 'all', label: 'All Lifestyles' },
    { id: 'runners-gym', label: 'Runners & Gym' },
    { id: 'office-workers', label: 'Office & Commute' },
    { id: 'students', label: 'Students & Campus' },
    { id: 'everyday', label: 'Everyday Active' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSegment = selectedSegment === 'all' || p.segment.includes(selectedSegment);
        const matchesSearch =
          searchQuery.trim() === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.highlightSpecs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSegment && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, selectedCategory, selectedSegment, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-12 lg:py-20 bg-zinc-50 border-b border-zinc-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
              Curated Defense Collection
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
              Engineered For Every Journey
            </h2>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases, bottles, straps..."
                className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-8 py-2 text-xs font-medium text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-950 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-zinc-950 shadow-xs cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs (Interactive Filter Buttons per Rule §1.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Customer Persona / Segment Filter (from Business Model Canvas) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-4 text-xs">
          <span className="text-zinc-400 uppercase font-bold text-[10px] tracking-wider whitespace-nowrap mr-1">
            Audience:
          </span>
          {segments.map((seg) => (
            <button
              key={seg.id}
              onClick={() => setSelectedSegment(seg.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedSegment === seg.id
                  ? 'bg-zinc-200 text-zinc-950 font-bold'
                  : 'text-zinc-500 hover:text-zinc-900 bg-transparent'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenQuickView={onOpenQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-md mx-auto my-8">
            <p className="text-zinc-900 font-bold text-base mb-1">No gear matched your filter</p>
            <p className="text-xs text-zinc-500 mb-6">
              Try resetting your lifestyle tags or adjusting your search keyword.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSelectedSegment('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-zinc-950 text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
