import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import {
  Shield,
  CreditCard,
  DollarSign,
  TrendingUp,
  Package,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { isAdmin, user } = useAuth();
  const { products } = useProducts();
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#102544]">Access Denied</h2>
        <p className="text-xs text-[#4A5F7D]">
          Administrator authorization is required to access the vault operations panel.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#087CF0] text-white font-bold text-xs"
        >
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  // Analytics Metrics
  const grossRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Processing').length;
  const totalStockUnits = products.reduce((sum, p) => sum + p.stockCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Admin Title Header */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#102544] text-white">
              AUTHORIZED OPERATIONS
            </span>
            <span className="text-xs text-[#087CF0] font-bold">Admin Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
            Vault Administration & Analytics
          </h1>
          <p className="text-xs text-[#4A5F7D] mt-1">
            Logged in as <strong className="text-[#102544]">{user?.email}</strong>. Real-time store telemetry and inventory controls.
          </p>
        </div>

        {/* Quick Admin Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/products"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-xs"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-[#DFEAF7] bg-[#F4F8FC] hover:bg-white text-[#102544] transition"
          >
            <Package className="w-3.5 h-3.5 text-[#087CF0]" />
            <span>Manage Orders ({pendingOrders} Pending)</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4A5F7D] font-bold uppercase">
            <span>Gross Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#102544] font-mono">
            ${grossRevenue.toFixed(2)}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>100% Verified Settled</span>
          </div>
        </div>

        <div className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4A5F7D] font-bold uppercase">
            <span>Total Orders</span>
            <div className="p-2 rounded-lg bg-[#EBF4FE] text-[#087CF0]">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#102544]">
            {totalOrders}
          </div>
          <div className="text-[11px] text-[#4A5F7D]">
            Across all digital & physical issuances
          </div>
        </div>

        <div className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4A5F7D] font-bold uppercase">
            <span>Pending Issuances</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#102544]">
            {pendingOrders}
          </div>
          <div className="text-[11px] text-amber-600 font-semibold">
            Awaiting dispatch / tracking assignment
          </div>
        </div>

        <div className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4A5F7D] font-bold uppercase">
            <span>Active Vault Stock</span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#102544]">
            {totalStockUnits} Units
          </div>
          <div className="text-[11px] text-[#4A5F7D]">
            Spread across {products.length} distinct card designs
          </div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DFEAF7] pb-3">
          <h2 className="font-extrabold text-base text-[#102544]">
            Recent Orders Queue
          </h2>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-[#087CF0] hover:underline flex items-center gap-1"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#DFEAF7]">
          {orders.slice(0, 5).map((order) => (
            <div
              key={order.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#102544]">{order.orderNumber}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#087CF0] border border-blue-200">
                    {order.status}
                  </span>
                  <span className="text-[11px] text-[#4A5F7D]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-[11px] text-[#4A5F7D] mt-0.5">
                  Client: <strong>{order.customerName}</strong> ({order.customerEmail})
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-[#102544]">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-[#4A5F7D]">{order.paymentMethod}</div>
                </div>

                <Link
                  to={`/admin/orders`}
                  className="px-3 py-1.5 rounded-lg border border-[#DFEAF7] bg-[#F4F8FC] hover:bg-white font-bold text-[#102544]"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
