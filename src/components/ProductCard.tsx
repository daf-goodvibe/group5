import React, { useState } from 'react';
import { Star, ShieldCheck, ShoppingBag, Eye } from 'lucide-react';
import { Product, ProductColor, CartItem } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem: CartItem = {
      id: `${product.id}-${selectedColor.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: 1,
      selectedColor,
      selectedModel: product.compatibleModels[0],
      image: product.image,
    };
    onAddToCart(cartItem);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <div
      onClick={() => onOpenQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-white rounded-2xl border border-zinc-200/80 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Product Image Frame (65-75% visual dominance) */}
      <div className="relative aspect-square w-full bg-[#F4F4F5] overflow-hidden flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Single Text Tag (Strict Anti-Slop: Zero-Pill) */}
        {product.badge && (
          <div className="absolute top-3.5 left-3.5 text-[11px] font-bold uppercase tracking-wider text-zinc-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-zinc-200/60 shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Subtle Color Indicator Accent Tint */}
        <div
          className="absolute bottom-3 right-3 w-4 h-4 rounded-full border-2 border-white shadow-xs"
          style={{ backgroundColor: selectedColor.hex }}
          title={`Selected: ${selectedColor.name}`}
        />

        {/* Quick-Add Hover Overlay */}
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{addedNotice ? 'Added to Bag ✓' : 'Quick Add'}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="p-2.5 bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-semibold rounded-xl shadow-md border border-zinc-200 transition-colors"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating Unboxed Metadata */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-zinc-400">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-zinc-700 font-medium tabular-nums">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-zinc-950 font-['Outfit',sans-serif] line-clamp-1 group-hover:text-zinc-700 transition-colors">
            {product.name}
          </h3>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.map((c) => (
              <button
                key={c.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                  selectedColor.id === c.id ? 'ring-2 ring-zinc-950 ring-offset-1 scale-110' : 'border-zinc-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Color: ${c.name}`}
              />
            ))}
            <span className="text-[11px] text-zinc-400 ml-1">
              {product.colors.length} colors
            </span>
          </div>
        </div>

        {/* Pricing & Warranty Baselines */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-zinc-950 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>1-Yr Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
};
