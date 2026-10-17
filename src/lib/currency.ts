/**
 * Currency formatter for DREAD DYN (Default: Indian Rupee ₹ matching user reference design)
 */
export const formatCurrency = (amount: number): string => {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const CURRENCY_SYMBOL = '₹';
