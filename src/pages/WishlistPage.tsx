import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowLeft, CreditCard } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useCart();
  const { products } = useProducts();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
            Curated Shortlist
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
            Saved Wishlist ({savedProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5F7D] mt-1">
            Card models you have bookmarked for corporate review and upcoming issuance.
          </p>
        </div>

        <Link
          to="/catalogue"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087CF0] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All Cards</span>
        </Link>
      </div>

      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedProducts.map((card) => (
            <ProductCard key={card.id} product={card} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#DFEAF7] rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-200">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-lg text-[#102544]">Your Wishlist is Empty</h3>
          <p className="text-xs sm:text-sm text-[#4A5F7D] max-w-sm mx-auto">
            You haven&apos;t saved any card editions to your shortlist yet. Click the heart icon on any card to save it for later.
          </p>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-md"
          >
            <CreditCard className="w-4 h-4" />
            <span>Browse Card Vault</span>
          </Link>
        </div>
      )}
    </div>
  );
};
