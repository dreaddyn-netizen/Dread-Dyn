import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { OnlineCardEmblem } from '../components/OnlineCardEmblem';
import { PromotionalOfferBanner } from '../components/PromotionalOfferBanner';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter products by selected category
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Mastercard') return p.brand === 'Mastercard';
    if (selectedCategory === 'Visa') return p.brand === 'Visa';
    if (selectedCategory === 'RuPay') return p.brand === 'RuPay' || p.category.includes('RuPay');
    if (selectedCategory === 'Online') return p.category.includes('Online') || !!p.isOnlineCard || p.name.toLowerCase().includes('online') || p.material.toLowerCase().includes('virtual');
    return true;
  });

  const displayedProducts = filteredProducts;
  const firstFourProducts = displayedProducts.slice(0, 4);
  const remainingProducts = displayedProducts.slice(4);

  const handleShopNow = () => {
    const el = document.getElementById('more-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollToProducts();
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('popular-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(categoryName);
    }
    scrollToProducts();
  };

  return (
    <div className="max-w-2xl sm:max-w-4xl lg:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 pb-24">
      {/* 1. TOP PROMOTIONAL BANNER */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#08182E] via-[#0E2442] to-[#143258] text-white p-5 sm:p-7 shadow-[0_8px_24px_rgba(8,124,240,0.12)] border border-[#DFEAF7]/20 overflow-hidden">
        {/* Subtle background wave glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#087CF0]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* Left Text & CTA */}
          <div className="space-y-2 sm:space-y-3 max-w-[58%] sm:max-w-md">
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Get Premium Cards
            </h1>

            <div className="space-y-0.5 text-xs sm:text-sm text-slate-200 font-medium">
              <div>Secure • Fast Delivery</div>
              <div>Best Prices</div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToProducts}
                className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#087CF0] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#0667C8] active:scale-95 transition"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Floating 3D Tilted Card matching the screenshot */}
          <div className="relative shrink-0 pr-1 sm:pr-4 flex items-center justify-center">
            <div className="w-36 sm:w-56 h-22 sm:h-34 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#061833] via-[#0C3260] to-[#12427D] p-2.5 sm:p-3.5 flex flex-col justify-between text-white shadow-2xl border border-white/20 transform rotate-[-8deg] sm:rotate-[-10deg] hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-xl" />

              <div className="flex items-center justify-between">
                <span className="text-[7px] sm:text-[9px] font-mono tracking-widest uppercase font-bold text-white/90">
                  DREAD DYN
                </span>
                <span className="text-[6px] sm:text-[8px] font-mono opacity-70">
                  PLATINUM
                </span>
              </div>

              {/* Chip & contactless */}
              <div className="flex items-center gap-1.5 sm:gap-2 my-auto">
                <div className="w-5 sm:w-7 h-3.5 sm:h-5 rounded bg-gradient-to-tr from-amber-300 to-amber-400 border border-amber-500/50 p-0.5 shadow-inner" />
                <div className="text-[6.5px] sm:text-[9px] font-mono tracking-widest text-white/90 font-medium">
                  •••• •••• •••• 1101
                </div>
              </div>

              {/* Bottom logo */}
              <div className="flex items-end justify-between">
                <span className="text-[6px] sm:text-[8px] uppercase tracking-wider text-white/70 truncate max-w-[80px]">
                  PREMIUM VAULT
                </span>
                <div className="flex items-center -space-x-1.5 sm:-space-x-2">
                  <div className="w-3.5 sm:w-5 h-3.5 sm:h-5 rounded-full bg-[#EB001B] opacity-95" />
                  <div className="w-3.5 sm:w-5 h-3.5 sm:h-5 rounded-full bg-[#F79E1B] opacity-95" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY CARDS (4 COLUMNS EXACTLY AS IN SCREENSHOT - FILTER IN PLACE) */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {/* Category 1: Mastercard */}
        <button
          type="button"
          onClick={() => handleCategoryClick('Mastercard')}
          className={`border rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center justify-center space-y-1.5 shadow-[0_2px_8px_rgba(16,37,68,0.03)] hover:shadow-md transition group ${
            selectedCategory === 'Mastercard'
              ? 'bg-[#EBF4FE] border-[#087CF0] ring-2 ring-[#087CF0]/20'
              : 'bg-white border-[#DFEAF7] hover:border-[#087CF0]'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="flex items-center -space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-[#EB001B]" />
              <div className="w-5 h-5 rounded-full bg-[#F79E1B]" />
            </div>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#102544]">
            Mastercard
          </span>
        </button>

        {/* Category 2: Visa */}
        <button
          type="button"
          onClick={() => handleCategoryClick('Visa')}
          className={`border rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center justify-center space-y-1.5 shadow-[0_2px_8px_rgba(16,37,68,0.03)] hover:shadow-md transition group ${
            selectedCategory === 'Visa'
              ? 'bg-[#EBF4FE] border-[#087CF0] ring-2 ring-[#087CF0]/20'
              : 'bg-white border-[#DFEAF7] hover:border-[#087CF0]'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="font-black italic text-lg sm:text-xl text-[#0A2540] tracking-tight">
              VISA
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#102544]">
            Visa
          </span>
        </button>

        {/* Category 3: RuPay */}
        <button
          type="button"
          onClick={() => handleCategoryClick('RuPay')}
          className={`border rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center justify-center space-y-1.5 shadow-[0_2px_8px_rgba(16,37,68,0.03)] hover:shadow-md transition group ${
            selectedCategory === 'RuPay'
              ? 'bg-[#EBF4FE] border-[#087CF0] ring-2 ring-[#087CF0]/20'
              : 'bg-white border-[#DFEAF7] hover:border-[#087CF0]'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="flex items-center">
              <span className="font-black italic text-sm sm:text-base tracking-tight text-[#0A2540]">
                Ru<span className="text-[#F37021]">Pay</span>
              </span>
              <div className="flex items-center -space-x-1 ml-0.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                  <path d="M5 4L11 10L5 16" stroke="#F37021" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 4L16 10L10 16" stroke="#00A651" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#102544]">
            RuPay
          </span>
        </button>

        {/* Category 4: Online Cards */}
        <button
          type="button"
          onClick={() => handleCategoryClick('Online')}
          className={`border rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center justify-center space-y-1.5 shadow-[0_2px_8px_rgba(16,37,68,0.03)] hover:shadow-md transition group ${
            selectedCategory === 'Online'
              ? 'bg-[#EBF4FE] border-[#087CF0] ring-2 ring-[#087CF0]/20'
              : 'bg-white border-[#DFEAF7] hover:border-[#087CF0]'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
            <OnlineCardEmblem className="w-10 h-10 sm:w-11 sm:h-11" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#102544]">
            Online Cards
          </span>
        </button>
      </div>

      {/* 3. FIRST 4 PRODUCT CARDS */}
      <div id="popular-products" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 scroll-mt-20">
        {firstFourProducts.map((card) => (
          <ProductCard key={card.id} product={card} />
        ))}
      </div>

      {/* 4. ATTRACTIVE PROMOTIONAL OFFER BANNER */}
      <PromotionalOfferBanner onShopNow={handleShopNow} />

      {/* 5. REMAINING PRODUCT CARDS */}
      {remainingProducts.length > 0 && (
        <div id="more-products" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 scroll-mt-20">
          {remainingProducts.map((card) => (
            <ProductCard key={card.id} product={card} />
          ))}
        </div>
      )}
    </div>
  );
};
