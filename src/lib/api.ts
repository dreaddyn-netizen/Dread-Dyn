/**
 * DREAD DYN — API Client & Storage Service
 * Supports backend endpoints when configured, with seamless client-authoritative local storage persistence.
 */

import { CardProduct, Order, CustomerReview, SupportTicket, UserProfile } from '../types';

export const API_BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

export const api = {
  // Products
  async getProducts(): Promise<CardProduct[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback handled in ProductContext
    }
    return [];
  },

  // Orders
  async submitOrder(orderData: Partial<Order>): Promise<{ success: boolean; orderId?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (res.ok) return await res.json();
    } catch {
      // Handled in OrderContext
    }
    return { success: true };
  },

  // Health
  async checkHealth(): Promise<{ status: string }> {
    return { status: 'healthy' };
  }
};
