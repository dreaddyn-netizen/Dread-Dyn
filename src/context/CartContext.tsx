import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CardProduct, CartItem } from '../types';
import { VALID_PROMO_CODES } from '../data/mockData';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addToCart: (product: CardProduct, quantity?: number, deliveryType?: 'digital' | 'physical', embossedName?: string) => void;
  removeFromCart: (productId: string, deliveryType: 'digital' | 'physical') => void;
  updateQuantity: (productId: string, deliveryType: 'digital' | 'physical', quantity: number) => void;
  clearCart: () => void;
  appliedPromo: string | null;
  discountPercent: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'dread_dyn_cart_items';
const WISHLIST_STORAGE_KEY = 'dread_dyn_wishlist_ids';
const PROMO_STORAGE_KEY = 'dread_dyn_promo_code';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((item): item is CartItem => !!(item && item.product && item.product.id));
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed.filter((id) => typeof id === 'string');
      }
      return ['dyn-card-001', 'dyn-card-006'];
    } catch {
      return ['dyn-card-001', 'dyn-card-006'];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedPromo]);

  const addToCart = (
    product: CardProduct,
    quantity = 1,
    deliveryType: 'digital' | 'physical' = 'digital',
    embossedName = 'VALUED CARDHOLDER'
  ) => {
    if (!product.inStock || product.stockCount <= 0) {
      showToast('This card is currently out of stock.', 'error');
      return;
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.deliveryType === deliveryType
      );

      if (existingIndex > -1) {
        const nextItems = [...prev];
        const nextQty = nextItems[existingIndex].quantity + quantity;
        if (nextQty > product.stockCount) {
          showToast(`Cannot add more than ${product.stockCount} in-stock units.`, 'error');
          return prev;
        }
        nextItems[existingIndex].quantity = nextQty;
        return nextItems;
      } else {
        return [...prev, { product, quantity, deliveryType, embossedName }];
      }
    });

    showToast(`Selected ${product.name}.`, 'success');
  };

  const removeFromCart = (productId: string, deliveryType: 'digital' | 'physical') => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.deliveryType === deliveryType)));
    showToast('Card removed from selection.', 'info');
  };

  const updateQuantity = (productId: string, deliveryType: 'digital' | 'physical', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, deliveryType);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.deliveryType === deliveryType) {
          const maxStock = item.product.stockCount;
          const targetQty = Math.min(quantity, maxStock);
          return { ...item, quantity: targetQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (VALID_PROMO_CODES[cleanCode]) {
      setAppliedPromo(cleanCode);
      showToast(`Promo code "${cleanCode}" applied! (${VALID_PROMO_CODES[cleanCode].discountPercent}% off)`, 'success');
      return true;
    } else {
      showToast(`Invalid promo code. Try "DREAD10" or "DYN20".`, 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed.', 'info');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed card from wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved card to wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const itemCount = items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
  const subtotal = items.reduce((sum, item) => sum + ((item?.product?.price || 0) * (item?.quantity || 1)), 0);
  
  const discountPercent = appliedPromo && VALID_PROMO_CODES[appliedPromo]
    ? VALID_PROMO_CODES[appliedPromo].discountPercent
    : 0;
  
  const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2));
  
  // Physical shipping is free on orders over $300, or $15 flat otherwise. Free for digital only orders.
  const hasPhysical = items.some((i) => i.deliveryType === 'physical');
  const shippingFee = hasPhysical ? (subtotal >= 300 ? 0 : 15.00) : 0;
  
  const total = Math.max(0, Number((subtotal - discountAmount + shippingFee).toFixed(2)));

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo,
        discountPercent,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
