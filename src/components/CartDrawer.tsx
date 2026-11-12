import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'ACTIVE20') {
      setAppliedDiscount(subtotal * 0.2);
      setCouponMessage('20% Active Athlete discount applied!');
    } else if (clean === 'KINETIC10') {
      setAppliedDiscount(Math.min(10, subtotal));
      setCouponMessage('$10 off welcome discount applied!');
    } else if (clean === 'STUDENT15') {
      setAppliedDiscount(subtotal * 0.15);
      setCouponMessage('15% Student Campus discount applied!');
    } else {
      setCouponMessage('Invalid code. Try "ACTIVE20" or "STUDENT15"');
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-zinc-950" />
            <h2 className="text-base font-extrabold text-zinc-950 font-['Outfit',sans-serif]">
              Your Gear Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 text-xs">
          {amountToFreeShipping > 0 ? (
            <p className="text-zinc-700 font-medium mb-1.5">
              Add <span className="font-bold text-zinc-950 tabular-nums">${amountToFreeShipping.toFixed(2)}</span> more to unlock <span className="text-emerald-700 font-bold">Free Express Delivery</span>!
            </p>
          ) : (
            <p className="text-emerald-700 font-bold mb-1.5 flex items-center gap-1">
              <span>🎉 Congratulations! You have unlocked Free Express Shipping!</span>
            </p>
          )}
          <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-500">
              <ShoppingBag className="w-12 h-12 text-zinc-300 mb-3 stroke-[1.5]" />
              <p className="text-zinc-900 font-bold text-base">Your bag is empty</p>
              <p className="text-xs text-zinc-500 mt-1 mb-6 max-w-xs">
                Explore our impact cases, vacuum bottles, and modular bento boxes or design your own.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-zinc-950 text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-200/80 relative"
              >
                {/* Thumb */}
                <div className="w-20 h-20 bg-white rounded-xl border border-zinc-200 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-bold text-zinc-950 font-['Outfit',sans-serif] line-clamp-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-400 hover:text-red-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                        {item.selectedColor.name}
                      </span>
                      <span>·</span>
                      <span className="truncate">{item.selectedModel}</span>
                    </div>

                    {/* Monogram tag if customized */}
                    {item.customization && (
                      <div className="mt-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm inline-block border border-emerald-200">
                        Custom Monogram: "{item.customization.monogramText}"
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-200/60">
                    <div className="flex items-center border border-zinc-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-zinc-600 hover:text-zinc-950 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-zinc-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-zinc-600 hover:text-zinc-950 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-zinc-950 tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-zinc-200 bg-white space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo code (e.g. ACTIVE20)"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-8 pr-3 py-2 text-xs font-medium text-zinc-900 uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </form>

            {couponMessage && (
              <p className={`text-[11px] font-medium ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                {couponMessage}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900 tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Special Promo Discount</span>
                  <span className="tabular-nums">-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium text-zinc-900">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$4.99'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-zinc-950 pt-2 border-t border-zinc-200">
                <span>Total Due</span>
                <span className="tabular-nums">
                  ${(finalTotal + (subtotal >= freeShippingThreshold ? 0 : 4.99)).toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={onProceedCheckout}
              className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Fast Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Canvas Guarantee Statement */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Covered by 1-Year Warranty & 30-Day Money-Back</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
