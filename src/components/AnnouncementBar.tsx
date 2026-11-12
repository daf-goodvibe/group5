import React, { useState } from 'react';
import { ShieldCheck, Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-zinc-900 text-zinc-100 text-xs py-2 px-4 border-b border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 md:gap-6 text-center overflow-x-auto py-0.5">
          <div className="flex items-center gap-1.5 whitespace-nowrap font-medium text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>1-Year Defect Warranty & 30-Day Money-Back Guarantee</span>
          </div>
          <span className="hidden md:inline text-zinc-500">/</span>
          <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>Free Express Delivery on orders over $50</span>
          </div>
          <span className="hidden lg:inline text-zinc-500">/</span>
          <span className="hidden lg:inline text-zinc-400 whitespace-nowrap">
            B2B & School Custom Co-Branding Available
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-400 hover:text-white transition-colors p-0.5 shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
