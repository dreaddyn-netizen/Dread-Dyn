/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';

// Pages
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { SupportPage } from './pages/SupportPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { SettingsPage } from './pages/SettingsPage';
import { LegalPage } from './pages/LegalPage';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Error Boundary to prevent "An internal error occurred" uncaught crashes
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error?.message || 'An unexpected error occurred' };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Captured error in ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F4F8FC] flex flex-col items-center justify-center p-6 text-center text-[#102544]">
          <div className="max-w-md w-full bg-white border border-[#DFEAF7] rounded-2xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#087CF0] flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-black text-[#102544]">System Notification</h2>
            <p className="text-xs text-[#4A5F7D]">
              The page experienced a momentary issue. All your stored card keys, session data, and order details remain intact.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 rounded-xl bg-[#087CF0] text-white font-bold text-xs hover:bg-[#0667C8] transition"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      // Check if splash screen was already shown in this tab session
      const shown = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('dread_dyn_splash_dismissed') : null;
      return shown !== 'true';
    } catch {
      return false;
    }
  });

  const handleDismissSplash = () => {
    setShowSplash(false);
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('dread_dyn_splash_dismissed', 'true');
      }
    } catch {
      // Ignore sessionStorage permission errors in restricted iframes
    }
  };

  const handleReplaySplash = () => {
    setShowSplash(true);
  };

  return (
    <ErrorBoundary>
      <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#102544] selection:bg-[#087CF0]/20 selection:text-[#087CF0]">
                  {/* Splash Screen Overlay */}
                  {showSplash && <SplashScreen onDismiss={handleDismissSplash} />}

                  {/* Office-Style Sticky Header */}
                  <Header />

                  {/* Main Viewport Container */}
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/catalogue" element={<Navigate to="/" replace />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<Navigate to="/checkout" replace />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
                      <Route path="/orders" element={<Navigate to="/" replace />} />
                      <Route path="/reviews" element={<ReviewsPage />} />
                      <Route path="/support" element={<SupportPage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/admin" element={<AdminDashboardPage />} />
                      <Route path="/admin/products" element={<AdminProductsPage />} />
                      <Route path="/admin/orders" element={<AdminOrdersPage />} />
                      <Route path="/settings" element={<SettingsPage onShowSplash={handleReplaySplash} />} />
                      <Route path="/legal" element={<LegalPage />} />
                      <Route path="*" element={<HomePage />} />
                    </Routes>
                  </main>

                  {/* Desktop & Mobile Footers */}
                  <Footer />

                  {/* Android / Mobile Bottom Bar */}
                  <BottomNav />
                </div>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
    </ErrorBoundary>
  );
}
