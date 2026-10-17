import React, { useEffect, useState } from 'react';
import { CreditCard, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onDismiss, 350);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F8FC] flex flex-col items-center justify-center p-6 text-[#102544] select-none">
      {/* Background Subtle Office Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#DFEAF7_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-sm w-full bg-white border border-[#DFEAF7] rounded-2xl p-8 shadow-xl flex flex-col items-center text-center">
        {/* Emblem / Card Graphic */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#102544] via-[#065CB8] to-[#087CF0] p-4 text-white shadow-lg flex items-center justify-center border border-[#DFEAF7]">
            <CreditCard className="w-10 h-10" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border border-[#DFEAF7] shadow-sm text-[#087CF0]">
            <ShieldCheck className="w-5 h-5 fill-blue-50" />
          </div>
        </div>

        {/* Wordmark */}
        <BrandLogo size="lg" />

        <p className="text-xs text-[#4A5F7D] mt-3 leading-relaxed">
          High-limit corporate and metal prestige cards. Hardware-secured vault issuance.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-[#F4F8FC] border border-[#DFEAF7] h-2 rounded-full overflow-hidden mt-6">
          <div
            className="bg-[#087CF0] h-full transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[11px] font-semibold text-[#4A5F7D] mt-2">
          <span>Initializing Vault Portal</span>
          <span>{progress}%</span>
        </div>

        {/* Manual Skip Button */}
        <button
          type="button"
          onClick={onDismiss}
          className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#102544] text-white hover:bg-[#087CF0] transition shadow-sm"
        >
          <span>Enter Store Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[#4A5F7D]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>PCI-DSS Office Level Architecture</span>
        </div>
      </div>
    </div>
  );
};
