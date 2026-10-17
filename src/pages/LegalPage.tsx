import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const LegalPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between text-xs">
        <Link to="/" className="inline-flex items-center gap-1.5 font-bold text-[#4A5F7D] hover:text-[#087CF0]">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
        <span className="text-[#4A5F7D]">Regulatory & Compliance Archive</span>
      </div>

      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 text-[#102544]">
        <div>
          <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
            Governance & Privacy
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight mt-1">
            DREAD DYN Legal & Compliance Standards
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5F7D] mt-2 leading-relaxed">
            Effective Date: October 2026. Governing all physical card fabrications, virtual cryptographic key allocations, and executive financial transactions.
          </p>
        </div>

        {/* Section 1: Privacy Policy */}
        <section id="privacy" className="space-y-3 pt-6 border-t border-[#DFEAF7]">
          <div className="flex items-center gap-2 font-black text-lg text-[#102544]">
            <FileText className="w-5 h-5 text-[#087CF0]" />
            <h2>1. Privacy & Client Data Protection Policy</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A5F7D] leading-relaxed">
            DREAD DYN (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Store&rdquo;) adheres strictly to global data protection regimes including GDPR and CCPA. Personal data collected during checkout (authorized signatory name, corporate email address, telephone contact, and delivery street addresses) is utilized exclusively for laser engraving configuration, courier fulfillment, and pro-forma invoice issuance.
          </p>
          <ul className="space-y-1.5 text-xs text-[#4A5F7D] list-disc list-inside">
            <li>We do not sell, rent, or monetize client transaction histories or identity credentials.</li>
            <li>Physical courier logs are purged after 90 days following confirmed signature delivery.</li>
            <li>Clients may request complete account data deletion at any time by contacting dreaddyn@gmail.com.</li>
          </ul>
        </section>

        {/* Section 2: Zero-Raw Card Storage Policy */}
        <section id="pci" className="space-y-3 pt-6 border-t border-[#DFEAF7]">
          <div className="flex items-center gap-2 font-black text-lg text-[#102544]">
            <Lock className="w-5 h-5 text-[#087CF0]" />
            <h2>2. Zero-Raw Card Storage & PCI-DSS Compliance</h2>
          </div>
          <div className="p-4 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-xs text-[#102544] space-y-2">
            <div className="font-bold text-[#087CF0] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Mandatory Financial Protection Safeguards</span>
            </div>
            <p className="text-[#4A5F7D] leading-relaxed">
              In accordance with PCI-DSS Tier-1 guidelines, DREAD DYN never collects, captures, transmits, or stores raw payment card primary account numbers (PAN), three-digit CVV security codes, card PINs, or one-time passcodes (OTPs) in frontend source code or unsecured databases.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#4A5F7D] leading-relaxed">
            All credit or debit payment authorizations must occur via vetted, server-side verified merchant gateway APIs (such as Stripe or licensed merchant acquiring partners). When operating in evaluation or staging modes, verified demo gateways isolate transactions from real financial rails.
          </p>
        </section>

        {/* Section 3: Terms of Issuance */}
        <section id="terms" className="space-y-3 pt-6 border-t border-[#DFEAF7]">
          <div className="flex items-center gap-2 font-black text-lg text-[#102544]">
            <CheckCircle2 className="w-5 h-5 text-[#087CF0]" />
            <h2>3. Terms of Card Issuance & Physical Metal Fabrication</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A5F7D] leading-relaxed">
            All physical cards (Titanium, Damascus Pattern Steel, and RuPay Precision Metal Alloy) are custom manufactured with client-specified laser engraving. Because each item is customized with the cardholder&apos;s name and certified serial number, production begins immediately upon payment validation.
          </p>
          <p className="text-xs sm:text-sm text-[#4A5F7D] leading-relaxed">
            Digital instant issuance tokens grant immediate access to encrypted credentials within the DREAD DYN client portal. Daily limits are backed by institutional liquidity pools and may be adjusted via executive support ticket.
          </p>
        </section>

        {/* Contact info */}
        <div className="pt-6 border-t border-[#DFEAF7] text-xs text-[#4A5F7D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Inquiries: dreaddyn@gmail.com</span>
          <span>DREAD DYN Global Enterprises Ltd.</span>
        </div>
      </div>
    </div>
  );
};
