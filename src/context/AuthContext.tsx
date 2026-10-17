import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserAddress } from '../types';
import { INITIAL_USER } from '../data/mockData';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (userData: { fullName: string; email: string; phone: string; company?: string; password?: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  toggleAdminRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'dread_dyn_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const isAdmin = user?.role === 'admin';

  const login = async (email: string, _password?: string): Promise<boolean> => {
    // In our client-authoritative state, verify email or log in demo user
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      showToast('Please provide a valid email address.', 'error');
      return false;
    }

    const isSystemAdmin = trimmedEmail === 'dreaddyn@gmail.com';
    const updatedUser: UserProfile = {
      id: isSystemAdmin ? 'usr-admin-01' : `usr-${Date.now()}`,
      email: trimmedEmail,
      fullName: isSystemAdmin ? 'Dread Dyn Director' : (trimmedEmail.split('@')[0].toUpperCase() + ' Client'),
      phone: '+1 (555) 492-8821',
      company: isSystemAdmin ? 'DREAD DYN Global Enterprises Ltd.' : 'Private Account',
      role: isSystemAdmin ? 'admin' : 'customer',
      addresses: isSystemAdmin ? INITIAL_USER.addresses : [
        {
          id: 'addr-default',
          label: 'Primary Delivery Address',
          fullName: trimmedEmail.split('@')[0],
          phone: '+1 (555) 492-8821',
          street: '100 Financial Boulevard, Suite 500',
          city: 'Chicago',
          state: 'IL',
          postalCode: '60601',
          country: 'United States',
          isDefault: true
        }
      ],
      joinedDate: new Date().toISOString().split('T')[0],
      membershipTier: isSystemAdmin ? 'DREAD DYN Platinum Executive' : 'DREAD DYN Classic',
    };

    setUser(updatedUser);
    showToast(`Signed in successfully as ${updatedUser.fullName}`, 'success');
    return true;
  };

  const signup = async (userData: { fullName: string; email: string; phone: string; company?: string }): Promise<boolean> => {
    if (!userData.fullName.trim() || !userData.email.trim()) {
      showToast('Name and email are required.', 'error');
      return false;
    }

    const isSystemAdmin = userData.email.trim().toLowerCase() === 'dreaddyn@gmail.com';
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: userData.email.trim().toLowerCase(),
      fullName: userData.fullName.trim(),
      phone: userData.phone.trim() || '+1 (555) 000-0000',
      company: userData.company?.trim() || 'Private Account',
      role: isSystemAdmin ? 'admin' : 'customer',
      addresses: [],
      joinedDate: new Date().toISOString().split('T')[0],
      membershipTier: 'DREAD DYN Classic',
    };

    setUser(newUser);
    showToast('Account registered successfully! Welcome to DREAD DYN.', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of DREAD DYN portal.', 'info');
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
    showToast('Profile information updated.', 'success');
  };

  const addAddress = (address: Omit<UserAddress, 'id'>) => {
    if (!user) return;
    const newAddress: UserAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    let updatedAddresses = [...user.addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
    } else if (updatedAddresses.length === 0) {
      newAddress.isDefault = true;
    }
    updatedAddresses.push(newAddress);
    setUser({ ...user, addresses: updatedAddresses });
    showToast('Address added to your address book.', 'success');
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.filter(a => a.id !== id);
    if (updated.length > 0 && !updated.some(a => a.isDefault)) {
      updated[0].isDefault = true;
    }
    setUser({ ...user, addresses: updated });
    showToast('Address removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setUser({ ...user, addresses: updated });
    showToast('Default address updated.', 'success');
  };

  const toggleAdminRole = () => {
    if (!user) return;
    const newRole = user.role === 'admin' ? 'customer' : 'admin';
    setUser({
      ...user,
      role: newRole,
      membershipTier: newRole === 'admin' ? 'DREAD DYN Platinum Executive' : 'DREAD DYN Classic'
    });
    showToast(`Switched account mode to: ${newRole.toUpperCase()}`, 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        signup,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        toggleAdminRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
