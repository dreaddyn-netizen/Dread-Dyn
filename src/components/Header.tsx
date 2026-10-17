import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';
import {
  Menu,
  Bell,
  X,
  CreditCard,
  Heart,
  User,
  Shield,
  Clock,
  Star,
  Headphones,
  Settings,
  LogOut
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, isAdmin, logout, toggleAdminRole } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 'notif-1',
      title: 'Order Confirmed',
      message: 'Your DREAD DYN card vault session has been authorized.',
      time: 'Just now',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'New Card Models Available',
      message: 'RuPay Select and Visa Platinum have arrived in stock.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'Privilege Voucher',
      message: 'Use code DREAD10 for 10% off your checkout.',
      time: '1 day ago',
      unread: false,
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DFEAF7] shadow-[0_2px_10px_rgba(16,37,68,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Hamburger Menu */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="p-2 -ml-2 rounded-xl text-[#102544] hover:bg-[#F4F8FC] active:bg-[#EBF4FE] transition"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Center: DREAD DYN Brand Logo */}
        <Link to="/" className="group py-1">
          <BrandLogo size="md" />
        </Link>

        {/* Right: Notification Bell */}
        <div className="flex items-center gap-1 sm:gap-2 -mr-2">
          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-[#102544] hover:bg-[#F4F8FC] transition"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 stroke-[2]" />
              {/* Red dot badge matching screenshot */}
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Notifications Popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DFEAF7] rounded-2xl shadow-xl p-4 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DFEAF7]">
                  <span className="font-extrabold text-sm text-[#102544]">Notifications</span>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-[#4A5F7D] hover:text-[#102544]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border transition ${
                        n.unread ? 'bg-[#EBF4FE]/60 border-[#DFEAF7]' : 'bg-white border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[#102544]">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-[#4A5F7D] font-normal">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#4A5F7D] mt-0.5 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Sidebar Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 border-r border-[#DFEAF7]">
            <div className="space-y-6">
              {/* Drawer Brand Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#DFEAF7]">
                <BrandLogo align="left" size="sm" />

                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg text-[#4A5F7D] hover:text-[#102544] hover:bg-[#F4F8FC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Menu Links */}
              <nav className="space-y-1.5 text-xs font-bold text-[#102544]">
                <Link
                  to="/"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F4F8FC] hover:text-[#087CF0] transition"
                >
                  <CreditCard className="w-4 h-4 text-[#087CF0]" />
                  <span>Card Catalogue</span>
                </Link>

                <Link
                  to="/reviews"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F4F8FC] hover:text-[#087CF0] transition"
                >
                  <Star className="w-4 h-4 text-[#087CF0]" />
                  <span>Customer Reviews</span>
                </Link>

                <Link
                  to="/support"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F4F8FC] hover:text-[#087CF0] transition"
                >
                  <Headphones className="w-4 h-4 text-[#087CF0]" />
                  <span>Support & FAQ</span>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F4F8FC] hover:text-[#087CF0] transition"
                >
                  <User className="w-4 h-4 text-[#087CF0]" />
                  <span>Profile & Addresses</span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#102544] text-white hover:bg-[#087CF0] transition"
                  >
                    <Shield className="w-4 h-4 text-[#38BDF8]" />
                    <span>Admin Operations Portal</span>
                  </Link>
                )}
              </nav>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-4 border-t border-[#DFEAF7] space-y-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  toggleAdminRole();
                  setDrawerOpen(false);
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] font-semibold text-[#102544]"
              >
                <span>Role: {isAdmin ? 'Admin' : 'Customer'}</span>
                <span className="text-[10px] text-[#087CF0] font-bold">Switch</span>
              </button>

              <Link
                to="/settings"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl text-[#4A5F7D] hover:text-[#102544] font-medium"
              >
                <Settings className="w-4 h-4" />
                <span>Store Settings</span>
              </Link>

              {user && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setDrawerOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-xl text-red-600 hover:bg-red-50 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
