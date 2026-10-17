import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  ArrowLeft,
  Truck,
  CreditCard
} from 'lucide-react';
import { formatCurrency } from '../lib/currency';

export const CartPage: React.FC = () => {
  const {
    items,
    itemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    subtotal,
    discountAmount,
    shippingFee,
    total,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EBF4FE] text-[#087CF0] flex items-center justify-center mx-auto border border-[#DFEAF7]">
          <CreditCard className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#102544]">No Cards Selected</h2>
        <p className="text-xs sm:text-sm text-[#4A5F7D] max-w-sm mx-auto">
          Explore our premium card editions, configure your laser embossing, and secure high-limit instruments.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#087CF0] text-white font-bold text-xs shadow-md"
        >
          <CreditCard className="w-4 h-4" />
          <span>Browse Available Cards</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
            Order Review
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
            Selected Cards ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
        >
          Clear Selection
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.deliveryType}`}
              className="bg-white border border-[#DFEAF7] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product Mini Visual Preview */}
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="w-20 h-14 rounded-lg p-1.5 flex flex-col justify-between text-white shrink-0 shadow-sm relative overflow-hidden"
                  style={{ background: item.product.cardColor }}
                >
                  <div className="text-[6.5px] font-mono tracking-wider font-semibold truncate">
                    •••• •••• •••• {item.product.last4 || '1101'}
                  </div>
                  <div className="text-[6px] uppercase truncate">{item.product.brand}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EBF4FE] text-[#087CF0]">
                      {item.product.tier}
                    </span>
                    <span className="text-[10px] font-medium text-[#4A5F7D] bg-gray-50 border border-gray-200 px-1.5 py-0.2 rounded">
                      Format: {item.deliveryType === 'digital' ? 'Digital Instant' : 'Physical Courier'}
                    </span>
                  </div>

                  <Link
                    to={`/product/${item.product.id}`}
                    className="font-bold text-sm sm:text-base text-[#102544] hover:text-[#087CF0] transition line-clamp-1"
                  >
                    {item.product.name}
                  </Link>

                  <div className="text-[11px] text-[#4A5F7D]">
                    Embossed: <span className="font-mono font-bold text-[#102544]">&ldquo;{item.embossedName || 'DREAD DYN CLIENT'}&rdquo;</span>
                  </div>
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#DFEAF7]">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#DFEAF7] rounded-xl bg-[#F4F8FC] p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.deliveryType, item.quantity - 1)}
                    className="w-7 h-7 rounded-md bg-white border border-[#DFEAF7] text-[#102544] font-bold flex items-center justify-center hover:bg-gray-50 text-xs"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-[#102544]">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.deliveryType, item.quantity + 1)}
                    className="w-7 h-7 rounded-md bg-white border border-[#DFEAF7] text-[#102544] font-bold flex items-center justify-center hover:bg-gray-50 text-xs"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <div className="font-mono font-black text-base text-[#102544]">
                    {formatCurrency(item.product.price * item.quantity)}
                  </div>
                  <div className="text-[10px] text-[#4A5F7D]">
                    {formatCurrency(item.product.price)} / ea
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id, item.deliveryType)}
                  className="p-1.5 text-[#4A5F7D] hover:text-red-600 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087CF0] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="font-extrabold text-base text-[#102544] border-b border-[#DFEAF7] pb-3">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#4A5F7D]">
                <span>Items Subtotal</span>
                <span className="font-mono font-bold text-[#102544]">{formatCurrency(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Voucher Discount</span>
                  <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#4A5F7D]">
                <span className="flex items-center gap-1">
                  <span>Vault Shipping / Handling</span>
                  {shippingFee === 0 && <span className="text-[10px] text-emerald-600 font-bold">(FREE)</span>}
                </span>
                <span className="font-mono font-bold text-[#102544]">
                  {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#DFEAF7] flex justify-between items-baseline">
                <div>
                  <div className="font-extrabold text-sm text-[#102544]">Estimated Total</div>
                  <div className="text-[10px] text-[#4A5F7D]">Includes all instant encryption keys</div>
                </div>
                <div className="font-mono font-black text-2xl text-[#087CF0]">
                  {formatCurrency(total)}
                </div>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-[#102544] uppercase tracking-wider block mb-1.5">
                Privilege / Promo Voucher
              </label>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{appliedPromo} Applied</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter DREAD10 or DYN20"
                    className="flex-1 px-3 py-2 text-xs bg-[#F4F8FC] border border-[#DFEAF7] rounded-xl text-[#102544] uppercase font-mono placeholder:normal-case focus:outline-none focus:border-[#087CF0]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#102544] text-white hover:bg-[#087CF0] transition"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Action */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-[#087CF0] text-white hover:bg-[#0667C8] active:bg-[#0555A6] transition shadow-md shadow-blue-500/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* PCI-DSS Assurance */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#4A5F7D] text-center pt-2">
              <ShieldCheck className="w-4 h-4 text-[#087CF0]" />
              <span>Safe Checkout • 256-Bit SSL Encrypted Vault</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
