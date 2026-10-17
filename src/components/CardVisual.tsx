import React, { useState } from 'react';
import { CardBrand, CardTier } from '../types';
import { ShieldCheck, Wifi, RotateCw } from 'lucide-react';
import { OnlineGlobeStamp } from './OnlineCardEmblem';

interface CardVisualProps {
  name?: string;
  brand: CardBrand;
  tier: CardTier;
  cardColor?: string;
  textColor?: string;
  accentColor?: string;
  embossedName?: string;
  cardNumber?: string;
  expiry?: string;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isOnlineCard?: boolean;
}

export const CardVisual: React.FC<CardVisualProps> = ({
  name = 'DREAD DYN PREMIUM',
  brand,
  tier,
  cardColor = 'linear-gradient(135deg, #102544 0%, #065CB8 60%, #087CF0 100%)',
  textColor = '#FFFFFF',
  accentColor = '#60A5FA',
  embossedName = 'DREAD DYN CARDHOLDER',
  cardNumber = '•••• •••• •••• 1101',
  expiry = '12/29',
  interactive = true,
  size = 'md',
  isOnlineCard = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const sizeClasses = {
    sm: 'w-64 h-40 text-xs rounded-xl',
    md: 'w-full max-w-[340px] sm:max-w-[380px] h-[215px] sm:h-[235px] text-sm rounded-2xl',
    lg: 'w-full max-w-[420px] h-[255px] text-base rounded-2xl',
  };

  const getTierBadgeStyle = () => {
    switch (tier) {
      case 'Titanium':
      case 'Black Edition':
        return 'bg-zinc-800/60 text-zinc-200 border-zinc-600/50';
      default:
        return 'bg-blue-500/20 text-blue-200 border-blue-400/30';
    }
  };

  return (
    <div className="relative group select-none flex flex-col items-center">
      {/* 3D Container */}
      <div
        className={`relative transition-transform duration-500 [transform-style:preserve-3d] ${sizeClasses[size]} shadow-xl ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        style={{ perspective: '1000px' }}
      >
        {/* FRONT FACE */}
        <div
          className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-between overflow-hidden [backface-visibility:hidden] border border-white/20 shadow-2xl rounded-2xl`}
          style={{ background: cardColor, color: textColor }}
        >
          {/* Subtle Metallic Specular Line */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none" />

          {/* Online Card Globe Watermark Stamp */}
          {isOnlineCard && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
              <OnlineGlobeStamp className="w-36 h-36" color="#80A5C2" />
            </div>
          )}

          {/* Top Row: Brand & Tier Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-extrabold tracking-wider text-xs sm:text-sm uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                <span>DREAD DYN</span>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getTierBadgeStyle()}`}>
                {tier}
              </span>
              {isOnlineCard && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#0B1B32]/90 text-[#BAE6FD] border border-[#80A5C2]/60 flex items-center gap-1.5 shadow-sm tracking-wider">
                  <OnlineGlobeStamp className="w-3 h-3" color="#80A5C2" />
                  <span>ONLINE VERIFIED</span>
                </span>
              )}
            </div>

            {/* Brand Logo Display */}
            <div className="flex items-center">
              {brand === 'RuPay' && (
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/20 shadow-xs">
                  <span className="font-black italic text-base sm:text-lg tracking-tight text-white drop-shadow font-sans">
                    Ru<span className="text-[#F37021]">Pay</span>
                  </span>
                  <div className="flex items-center -space-x-1 ml-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                      <path d="M5 4L11 10L5 16" stroke="#F37021" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 4L16 10L10 16" stroke="#00A651" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )}
              {brand === 'Mastercard' && (
                <div className="flex items-center -space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90 shadow-sm" />
                  <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90 shadow-sm" />
                </div>
              )}
              {brand === 'Visa' && (
                <span className="font-black italic text-lg sm:text-xl tracking-tight text-white drop-shadow">
                  VISA
                </span>
              )}
              {brand === 'DREAD DYN Exclusive' && (
                <span className="font-bold text-xs tracking-widest text-[#38BDF8] border border-[#38BDF8]/40 px-2 py-0.5 rounded">
                  EXCLUSIVE
                </span>
              )}
            </div>
          </div>

          {/* Middle Row: EMV Chip & Contactless wave */}
          <div className="relative z-10 flex items-center gap-3 my-auto">
            {/* Realistic Chip */}
            <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border border-amber-500/40 p-1 flex flex-col justify-between shadow-inner">
              <div className="w-full h-px bg-amber-700/30" />
              <div className="flex justify-between items-center px-1">
                <div className="w-2 h-2 rounded-full border border-amber-800/40" />
                <div className="w-2 h-2 rounded-full border border-amber-800/40" />
              </div>
              <div className="w-full h-px bg-amber-700/30" />
            </div>

            {/* Contactless waves */}
            <div className="flex items-center text-white/80">
              <Wifi className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Bottom Rows: Card Number & Cardholder Details */}
          <div className="relative z-10 space-y-2">
            <div className="font-mono text-base sm:text-lg tracking-[0.18em] font-medium text-white/95 drop-shadow-sm">
              {cardNumber}
            </div>

            <div className="flex items-end justify-between pt-1">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-white/60 font-medium">Cardholder</div>
                <div className="font-semibold text-xs sm:text-sm tracking-wide uppercase truncate max-w-[200px]">
                  {embossedName}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[9px] uppercase tracking-wider text-white/60 font-medium">Expires</div>
                <div className="font-mono font-semibold text-xs sm:text-sm">{expiry}</div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-between overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] bg-[#102544] text-white border border-[#DFEAF7]/30 shadow-2xl rounded-2xl`}
        >
          {/* Black Magnetic Strip */}
          <div className="absolute top-6 left-0 w-full h-10 bg-black/90 shadow-inner" />

          <div className="pt-14 space-y-3">
            {/* Signature & CVV box */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/90 h-8 rounded px-3 flex items-center justify-between text-[#102544] font-mono text-xs italic">
                <span className="opacity-60 text-[10px]">AUTHORIZED SIGNATURE</span>
                <span className="text-neutral-400">••••</span>
              </div>
              <div className="bg-white text-[#102544] font-mono font-bold text-xs px-2.5 py-1.5 rounded border border-gray-300">
                829
              </div>
            </div>

            <div className="text-[10px] text-white/60 leading-tight">
              Issued under authorization of DREAD DYN Vault Services. All transactions protected by 256-bit hardware HSM encryption. For 24/7 concierge assistance call support or verify inside portal.
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/70 border-t border-white/10 pt-2">
            <span className="font-mono text-[10px]">HSM-ID: 994-01-DD</span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#38BDF8]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VAULT VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Control Button */}
      {interactive && (
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#087CF0] hover:text-[#0667C8] bg-white border border-[#DFEAF7] px-3 py-1.5 rounded-full shadow-sm hover:shadow transition"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isFlipped ? 'View Front Side' : 'Flip to View Back & CVV'}</span>
        </button>
      )}
    </div>
  );
};
