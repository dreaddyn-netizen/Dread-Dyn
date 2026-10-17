import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardProduct } from '../types';
import { useCart } from '../context/CartContext';
import { CardThumbnail } from './CardThumbnail';
import { OnlineGlobeStamp } from './OnlineCardEmblem';
import { formatCurrency } from '../lib/currency';

interface ProductCardProps {
  product: CardProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const isOnline = !!product.isOnlineCard || product.category.includes('Online') || product.name.toLowerCase().includes('online') || product.material.toLowerCase().includes('virtual');

  const handleOrder = () => {
    addToCart(product, 1, 'digital');
    navigate('/checkout');
  };

  return (
    <div className="bg-white border border-[#DFEAF7] rounded-2xl p-3 sm:p-4 shadow-[0_2px_10px_rgba(16,37,68,0.04)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Clickable Card Visual Image */}
        <Link to={`/product/${product.id}`} className="block mb-3 transition-transform hover:scale-[1.02]">
          <CardThumbnail product={product} />
        </Link>

        {/* Card Name */}
        <Link
          to={`/product/${product.id}`}
          className="block font-bold text-sm text-[#102544] hover:text-[#087CF0] transition truncate"
        >
          {product.name}
        </Link>

        {/* Subtitle */}
        {isOnline ? (
          <div className="text-[11px] text-[#0A2540] bg-[#EBF4FE] border border-[#BFDBFE] px-2 py-0.5 rounded-md mt-1 inline-flex items-center gap-1.5 font-bold shadow-2xs">
            <OnlineGlobeStamp className="w-3.5 h-3.5" color="#087CF0" />
            <span>Instant Online Card</span>
          </div>
        ) : (
          <div className="text-xs text-[#4A5F7D] mt-0.5 font-medium">
            Premium Vault Card
          </div>
        )}

        {/* Price */}
        <div className="mt-2 mb-3 font-extrabold text-base sm:text-lg text-[#102544] font-mono">
          {formatCurrency(product.price)}
        </div>
      </div>

      {/* Instant Order Button */}
      <button
        type="button"
        disabled={!product.inStock}
        onClick={handleOrder}
        className="w-full py-2 sm:py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-[#087CF0] text-white hover:bg-[#0667C8] active:bg-[#0555A6] transition shadow-xs disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
      >
        Instant Order
      </button>
    </div>
  );
};
