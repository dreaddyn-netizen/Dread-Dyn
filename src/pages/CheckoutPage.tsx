import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import {
  ShieldCheck,
  CreditCard,
  Building,
  Check,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Lock,
  Wallet,
  Receipt
} from 'lucide-react';
import { formatCurrency } from '../lib/currency';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discountAmount, shippingFee, total, appliedPromo, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Contact State
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [company, setCompany] = useState(user?.company || '');

  // Address State
  const defaultAddress = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];
  const [street, setStreet] = useState(defaultAddress?.street || '450 Lexington Avenue, Suite 2200');
  const [city, setCity] = useState(defaultAddress?.city || 'New York');
  const [state, setState] = useState(defaultAddress?.state || 'NY');
  const [postalCode, setPostalCode] = useState(defaultAddress?.postalCode || '10017');
  const [country, setCountry] = useState(defaultAddress?.country || 'United States');

  // Delivery & Payment selection
  const hasPhysicalItems = items.some((i) => i.deliveryType === 'physical');
  const [deliveryType, setDeliveryType] = useState<'digital' | 'physical'>(
    hasPhysicalItems ? 'physical' : 'digital'
  );

  type PaymentOption = 'Demo Gateway' | 'Bank Wire' | 'Crypto USDT' | 'Live Gateway (Setup Req.)';
  const [paymentMethod, setPaymentMethod] = useState<PaymentOption>('Demo Gateway');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return <Navigate to="/" replace />;
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full legal/executive name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid corporate or client email is required';
    if (!phone.trim()) errs.phone = 'Contact telephone is required';

    if (deliveryType === 'physical') {
      if (!street.trim()) errs.street = 'Street address is required';
      if (!city.trim()) errs.city = 'City is required';
      if (!postalCode.trim()) errs.postalCode = 'Postal code is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'Live Gateway (Setup Req.)') {
      showToast('Live Gateway requires merchant API keys in environment variables.', 'error');
      return;
    }

    if (!validate()) {
      showToast('Please correct the highlighted fields before proceeding.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = items.map((i) => ({
        productId: itemToProduct(i).productId,
        productName: itemToProduct(i).productName,
        brand: itemToProduct(i).brand,
        tier: itemToProduct(i).tier,
        price: itemToProduct(i).price,
        quantity: i.quantity,
        deliveryType: i.deliveryType,
        embossedName: i.embossedName || 'DREAD DYN CARDHOLDER',
      }));

      const newOrder = createOrder({
        userId: user?.id || 'usr-guest',
        customerName: fullName.trim(),
        customerEmail: email.trim().toLowerCase(),
        customerPhone: phone.trim(),
        shippingAddress: {
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          postalCode: postalCode.trim(),
          country: country.trim(),
        },
        deliveryType,
        items: orderItems,
        subtotal,
        discount: discountAmount,
        promoCode: appliedPromo || undefined,
        shippingFee,
        total,
        status: 'Processing',
        paymentMethod,
        paymentStatus: paymentMethod === 'Demo Gateway' ? 'Paid (Demo Verified)' : 'Pending Verification',
        notes: orderNotes.trim() || undefined,
        trackingNumber: deliveryType === 'physical' ? `FDX-${Math.floor(100000000 + Math.random() * 900000000)}US` : undefined,
      });

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 600);
  };

  // Helper to extract product info
  const itemToProduct = (item: (typeof items)[0]) => ({
    productId: item.product.id,
    productName: item.product.name,
    brand: item.product.brand,
    tier: item.product.tier,
    price: item.product.price,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between text-xs">
        <Link to="/" className="flex items-center gap-1.5 font-bold text-[#4A5F7D] hover:text-[#087CF0]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Card Selection</span>
        </Link>
        <span className="text-[#4A5F7D]">Encrypted 256-Bit SSL Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Checkout Form */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-6">
          {/* Step 1: Customer Contact Info */}
          <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#DFEAF7] pb-3">
              <div className="w-6 h-6 rounded-full bg-[#087CF0] text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="font-extrabold text-base text-[#102544]">
                Customer & Corporate Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-[#102544] block mb-1">
                  Full Name / Authorized Signatory *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className={`w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border ${
                    errors.fullName ? 'border-red-500' : 'border-[#DFEAF7]'
                  } text-[#102544] focus:outline-none focus:border-[#087CF0] focus:bg-white`}
                />
                {errors.fullName && <p className="text-red-500 text-[10px] mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">
                  Corporate / Client Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border ${
                    errors.email ? 'border-red-500' : 'border-[#DFEAF7]'
                  } text-[#102544] focus:outline-none focus:border-[#087CF0] focus:bg-white`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border ${
                    errors.phone ? 'border-red-500' : 'border-[#DFEAF7]'
                  } text-[#102544] focus:outline-none focus:border-[#087CF0] focus:bg-white`}
                />
                {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">
                  Company / Organization (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Global Investments Ltd."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping & Delivery Address */}
          <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#DFEAF7] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#087CF0] text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h2 className="font-extrabold text-base text-[#102544]">
                  Vault Delivery & Shipping Destination
                </h2>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType('digital')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                    deliveryType === 'digital'
                      ? 'bg-[#087CF0] text-white border-[#087CF0]'
                      : 'bg-[#F4F8FC] text-[#4A5F7D] border-[#DFEAF7]'
                  }`}
                >
                  Digital Instant Vault
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('physical')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                    deliveryType === 'physical'
                      ? 'bg-[#087CF0] text-white border-[#087CF0]'
                      : 'bg-[#F4F8FC] text-[#4A5F7D] border-[#DFEAF7]'
                  }`}
                >
                  Physical Courier
                </button>
              </div>
            </div>

            {deliveryType === 'digital' ? (
              <div className="p-4 rounded-xl bg-[#EBF4FE] border border-[#DFEAF7] text-xs space-y-2 text-[#102544]">
                <div className="font-bold flex items-center gap-1.5 text-[#087CF0]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Instant Hardware HSM Issuance Selected</span>
                </div>
                <p className="text-[#4A5F7D] leading-relaxed">
                  Your encrypted card credentials will be generated and signed upon order placement. They will be immediately accessible in your DREAD DYN client dashboard without physical shipping delays.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#102544] block mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. 450 Lexington Avenue, Suite 2200"
                    className={`w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border ${
                      errors.street ? 'border-red-500' : 'border-[#DFEAF7]'
                    } text-[#102544] focus:outline-none focus:border-[#087CF0] focus:bg-white`}
                  />
                  {errors.street && <p className="text-red-500 text-[10px] mt-1">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="font-bold text-[#102544] block mb-1">City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border ${
                        errors.city ? 'border-red-500' : 'border-[#DFEAF7]'
                      } text-[#102544] focus:outline-none focus:border-[#087CF0]`}
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#102544] block mb-1">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#102544] block mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border ${
                        errors.postalCode ? 'border-red-500' : 'border-[#DFEAF7]'
                      } text-[#102544] focus:outline-none focus:border-[#087CF0]`}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="font-bold text-[#102544] block mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Payment Verification & Gateway Method */}
          <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#DFEAF7] pb-3">
              <div className="w-6 h-6 rounded-full bg-[#087CF0] text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h2 className="font-extrabold text-base text-[#102544]">
                Payment Method & Verification
              </h2>
            </div>

            {/* Zero-Raw Card Storage Security Notice */}
            <div className="p-3.5 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-start gap-2.5 text-xs text-[#102544]">
              <Lock className="w-4 h-4 text-[#087CF0] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">PCI-DSS Compliant Security Guarantee: </span>
                <span className="text-[#4A5F7D]">
                  We never collect, process, or store raw card CVV, full account numbers, or PINs directly in frontend code.
                </span>
              </div>
            </div>

            {/* Payment Options Grid */}
            <div className="space-y-3 text-xs">
              {/* Option 1: Demo Gateway */}
              <label
                onClick={() => setPaymentMethod('Demo Gateway')}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'Demo Gateway'
                    ? 'border-[#087CF0] bg-[#EBF4FE]'
                    : 'border-[#DFEAF7] bg-white hover:bg-[#F4F8FC]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Demo Gateway'}
                    onChange={() => setPaymentMethod('Demo Gateway')}
                    className="mt-0.5 text-[#087CF0] focus:ring-[#087CF0]"
                  />
                  <div>
                    <div className="font-bold text-[#102544] flex items-center gap-2">
                      <span>Verified Demo Gateway (Instant Testing)</span>
                      <span className="text-[10px] bg-[#087CF0] text-white px-2 py-0.2 rounded font-semibold">
                        Recommended for Evaluation
                      </span>
                    </div>
                    <div className="text-[#4A5F7D] mt-0.5">
                      Simulates instantaneous bank authorization, registers order as Paid, and issues receipt without real billing.
                    </div>
                  </div>
                </div>
              </label>

              {/* Option 2: Bank Wire */}
              <label
                onClick={() => setPaymentMethod('Bank Wire')}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'Bank Wire'
                    ? 'border-[#087CF0] bg-[#EBF4FE]'
                    : 'border-[#DFEAF7] bg-white hover:bg-[#F4F8FC]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Bank Wire'}
                    onChange={() => setPaymentMethod('Bank Wire')}
                    className="mt-0.5 text-[#087CF0]"
                  />
                  <div>
                    <div className="font-bold text-[#102544]">Direct Corporate Bank Wire (SWIFT / Fedwire)</div>
                    <div className="text-[#4A5F7D] mt-0.5">
                      Official pro-forma invoice generated. Order marked as &ldquo;Processing&rdquo; awaiting corporate wire confirmation.
                    </div>
                  </div>
                </div>
              </label>

              {/* Option 3: Crypto USDT */}
              <label
                onClick={() => setPaymentMethod('Crypto USDT')}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'Crypto USDT'
                    ? 'border-[#087CF0] bg-[#EBF4FE]'
                    : 'border-[#DFEAF7] bg-white hover:bg-[#F4F8FC]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Crypto USDT'}
                    onChange={() => setPaymentMethod('Crypto USDT')}
                    className="mt-0.5 text-[#087CF0]"
                  />
                  <div>
                    <div className="font-bold text-[#102544]">Cryptocurrency Corporate Pay (USDT / USDC)</div>
                    <div className="text-[#4A5F7D] mt-0.5">
                      On-chain institutional settlement with multi-sig escrow verification.
                    </div>
                  </div>
                </div>
              </label>

              {/* Option 4: Live Payment Gateway (Setup Required) */}
              <label
                onClick={() => setPaymentMethod('Live Gateway (Setup Req.)')}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'Live Gateway (Setup Req.)'
                    ? 'border-amber-400 bg-amber-50/60'
                    : 'border-[#DFEAF7] bg-white hover:bg-[#F4F8FC]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Live Gateway (Setup Req.)'}
                    onChange={() => setPaymentMethod('Live Gateway (Setup Req.)')}
                    className="mt-0.5 text-amber-600"
                  />
                  <div>
                    <div className="font-bold text-[#102544] flex items-center gap-2">
                      <span>Production Merchant Gateway (Stripe / Paystack)</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded font-semibold">
                        Setup Required
                      </span>
                    </div>
                    <div className="text-[#4A5F7D] mt-0.5">
                      Requires live server-side merchant secret keys in environment configuration.
                    </div>
                  </div>
                </div>
              </label>
            </div>

            {/* Clear Setup Required Banner when Live Gateway selected */}
            {paymentMethod === 'Live Gateway (Setup Req.)' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>External Gateway Credentials Required</span>
                </div>
                <p className="leading-relaxed">
                  As mandated by secure financial application policies, live payment gateways cannot process transactions without authenticated merchant server credentials (`STRIPE_SECRET_KEY` or equivalent payment partner credentials). Please select <strong>&ldquo;Verified Demo Gateway&rdquo;</strong> to test checkout, or configure real keys in your production environment.
                </p>
              </div>
            )}

            {/* Special Instructions / Notes */}
            <div className="pt-2">
              <label className="font-bold text-[#102544] text-xs block mb-1">
                Executive Notes / Delivery Instructions (Optional)
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Please expedite laser engraving for boardroom presentation."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
              />
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base bg-[#087CF0] text-white hover:bg-[#0667C8] active:bg-[#0555A6] transition shadow-lg shadow-blue-500/20 disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Validating HSM Vault Keys...</span>
            ) : (
              <>
                <span>Complete Order & Authorize ({formatCurrency(total)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Right Column: Order Summary Inspection */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#102544] border-b border-[#DFEAF7] pb-3">
              Order Review
            </h3>

            {/* Itemized List */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 pb-3 border-b border-[#DFEAF7]/60">
                  <div>
                    <div className="font-bold text-[#102544]">{item.product.name}</div>
                    <div className="text-[11px] text-[#4A5F7D]">
                      Qty: {item.quantity} • Format: {item.deliveryType}
                    </div>
                    <div className="text-[10px] text-[#087CF0] font-mono">
                      Embossed: &ldquo;{item.embossedName || 'CARDHOLDER'}&rdquo;
                    </div>
                  </div>
                  <div className="font-mono font-bold text-[#102544]">
                    {formatCurrency(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Line Items */}
            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between text-[#4A5F7D]">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-[#102544]">{formatCurrency(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Voucher Discount</span>
                  <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#4A5F7D]">
                <span>Shipping / Vault Courier</span>
                <span className="font-mono font-bold text-[#102544]">
                  {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#DFEAF7] flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-[#102544]">Total Charge</span>
                <span className="font-mono font-black text-2xl text-[#087CF0]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DFEAF7] text-xs text-[#4A5F7D] space-y-2">
            <div className="font-bold text-[#102544] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#087CF0]" />
              <span>DREAD DYN Purchase Guarantee</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Every order includes complimentary laser engraving, tamper-proof vault packaging, and 30-day verified manufacturer warranty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
