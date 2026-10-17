import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  CreditCard,
  Lock,
  Mail,
  User,
  Building,
  Phone,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // If already logged in
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/profile');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup({ fullName, email, phone, company, password });
    if (success) {
      navigate('/profile');
    }
  };

  const fillDemoAdmin = () => {
    setEmail('dreaddyn@gmail.com');
    setPassword('admin123456');
    setIsRegister(false);
  };

  const fillDemoClient = () => {
    setEmail('marcus.vance@vanceholdings.com');
    setPassword('client123456');
    setIsRegister(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#102544] to-[#087CF0] text-white flex items-center justify-center mx-auto shadow-md border border-[#DFEAF7]">
          <CreditCard className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-[#102544] tracking-tight">
          {isRegister ? 'Register Cardholder Account' : 'Sign in to DREAD DYN Vault'}
        </h1>
        <p className="text-xs text-[#4A5F7D]">
          {isRegister
            ? 'Create an authorized client account to manage your high-limit card profiles.'
            : 'Access your instant card keys, order records, and concierge support.'}
        </p>
      </div>

      {/* Main Auth Form Container */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 bg-[#F4F8FC] border border-[#DFEAF7] rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-2 rounded-lg transition ${
              !isRegister ? 'bg-white text-[#102544] shadow-xs' : 'text-[#4A5F7D] hover:text-[#102544]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`py-2 rounded-lg transition ${
              isRegister ? 'bg-white text-[#102544] shadow-xs' : 'text-[#4A5F7D] hover:text-[#102544]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        {isRegister ? (
          <form onSubmit={handleSignup} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-[#102544] block mb-1">Full Legal Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Richard Sterling"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#102544] block mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#102544] block mb-1">Contact Phone *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#102544] block mb-1">Company / Organization</label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Sterling Capital"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#102544] block mb-1">Security Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-md shadow-blue-500/15"
            >
              <span>Create Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#102544] block mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dreaddyn@gmail.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#102544] block mb-1">Security Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#4A5F7D] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-md shadow-blue-500/15"
            >
              <span>Authorize & Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* One-Click Fast Demo Logins */}
        <div className="pt-4 border-t border-[#DFEAF7] space-y-2">
          <div className="text-[11px] font-bold text-[#4A5F7D] text-center">
            One-Click Testing Shortcuts
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="p-2 rounded-xl bg-[#102544] text-white hover:bg-[#087CF0] transition font-bold flex flex-col items-center justify-center text-center"
            >
              <span>Admin Access</span>
              <span className="text-[10px] text-white/70 font-mono">dreaddyn@gmail.com</span>
            </button>

            <button
              type="button"
              onClick={fillDemoClient}
              className="p-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] hover:bg-white transition font-bold flex flex-col items-center justify-center text-center"
            >
              <span>Client Demo</span>
              <span className="text-[10px] text-[#4A5F7D] font-mono">marcus.vance@...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
