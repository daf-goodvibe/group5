import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewSection: React.FC = () => {
  return (
    <section className="py-12 lg:py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-zinc-200">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
              Real Athlete & Campus Feedback
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
              Tested on Marathons, Campuses & Commutes
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-900">4.92 / 5.0</span>
            <span className="text-xs text-zinc-400">from 18,400+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                    {rev.segment}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-zinc-950 mb-2 font-['Outfit',sans-serif]">
                  "{rev.title}"
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-zinc-900 flex items-center gap-1">
                      <span>{rev.name}</span>
                      {rev.verified && (
                        <span title="Verified Customer" className="inline-flex">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-zinc-500">{rev.role}</p>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 mt-2 truncate">
                  Purchased: {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
