import React, { useState } from 'react';
import { Sparkles, Check, RotateCcw, ShieldCheck, Heart } from 'lucide-react';
import { COLOR_PALETTE } from '../data/products';
import { ProductColor, CartItem } from '../types';
import phoneCaseImg from '../assets/images/product_phone_case_1794491769873.jpg';
import waterBottleImg from '../assets/images/product_water_bottle_1794491770312.jpg';
import laptopLunchboxImg from '../assets/images/product_laptop_lunchbox_1794491771500.jpg';

interface CustomizerStudioProps {
  onAddToCart: (item: CartItem) => void;
}

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({ onAddToCart }) => {
  const [productType, setProductType] = useState<'phone-case' | 'water-bottle' | 'arm-strap' | 'laptop-case' | 'lunch-box'>('phone-case');
  const [model, setModel] = useState('iPhone 16 Pro Max');
  const [baseColor, setBaseColor] = useState<ProductColor>(COLOR_PALETTE[0]); // Sage
  const [accentColor, setAccentColor] = useState<ProductColor>(COLOR_PALETTE[2]); // Obsidian
  const [monogramText, setMonogramText] = useState('KINETIQ');
  const [fontStyle, setFontStyle] = useState<'bold-sans' | 'editorial-serif' | 'athletic-mono' | 'minimal-modern'>('bold-sans');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [orientation, setOrientation] = useState<'center' | 'vertical' | 'bottom'>('center');
  const [finish, setFinish] = useState<'matte' | 'glossy' | 'frosted'>('matte');
  const [addedToast, setAddedToast] = useState(false);

  // Model maps
  const modelOptions: Record<string, string[]> = {
    'phone-case': ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16', 'Galaxy S25 Ultra', 'Pixel 9 Pro'],
    'water-bottle': ['24 oz (710ml) Standard', '32 oz (950ml) Active XL', '18 oz (530ml) Compact'],
    'arm-strap': ['Universal Phone Harness (S/M)', 'Universal Phone Harness (L/XL)'],
    'laptop-case': ['MacBook Air 13" (M2/M3)', 'MacBook Air 15" (M2/M3)', 'MacBook Pro 14" (M3/M4)', 'MacBook Pro 16" (M3/M4)'],
    'lunch-box': ['2-Tier Bento (1200ml)', '3-Tier Bento Pro (1800ml)', 'Compact Snack & Dip (600ml)'],
  };

  const prices: Record<string, number> = {
    'phone-case': 48,
    'water-bottle': 42,
    'arm-strap': 34,
    'laptop-case': 54,
    'lunch-box': 38,
  };

  const currentPrice = prices[productType];

  const handleProductTypeChange = (type: typeof productType) => {
    setProductType(type);
    setModel(modelOptions[type][0]);
  };

  const handleAddToCart = () => {
    const customItem: CartItem = {
      id: `custom-${productType}-${Date.now()}`,
      productId: `prod-custom-${productType}`,
      name: `Custom ${productType.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
      category: productType === 'arm-strap' ? 'arm-straps' : (productType + 's' as any),
      price: currentPrice,
      quantity: 1,
      selectedColor: baseColor,
      selectedModel: model,
      image:
        productType === 'phone-case'
          ? phoneCaseImg
          : productType === 'water-bottle'
          ? waterBottleImg
          : productType === 'laptop-case' || productType === 'lunch-box'
          ? laptopLunchboxImg
          : phoneCaseImg,
      customization: {
        monogramText: monogramText.trim() || 'CUSTOM',
        fontStyle,
        accentColorName: accentColor.name,
        finish,
      },
    };

    onAddToCart(customItem);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <section id="custom-lab" className="bg-white border-b border-zinc-200 py-12 lg:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Custom Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
              Uniquely Designed by You.
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Select your gear, customize signature base and boot accents, and laser-etch your monogram in real-time.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 font-medium text-zinc-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              1-Yr Defect Warranty
            </span>
            <span>·</span>
            <span>Laser-etched precision</span>
          </div>
        </div>

        {/* Product Type Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-2 mb-8 no-scrollbar">
          {[
            { id: 'phone-case', label: 'Phone Case' },
            { id: 'water-bottle', label: 'Insulated Bottle' },
            { id: 'arm-strap', label: 'Runner Arm Strap' },
            { id: 'laptop-case', label: 'Laptop Hard Shell' },
            { id: 'lunch-box', label: 'Bento Lunch Box' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleProductTypeChange(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                productType === tab.id
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Studio Grid: Canvas Preview on Left, Control Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Canvas Preview */}
          <div className="lg:col-span-6 bg-[#F4F4F5] rounded-3xl p-8 sm:p-12 border border-zinc-200 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[520px] overflow-hidden">
            <div className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Live Preview · {model}
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded bg-white/80 backdrop-blur-xs text-[11px] font-semibold text-zinc-700 border border-zinc-200/60">
              <span>{finish.toUpperCase()} FINISH</span>
            </div>

            {/* Dynamic Scalable Vector Device Render */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] transition-all duration-300 transform">
              {productType === 'phone-case' && (
                <div
                  className="relative aspect-[1/2] rounded-[44px] p-3 shadow-2xl transition-colors duration-300 border-[6px]"
                  style={{
                    backgroundColor: baseColor.hex,
                    borderColor: accentColor.hex,
                  }}
                >
                  {/* Camera bump */}
                  <div
                    className="absolute top-5 left-5 w-24 h-24 rounded-3xl p-2.5 shadow-md flex flex-wrap gap-2 items-center justify-center"
                    style={{ backgroundColor: accentColor.hex }}
                  >
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border-2 border-zinc-700/60 shadow-inner"></div>
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border-2 border-zinc-700/60 shadow-inner"></div>
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border-2 border-zinc-700/60 shadow-inner"></div>
                  </div>

                  {/* Corner shock absorbers (EcoShock bumpers) */}
                  <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-tl-xl border-t-4 border-l-4" style={{ borderColor: accentColor.hex }}></div>
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-tr-xl border-t-4 border-r-4" style={{ borderColor: accentColor.hex }}></div>
                  <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 rounded-bl-xl border-b-4 border-l-4" style={{ borderColor: accentColor.hex }}></div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-br-xl border-b-4 border-r-4" style={{ borderColor: accentColor.hex }}></div>

                  {/* Monogram Display */}
                  <div
                    className={`absolute inset-x-6 flex items-center justify-center transition-all ${
                      orientation === 'center'
                        ? 'inset-y-0'
                        : orientation === 'vertical'
                        ? 'inset-y-0 right-6 justify-end [writing-mode:vertical-rl]'
                        : 'bottom-10'
                    }`}
                  >
                    <span
                      style={{ color: textColor }}
                      className={`text-xl sm:text-2xl font-bold tracking-wider drop-shadow-sm select-none ${
                        fontStyle === 'bold-sans'
                          ? "font-['Outfit',sans-serif] font-black uppercase"
                          : fontStyle === 'editorial-serif'
                          ? 'font-serif italic font-bold'
                          : fontStyle === 'athletic-mono'
                          ? 'font-mono font-black tracking-widest'
                          : 'font-sans font-light tracking-[0.3em] uppercase'
                      }`}
                    >
                      {monogramText || 'YOUR NAME'}
                    </span>
                  </div>

                  {/* Subtle brand mark */}
                  <div className="absolute bottom-4 inset-x-0 text-center text-[10px] tracking-widest font-semibold uppercase opacity-60" style={{ color: textColor }}>
                    KINETIQ IMPACT
                  </div>
                </div>
              )}

              {productType === 'water-bottle' && (
                <div className="relative mx-auto w-36 sm:w-44 aspect-[1/2.8] flex flex-col items-center">
                  {/* Cap & Handle */}
                  <div
                    className="w-16 h-12 rounded-t-2xl flex flex-col items-center justify-center border-2 border-zinc-800 shadow-md transition-colors"
                    style={{ backgroundColor: accentColor.hex }}
                  >
                    <div className="w-10 h-3 rounded-full border-2 border-zinc-700 bg-zinc-900"></div>
                  </div>
                  <div className="w-20 h-4 bg-zinc-800 rounded-xs"></div>

                  {/* Bottle Body */}
                  <div
                    className="w-full flex-1 rounded-t-2xl relative shadow-2xl flex flex-col justify-between items-center p-4 transition-colors"
                    style={{ backgroundColor: baseColor.hex }}
                  >
                    {/* Monogram Text */}
                    <div
                      className={`flex-1 flex items-center justify-center transition-all ${
                        orientation === 'vertical' ? '[writing-mode:vertical-rl]' : ''
                      }`}
                    >
                      <span
                        style={{ color: textColor }}
                        className={`text-lg sm:text-xl font-bold tracking-wider select-none ${
                          fontStyle === 'bold-sans'
                            ? "font-['Outfit',sans-serif] font-black uppercase"
                            : fontStyle === 'editorial-serif'
                            ? 'font-serif italic font-bold'
                            : fontStyle === 'athletic-mono'
                            ? 'font-mono font-black tracking-widest'
                            : 'font-sans font-light tracking-widest uppercase'
                        }`}
                      >
                        {monogramText || 'KINETIQ'}
                      </span>
                    </div>

                    <div className="text-[10px] tracking-widest uppercase font-bold opacity-60" style={{ color: textColor }}>
                      24H COLD · VACUUM
                    </div>
                  </div>

                  {/* Montigo-Style Protective Silicone Boot */}
                  <div
                    className="w-full h-16 rounded-b-2xl border-t-2 border-white/20 shadow-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: accentColor.hex }}
                  >
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-white/80">
                      SILICONE BOOT
                    </span>
                  </div>
                </div>
              )}

              {productType === 'arm-strap' && (
                <div className="relative mx-auto w-56 sm:w-64 aspect-[4/3] rounded-3xl p-6 shadow-2xl border-4 flex flex-col justify-between" style={{ backgroundColor: baseColor.hex, borderColor: accentColor.hex }}>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-bold tracking-wider" style={{ color: textColor }}>
                      PRO RUNNER SLEEVE
                    </span>
                    <div className="w-6 h-6 rounded-md bg-zinc-900 flex items-center justify-center text-white text-[10px] font-bold">
                      ⟠
                    </div>
                  </div>

                  {/* Monogram Badge */}
                  <div className="text-center py-4">
                    <span
                      style={{ color: textColor }}
                      className={`text-xl sm:text-2xl font-bold tracking-wider select-none ${
                        fontStyle === 'bold-sans'
                          ? "font-['Outfit',sans-serif] font-black uppercase"
                          : fontStyle === 'editorial-serif'
                          ? 'font-serif italic font-bold'
                          : fontStyle === 'athletic-mono'
                          ? 'font-mono font-black tracking-widest'
                          : 'font-sans font-light tracking-widest uppercase'
                      }`}
                    >
                      {monogramText || 'RUN FAST'}
                    </span>
                  </div>

                  {/* Carabiner Loops */}
                  <div className="flex justify-between items-center pt-2 border-t border-black/10">
                    <span className="text-[10px] font-semibold" style={{ color: textColor }}>
                      AIRCRAFT ALLOY CLIPS
                    </span>
                    <div className="w-8 h-3 rounded-full" style={{ backgroundColor: accentColor.hex }}></div>
                  </div>
                </div>
              )}

              {productType === 'laptop-case' && (
                <div className="relative mx-auto w-64 sm:w-72 aspect-[16/10] rounded-2xl p-5 shadow-2xl border-4 flex flex-col justify-between" style={{ backgroundColor: baseColor.hex, borderColor: accentColor.hex }}>
                  <div className="flex justify-between items-start">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30"></div>
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-70" style={{ color: textColor }}>
                      HONEYCOMB SHOCK CELL
                    </span>
                  </div>

                  <div className="text-center">
                    <span
                      style={{ color: textColor }}
                      className={`text-xl font-bold tracking-wider select-none ${
                        fontStyle === 'bold-sans'
                          ? "font-['Outfit',sans-serif] font-black uppercase"
                          : fontStyle === 'editorial-serif'
                          ? 'font-serif italic font-bold'
                          : fontStyle === 'athletic-mono'
                          ? 'font-mono font-black tracking-widest'
                          : 'font-sans font-light tracking-widest uppercase'
                      }`}
                    >
                      {monogramText || 'CAMPUS · 2026'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono opacity-80" style={{ color: textColor }}>
                    <span>{model}</span>
                    <span>1.6mm PROFILE</span>
                  </div>
                </div>
              )}

              {productType === 'lunch-box' && (
                <div className="relative mx-auto w-56 sm:w-64 aspect-[4/3] rounded-3xl p-5 shadow-2xl border-4 flex flex-col justify-between" style={{ backgroundColor: baseColor.hex, borderColor: accentColor.hex }}>
                  <div className="h-6 rounded-xl border border-white/20 flex items-center justify-center text-[10px] font-bold tracking-widest uppercase text-white/90" style={{ backgroundColor: accentColor.hex }}>
                    VACUUM PRESSURE SEAL
                  </div>

                  <div className="text-center py-2">
                    <span
                      style={{ color: textColor }}
                      className={`text-lg sm:text-xl font-bold tracking-wider select-none ${
                        fontStyle === 'bold-sans'
                          ? "font-['Outfit',sans-serif] font-black uppercase"
                          : fontStyle === 'editorial-serif'
                          ? 'font-serif italic font-bold'
                          : fontStyle === 'athletic-mono'
                          ? 'font-mono font-black tracking-widest'
                          : 'font-sans font-light tracking-widest uppercase'
                      }`}
                    >
                      {monogramText || 'FRESH MEALS'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-semibold opacity-80" style={{ color: textColor }}>
                    <span>100% LEAKPROOF</span>
                    <span>BPA FREE</span>
                  </div>
                </div>
              )}
            </div>

            {/* Price & Guarantee Pill */}
            <div className="mt-8 flex items-center gap-4 text-xs font-semibold text-zinc-600 bg-white/90 backdrop-blur-xs py-2 px-4 rounded-full border border-zinc-200 shadow-xs">
              <span className="text-zinc-950 font-bold tabular-nums text-sm">
                ${currentPrice}.00 USD
              </span>
              <span className="text-zinc-300">|</span>
              <span className="text-emerald-700">Free Custom Monogram Included</span>
            </div>
          </div>

          {/* Right Control Customization Panel */}
          <div className="lg:col-span-6 space-y-6">
            {/* Device / Model Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                1. Select Size / Compatible Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-950 cursor-pointer"
              >
                {modelOptions[productType].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Base Color Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  2. Base Color: <span className="font-semibold text-zinc-950">{baseColor.name}</span>
                </label>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setBaseColor(c)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer relative shadow-xs ${
                      baseColor.id === c.id ? 'ring-2 ring-zinc-950 ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select ${c.name} base color`}
                  >
                    {baseColor.id === c.id && (
                      <Check className={`w-4 h-4 ${c.id === 'chalk' ? 'text-zinc-900' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent / Boot / Bumper Color Picker (Inspired by Montigo & Casetify) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  3. Accent Bumper & Boot: <span className="font-semibold text-zinc-950">{accentColor.name}</span>
                </label>
                <span className="text-[11px] text-zinc-400">Interchangeable</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setAccentColor(c)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer relative shadow-xs ${
                      accentColor.id === c.id ? 'ring-2 ring-zinc-950 ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={`Accent ${c.name}`}
                    aria-label={`Select ${c.name} accent`}
                  >
                    {accentColor.id === c.id && (
                      <Check className={`w-3.5 h-3.5 ${c.id === 'chalk' ? 'text-zinc-900' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Monogram Text Input */}
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    4. Custom Monogram / Name
                  </label>
                  <span className="text-[11px] text-zinc-500 tabular-nums">
                    {monogramText.length}/12 chars
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={12}
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                  placeholder="e.g. ALEX, RUNNER, 2026"
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wider text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-950"
                />
              </div>

              {/* Typography Style */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Font Typography Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'bold-sans', label: 'Bold Sans', fontClass: 'font-sans font-bold' },
                    { id: 'editorial-serif', label: 'Editorial Serif', fontClass: 'font-serif font-bold italic' },
                    { id: 'athletic-mono', label: 'Athletic Mono', fontClass: 'font-mono font-bold' },
                    { id: 'minimal-modern', label: 'Minimalist', fontClass: 'font-sans font-light' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setFontStyle(style.id as any)}
                      className={`px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer text-center ${
                        fontStyle === style.id
                          ? 'bg-zinc-950 text-white font-semibold'
                          : 'bg-white text-zinc-700 hover:bg-zinc-200/70 border border-zinc-200'
                      }`}
                    >
                      <span className={style.fontClass}>Aa</span>
                      <span className="block text-[10px] mt-0.5 truncate">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Monogram Text Color */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                  Text Engraving Color
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { hex: '#FFFFFF', name: 'Chalk White' },
                    { hex: '#18181B', name: 'Charcoal' },
                    { hex: '#D4AF37', name: 'Metallic Gold' },
                    { hex: '#10B981', name: 'Neon Emerald' },
                  ].map((tc) => (
                    <button
                      key={tc.hex}
                      onClick={() => setTextColor(tc.hex)}
                      className={`w-6 h-6 rounded-full border border-zinc-300 transition-all cursor-pointer ${
                        textColor === tc.hex ? 'ring-2 ring-zinc-950 ring-offset-1 scale-110' : ''
                      }`}
                      style={{ backgroundColor: tc.hex }}
                      title={tc.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Finish Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                5. Protective Finish
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'matte', name: 'Soft-Touch Matte', sub: 'Non-slip grip' },
                  { id: 'frosted', name: 'Frosted Armor', sub: 'Semi-translucent' },
                  { id: 'glossy', name: 'Ultra High-Gloss', sub: 'Vibrant shine' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id as any)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      finish === f.id
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <p className="text-xs font-bold">{f.name}</p>
                    <p className={`text-[10px] ${finish === f.id ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {f.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Contiguous Add to Cart Action */}
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Customized Gear to Bag</span>
                <span>·</span>
                <span className="tabular-nums">${currentPrice}.00</span>
              </button>

              {addedToast && (
                <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 animate-fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Customized {productType.replace('-', ' ')} added to your bag!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
