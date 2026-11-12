import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    fullName: 'Alex Parker',
    email: 'alex.parker@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    paymentMethod: 'card' as 'card' | 'apple-pay' | 'cod',
    deliverySpeed: 'express' as 'standard' | 'express',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 50 ? 0 : 4.99;
  const expressFee = formData.deliverySpeed === 'express' ? 0 : 0; // free express over 50
  const grandTotal = subtotal + shippingFee;

  const [orderNumber, setOrderNumber] = useState('');
  const [warrantyCode, setWarrantyCode] = useState('');

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `KQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const generatedWarranty = `WAR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrder);
    setWarrantyCode(generatedWarranty);
    setStep('confirmed');
    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
              <h2 className="text-2xl font-black text-zinc-950 font-['Outfit',sans-serif]">
                Complete Your Order
              </h2>
              <p className="text-xs text-zinc-500">
                1-Year Manufacturing Defect Warranty and 30-Day Money-Back Guarantee automatically activated upon checkout.
              </p>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">
                1. Contact & Delivery Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">
                2. Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'apple-pay', label: 'Apple / Google Pay', icon: Truck },
                  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id as any })}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        formData.paymentMethod === pm.id
                          ? 'border-zinc-950 bg-zinc-950 text-white shadow-xs'
                          : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] font-semibold">{pm.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Line */}
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Items Subtotal ({items.length} items)</span>
                <span className="font-semibold text-zinc-900 tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Express Insured Shipping</span>
                <span className="font-semibold text-emerald-700">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-zinc-950 pt-2 border-t border-zinc-200">
                <span>Total Due</span>
                <span className="tabular-nums">${grandTotal.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Place Order · ${grandTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                Order Confirmed & Verified
              </p>
              <h2 className="text-3xl font-black text-zinc-950 font-['Outfit',sans-serif]">
                Thank You, {formData.fullName.split(' ')[0]}!
              </h2>
              <p className="text-sm text-zinc-600 mt-2 max-w-md mx-auto">
                Your order is currently being prepared at our fulfillment hub. A confirmation email with live parcel tracking has been sent to <span className="font-semibold text-zinc-950">{formData.email}</span>.
              </p>
            </div>

            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 max-w-md mx-auto space-y-3 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Order Reference</span>
                <span className="font-mono font-bold text-zinc-950">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Warranty Registration Code</span>
                <span className="font-mono font-bold text-emerald-700">{warrantyCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Delivery Status</span>
                <span className="font-semibold text-zinc-800">Preparing Shipment (24h dispatch)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Destination</span>
                <span className="text-zinc-900 font-medium truncate">{formData.address}, {formData.city}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-zinc-950 text-white text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Back to Storefront
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
