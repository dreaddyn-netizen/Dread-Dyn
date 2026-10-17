import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { Order, OrderStatus } from '../types';
import { ReceiptModal } from '../components/ReceiptModal';
import {
  Clock,
  Printer,
  ChevronRight,
  ShieldCheck,
  Package,
  Search,
  ExternalLink
} from 'lucide-react';
import { formatCurrency } from '../lib/currency';

export const OrderHistoryPage: React.FC = () => {
  const { orders } = useOrders();
  const { user, isAdmin } = useAuth();
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Filter orders by current user or show all if admin
  const userOrders = orders.filter((o) => {
    if (!isAdmin && user) {
      return o.customerEmail.toLowerCase() === user.email.toLowerCase() || o.userId === user.id;
    }
    return true;
  });

  const filteredOrders = userOrders.filter((order) => {
    if (statusFilter !== 'All' && order.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchNum = order.orderNumber.toLowerCase().includes(q);
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchCard = order.items.some((i) => i.productName.toLowerCase().includes(q));
      if (!matchNum && !matchName && !matchCard) return false;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
        return 'bg-blue-50 text-[#087CF0] border-[#DFEAF7]';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Page Title & Search Header */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
              Client Order Ledger
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
              Order History & Vault Tracking
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5F7D] mt-1">
              Inspect order statuses, view courier tracking IDs, and access official invoices.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order # or card..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F4F8FC] border border-[#DFEAF7] rounded-xl text-[#102544] focus:outline-none focus:border-[#087CF0]"
            />
          </div>
        </div>

        {/* Order Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#DFEAF7] pt-4 scrollbar-none">
          {(['All', 'Processing', 'Delivered', 'Cancelled'] as const).map((st) => {
            const count = st === 'All'
              ? userOrders.length
              : userOrders.filter((o) => o.status === st).length;
            const isSelected = statusFilter === st;

            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#087CF0] border-[#087CF0] text-white shadow-sm'
                    : 'bg-[#F4F8FC] border-[#DFEAF7] text-[#102544] hover:bg-white'
                }`}
              >
                <span>{st} Orders</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-[#4A5F7D]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#DFEAF7] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 hover:shadow-md transition"
            >
              {/* Order Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DFEAF7]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF4FE] text-[#087CF0] flex items-center justify-center font-bold">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm sm:text-base text-[#102544]">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#4A5F7D]">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedReceiptOrder(order)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFEAF7] bg-[#F4F8FC] hover:bg-white text-xs font-semibold text-[#102544] transition shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#087CF0]" />
                    <span>Receipt</span>
                  </button>

                  <Link
                    to={`/order-confirmation/${order.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087CF0] text-white text-xs font-semibold hover:bg-[#0667C8] transition shadow-xs"
                  >
                    <span>Timeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Items in this Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-[#102544]">{item.productName}</div>
                      <div className="text-[11px] text-[#4A5F7D]">
                        Qty: {item.quantity} • {item.deliveryType.toUpperCase()} ISSUANCE
                      </div>
                      <div className="text-[10px] text-[#087CF0] font-mono">
                        Embossed: &ldquo;{item.embossedName}&rdquo;
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#102544] text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer & Tracking */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#4A5F7D] gap-2 border-t border-[#DFEAF7]/50">
                <div className="flex items-center gap-3">
                  <span>Method: <strong className="text-[#102544]">{order.paymentMethod}</strong></span>
                  <span>•</span>
                  <span>Payment: <strong className="text-emerald-600">{order.paymentStatus}</strong></span>
                </div>

                <div className="flex items-center gap-3">
                  {order.trackingNumber && (
                    <div className="font-mono text-[11px]">
                      Tracking: <strong className="text-[#087CF0]">{order.trackingNumber}</strong>
                    </div>
                  )}
                  <div className="font-bold text-sm text-[#102544]">
                    Total: <span className="font-mono text-[#087CF0]">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#DFEAF7] rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F4F8FC] border border-[#DFEAF7] text-[#087CF0] flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-lg text-[#102544]">No Orders Found</h3>
          <p className="text-xs sm:text-sm text-[#4A5F7D] max-w-sm mx-auto">
            You currently have no orders under this status. Browse our card vault to configure your first instrument.
          </p>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#087CF0] text-white hover:bg-[#0667C8] transition"
          >
            <span>Browse All Cards</span>
          </Link>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {selectedReceiptOrder && (
        <ReceiptModal
          order={selectedReceiptOrder}
          onClose={() => setSelectedReceiptOrder(null)}
        />
      )}
    </div>
  );
};
