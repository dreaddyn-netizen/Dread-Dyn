import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Order, OrderStatus } from '../types';
import { ReceiptModal } from '../components/ReceiptModal';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Printer,
  Search,
  Filter,
  Truck,
  Edit,
  X,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const { orders, updateOrderStatus } = useOrders();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Status Update State
  const [editStatusOrder, setEditStatusOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('Processing');
  const [trackingInput, setTrackingInput] = useState('');

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-black text-[#102544]">Restricted Area</h2>
        <p className="text-xs text-[#4A5F7D]">
          Administrator authorization is strictly enforced for client order management.
        </p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-[#087CF0] text-white font-bold text-xs inline-block">
          Return to Store
        </Link>
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'All' && order.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchNum = order.orderNumber.toLowerCase().includes(q);
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchEmail = order.customerEmail.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchEmail) return false;
    }
    return true;
  });

  const openStatusEditor = (order: Order) => {
    setEditStatusOrder(order);
    setNewStatus(order.status);
    setTrackingInput(order.trackingNumber || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStatusOrder) return;

    updateOrderStatus(editStatusOrder.id, newStatus, trackingInput.trim() || undefined);
    setEditStatusOrder(null);
  };

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
      {/* Header */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-xs font-bold text-[#087CF0] hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
            Order Fulfillment & Status Dispatch
          </h1>
          <p className="text-xs text-[#4A5F7D] mt-1">
            Review orders, update fulfillment milestones, and assign FedEx tracking credentials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(['All', 'Processing', 'Delivered', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                statusFilter === st
                  ? 'bg-[#087CF0] border-[#087CF0] text-white shadow-xs'
                  : 'bg-[#F4F8FC] border-[#DFEAF7] text-[#102544] hover:bg-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, customer name, email..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F4F8FC] border border-[#DFEAF7] rounded-xl text-[#102544] focus:outline-none focus:border-[#087CF0]"
          />
        </div>
        <div className="text-xs font-bold text-[#102544]">
          {filteredOrders.length} Matching Orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F8FC] border-b border-[#DFEAF7] text-[#4A5F7D] font-bold">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-3">Customer Details</th>
                <th className="py-3 px-3">Cards & Format</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFEAF7]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-[#102544] block">
                      {order.orderNumber}
                    </span>
                    <span className="text-[11px] text-[#4A5F7D]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-[#102544]">{order.customerName}</div>
                    <div className="text-[11px] text-[#4A5F7D] truncate max-w-[180px]">
                      {order.customerEmail}
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-[11px]">
                          <strong className="text-[#102544]">{item.quantity}x {item.productName}</strong>
                          <span className="text-[#087CF0] block text-[10px]">
                            Embossed: &ldquo;{item.embossedName}&rdquo;
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-mono font-bold text-sm text-[#102544]">
                      ${order.total.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium">
                      {order.paymentStatus}
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="space-y-1">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                      {order.trackingNumber && (
                        <div className="font-mono text-[10px] text-[#4A5F7D] truncate max-w-[120px]">
                          {order.trackingNumber}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openStatusEditor(order)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#EBF4FE] text-[#087CF0] hover:bg-blue-100 font-bold transition flex items-center gap-1"
                        title="Update order status & tracking"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Update</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedReceiptOrder(order)}
                        className="p-1.5 rounded-lg border border-[#DFEAF7] text-[#4A5F7D] hover:bg-gray-100"
                        title="Print Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Status Modal */}
      {editStatusOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#DFEAF7] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#DFEAF7] pb-3">
              <h3 className="font-extrabold text-base text-[#102544]">
                Update Order {editStatusOrder.orderNumber}
              </h3>
              <button
                type="button"
                onClick={() => setEditStatusOrder(null)}
                className="text-[#4A5F7D] hover:text-[#102544]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="font-bold text-[#102544] block mb-1">
                  Permitted Order Status Transition
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] font-bold text-[#102544] focus:outline-none focus:border-[#087CF0]"
                >
                  <option value="Processing">Processing (Under HSM Key Signing)</option>
                  <option value="Delivered">Delivered (Dispatched / Active)</option>
                  <option value="Cancelled">Cancelled (Order Voided)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">
                  Courier Tracking ID / Virtual Token
                </label>
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="e.g. FDX-882940192US or VIRT-KEY-002"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] font-mono text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#DFEAF7]">
                <button
                  type="button"
                  onClick={() => setEditStatusOrder(null)}
                  className="px-4 py-2 rounded-xl border border-[#DFEAF7] text-[#4A5F7D] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#087CF0] text-white font-bold hover:bg-[#0667C8]"
                >
                  Confirm Status Change
                </button>
              </div>
            </form>
          </div>
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
