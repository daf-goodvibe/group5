import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onOpenB2B: () => void;
  onSelectCategory: (cat: any) => void;
  onScrollToCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenB2B,
  onSelectCategory,
  onScrollToCustomizer,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand & Proposition */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight">
              KINETIQ<span className="text-zinc-500 font-normal text-xs ml-0.5">®</span>
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Customizable high-protection phone cases, active runner arm straps, laptop shock casings, vacuum-insulated bottles, and modular lunch boxes. Uniquely designed by you.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>30-Day Money Back Guarantee · 1-Year Warranty</span>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Collections
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onSelectCategory('phone-cases')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pro Impact Phone Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('water-bottles')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AeroLock Thermal Bottles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('arm-straps')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Runner Arm Straps & Slings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('laptop-cases')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  TitanShield Laptop Hard Shells
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('lunch-boxes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Modula Bento Lunch Boxes
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToCustomizer}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
                >
                  Custom Monogram Lab →
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate & Programs */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Solutions & Trust
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={onOpenB2B}
                  className="hover:text-white font-medium text-emerald-400 transition-colors cursor-pointer"
                >
                  Corporate Bulk & University Orders
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  1-Year Defect Warranty Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  30-Day Active Trial Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  EcoShock™ Recycled Polymers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Track Delivery Order
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter (from Canvas "weekly/monthly newsletter on latest products or promotions") */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay In The Loop
            </h3>
            <p className="text-xs text-zinc-400">
              Weekly drops, designer collabs, and member-exclusive 20% access.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:ring-1 focus:ring-zinc-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Subscribed successfully!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Kinetiq Studio Inc. Inspired by Casetify and Montigo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
