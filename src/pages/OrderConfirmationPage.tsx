import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { ReceiptModal } from '../components/ReceiptModal';
import {
  CheckCircle2,
  ShieldCheck,
  Printer,
  CreditCard,
  ArrowRight,
  Clock,
  Truck,
  Key,
  Copy,
  Check
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrders();
  const [showReceipt, setShowReceipt] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const order = getOrderById(id || '');

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#102544]">Order Not Found</h2>
        <p className="text-xs text-[#4A5F7D]">We could not locate this order reference in the vault database.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#087CF0] text-white font-bold text-xs"
        >
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(`DYN-HSM-VAULT-TOKEN-${order.orderNumber}`);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Thank you Banner */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-10 text-center shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold text-[#087CF0] tracking-wider uppercase">
            Order Confirmed & Vault Registered
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#102544]">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5F7D] max-w-lg mx-auto">
            Your high-limit card order has been authenticated. An official confirmation invoice and HSM cryptographic token have been generated.
          </p>
        </div>

        {/* Order Reference Badge */}
        <div className="inline-flex items-center gap-3 bg-[#F4F8FC] border border-[#DFEAF7] px-4 py-2 rounded-xl text-xs font-bold text-[#102544]">
          <span>Order Reference:</span>
          <span className="font-mono text-[#087CF0] text-sm">{order.orderNumber}</span>
          <span className="text-[#4A5F7D]">|</span>
          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
            {order.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowReceipt(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#102544] text-white hover:bg-[#087CF0] transition shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>View & Print Official Receipt</span>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] hover:bg-white hover:border-[#087CF0] transition"
          >
            <CreditCard className="w-4 h-4 text-[#087CF0]" />
            <span>Explore More Cards</span>
          </Link>
        </div>
      </div>

      {/* Issuance Status & Progress Timeline */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="font-extrabold text-base text-[#102544] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#087CF0]" />
          <span>Issuance & Fulfillment Workflow</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#EBF4FE] border border-[#DFEAF7] text-[#102544] space-y-1">
            <div className="font-bold text-[#087CF0] flex items-center justify-between">
              <span>Step 1: Authorization</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-[#4A5F7D]">Payment & identity verification validated.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#EBF4FE] border border-[#DFEAF7] text-[#102544] space-y-1">
            <div className="font-bold text-[#087CF0] flex items-center justify-between">
              <span>Step 2: HSM Key Signing</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-[#4A5F7D]">256-bit hardware encryption keys generated.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DFEAF7] text-[#102544] space-y-1">
            <div className="font-bold text-[#102544] flex items-center justify-between">
              <span>Step 3: Laser Engraving</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            </div>
            <p className="text-[11px] text-[#4A5F7D]">Precision engraving on metal/composite face.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DFEAF7] text-[#102544] space-y-1">
            <div className="font-bold text-[#102544] flex items-center justify-between">
              <span>Step 4: Vault Delivery</span>
              <Truck className="w-4 h-4 text-[#4A5F7D]" />
            </div>
            <p className="text-[11px] text-[#4A5F7D]">
              {order.deliveryType === 'digital' ? 'Live in Customer Dashboard' : 'FedEx Priority Courier'}
            </p>
          </div>
        </div>
      </div>

      {/* Digital Vault Token Display */}
      <div className="bg-[#102544] text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#38BDF8]" />
            <h3 className="font-bold text-sm sm:text-base">Encrypted Digital Vault Security Token</h3>
          </div>
          <span className="text-[10px] font-mono text-[#38BDF8] border border-[#38BDF8]/40 px-2 py-0.5 rounded">
            HSM-256
          </span>
        </div>

        <p className="text-xs text-white/80 leading-relaxed">
          This cryptographic token represents your certified card issuance session. Use this key if contacting concierge support regarding rapid limit expansions.
        </p>

        <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-[#38BDF8]">
          <span className="truncate">DYN-HSM-VAULT-TOKEN-{order.orderNumber}-SECURE</span>
          <button
            type="button"
            onClick={handleCopyKey}
            className="flex items-center gap-1 text-[11px] font-semibold text-white bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded transition ml-2 shrink-0"
          >
            {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Receipt Modal Trigger */}
      {showReceipt && (
        <ReceiptModal order={order} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
};
