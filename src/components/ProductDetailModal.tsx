import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { Product, ProductColor, CartItem } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedModel, setSelectedModel] = useState<string>(product.compatibleModels[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [monogramText, setMonogramText] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleAdd = () => {
    const item: CartItem = {
      id: `${product.id}-${selectedColor.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity,
      selectedColor,
      selectedModel,
      image: product.image,
      customization: monogramText.trim()
        ? {
            monogramText: monogramText.trim().toUpperCase(),
            fontStyle: 'bold-sans',
            accentColorName: selectedColor.name,
            finish: 'matte',
          }
        : undefined,
    };
    onAddToCart(item);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-900 bg-white/80 hover:bg-white rounded-full transition-colors border border-zinc-200/80 shadow-xs"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Gallery View Left */}
          <div className="md:col-span-6 bg-[#F4F4F5] p-8 flex flex-col items-center justify-center relative min-h-[340px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[360px] w-auto object-contain mix-blend-multiply drop-shadow-xl"
            />

            {/* Selected Colorway Callout */}
            <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full border border-zinc-200 text-xs font-semibold text-zinc-700">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
              <span>{selectedColor.name}</span>
            </div>
          </div>

          {/* Contiguous Purchase Module Right */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                <span className="uppercase tracking-wider font-bold text-zinc-400">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 text-zinc-800 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 font-['Outfit',sans-serif] leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black text-zinc-950 tabular-nums">
                  ${product.price}.00
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through tabular-nums">
                    ${product.originalPrice}.00
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-700 ml-2">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Model / Size Selector */}
              <div className="mt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Select Model / Variant
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-950 cursor-pointer"
                >
                  {product.compatibleModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Swatches */}
              <div className="mt-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Colorway: <span className="text-zinc-950 font-semibold">{selectedColor.name}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer relative shadow-2xs ${
                        selectedColor.id === c.id ? 'ring-2 ring-zinc-950 ring-offset-2 scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.id === c.id && (
                        <Check className={`w-3 h-3 ${c.id === 'chalk' ? 'text-zinc-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Custom Monogram directly in PDP */}
              {product.isCustomizable && (
                <div className="mt-4 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Add Custom Monogram (Optional / Free)
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={10}
                    value={monogramText}
                    onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                    placeholder="Enter initials or name (e.g. ALEX)"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wider text-zinc-900"
                  />
                </div>
              )}

              {/* Key Specs List */}
              <div className="mt-4 space-y-1.5 border-t border-zinc-100 pt-3">
                {product.highlightSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Contiguous Add to Bag Button */}
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-zinc-300 rounded-xl bg-zinc-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-zinc-600 hover:text-zinc-950 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-zinc-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-zinc-600 hover:text-zinc-950 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{addedNotice ? 'Added to Bag ✓' : `Add to Bag · $${product.price * quantity}.00`}</span>
                </button>
              </div>

              {/* Assurance Badges from Canvas */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-500 pt-1">
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>1-Year Defect Warranty</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-zinc-700">
                  <RotateCcw className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
