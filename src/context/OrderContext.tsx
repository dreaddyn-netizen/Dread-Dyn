import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStatus, SupportTicket, CustomerReview } from '../types';
import { INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/mockData';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => boolean;
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status'>) => SupportTicket;
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date' | 'helpfulCount'>) => void;
  markReviewHelpful: (reviewId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'dread_dyn_orders_store';
const TICKETS_STORAGE_KEY = 'dread_dyn_support_tickets';
const REVIEWS_STORAGE_KEY = 'dread_dyn_customer_reviews';

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const { isAdmin } = useAuth();

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    try {
      const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(supportTickets));
    } catch (e) {
      console.error(e);
    }
  }, [supportTickets]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `DYN-${randomDigits}`;
    const id = `ord-${randomDigits}`;

    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Order ${orderNumber} confirmed & registered in vault!`, 'success');
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id || o.orderNumber === id);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string): boolean => {
    if (!isAdmin) {
      showToast('Unauthorized: Only administrators can update order status.', 'error');
      return false;
    }

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId || order.orderNumber === orderId) {
          return {
            ...order,
            status,
            trackingNumber: trackingNumber !== undefined ? trackingNumber : order.trackingNumber,
          };
        }
        return order;
      })
    );

    showToast(`Order status updated to: ${status}`, 'success');
    return true;
  };

  const createSupportTicket = (ticketData: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status'>): SupportTicket => {
    const num = Math.floor(10000 + Math.random() * 90000);
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `tkt-${num}`,
      ticketNumber: `DD-TKT-${num}`,
      createdAt: new Date().toISOString(),
      status: 'Open',
    };

    setSupportTickets((prev) => [newTicket, ...prev]);
    showToast(`Support ticket ${newTicket.ticketNumber} created! Our concierge will respond promptly.`, 'success');
    return newTicket;
  };

  const addReview = (reviewData: Omit<CustomerReview, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };

    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const markReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    showToast('Marked review as helpful.', 'info');
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
        supportTickets,
        createSupportTicket,
        reviews,
        addReview,
        markReviewHelpful,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
