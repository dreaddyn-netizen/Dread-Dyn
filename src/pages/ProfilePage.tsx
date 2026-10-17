import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import {
  User,
  MapPin,
  Shield,
  CreditCard,
  Heart,
  Plus,
  Trash2,
  CheckCircle,
  LogOut,
  Building,
  Phone,
  Mail,
  Edit2
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile, addAddress, deleteAddress, setDefaultAddress, isAdmin, toggleAdminRole } = useAuth();
  const { orders } = useOrders();
  const { wishlist } = useCart();
  const navigate = useNavigate();

  // Address modal state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [label, setLabel] = useState('Corporate Office');
  const [addrFullName, setAddrFullName] = useState(user?.fullName || '');
  const [addrPhone, setAddrPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [isDefault, setIsDefault] = useState(false);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.fullName || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editCompany, setEditCompany] = useState(user?.company || '');

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const userOrders = orders.filter(
    (o) => o.customerEmail.toLowerCase() === user.email.toLowerCase() || o.userId === user.id
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName.trim(),
      phone: editPhone.trim(),
      company: editCompany.trim(),
    });
    setIsEditingProfile(false);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim() || !city.trim() || !postalCode.trim()) return;

    addAddress({
      label,
      fullName: addrFullName.trim(),
      phone: addrPhone.trim(),
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      postalCode: postalCode.trim(),
      country,
      isDefault,
    });

    // Reset & close
    setStreet('');
    setCity('');
    setState('');
    setPostalCode('');
    setShowAddAddress(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Profile Overview Banner */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#102544] to-[#087CF0] text-white flex items-center justify-center font-black text-2xl shadow-md border border-[#DFEAF7]">
            {user.fullName.charAt(0)}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#102544]">
                {user.fullName}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#087CF0] border border-[#DFEAF7]">
                {user.membershipTier}
              </span>
              {isAdmin && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#102544] text-white">
                  ADMINISTRATOR
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#4A5F7D]">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#087CF0]" />
                {user.email}
              </span>
              {user.company && (
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#087CF0]" />
                  {user.company}
                </span>
              )}
              {user.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#087CF0]" />
                  {user.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-[#DFEAF7] bg-[#F4F8FC] hover:bg-white text-[#102544] transition"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#087CF0]" />
            <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>

          <button
            type="button"
            onClick={toggleAdminRole}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-[#DFEAF7] bg-white text-[#087CF0] hover:bg-blue-50 transition"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Switch Role ({user.role})</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition border border-rose-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Profile Edit Inline Form */}
      {isEditingProfile && (
        <form onSubmit={handleSaveProfile} className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4 text-xs">
          <div className="font-bold text-sm text-[#102544] border-b border-[#DFEAF7] pb-2">
            Update Personal & Corporate Profile
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-[#102544] block mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
              />
            </div>
            <div>
              <label className="font-bold text-[#102544] block mb-1">Phone Number</label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
              />
            </div>
            <div>
              <label className="font-bold text-[#102544] block mb-1">Company / Organization</label>
              <input
                type="text"
                value={editCompany}
                onChange={(e) => setEditCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 rounded-xl border border-[#DFEAF7] font-bold text-[#4A5F7D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#087CF0] text-white font-bold hover:bg-[#0667C8]"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* 3 Metrics Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="text-xs text-[#4A5F7D] font-bold uppercase">Account Activity</div>
            <div className="text-2xl font-black text-[#102544]">{userOrders.length} Vault Items</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Active & Authenticated</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#EBF4FE] text-[#087CF0] flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <Link
          to="/wishlist"
          className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="text-xs text-[#4A5F7D] font-bold uppercase">Saved Cards</div>
            <div className="text-2xl font-black text-[#102544]">{wishlist.length} In Wishlist</div>
            <div className="text-[11px] text-[#087CF0] font-semibold">Explore saved editions →</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </Link>

        {isAdmin ? (
          <Link
            to="/admin"
            className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="text-xs text-[#4A5F7D] font-bold uppercase">Vault Management</div>
              <div className="text-2xl font-black text-[#102544]">Admin Panel</div>
              <div className="text-[11px] text-[#087CF0] font-semibold">Manage catalog & orders →</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#102544] text-white flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
          </Link>
        ) : (
          <Link
            to="/support"
            className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="text-xs text-[#4A5F7D] font-bold uppercase">Executive Desk</div>
              <div className="text-2xl font-black text-[#102544]">24/7 Support</div>
              <div className="text-[11px] text-[#087CF0] font-semibold">Contact Concierge →</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </Link>
        )}
      </div>

      {/* Saved Addresses Section */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#DFEAF7] pb-4">
          <div>
            <h2 className="font-extrabold text-base text-[#102544] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#087CF0]" />
              <span>Saved Corporate & Vault Addresses</span>
            </h2>
            <p className="text-xs text-[#4A5F7D] mt-0.5">
              Secure physical vault delivery destinations for your laser-engraved metal editions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddAddress(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Address</span>
          </button>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.addresses && user.addresses.length > 0 ? (
            user.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-4 rounded-xl border transition flex flex-col justify-between space-y-3 ${
                  addr.isDefault
                    ? 'border-[#087CF0] bg-[#EBF4FE]/40 shadow-xs'
                    : 'border-[#DFEAF7] bg-white hover:bg-[#F4F8FC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#102544] flex items-center gap-1.5">
                      <span>{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold bg-[#087CF0] text-white px-2 py-0.2 rounded">
                          Default
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[#102544]">{addr.fullName}</div>
                  <div className="text-xs text-[#4A5F7D] mt-0.5">{addr.street}</div>
                  <div className="text-xs text-[#4A5F7D]">
                    {addr.city}, {addr.state} {addr.postalCode} • {addr.country}
                  </div>
                  <div className="text-[11px] text-[#4A5F7D] mt-1">{addr.phone}</div>
                </div>

                <div className="pt-2 border-t border-[#DFEAF7] flex items-center justify-between text-xs">
                  {!addr.isDefault ? (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-[#087CF0] hover:underline font-semibold text-[11px]"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Primary Destination
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => deleteAddress(addr.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-6 text-xs text-[#4A5F7D]">
              No addresses saved yet. Add your preferred office or corporate headquarters address.
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#DFEAF7] shadow-2xl space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#102544] border-b border-[#DFEAF7] pb-3">
              Add New Delivery Address
            </h3>

            <form onSubmit={handleSaveAddress} className="space-y-3">
              <div>
                <label className="font-bold text-[#102544] block mb-1">Address Label</label>
                <input
                  type="text"
                  required
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Corporate Headquarters, Suite 100"
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={addrFullName}
                  onChange={(e) => setAddrFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Phone</label>
                <input
                  type="text"
                  required
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street name and building number"
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#102544] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#102544] block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-[#102544] pt-1">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="rounded border-[#DFEAF7] text-[#087CF0]"
                />
                <span>Set as default delivery address</span>
              </label>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAddress(false)}
                  className="px-4 py-2 rounded-xl border border-[#DFEAF7] text-[#4A5F7D] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#087CF0] text-white font-bold hover:bg-[#0667C8]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
