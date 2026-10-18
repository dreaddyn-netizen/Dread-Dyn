import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, MessageSquare, FileText, ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#DFEAF7] mt-16 pb-20 lg:pb-8 text-[#102544]">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <BrandLogo align="left" size="sm" showSubtitle={false} />
          <p className="text-xs sm:text-sm text-[#4A5F7D] leading-relaxed max-w-sm">
            DREAD DYN — Premium Card Store specializes in enterprise-tier metal cards, certified digital debit instruments, and corporate liquidity vehicles designed with office-grade precision.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="mailto:dreaddyn@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087CF0] bg-[#EBF4FE] border border-[#DFEAF7] px-3 py-1.5 rounded-lg hover:bg-[#087CF0] hover:text-white transition"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>dreaddyn@gmail.com</span>
            </a>
            <a
              href="https://wa.me/?text=Hello%20DREAD%20DYN%20Concierge,%20I%20have%20an%20inquiry%20regarding%20premium%20cards."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-600 hover:text-white transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-[#102544] uppercase tracking-wider mb-3">Card Categories</div>
          <ul className="space-y-2 text-xs text-[#4A5F7D]">
            <li>
              <Link to="/catalogue?category=Mastercard" className="hover:text-[#087CF0] transition">
                Mastercard Editions
              </Link>
            </li>
            <li>
              <Link to="/catalogue?category=Visa" className="hover:text-[#087CF0] transition">
                Visa High-Limit
              </Link>
            </li>
            <li>
              <Link to="/catalogue?category=RuPay" className="hover:text-[#087CF0] transition">
                RuPay Select Series
              </Link>
            </li>
            <li>
              <Link to="/catalogue?category=Online" className="hover:text-[#087CF0] transition">
                Instant Online Cards
              </Link>
            </li>
            <li>
              <Link to="/catalogue?category=Metal" className="hover:text-[#087CF0] transition">
                Precision Metal Cards
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-bold text-[#102544] uppercase tracking-wider mb-3">Client Services</div>
          <ul className="space-y-2 text-xs text-[#4A5F7D]">
            <li>
              <Link to="/support" className="hover:text-[#087CF0] transition">
                Support Desk & Tickets
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-[#087CF0] transition">
                Customer Testimonials
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-[#087CF0] transition">
                Corporate Address Book
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:text-[#087CF0] transition">
                Security & PWA Settings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-bold text-[#102544] uppercase tracking-wider mb-3">Compliance & Legal</div>
          <ul className="space-y-2 text-xs text-[#4A5F7D]">
            <li>
              <Link to="/legal#privacy" className="hover:text-[#087CF0] transition flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Privacy & Data Policy
              </Link>
            </li>
            <li>
              <Link to="/legal#terms" className="hover:text-[#087CF0] transition flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Terms of Issuance
              </Link>
            </li>
            <li>
              <Link to="/legal#pci" className="hover:text-[#087CF0] transition flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#087CF0]" />
                Zero-Raw Card Policy
              </Link>
            </li>
            <li>
              <span className="text-[11px] text-[#4A5F7D]/80 block pt-1">
                All mock transactions in test environments are isolated from raw card processing.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-[#DFEAF7] flex flex-col sm:flex-row items-center justify-between text-xs text-[#4A5F7D] gap-2">
        <div>© 2026 DREAD DYN — Premium Card Store. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>Official Storefront</span>
          <span>•</span>
          <span>Contact: dreaddyn@gmail.com</span>
        </div>
      </div>
    </footer>
  );
};
