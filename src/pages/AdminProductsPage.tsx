import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { CardProduct, CardBrand, CardTier } from '../types';
import {
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Search,
  Check,
  X,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<CardProduct | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState<CardBrand>('RuPay');
  const [formTier, setFormTier] = useState<CardTier>('Platinum');
  const [formPrice, setFormPrice] = useState('299.00');
  const [formOrigPrice, setFormOrigPrice] = useState('350.00');
  const [formDescription, setFormDescription] = useState('');
  const [formDailyLimit, setFormDailyLimit] = useState('$75,000 / Day');
  const [formFXFee, setFormFXFee] = useState('0.25% Low FX Fee');
  const [formMaterial, setFormMaterial] = useState('22g Precision RuPay Metal Composite');
  const [formStock, setFormStock] = useState('20');
  const [formColor, setFormColor] = useState('linear-gradient(135deg, #07172C 0%, #0F355C 50%, #08213E 100%)');
  const [formFeatures, setFormFeatures] = useState('Encrypted EMV Chip + RuPay NFC, Zero FX Fee, Priority Concierge');

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-black text-[#102544]">Unauthorized Access</h2>
        <p className="text-xs text-[#4A5F7D]">
          Administrator credentials required to modify store products.
        </p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-[#087CF0] text-white font-bold text-xs inline-block">
          Return to Store
        </Link>
      </div>
    );
  }

  const openEditModal = (p: CardProduct) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormTier(p.tier);
    setFormPrice(p.price.toString());
    setFormOrigPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setFormDescription(p.description);
    setFormDailyLimit(p.dailyLimit);
    setFormFXFee(p.internationalFee);
    setFormMaterial(p.material);
    setFormStock(p.stockCount.toString());
    setFormColor(p.cardColor);
    setFormFeatures(p.features.join(', '));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(formPrice) || 199;
    const origPriceNum = formOrigPrice ? parseFloat(formOrigPrice) : undefined;
    const stockNum = parseInt(formStock, 10) || 0;
    const featuresList = formFeatures.split(',').map((f) => f.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        brand: formBrand,
        tier: formTier,
        price: priceNum,
        originalPrice: origPriceNum,
        description: formDescription,
        dailyLimit: formDailyLimit,
        internationalFee: formFXFee,
        material: formMaterial,
        stockCount: stockNum,
        cardColor: formColor,
        features: featuresList,
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: formName,
        brand: formBrand,
        tier: formTier,
        category: [formBrand, formTier] as any,
        price: priceNum,
        originalPrice: origPriceNum,
        description: formDescription,
        cardColor: formColor,
        textColor: '#FFFFFF',
        accentColor: '#38BDF8',
        dailyLimit: formDailyLimit,
        internationalFee: formFXFee,
        atmAccess: 'Global Cirrus & Visa Network',
        validity: '4 Years Validated',
        material: formMaterial,
        inStock: stockNum > 0,
        stockCount: stockNum,
        features: featuresList,
        isFeatured: true,
      });
      setShowAddModal(false);
    }
  };

  const filtered = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tier.toLowerCase().includes(q);
  });

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
            Card Catalogue & Stock Management
          </h1>
          <p className="text-xs text-[#4A5F7D] mt-1">
            Create new editions, edit daily spend limits, and adjust warehouse inventory in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={resetToDefault}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[#DFEAF7] bg-[#F4F8FC] hover:bg-white text-[#4A5F7D]"
            title="Reset catalog to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default Catalog</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setFormName('');
              setFormDescription('');
              setShowAddModal(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Card</span>
          </button>
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
            placeholder="Search cards by name, brand, tier..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F4F8FC] border border-[#DFEAF7] rounded-xl text-[#102544] focus:outline-none focus:border-[#087CF0]"
          />
        </div>
        <div className="text-xs font-bold text-[#102544]">
          {filtered.length} Cards in Inventory
        </div>
      </div>

      {/* Cards Table */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F8FC] border-b border-[#DFEAF7] text-[#4A5F7D] font-bold">
              <tr>
                <th className="py-3 px-4">Card Edition</th>
                <th className="py-3 px-3">Brand & Tier</th>
                <th className="py-3 px-3">Daily Limit</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Stock Units</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFEAF7]">
              {filtered.map((card) => (
                <tr key={card.id} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#102544]">{card.name}</div>
                    <div className="text-[11px] text-[#4A5F7D]">{card.material}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-[#102544]">{card.brand}</span>
                    <span className="text-[10px] text-[#087CF0] block font-mono">{card.tier}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#102544]">
                    {card.dailyLimit}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-[#102544]">
                    ${card.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateStock(card.id, Math.max(0, card.stockCount - 1))}
                        className="w-5 h-5 rounded bg-[#F4F8FC] border border-[#DFEAF7] font-bold text-[#102544] flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className={`w-8 text-center font-mono font-bold ${
                        card.stockCount <= 5 ? 'text-amber-600' : 'text-[#102544]'
                      }`}>
                        {card.stockCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateStock(card.id, card.stockCount + 1)}
                        className="w-5 h-5 rounded bg-[#F4F8FC] border border-[#DFEAF7] font-bold text-[#102544] flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(card)}
                        className="p-1.5 text-[#087CF0] hover:bg-blue-50 rounded-lg transition"
                        title="Edit Card"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${card.name}?`)) {
                            deleteProduct(card.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Card Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#DFEAF7] shadow-2xl max-h-[90vh] overflow-y-auto space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-[#DFEAF7] pb-3">
              <h3 className="font-extrabold text-base text-[#102544]">
                {editingProduct ? 'Edit Card Specifications' : 'Create New Vault Card Edition'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                }}
                className="text-[#4A5F7D] hover:text-[#102544]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="font-bold text-[#102544] block mb-1">Card Model Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. DREAD DYN Virtual Cyber Online"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-[#102544] block mb-1">Brand</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  >
                    <option value="RuPay">RuPay</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Visa">Visa</option>
                    <option value="DREAD DYN Exclusive">Exclusive</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102544] block mb-1">Tier</label>
                  <select
                    value={formTier}
                    onChange={(e) => setFormTier(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  >
                    <option value="Platinum">Platinum</option>
                    <option value="Titanium">Titanium</option>
                    <option value="Black Edition">Black Edition</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102544] block mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102544] block mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#102544] block mb-1">Daily Spend Ceiling</label>
                  <input
                    type="text"
                    value={formDailyLimit}
                    onChange={(e) => setFormDailyLimit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102544] block mb-1">FX Exchange Fee</label>
                  <input
                    type="text"
                    value={formFXFee}
                    onChange={(e) => setFormFXFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102544] block mb-1">Material Composition</label>
                  <input
                    type="text"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Card Background Gradient (CSS)</label>
                <input
                  type="text"
                  value={formColor}
                  onChange={(e) => setFormColor(e.target.value)}
                  placeholder="linear-gradient(135deg, #102544 0%, #087CF0 100%)"
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] font-mono text-[11px] text-[#102544]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Cardholder Perks (Comma Separated)</label>
                <input
                  type="text"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  placeholder="Encrypted EMV Chip, Zero FX Fee, Priority Concierge"
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#DFEAF7]">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-[#DFEAF7] text-[#4A5F7D] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#087CF0] text-white font-bold hover:bg-[#0667C8]"
                >
                  {editingProduct ? 'Save Updates' : 'Add Card to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
