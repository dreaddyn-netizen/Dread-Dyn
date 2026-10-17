import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CardProduct } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

interface ProductContextType {
  products: CardProduct[];
  getProductById: (id: string) => CardProduct | undefined;
  addProduct: (product: Omit<CardProduct, 'id' | 'rating' | 'reviewCount'>) => boolean;
  updateProduct: (id: string, updates: Partial<CardProduct>) => boolean;
  deleteProduct: (id: string) => boolean;
  updateStock: (id: string, newCount: number) => boolean;
  resetToDefault: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'dread_dyn_products_catalog_v5';

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const { isAdmin } = useAuth();

  const [products, setProducts] = useState<CardProduct[]>(() => {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (stored) {
        const parsed: CardProduct[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 40) {
          // If stored catalog has legacy Gold/Diamond cards or lacks RuPay/Online, refresh to current INITIAL_PRODUCTS
          const hasGold = parsed.some((p) => p.tier === 'Gold' || (p.category as string[]).includes('Gold') || p.name.toLowerCase().includes('gold'));
          const hasDiamond = parsed.some((p) => p.tier === 'Diamond' || (p.category as string[]).includes('Diamond') || p.name.toLowerCase().includes('diamond'));
          const hasRuPay = parsed.some((p) => p.brand === 'RuPay' || (p.category as string[]).includes('RuPay'));
          const hasOnline = parsed.some((p) => (p.category as string[]).includes('Online') || p.name.toLowerCase().includes('online') || p.isOnlineCard);
          if (!hasGold && !hasDiamond && hasRuPay && hasOnline) {
            return parsed;
          }
        }
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const addProduct = (productData: Omit<CardProduct, 'id' | 'rating' | 'reviewCount'>): boolean => {
    if (!isAdmin) {
      showToast('Unauthorized: Only administrators can create cards.', 'error');
      return false;
    }

    const newProduct: CardProduct = {
      ...productData,
      id: `dyn-card-${Date.now().toString().slice(-4)}`,
      rating: 5.0,
      reviewCount: 1,
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Card "${newProduct.name}" created successfully.`, 'success');
    return true;
  };

  const updateProduct = (id: string, updates: Partial<CardProduct>): boolean => {
    if (!isAdmin) {
      showToast('Unauthorized: Only administrators can modify cards.', 'error');
      return false;
    }

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          if (typeof updates.stockCount === 'number') {
            updated.inStock = updates.stockCount > 0;
          }
          return updated;
        }
        return item;
      })
    );
    showToast('Card specifications updated.', 'success');
    return true;
  };

  const deleteProduct = (id: string): boolean => {
    if (!isAdmin) {
      showToast('Unauthorized: Only administrators can delete cards.', 'error');
      return false;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Card permanently removed from catalogue.', 'info');
    return true;
  };

  const updateStock = (id: string, newCount: number): boolean => {
    if (!isAdmin) {
      showToast('Unauthorized: Only administrators can adjust inventory.', 'error');
      return false;
    }

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stockCount: Math.max(0, newCount),
            inStock: newCount > 0,
          };
        }
        return item;
      })
    );
    showToast(`Inventory stock adjusted to ${newCount} units.`, 'success');
    return true;
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    showToast('Catalogue reset to factory default.', 'info');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetToDefault,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
