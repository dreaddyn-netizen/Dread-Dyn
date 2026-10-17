import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { CardCategory, CardTier, CardBrand } from '../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  CreditCard,
  Check,
  RefreshCw
} from 'lucide-react';

export const CataloguePage: React.FC = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Sync
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Sync state when URL params change
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const categories = [
    { label: 'All Cards', value: 'All' },
    { label: 'Online Cards (Instant)', value: 'Online' },
    { label: 'RuPay Select', value: 'RuPay' },
    { label: 'Mastercard', value: 'Mastercard' },
    { label: 'Visa', value: 'Visa' },
    { label: 'Metal Editions', value: 'Metal' },
    { label: 'Business Suite', value: 'Business' },
  ];

  const brands: CardBrand[] = ['RuPay', 'Mastercard', 'Visa', 'DREAD DYN Exclusive'];
  const tiers: CardTier[] = ['Titanium', 'Platinum', 'Black Edition', 'Standard'];

  // Filtered and Sorted Cards
  const filteredProducts = useMemo(() => {
    return products
      .filter((card) => {
        // Search text matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = card.name.toLowerCase().includes(q);
          const matchBrand = card.brand.toLowerCase().includes(q);
          const matchTier = card.tier.toLowerCase().includes(q);
          const matchDesc = card.description.toLowerCase().includes(q);
          const matchMaterial = card.material.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchTier && !matchDesc && !matchMaterial) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'Online') {
            const isOnline = card.category.includes('Online') || !!card.isOnlineCard || card.name.toLowerCase().includes('online') || card.material.toLowerCase().includes('virtual');
            if (!isOnline) return false;
          } else {
            const hasCategory = card.category.some(
              (c) => c.toLowerCase() === selectedCategory.toLowerCase()
            );
            if (!hasCategory && card.brand !== selectedCategory && card.tier !== selectedCategory) {
              return false;
            }
          }
        }

        // Brand filter
        if (selectedBrand !== 'All' && card.brand !== selectedBrand) {
          return false;
        }

        // Tier filter
        if (selectedTier !== 'All' && card.tier !== selectedTier) {
          return false;
        }

        // In-stock filter
        if (inStockOnly && (!card.inStock || card.stockCount <= 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          case 'featured':
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedTier, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedTier('All');
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedBrand !== 'All' ||
    selectedTier !== 'All' ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Page Title & Search Bar */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
              Card Vault Catalogue
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
              All Available Cards
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5F7D] mt-1">
              Select your tier, configure your laser-engraved name, and order instant digital or vault-sealed physical delivery.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tier, material..."
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-[#F4F8FC] border border-[#DFEAF7] rounded-xl text-[#102544] placeholder:text-[#4A5F7D]/70 focus:outline-none focus:border-[#087CF0] focus:bg-white transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#4A5F7D] hover:text-[#102544]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#DFEAF7] pt-4 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                  isSelected
                    ? 'bg-[#087CF0] border-[#087CF0] text-white shadow-sm'
                    : 'bg-[#F4F8FC] border-[#DFEAF7] text-[#102544] hover:bg-white hover:border-[#087CF0]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white border border-[#DFEAF7] rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFEAF7]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#102544]">
                <Filter className="w-4 h-4 text-[#087CF0]" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#087CF0] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#102544] uppercase tracking-wider block">
                Card Brand
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedBrand('All')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedBrand === 'All'
                      ? 'bg-[#EBF4FE] text-[#087CF0] font-bold'
                      : 'text-[#4A5F7D] hover:bg-[#F4F8FC]'
                  }`}
                >
                  <span>All Brands</span>
                  {selectedBrand === 'All' && <Check className="w-3.5 h-3.5" />}
                </button>
                {brands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedBrand === b
                        ? 'bg-[#EBF4FE] text-[#087CF0] font-bold'
                        : 'text-[#4A5F7D] hover:bg-[#F4F8FC]'
                    }`}
                  >
                    <span>{b}</span>
                    {selectedBrand === b && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier Filter */}
            <div className="space-y-2 pt-3 border-t border-[#DFEAF7]">
              <label className="text-xs font-bold text-[#102544] uppercase tracking-wider block">
                Card Tier
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedTier('All')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedTier === 'All'
                      ? 'bg-[#EBF4FE] text-[#087CF0] font-bold'
                      : 'text-[#4A5F7D] hover:bg-[#F4F8FC]'
                  }`}
                >
                  <span>All Tiers</span>
                  {selectedTier === 'All' && <Check className="w-3.5 h-3.5" />}
                </button>
                {tiers.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTier(t)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedTier === t
                        ? 'bg-[#EBF4FE] text-[#087CF0] font-bold'
                        : 'text-[#4A5F7D] hover:bg-[#F4F8FC]'
                    }`}
                  >
                    <span>{t}</span>
                    {selectedTier === t && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-3 border-t border-[#DFEAF7]">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#102544]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#DFEAF7] text-[#087CF0] focus:ring-[#087CF0] w-4 h-4"
                />
                <span>In-Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Catalogue Grid Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="bg-white border border-[#DFEAF7] rounded-xl px-4 py-3 flex items-center justify-between gap-4 shadow-sm text-xs">
            <div className="font-bold text-[#102544]">
              Showing <span className="text-[#087CF0]">{filteredProducts.length}</span> card editions
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFEAF7] bg-[#F4F8FC] font-semibold text-[#102544]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#087CF0]" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              {/* Sort By Select */}
              <div className="flex items-center gap-2">
                <span className="text-[#4A5F7D] hidden sm:inline font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F4F8FC] border border-[#DFEAF7] rounded-lg px-2.5 py-1.5 font-semibold text-[#102544] focus:outline-none focus:border-[#087CF0]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Releases</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer / Collapse */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white border border-[#DFEAF7] rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DFEAF7]">
                <span className="font-bold text-sm text-[#102544]">Filter Catalog</span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#087CF0]"
                >
                  Reset All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-[#102544] block mb-1">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-[#F4F8FC] border border-[#DFEAF7] rounded-lg p-2 text-[#102544]"
                  >
                    <option value="All">All Brands</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102544] block mb-1">Tier</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full bg-[#F4F8FC] border border-[#DFEAF7] rounded-lg p-2 text-[#102544]"
                  >
                    <option value="All">All Tiers</option>
                    {tiers.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#102544] pt-1">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#DFEAF7] text-[#087CF0] w-4 h-4"
                />
                <span>In-Stock Only</span>
              </label>
            </div>
          )}

          {/* Cards Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((card) => (
                <ProductCard key={card.id} product={card} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#DFEAF7] rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F4F8FC] border border-[#DFEAF7] text-[#4A5F7D] flex items-center justify-center mx-auto">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-lg text-[#102544]">No Matching Cards Found</h3>
              <p className="text-xs sm:text-sm text-[#4A5F7D] max-w-md mx-auto">
                We couldn&apos;t find any cards matching your current filter criteria. Try adjusting your search keywords or clearing active filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#087CF0] text-white hover:bg-[#0667C8] transition"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
