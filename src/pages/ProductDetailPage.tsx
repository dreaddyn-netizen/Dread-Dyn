import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { CardVisual } from '../components/CardVisual';
import { ProductCard } from '../components/ProductCard';
import { OnlineCardControlsModal } from '../components/OnlineCardControlsModal';
import { OnlineCardEmblem } from '../components/OnlineCardEmblem';
import {
  ShieldCheck,
  Star,
  Check,
  Heart,
  ArrowLeft,
  Truck,
  Cpu,
  Globe,
  Lock,
  Layers,
  Sparkles,
  CreditCard,
  Sliders,
  Zap
} from 'lucide-react';
import { formatCurrency } from '../lib/currency';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const product = getProductById(id || '');

  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryType, setDeliveryType] = useState<'digital' | 'physical'>('digital');
  const [embossedName, setEmbossedName] = useState<string>('DREAD DYN CARDHOLDER');
  const [showOnlineModal, setShowOnlineModal] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#102544]">Card Not Found</h2>
        <p className="text-xs text-[#4A5F7D]">The requested card model does not exist or has been removed from the vault.</p>
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#087CF0] text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalogue</span>
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const isOnline = !!product.isOnlineCard || product.category.includes('Online') || product.name.toLowerCase().includes('online') || product.material.toLowerCase().includes('virtual');
  const relatedCards = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.tier === product.tier))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, deliveryType, embossedName.toUpperCase());
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, deliveryType, embossedName.toUpperCase());
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 font-bold text-[#4A5F7D] hover:text-[#087CF0] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </button>

        <div className="flex items-center gap-2 text-[#4A5F7D]">
          <Link to="/" className="hover:text-[#087CF0]">Store</Link>
          <span>/</span>
          <Link to="/catalogue" className="hover:text-[#087CF0]">Cards</Link>
          <span>/</span>
          <span className="font-semibold text-[#102544] truncate max-w-[150px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Showcase Box */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Interactive 3D Visualizer & Name Customization */}
        <div className="lg:col-span-6 flex flex-col items-center justify-between space-y-6">
          <div className="w-full bg-[#F4F8FC] border border-[#DFEAF7] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative shadow-inner">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs border border-[#DFEAF7] px-2.5 py-1 rounded-md text-[10px] font-bold text-[#102544] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>LIVE LASER ENGRAVING PREVIEW</span>
            </div>

            <div className="py-4 w-full flex justify-center">
              <CardVisual
                name={product.name}
                brand={product.brand}
                tier={product.tier}
                cardColor={product.cardColor}
                textColor={product.textColor}
                accentColor={product.accentColor}
                embossedName={embossedName.toUpperCase() || 'DREAD DYN CLIENT'}
                cardNumber={`•••• •••• •••• ${product.last4 || (product.cardNumber ? product.cardNumber.trim().slice(-4) : '1101')}`}
                expiry="12/29"
                interactive={true}
                size="md"
                isOnlineCard={isOnline}
              />
            </div>

            <p className="text-[11px] text-[#4A5F7D] text-center mt-2">
              Tap &ldquo;Flip&rdquo; button above to view magnetic stripe and 256-bit HSM security stamp.
            </p>
          </div>

          {/* Laser-Engraved Cardholder Name Input */}
          <div className="w-full bg-white border border-[#DFEAF7] rounded-xl p-4 space-y-2">
            <label className="text-xs font-bold text-[#102544] flex items-center justify-between">
              <span>Laser-Engraved Cardholder Name</span>
              <span className="text-[11px] text-[#4A5F7D] font-normal">Max 24 characters</span>
            </label>
            <input
              type="text"
              maxLength={24}
              value={embossedName}
              onChange={(e) => setEmbossedName(e.target.value)}
              placeholder="e.g. MARCUS VANCE"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F8FC] border border-[#DFEAF7] rounded-lg font-mono uppercase tracking-wider text-[#102544] focus:outline-none focus:border-[#087CF0] focus:bg-white"
            />
            <div className="text-[11px] text-[#4A5F7D]">
              Embossed in precision high-relief font on the physical metal card face.
            </div>
          </div>
        </div>

        {/* Right Column: Card Specifications & Purchasing Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#EBF4FE] text-[#087CF0] border border-[#DFEAF7]">
                {product.brand}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                {product.tier} TIER
              </span>
              <span className="text-[11px] font-semibold text-[#4A5F7D] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
                {product.material}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#102544] tracking-tight">
              {product.name}
            </h1>

            {/* Rating and Reviews Counter */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-[#4A5F7D] font-medium">({product.reviewCount} verified client reviews)</span>
              <span className="text-[#4A5F7D]">•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Authentic Vault Instrument
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-baseline justify-between">
            <div>
              <div className="text-[11px] font-bold text-[#4A5F7D] uppercase">Issuance Price</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-[#102544]">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-[#4A5F7D] line-through">{formatCurrency(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-bold uppercase text-[#4A5F7D]">Inventory Status</div>
              {product.inStock ? (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md mt-0.5">
                  In Stock ({product.stockCount} Available)
                </div>
              ) : (
                <div className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md mt-0.5">
                  Out of Stock
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#4A5F7D] leading-relaxed">
            {product.description}
          </p>

          {/* Core Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-[#DFEAF7] bg-white flex items-start gap-2.5">
              <Cpu className="w-4 h-4 text-[#087CF0] shrink-0 mt-0.5" />
              <div>
                <div className="text-[#4A5F7D] font-medium text-[11px]">Daily Spend Ceiling</div>
                <div className="font-bold text-[#102544]">{product.dailyLimit}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-[#DFEAF7] bg-white flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-[#087CF0] shrink-0 mt-0.5" />
              <div>
                <div className="text-[#4A5F7D] font-medium text-[11px]">FX Exchange Rate</div>
                <div className="font-bold text-[#102544]">{product.internationalFee}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-[#DFEAF7] bg-white flex items-start gap-2.5">
              <CreditCard className="w-4 h-4 text-[#087CF0] shrink-0 mt-0.5" />
              <div>
                <div className="text-[#4A5F7D] font-medium text-[11px]">ATM Network</div>
                <div className="font-bold text-[#102544]">{product.atmAccess}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-[#DFEAF7] bg-white flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-[#087CF0] shrink-0 mt-0.5" />
              <div>
                <div className="text-[#4A5F7D] font-medium text-[11px]">Card Validity</div>
                <div className="font-bold text-[#102544]">{product.validity}</div>
              </div>
            </div>
          </div>

          {/* Delivery Format Option */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#102544] uppercase tracking-wider block">
              Issuance Format
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setDeliveryType('digital')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  deliveryType === 'digital'
                    ? 'border-[#087CF0] bg-[#EBF4FE] text-[#102544]'
                    : 'border-[#DFEAF7] bg-white text-[#4A5F7D] hover:bg-[#F4F8FC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#102544]">Digital Instant Vault</span>
                  {deliveryType === 'digital' && <Check className="w-4 h-4 text-[#087CF0]" />}
                </div>
                <span className="text-[11px] text-[#4A5F7D]">Immediate access in portal upon checkout.</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('physical')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  deliveryType === 'physical'
                    ? 'border-[#087CF0] bg-[#EBF4FE] text-[#102544]'
                    : 'border-[#DFEAF7] bg-white text-[#4A5F7D] hover:bg-[#F4F8FC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#102544]">Physical Vault Courier</span>
                  {deliveryType === 'physical' && <Check className="w-4 h-4 text-[#087CF0]" />}
                </div>
                <span className="text-[11px] text-[#4A5F7D]">Dispatched in armored tamper-evident sleeve.</span>
              </button>
            </div>
          </div>

          {/* Online Virtual Features & Options Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#031B38] via-[#082C58] to-[#041E3E] text-white border border-[#087CF0]/40 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <OnlineCardEmblem className="w-8 h-8 shrink-0" />
                <span className="font-extrabold text-xs tracking-wide text-cyan-300 uppercase flex items-center gap-1.5">
                  <span>Online Card Virtual Options</span>
                </span>
              </div>
              <span className="text-[10px] bg-cyan-400/20 text-cyan-200 border border-cyan-400/40 px-2 py-0.5 rounded font-bold">
                0s WAIT TIME
              </span>
            </div>

            <p className="text-[11px] text-white/80 leading-relaxed">
              Instant 16-digit digital token, dynamic rotating 3D CVV, one-click disposable burner mode, and Apple/Google Wallet sync.
            </p>

            <button
              type="button"
              onClick={() => setShowOnlineModal(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#04152D] font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Configure Online Card Options &amp; Security Controls</span>
            </button>
          </div>

          {/* Quantity Selector & Purchase Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#DFEAF7] rounded-xl bg-[#F4F8FC] p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#DFEAF7] text-[#102544] font-bold flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#102544]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#DFEAF7] text-[#102544] font-bold flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-xl border transition ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-[#DFEAF7] text-[#4A5F7D] hover:text-rose-600'
                }`}
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Direct Instant Buy / Checkout Button */}
              <button
                type="button"
                disabled={!product.inStock}
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#087CF0] text-white hover:bg-[#0667C8] active:bg-[#0555A6] transition shadow-md shadow-blue-500/15 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Instant Express Checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Perks and Security Checklist */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-extrabold text-lg text-[#102544] mb-4">
          Included Executive Card Privileges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#102544]">
          {product.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F4F8FC] border border-[#DFEAF7]">
              <Check className="w-4 h-4 text-[#087CF0] shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Cards */}
      {relatedCards.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-xl text-[#102544]">
            Comparable Card Editions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCards.map((rc) => (
              <ProductCard key={rc.id} product={rc} />
            ))}
          </div>
        </div>
      )}

      {/* Online Card Virtual Controls Modal */}
      <OnlineCardControlsModal
        product={product}
        isOpen={showOnlineModal}
        onClose={() => setShowOnlineModal(false)}
      />
    </div>
  );
};
