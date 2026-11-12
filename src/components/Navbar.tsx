import React from 'react';
import { ShoppingBag, Search, Briefcase } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenB2B: () => void;
  onSelectCategory: (catId: string) => void;
  onScrollToCustomizer: () => void;
  onToggleSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenB2B,
  onSelectCategory,
  onScrollToCustomizer,
  onToggleSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-extrabold tracking-tight text-zinc-950 font-['Outfit',sans-serif] uppercase whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          Kinetiq<span className="text-zinc-400 font-normal text-xs ml-0.5 tracking-normal">®</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600">
          <button
            onClick={() => onSelectCategory('phone-cases')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Phone Cases
          </button>
          <button
            onClick={() => onSelectCategory('water-bottles')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Water Bottles
          </button>
          <button
            onClick={() => onSelectCategory('arm-straps')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Straps & Slings
          </button>
          <button
            onClick={() => onSelectCategory('laptop-cases')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Laptop & Lunch
          </button>
          <button
            onClick={onScrollToCustomizer}
            className="text-zinc-900 font-semibold hover:text-black transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Custom Lab</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </button>
        </nav>

        {/* Zone 3: Primary action + utility triggers */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSearch}
            className="p-2 text-zinc-600 hover:text-zinc-950 transition-colors rounded-lg hover:bg-zinc-100"
            title="Search products"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenB2B}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-lg whitespace-nowrap"
            title="Corporate & School Bulk Orders"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Corporate / B2B</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 bg-zinc-950 text-white rounded-xl hover:bg-zinc-800 transition-colors whitespace-nowrap shadow-sm"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
