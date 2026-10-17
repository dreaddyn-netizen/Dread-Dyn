import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';
import {
  Settings as SettingsIcon,
  Download,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  Trash2,
  Lock,
  Globe,
  Bell,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface SettingsPageProps {
  onShowSplash: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onShowSplash }) => {
  const { user, isAdmin, toggleAdminRole } = useAuth();
  const { resetToDefault } = useProducts();
  const { showToast } = useToast();

  const [currency, setCurrency] = useState('USD ($)');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('Thank you for installing DREAD DYN app!', 'success');
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      showToast('To install DREAD DYN on Android/iOS, tap "Add to Home screen" in your browser menu.', 'info');
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Reset all demo data (products, orders, addresses) back to factory defaults?')) {
      localStorage.clear();
      showToast('All local storage cleared. Reloading application...', 'info');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
            Client Preferences
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
            Store Settings & Compliance
          </h1>
          <p className="text-xs text-[#4A5F7D] mt-1">
            Configure application runtime settings, PWA installation, and inspect security certifications.
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-[#EBF4FE] text-[#087CF0] flex items-center justify-center">
          <SettingsIcon className="w-6 h-6" />
        </div>
      </div>

      {/* PWA & Mobile Install Card */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="font-extrabold text-base text-[#102544] flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#087CF0]" />
              <span>Progressive Web App (PWA) Mobile Access</span>
            </h2>
            <p className="text-xs text-[#4A5F7D] max-w-lg leading-relaxed">
              Install DREAD DYN as a standalone native app on Android, iOS, or desktop for rapid offline card management and biometric order tracking.
            </p>
          </div>

          <button
            type="button"
            onClick={handleInstallPWA}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-xs shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install Web App</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-[#102544]">Service Worker</div>
              <div className="text-[10px] text-[#4A5F7D]">Active & Precaching</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-[#102544]">Web App Manifest</div>
              <div className="text-[10px] text-[#4A5F7D]">Standalone Display</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-[#102544]">Adaptive Icons</div>
              <div className="text-[10px] text-[#4A5F7D]">SVG Vector Graphics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-extrabold text-base text-[#102544] border-b border-[#DFEAF7] pb-3">
          Display & Region Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-[#102544] block mb-1">Display Currency</label>
            <select
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
                showToast(`Currency format set to ${e.target.value}`, 'info');
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544]"
            >
              <option value="USD ($)">USD ($) - United States Dollar</option>
              <option value="EUR (€)">EUR (€) - Euro</option>
              <option value="GBP (£)">GBP (£) - British Pound</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-[#102544] p-2.5 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7]">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="rounded border-[#DFEAF7] text-[#087CF0] w-4 h-4"
              />
              <span>Enable HSM Transaction Status Alerts</span>
            </label>
          </div>
        </div>
      </div>

      {/* Developer & Reviewer Utilities */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-extrabold text-base text-[#102544] border-b border-[#DFEAF7] pb-3">
          Applet Testing & Evaluation Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            type="button"
            onClick={onShowSplash}
            className="p-3.5 rounded-xl border border-[#DFEAF7] bg-[#F4F8FC] hover:bg-white text-left font-bold text-[#102544] transition flex flex-col justify-between"
          >
            <span className="flex items-center gap-1.5 text-[#087CF0]">
              <RefreshCw className="w-4 h-4" />
              Replay Splash Screen
            </span>
            <span className="text-[10px] text-[#4A5F7D] font-normal mt-1">
              Trigger animated brand entrance screen.
            </span>
          </button>

          <button
            type="button"
            onClick={toggleAdminRole}
            className="p-3.5 rounded-xl border border-[#DFEAF7] bg-[#F4F8FC] hover:bg-white text-left font-bold text-[#102544] transition flex flex-col justify-between"
          >
            <span className="flex items-center gap-1.5 text-[#087CF0]">
              <ShieldCheck className="w-4 h-4" />
              Toggle Admin/Customer
            </span>
            <span className="text-[10px] text-[#4A5F7D] font-normal mt-1">
              Currently: <strong>{isAdmin ? 'ADMINISTRATOR' : 'CUSTOMER'}</strong>
            </span>
          </button>

          <button
            type="button"
            onClick={handleClearAllData}
            className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-left font-bold text-rose-700 transition flex flex-col justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Trash2 className="w-4 h-4" />
              Factory Reset Data
            </span>
            <span className="text-[10px] text-rose-600 font-normal mt-1">
              Wipe localStorage and reload pristine catalog.
            </span>
          </button>
        </div>
      </div>

      {/* Compliance & Legal Links */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-3">
        <h2 className="font-extrabold text-base text-[#102544] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#087CF0]" />
          <span>Legal Policies & Regulatory Standards</span>
        </h2>
        <div className="flex flex-wrap gap-4 text-xs font-bold text-[#087CF0]">
          <Link to="/legal#privacy" className="hover:underline">Privacy & Data Protection Policy</Link>
          <span>•</span>
          <Link to="/legal#terms" className="hover:underline">Terms of Card Issuance</Link>
          <span>•</span>
          <Link to="/legal#pci" className="hover:underline">Zero Raw Storage Protocol</Link>
        </div>
      </div>
    </div>
  );
};
