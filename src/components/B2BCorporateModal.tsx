import React, { useState } from 'react';
import { X, Briefcase, GraduationCap, Building2, CheckCircle, Calculator, Sparkles, Send } from 'lucide-react';

interface B2BCorporateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BCorporateModal: React.FC<B2BCorporateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'submitted'>('form');
  const [orgType, setOrgType] = useState<'corporate' | 'school' | 'sports-team'>('corporate');
  const [productFocus, setProductFocus] = useState('bottles');
  const [quantity, setQuantity] = useState(50);
  const [includeCustomLogo, setIncludeCustomLogo] = useState(true);
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [contactName, setContactName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah@acme.com');
  const [notes, setNotes] = useState('Looking for co-branded bottles and phone cases for our annual employee tech summit.');

  // Pricing calculations
  const unitBasePrice = productFocus === 'bottles' ? 42 : productFocus === 'cases' ? 48 : productFocus === 'bento' ? 38 : 50;
  
  // Volume discount tiers from business model
  let discountTier = 0.15; // default 15% for 25-49
  if (quantity >= 200) discountTier = 0.35;
  else if (quantity >= 100) discountTier = 0.30;
  else if (quantity >= 50) discountTier = 0.25;

  const rawTotal = quantity * unitBasePrice;
  const discountedTotal = rawTotal * (1 - discountTier);
  const logoFee = includeCustomLogo ? 150 : 0; // one-time precision laser setup
  const estimatedOrderTotal = Math.round(discountedTotal + logoFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitted');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5 text-zinc-700" />
                <span>B2B & School Co-Branding Portal</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 font-['Outfit',sans-serif]">
                Corporate Gifting & University Gear
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
                Outfit your team, campus, or athletic club with bespoke laser-engraved bottles, drop-tested phone cases, and bento kits. Bulk order average: $2,500 with tiered volume savings up to 35%.
              </p>
            </div>

            {/* Org Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Organization Profile
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { id: 'corporate', label: 'Corporate & Tech', icon: Building2 },
                  { id: 'school', label: 'School / University', icon: GraduationCap },
                  { id: 'sports-team', label: 'Sports Club / Gym', icon: Sparkles },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setOrgType(type.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        orgType === type.id
                          ? 'border-zinc-950 bg-zinc-950 text-white shadow-xs'
                          : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Volume & Pricing Calculator */}
            <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-zinc-600" />
                  Instant Volume Estimator
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save {Math.round(discountTier * 100)}% on {quantity} Units
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                    Product Focus
                  </label>
                  <select
                    value={productFocus}
                    onChange={(e) => setProductFocus(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900 cursor-pointer"
                  >
                    <option value="bottles">AeroLock 24oz Insulated Bottles</option>
                    <option value="cases">Pro Impact Phone Cases</option>
                    <option value="bento">Modula Bento Lunch Boxes</option>
                    <option value="bundle">Full Active Lifestyle Bundle (Case + Bottle + Strap)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-zinc-600">
                      Quantity: <span className="font-bold text-zinc-900 tabular-nums">{quantity} units</span>
                    </label>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full accent-zinc-950 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 mt-0.5">
                    <span>20 pcs (15% off)</span>
                    <span>100 pcs (30% off)</span>
                    <span>500+ pcs (35% off)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-200">
                <input
                  type="checkbox"
                  id="customLogo"
                  checked={includeCustomLogo}
                  onChange={(e) => setIncludeCustomLogo(e.target.checked)}
                  className="rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                />
                <label htmlFor="customLogo" className="text-xs font-medium text-zinc-700 cursor-pointer">
                  Include Custom Precision Laser Engraving / Pantone Color Matching
                </label>
              </div>

              {/* Estimate Result Box */}
              <div className="p-3 bg-white rounded-xl border border-zinc-200 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-zinc-500">Estimated Total (Before Bulk Shipping)</p>
                  <p className="text-xl font-black text-zinc-950 font-['Outfit',sans-serif] tabular-nums">
                    ${estimatedOrderTotal.toLocaleString()} USD
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-zinc-500">Unit Cost:</p>
                  <p className="font-bold text-zinc-900 tabular-nums">
                    ${(estimatedOrderTotal / quantity).toFixed(2)} / unit
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Company / School</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                Project Notes / Timelines / Preferred Colors
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit In-House Bulk Quote Request</span>
            </button>
          </form>
        ) : (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                Proposal Request Received
              </p>
              <h2 className="text-3xl font-black text-zinc-950 font-['Outfit',sans-serif]">
                We’re On It, {contactName.split(' ')[0]}!
              </h2>
              <p className="text-sm text-zinc-600 mt-2 max-w-md mx-auto">
                Our Corporate Branding specialist will contact <span className="font-semibold text-zinc-900">{email}</span> within 2 hours with digital 3D vector mockups of your logo and formal invoice terms.
              </p>
            </div>

            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Organization:</span>
                <span className="font-semibold text-zinc-900">{companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Volume:</span>
                <span className="font-semibold text-zinc-900">{quantity} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Total:</span>
                <span className="font-bold text-zinc-950">${estimatedOrderTotal.toLocaleString()} USD</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="px-6 py-2.5 bg-zinc-950 text-white text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
