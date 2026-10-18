import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Copy,
  Check,
  Lock,
  Unlock,
  Globe,
  Flame,
  Smartphone,
  RefreshCw,
  X,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { CardProduct } from '../types';
import { useToast } from '../context/ToastContext';
import { OnlineCardEmblem, OnlineGlobeStamp } from './OnlineCardEmblem';

interface OnlineCardControlsModalProps {
  product: CardProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const OnlineCardControlsModal: React.FC<OnlineCardControlsModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();

  // Virtual Card Credentials State
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dynamicCvv, setDynamicCvv] = useState('832');
  const [cvvTimeLeft, setCvvTimeLeft] = useState('14h 28m');

  // Online Controls State
  const [isFrozen, setIsFrozen] = useState(false);
  const [onlineSpend, setOnlineSpend] = useState(true);
  const [intlSpend, setIntlSpend] = useState(true);
  const [burnerMode, setBurnerMode] = useState(false);
  const [contactlessNfc, setContactlessNfc] = useState(true);
  const [monthlyLimit, setMonthlyLimit] = useState(75000);
  const [appleWalletAdded, setAppleWalletAdded] = useState(false);
  const [googlePayAdded, setGooglePayAdded] = useState(false);

  if (!isOpen) return null;

  const rawCardNumber = product.cardNumber || '4209 8810 2394 1101';
  const last4Digits = product.last4 || (product.cardNumber ? product.cardNumber.trim().slice(-4) : '1101');
  const maskedCardNumber = `•••• •••• •••• ${last4Digits}`;

  const handleCopyCard = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(rawCardNumber.replace(/\s+/g, ''));
      }
      setCopied(true);
      showToast('Virtual card number copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard write prevented by browser iframe sandbox', e);
      setCopied(true);
      showToast('Card credentials ready for secure use.', 'info');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRotateCvv = () => {
    const newCvv = Math.floor(100 + Math.random() * 900).toString();
    setDynamicCvv(newCvv);
    setCvvTimeLeft('24h 00m');
    showToast(`New dynamic 3D-Secure CVV generated: ${newCvv}`, 'success');
  };

  const handleAddToAppleWallet = () => {
    setAppleWalletAdded(true);
    showToast('Card successfully provisioned to Apple Wallet & Apple Pay!', 'success');
  };

  const handleAddToGooglePay = () => {
    setGooglePayAdded(true);
    showToast('Card successfully provisioned to Google Pay & Wallet!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#DFEAF7] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#07192F] via-[#0A2647] to-[#041B33] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <OnlineCardEmblem className="w-10 h-10 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  Online Card Virtual Controls
                </h3>
                <span className="text-[10px] bg-cyan-400/20 text-cyan-200 border border-cyan-400/40 px-2 py-0.5 rounded-full font-bold">
                  LIVE VIRTUAL
                </span>
              </div>
              <p className="text-xs text-white/70">
                Instant Cloud Issuance &bull; Security &bull; Spending Limits &bull; Wallet Tokens
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto text-xs">
          {/* 1. Digital Virtual Card Credentials Card */}
          <div className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
            isFrozen 
              ? 'bg-zinc-900 border-zinc-700 text-zinc-400' 
              : 'bg-gradient-to-tr from-[#051329] via-[#092B54] to-[#013B6B] border-[#087CF0]/40 text-white shadow-lg'
          }`}>
            {/* Globe Stamp Background Watermark */}
            <div className="absolute -right-4 -bottom-4 pointer-events-none opacity-15">
              <OnlineGlobeStamp className="w-32 h-32" color="#80A5C2" />
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-white/15 relative z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold tracking-widest text-[11px] text-cyan-300">
                  DREAD DYN VIRTUAL
                </span>
                {isFrozen && (
                  <span className="text-[10px] bg-rose-500/30 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    CARD FROZEN
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                <OnlineGlobeStamp className="w-3 h-3" color="#80A5C2" />
                <span className="text-[10px] font-bold text-white/90">
                  {product.brand} ONLINE
                </span>
              </div>
            </div>

            <div className="my-4 space-y-1">
              <div className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">
                Virtual Card Number
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg sm:text-xl font-black tracking-wider text-white">
                  {showFullNumber ? rawCardNumber : maskedCardNumber}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowFullNumber(!showFullNumber)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1 text-[11px]"
                    title="Toggle Card Number"
                  >
                    {showFullNumber ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showFullNumber ? 'Hide' : 'Reveal'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyCard}
                    className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 transition flex items-center gap-1 text-[11px] font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/15">
              <div>
                <div className="text-[10px] text-white/60 uppercase">Expiry</div>
                <div className="font-mono font-bold text-sm text-white">10/29</div>
              </div>

              <div>
                <div className="text-[10px] text-white/60 uppercase flex items-center gap-1">
                  <span>Dynamic CVV</span>
                  <span className="text-[9px] text-cyan-300">({cvvTimeLeft})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-cyan-300 tracking-wider">
                    {showFullNumber ? dynamicCvv : '•••'}
                  </span>
                  <button
                    type="button"
                    onClick={handleRotateCvv}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition"
                    title="Regenerate Dynamic CVV Now"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-white/60 uppercase">Type</div>
                <div className="font-bold text-xs text-white">Cloud Instant</div>
              </div>
            </div>
          </div>

          {/* 2. Quick Security Toggle Switches */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#102544] flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#087CF0]" />
              <span>Online Card Security Toggles (অনলাইন সিকিউরিটি কন্ট্রোল)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Toggle 1: Instant Card Freeze */}
              <div className="p-3.5 rounded-2xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-center justify-between">
                <div className="space-y-0.5 pr-2">
                  <div className="font-bold text-[#102544] flex items-center gap-1.5">
                    {isFrozen ? <Lock className="w-3.5 h-3.5 text-rose-600" /> : <Unlock className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>Instant Vault Freeze</span>
                  </div>
                  <div className="text-[11px] text-[#4A5F7D]">
                    Temporarily freeze card to block any unauthorized charge.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsFrozen(!isFrozen);
                    showToast(isFrozen ? 'Card Unfrozen and ready for transactions!' : 'Card has been locked and frozen.', isFrozen ? 'success' : 'info');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isFrozen ? 'bg-rose-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isFrozen ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: E-Commerce / Online Transactions */}
              <div className="p-3.5 rounded-2xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-center justify-between">
                <div className="space-y-0.5 pr-2">
                  <div className="font-bold text-[#102544] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#087CF0]" />
                    <span>Online E-Commerce Spend</span>
                  </div>
                  <div className="text-[11px] text-[#4A5F7D]">
                    Allow online checkout on Amazon, SaaS, streaming & apps.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOnlineSpend(!onlineSpend);
                    showToast(onlineSpend ? 'Online transactions disabled' : 'Online transactions enabled', 'info');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    onlineSpend ? 'bg-[#087CF0]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      onlineSpend ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: International Online Transactions */}
              <div className="p-3.5 rounded-2xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-center justify-between">
                <div className="space-y-0.5 pr-2">
                  <div className="font-bold text-[#102544] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#087CF0]" />
                    <span>International Online Payments</span>
                  </div>
                  <div className="text-[11px] text-[#4A5F7D]">
                    Multi-currency global payments (USD, EUR, GBP, AED).
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIntlSpend(!intlSpend);
                    showToast(intlSpend ? 'International online payments disabled' : 'International online payments enabled', 'info');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    intlSpend ? 'bg-[#087CF0]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      intlSpend ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 4: Single-Use Disposable Burner Mode */}
              <div className="p-3.5 rounded-2xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-center justify-between">
                <div className="space-y-0.5 pr-2">
                  <div className="font-bold text-[#102544] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Single-Use Disposable Mode</span>
                  </div>
                  <div className="text-[11px] text-[#4A5F7D]">
                    Auto-destroys card details after 1 purchase (anti-subscription).
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBurnerMode(!burnerMode);
                    showToast(burnerMode ? 'Single-use burner mode deactivated' : 'Single-use burner mode activated: card will cycle after 1 transaction', 'success');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    burnerMode ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      burnerMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Monthly Spend Limit Slider */}
          <div className="p-4 rounded-2xl bg-[#F4F8FC] border border-[#DFEAF7] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-[#102544] text-xs">
                  Monthly Online Spending Limit
                </div>
                <div className="text-[11px] text-[#4A5F7D]">
                  Automatic guardrail to block accidental overspend.
                </div>
              </div>
              <div className="font-mono font-extrabold text-sm text-[#087CF0] bg-white border border-[#DFEAF7] px-2.5 py-1 rounded-lg">
                ₹{monthlyLimit.toLocaleString('en-IN')}
              </div>
            </div>

            <input
              type="range"
              min="10000"
              max="350000"
              step="5000"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(Number(e.target.value))}
              className="w-full accent-[#087CF0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#4A5F7D] font-mono">
              <span>₹10,000 (Min)</span>
              <span>₹350,000 (Max Limit)</span>
            </div>
          </div>

          {/* 4. Digital Wallet Provisioning (Apple Pay & Google Wallet) */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-[#102544] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#087CF0]" />
              <span>Instant Digital Wallet Sync (অ্যাপল ও গুগল ওয়ালেট)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToAppleWallet}
                disabled={appleWalletAdded}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-bold transition ${
                  appleWalletAdded
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                {appleWalletAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Apple Wallet</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.58-7.79-11.67-14.25-6.85-10.74-11.83-22.75-14.94-36.03-3.12-13.28-3.41-25.07-.86-35.37 2.94-11.95 8.79-21.32 17.55-28.11 8.76-6.79 18.79-10.3 30.1-10.53 4.25 0 9.25 1.15 15.01 3.44 5.76 2.3 9.4 3.49 10.92 3.59 1.15-.1 5.03-1.35 11.64-3.76 6.6-2.41 12.02-3.45 16.27-3.11 15.42 1.25 27.28 7.37 35.58 18.36-13.79 8.35-20.48 19.64-20.08 33.86.39 11.13 4.67 20.37 12.83 27.72 8.16 7.35 17.65 11.75 28.48 13.2-2.18 6.82-4.99 13.91-8.43 21.28zM119.22 33.58c0-7.23 2.65-14.07 7.95-20.52 5.3-6.45 11.87-10.73 19.71-12.84.45 2.53.68 4.79.68 6.78 0 7.39-2.8 14.45-8.4 21.18-5.6 6.73-12.43 11-20.5 12.81-.34-2.49-.51-4.77-.51-6.84z"/>
                    </svg>
                    <span>Add to Apple Wallet</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleAddToGooglePay}
                disabled={googlePayAdded}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-bold transition ${
                  googlePayAdded
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-[#DFEAF7] text-[#102544] hover:bg-[#F4F8FC]'
                }`}
              >
                {googlePayAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Google Wallet</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold tracking-tight">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">o</span>
                      <span className="text-[#FBBC05]">o</span>
                      <span className="text-[#4285F4]">g</span>
                      <span className="text-[#34A853]">l</span>
                      <span className="text-[#EA4335]">e</span>
                      <span className="text-[#5F6368] ml-1">Pay</span>
                    </span>
                    <span>&bull; Add Card</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 5. 100% Instant Delivery Notice */}
          <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Instant Online Delivery Guarantee:</span>
              <p className="text-[11px] text-cyan-800 leading-relaxed">
                Zero physical shipping or courier delay. Your virtual 16-digit credentials, dynamic CVV, and encrypted wallet tokens activate immediately upon checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 bg-[#F4F8FC] border-t border-[#DFEAF7] flex items-center justify-between">
          <span className="text-[11px] text-[#4A5F7D]">
            All online settings take effect instantaneously in your client vault.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#087CF0] text-white font-bold hover:bg-[#0667C8] transition shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
