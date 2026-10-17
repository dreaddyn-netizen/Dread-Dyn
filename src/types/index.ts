export type CardBrand = 'RuPay' | 'Mastercard' | 'Visa' | 'DREAD DYN Exclusive';
export type CardTier = 'Standard' | 'Platinum' | 'Titanium' | 'Black Edition' | 'Diamond' | 'Gold';
export type CardCategory = 'All' | 'Online' | 'RuPay' | 'Mastercard' | 'Visa' | 'Metal' | 'Business' | 'Diamond' | 'Gold';

export interface CardProduct {
  id: string;
  name: string;
  brand: CardBrand;
  tier: CardTier;
  category: ('Online' | 'RuPay' | 'Mastercard' | 'Visa' | 'Metal' | 'Business' | 'Diamond' | 'Gold')[];
  price: number;
  originalPrice?: number;
  description: string;
  cardColor: string; // Hex or gradient CSS class
  textColor: string;
  accentColor: string;
  cardNumber?: string;
  last4?: string;
  dailyLimit: string;
  internationalFee: string;
  atmAccess: string;
  validity: string;
  material: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  features: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isOnlineCard?: boolean;
}

export interface CartItem {
  product: CardProduct;
  quantity: number;
  embossedName?: string;
  deliveryType: 'digital' | 'physical';
}

export type OrderStatus = 'Processing' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: CardBrand;
  tier: CardTier;
  price: number;
  quantity: number;
  deliveryType: 'digital' | 'physical';
  embossedName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  deliveryType: 'digital' | 'physical';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'Demo Gateway' | 'Bank Wire' | 'Crypto USDT' | 'Live Gateway (Setup Req.)';
  paymentStatus: 'Paid (Demo Verified)' | 'Pending Verification' | 'Setup Required';
  notes?: string;
  trackingNumber?: string;
}

export interface CustomerReview {
  id: string;
  productId?: string;
  productName?: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface UserAddress {
  id: string;
  label: string; // e.g. "Office", "Home"
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  company?: string;
  role: 'admin' | 'customer';
  addresses: UserAddress[];
  joinedDate: string;
  membershipTier: 'DREAD DYN Classic' | 'DREAD DYN RuPay VIP' | 'DREAD DYN Platinum Executive';
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  createdAt: string;
  fullName: string;
  email: string;
  subject: string;
  category: 'Card Activation' | 'Limits & Upgrades' | 'Vault Delivery' | 'Billing & Invoice' | 'Other';
  message: string;
  status: 'Open' | 'Under Review' | 'Resolved';
}
