import React from 'react';
import { Palette, ShieldAlert, RotateCcw, Award } from 'lucide-react';

export const ValuePillars: React.FC = () => {
  const pillars = [
    {
      icon: Palette,
      title: 'Uniquely Designed By You',
      subtitle: 'Real-Time Monogram & Swatch Lab',
      detail: 'Personalize laser monograms, choose bespoke base tones, and swap silicone bumper boots to match your personal energy.',
    },
    {
      icon: ShieldAlert,
      title: 'Active Lifestyle Drop Armor',
      subtitle: 'Engineered for Real Impact',
      detail: 'Multi-layer EcoShock™ polymers absorb 95% of direct kinetic impacts. Certified for 12.8ft drops onto raw asphalt.',
    },
    {
      icon: RotateCcw,
      title: '30-Day Money-Back Guarantee',
      subtitle: 'Risk-Free Workout Trial',
      detail: 'Take our gear on your longest marathon runs and toughest commutes. If you are not completely satisfied, return for a 100% refund.',
    },
    {
      icon: Award,
      title: '1-Year Defect Warranty',
      subtitle: 'Direct Manufacturer Coverage',
      detail: 'Every phone case, bottle thermal seal, arm strap stitch, and laptop shell is backed by our full 365-day replacement warranty.',
    },
  ];

  return (
    <section className="bg-zinc-50 border-b border-zinc-200 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            The Kinetiq Standard
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
            Built tough. Styled intentionally. Guaranteed.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 font-['Outfit',sans-serif] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
