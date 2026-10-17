import React from 'react';
import { Order } from '../types';
import { X, Printer, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../lib/currency';

interface ReceiptModalProps {
  order: Order;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#DFEAF7] shadow-2xl flex flex-col">
        {/* Top Modal Controls */}
        <div className="no-print p-4 border-b border-[#DFEAF7] flex items-center justify-between bg-[#F4F8FC]">
          <div className="font-bold text-sm text-[#102544] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#087CF0]" />
            <span>Official Vault Order Receipt</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#DFEAF7] text-[#102544] hover:bg-gray-50 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#4A5F7D] hover:text-[#102544] rounded-lg hover:bg-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 text-[#102544]">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#DFEAF7] pb-6">
            <div>
              <div className="text-xl font-black tracking-tight text-[#102544]">DREAD DYN</div>
              <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
                Premium Card Store & Vault
              </div>
              <div className="text-xs text-[#4A5F7D] mt-1">Contact: dreaddyn@gmail.com</div>
              <div className="text-xs text-[#4A5F7D]">Executive Financial Security Desk</div>
            </div>

            <div className="text-right">
              <div className="inline-block px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[#087CF0] font-mono font-bold text-xs">
                {order.orderNumber}
              </div>
              <div className="text-xs text-[#4A5F7D] mt-1.5">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{order.paymentStatus}</span>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Specs */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7]">
              <div className="font-bold text-[#4A5F7D] uppercase text-[10px] mb-1">Billed & Issued To</div>
              <div className="font-bold text-[#102544]">{order.customerName}</div>
              <div className="text-[#4A5F7D] truncate">{order.customerEmail}</div>
              <div className="text-[#4A5F7D]">{order.customerPhone}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7]">
              <div className="font-bold text-[#4A5F7D] uppercase text-[10px] mb-1">
                {order.deliveryType === 'digital' ? 'Vault Delivery Method' : 'Physical Shipping Address'}
              </div>
              {order.deliveryType === 'digital' ? (
                <>
                  <div className="font-bold text-[#087CF0]">Digital Instant Issuance</div>
                  <div className="text-[#4A5F7D]">Encrypted hardware HSM keys stored in portal profile.</div>
                </>
              ) : (
                <>
                  <div className="font-bold text-[#102544]">{order.shippingAddress.street}</div>
                  <div className="text-[#4A5F7D]">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </div>
                  <div className="text-[#4A5F7D]">{order.shippingAddress.country}</div>
                </>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-[#DFEAF7] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F8FC] border-b border-[#DFEAF7] text-[#4A5F7D] font-bold">
                <tr>
                  <th className="py-2.5 px-3">Card Description</th>
                  <th className="py-2.5 px-3 text-center">Format</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFEAF7]">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#102544]">{item.productName}</div>
                      <div className="text-[11px] text-[#4A5F7D]">
                        Tier: {item.tier} • Embossed: &ldquo;{item.embossedName}&rdquo;
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center capitalize font-medium text-[#4A5F7D]">
                      {item.deliveryType}
                    </td>
                    <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-3 px-3 text-right font-mono">{formatCurrency(item.price)}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#4A5F7D]">
                <span>Subtotal</span>
                <span className="font-mono text-[#102544]">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount {order.promoCode ? `(${order.promoCode})` : ''}</span>
                  <span className="font-mono">-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#4A5F7D]">
                <span>Courier / Vault Fee</span>
                <span className="font-mono text-[#102544]">
                  {order.shippingFee === 0 ? 'FREE' : formatCurrency(order.shippingFee)}
                </span>
              </div>
              <div className="border-t border-[#DFEAF7] pt-2 flex justify-between font-bold text-sm text-[#102544]">
                <span>Total Amount</span>
                <span className="font-mono text-[#087CF0] text-base">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Official Verification Seal */}
          <div className="pt-4 border-t border-[#DFEAF7] flex items-center justify-between text-[11px] text-[#4A5F7D]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#087CF0]" />
              <span>Validated by DREAD DYN Vault Issuance Protocol (v4.2)</span>
            </div>
            {order.trackingNumber && (
              <div className="font-mono font-semibold">
                Tracking: <span className="text-[#102544]">{order.trackingNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
