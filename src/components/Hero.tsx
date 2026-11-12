import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Layers, RefreshCw } from 'lucide-react';
import heroGearImg from '../assets/images/hero_active_gear_1794491770778.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onCustomizerClick: () => void;
  onProductClick: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onCustomizerClick,
  onProductClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Value Propositions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-zinc-500">
              <span>Active Protection Architecture</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-800">Uniquely Designed By You</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-zinc-950 font-['Outfit',sans-serif] tracking-tight leading-[1.08] text-balance">
              Holistic protection in style for all your daily carry.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl">
              Engineered for runners, gym athletes, office commuters, and students. Customize military-grade shock cases, modular vacuum-insulated bottles, and leakproof lunch carry with real-time laser engraving.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onCustomizerClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-zinc-950 rounded-xl hover:bg-zinc-800 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
              >
                <span>Design in Custom Lab</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-800 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Trust Highlights from Canvas */}
            <div className="pt-4 border-t border-zinc-100 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl sm:text-2xl font-black text-zinc-950 font-['Outfit',sans-serif] tabular-nums">
                  12.8<span className="text-sm font-bold text-zinc-500">ft</span>
                </p>
                <p className="text-xs text-zinc-500 font-medium">Drop shock rating</p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-black text-zinc-950 font-['Outfit',sans-serif] tabular-nums">
                  24<span className="text-sm font-bold text-zinc-500">hrs</span>
                </p>
                <p className="text-xs text-zinc-500 font-medium">Cold temp lock</p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-black text-zinc-950 font-['Outfit',sans-serif] tabular-nums">
                  30<span className="text-sm font-bold text-zinc-500">Days</span>
                </p>
                <p className="text-xs text-zinc-500 font-medium">Money-back trial</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Interactive Hotspots */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-md group">
              <img
                src={heroGearImg}
                alt="Kinetiq Active Lifestyle Accessories - Impact Phone Case with Sports Arm Strap and Insulated Bottle in Sage"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = '/assets/images/hero_active_gear_1794491770778.jpg';
                  }
                }}
                className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] transform transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Interactive Tag Overlays (Casetify / Montigo style) */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-white/60 shadow-lg text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <div className="text-left">
                    <p className="font-semibold text-zinc-900">Featured Capsule: Sage Active Kit</p>
                    <p className="text-zinc-500">Impact Case + Velocity Arm Strap + AeroLock Bottle</p>
                  </div>
                </div>

                <button
                  onClick={() => onProductClick('prod-impact-phone-case')}
                  className="px-3 py-1.5 bg-zinc-950 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap text-xs"
                >
                  View Bundle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
