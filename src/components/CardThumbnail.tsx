import React from 'react';
import { CardProduct } from '../types';
import { OnlineGlobeStamp } from './OnlineCardEmblem';

interface CardThumbnailProps {
  product: CardProduct;
}

export const CardThumbnail: React.FC<CardThumbnailProps> = ({ product }) => {
  const isOnline = product.isOnlineCard || product.category.includes('Online') || product.name.toLowerCase().includes('online') || product.material.toLowerCase().includes('virtual');
  const isRuPay = product.brand === 'RuPay' || product.category.includes('RuPay') || product.name.toLowerCase().includes('rupay');
  const isMastercard = product.brand === 'Mastercard';
  const isPlatinum = product.tier === 'Platinum' || product.name.toLowerCase().includes('platinum') || product.name.toLowerCase().includes('visa');

  return (
    <div className="w-full aspect-[1.58/1] rounded-xl overflow-hidden relative shadow-sm select-none border border-black/10">
      {/* Background Graphic */}
      {isOnline ? (
        // Cyber Virtual Online Theme (Cyan Circuitry & Holographic Neon Beams)
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020B18] via-[#041933] to-[#012247] overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 150" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cyberCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#087CF0" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#011B38" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="cyberGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Cyber Circuit grid lines */}
            <path d="M0,40 H240 M0,80 H240 M0,120 H240" stroke="#087CF0" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
            <path d="M40,0 V150 M80,0 V150 M120,0 V150 M160,0 V150 M200,0 V150" stroke="#087CF0" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
            
            <path d="M0,95 Q80,20 160,95 T240,40 L240,150 L0,150 Z" fill="url(#cyberCyan)" />
            <path d="M-10,125 Q80,45 175,100 T260,55" stroke="url(#cyberGlow)" strokeWidth="8" fill="none" opacity="0.7" />
            <path d="M0,35 Q100,120 240,30" stroke="#67E8F9" strokeWidth="2" fill="none" opacity="0.9" />
            
            {/* Digital Node pulses */}
            <circle cx="160" cy="95" r="2.5" fill="#67E8F9" opacity="0.95" />
            <circle cx="100" cy="50" r="2" fill="#38BDF8" opacity="0.85" />
            <circle cx="190" cy="40" r="2" fill="#818CF8" opacity="0.9" />

            {/* Online Globe Stamp Watermark */}
            <g transform="translate(150, 30) scale(0.9)" opacity="0.32">
              <circle cx="45" cy="45" r="38" stroke="#80A5C2" strokeWidth="5.5" fill="none" />
              <line x1="45" y1="7" x2="45" y2="83" stroke="#80A5C2" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="7" y1="45" x2="83" y2="45" stroke="#80A5C2" strokeWidth="5.5" strokeLinecap="round" />
              <ellipse cx="45" cy="45" rx="18" ry="38" stroke="#80A5C2" strokeWidth="5.5" fill="none" />
            </g>
          </svg>
        </div>
      ) : isRuPay ? (
        // RuPay Dynamic Energy Theme (Saffron & Emerald on Deep Midnight Sapphire)
        <div className="absolute inset-0 bg-[#07172C] overflow-hidden">
          {/* RuPay Saffron and Green Waves */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 150" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rupaySaffron" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA057" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#F37021" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#9C3A00" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="rupayGreen" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#00A651" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#064E24" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="rupayBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FF8533" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path d="M0,85 Q80,25 150,90 T240,45 L240,150 L0,150 Z" fill="url(#rupaySaffron)" />
            <path d="M-10,115 Q75,45 170,105 T260,60" stroke="url(#rupayGreen)" strokeWidth="11" fill="none" opacity="0.65" />
            <path d="M0,45 Q110,135 240,25" stroke="url(#rupayBeam)" strokeWidth="2.2" fill="none" opacity="0.85" />
            {/* RuPay decorative geometric dots */}
            <circle cx="175" cy="45" r="2" fill="#34D399" opacity="0.85" />
            <circle cx="195" cy="65" r="1.5" fill="#FFA057" opacity="0.85" />
          </svg>
        </div>
      ) : isPlatinum ? (
        // Oceanic Blue Energy Waves Theme
        <div className="absolute inset-0 bg-[#061833] overflow-hidden">
          {/* Blue Ribbon Waves SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 150" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="blueRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#087CF0" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#021E42" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="blueGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path d="M0,90 Q90,10 170,85 T240,30 L240,150 L0,150 Z" fill="url(#blueRibbon1)" />
            <path d="M-10,120 Q80,40 180,95 T260,50" stroke="url(#blueGlow)" strokeWidth="10" fill="none" opacity="0.6" />
            <path d="M10,40 Q110,130 240,35" stroke="#BAE6FD" strokeWidth="2.5" fill="none" opacity="0.85" />
            {/* Small subtle tech points */}
            <circle cx="140" cy="50" r="2" fill="#E0F2FE" opacity="0.9" />
            <circle cx="160" cy="70" r="1.5" fill="#E0F2FE" opacity="0.7" />
          </svg>
        </div>
      ) : (
        // Titanium Black Theme
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A101D] via-[#102544] to-[#040811] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 240 150" fill="none">
            <path d="M0,100 Q120,20 240,80" stroke="#38BDF8" strokeWidth="3" fill="none" />
          </svg>
        </div>
      )}

      {/* Card Content Overlay */}
      <div className="absolute inset-0 p-3 flex flex-col justify-between text-white z-10">
        {/* Top Header: DREAD DYN or Microchip */}
        <div className="flex items-center justify-between">
          <div className="text-[8px] font-mono font-bold tracking-widest uppercase opacity-80 text-white/90">
            DREAD DYN
          </div>
          {isOnline ? (
            <div className="flex items-center gap-1 bg-[#0B1B32]/90 border border-[#80A5C2]/50 rounded-full px-1.5 py-0.5 shadow-xs">
              <OnlineGlobeStamp className="w-2.5 h-2.5" color="#80A5C2" />
              <span className="text-[6.5px] font-mono tracking-wider font-bold text-[#BAE6FD]">
                ONLINE
              </span>
            </div>
          ) : (
            <div className="text-[7px] font-mono tracking-wider font-bold opacity-60 text-white">
              DEBIT
            </div>
          )}
        </div>

        {/* Mid: Realistic EMV Chip */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-4.5 rounded bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border border-amber-600/50 p-0.5 flex flex-col justify-between shadow-inner">
            <div className="w-full h-px bg-amber-800/40" />
            <div className="flex justify-between px-0.5">
              <div className="w-1 h-1 rounded-full border border-amber-900/50" />
              <div className="w-1 h-1 rounded-full border border-amber-900/50" />
            </div>
            <div className="w-full h-px bg-amber-800/40" />
          </div>

          <div className="text-[7.5px] sm:text-[8.5px] font-mono tracking-wider sm:tracking-widest text-white/90 drop-shadow font-semibold truncate">
            •••• •••• •••• {product.last4 || (product.cardNumber ? product.cardNumber.trim().slice(-4) : '1101')}
          </div>
        </div>

        {/* Bottom Row: Brand Logo */}
        <div className="flex items-end justify-between">
          <div className="text-[7px] font-semibold tracking-wider text-white/70 uppercase truncate max-w-[100px]">
            {product.name}
          </div>

          {/* Brand Logo rendering */}
          <div className="flex items-center">
            {isRuPay ? (
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-xs px-1.5 py-0.5 rounded border border-white/20">
                <span className="font-black italic text-[9px] tracking-tight text-white leading-none font-sans">
                  Ru<span className="text-[#F37021]">Pay</span>
                </span>
                <div className="flex items-center -space-x-1 ml-0.5">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="none">
                    <path d="M5 4L11 10L5 16" stroke="#F37021" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 4L16 10L10 16" stroke="#00A651" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ) : isMastercard ? (
              <div className="flex items-center -space-x-2">
                <div className="w-4.5 h-4.5 rounded-full bg-[#EB001B] opacity-95 shadow-xs" />
                <div className="w-4.5 h-4.5 rounded-full bg-[#F79E1B] opacity-95 shadow-xs" />
              </div>
            ) : (
              <span className="font-black italic text-xs tracking-tight text-white drop-shadow">
                VISA
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
