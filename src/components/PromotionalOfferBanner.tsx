import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromotionalOfferBannerProps {
  onShopNow?: () => void;
}

export const PromotionalOfferBanner: React.FC<PromotionalOfferBannerProps> = ({
  onShopNow,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#04152E] via-[#092B5A] to-[#031C3F] border border-[#38BDF8]/35 p-4 sm:p-6 shadow-[0_10px_30px_rgba(8,124,240,0.18)] my-1 sm:my-2">
      {/* Ambient Glow Effects */}
      <div className="absolute -top-12 -right-12 w-48 sm:w-64 h-48 sm:h-64 bg-[#087CF0]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/4 w-36 sm:w-48 h-36 sm:h-48 bg-[#38BDF8]/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-[#FDE047]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Cyber Circuit Wave Background SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        viewBox="0 0 600 200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 Q150,20 300,100 T600,60"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M0,130 Q200,60 400,140 T600,110"
          stroke="#60A5FA"
          strokeWidth="1.2"
        />
      </svg>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Left Column: Text & CTA */}
        <div className="space-y-2 sm:space-y-2.5 text-center sm:text-left flex-1">
          {/* Badge: SPECIAL OFFER */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 text-[10px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(250,204,21,0.25)]">
            <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
            <span>SPECIAL OFFER</span>
          </div>

          {/* Main Heading: Get 19% OFF */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            <span>Get </span>
            <span className="text-yellow-300 drop-shadow-[0_2px_14px_rgba(253,224,71,0.55)] font-black">
              19% OFF
            </span>
          </h2>

          {/* Subheading: On All Premium Cards */}
          <p className="text-xs sm:text-sm text-blue-100 font-medium tracking-wide">
            On All Premium Cards
          </p>

          {/* Button: Shop Now → */}
          <div className="pt-1.5">
            <button
              type="button"
              onClick={onShopNow}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-[#07192F] font-black text-xs sm:text-sm shadow-[0_4px_16px_rgba(250,204,21,0.35)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Small Card Illustrations */}
        <div className="relative shrink-0 flex items-center justify-center w-48 sm:w-56 h-28 sm:h-32 select-none pointer-events-none">
          {/* Card 1: Back-Left Visa Blue Card (Tilted -12°) */}
          <div className="absolute left-2 sm:left-4 top-2 w-28 sm:w-32 h-18 sm:h-20 rounded-xl bg-gradient-to-tr from-[#07244D] via-[#0E4287] to-[#082956] border border-[#38BDF8]/40 shadow-md transform -rotate-12 p-2 flex flex-col justify-between text-white">
            <div className="flex justify-between items-center">
              <span className="text-[6px] font-mono font-bold text-white/70">DREAD DYN</span>
              <span className="text-[5.5px] font-bold text-cyan-300">PLATINUM</span>
            </div>
            <div className="w-3.5 h-2.5 rounded bg-amber-300/80 border border-amber-500/40" />
            <div className="flex justify-between items-end">
              <span className="text-[5px] font-mono tracking-wider opacity-60">•••• 1182</span>
              <span className="font-black italic text-[8px] tracking-tight text-white drop-shadow">VISA</span>
            </div>
          </div>

          {/* Card 2: Back-Right RuPay Saffron Card (Tilted 10°) */}
          <div className="absolute right-2 sm:right-4 top-1 w-28 sm:w-32 h-18 sm:h-20 rounded-xl bg-gradient-to-tr from-[#1F1106] via-[#381F08] to-[#120B04] border border-[#F37021]/50 shadow-md transform rotate-10 p-2 flex flex-col justify-between text-white">
            <div className="flex justify-between items-center">
              <span className="text-[6px] font-mono font-bold text-white/70">DREAD DYN</span>
              <span className="text-[5.5px] font-bold text-amber-300">SELECT</span>
            </div>
            <div className="w-3.5 h-2.5 rounded bg-amber-300/80 border border-amber-500/40" />
            <div className="flex justify-between items-end">
              <span className="text-[5px] font-mono tracking-wider opacity-60">•••• 1421</span>
              <span className="font-black italic text-[7px] text-[#F37021]">RuPay</span>
            </div>
          </div>

          {/* Card 3: Center-Front Mastercard Titanium Card (Tilted 0°) */}
          <div className="relative z-10 w-32 sm:w-36 h-20 sm:h-22 rounded-xl bg-gradient-to-tr from-[#0A101D] via-[#162238] to-[#0D1524] border border-white/30 shadow-xl p-2.5 flex flex-col justify-between text-white transform hover:scale-105 transition-transform">
            <div className="flex justify-between items-center">
              <span className="text-[7px] font-mono font-bold tracking-wider text-cyan-300">DREAD DYN</span>
              <span className="text-[6px] font-bold px-1 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">19% OFF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-3 rounded bg-gradient-to-tr from-amber-300 to-amber-400 border border-amber-500/60 shadow-xs" />
              <span className="text-[7px] font-mono tracking-widest text-white/90">•••• 1092</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[6px] uppercase font-bold text-white/80">TITANIUM</span>
              <div className="flex items-center -space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] opacity-95 shadow-xs" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-95 shadow-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
