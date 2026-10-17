import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { INITIAL_FAQS } from '../data/mockData';
import {
  HelpCircle,
  Mail,
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { createSupportTicket, supportTickets } = useOrders();
  const [searchFaq, setSearchFaq] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'Card Activation' | 'Limits & Upgrades' | 'Vault Delivery' | 'Billing & Invoice' | 'Other'>('Card Activation');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [lastSubmittedTicket, setLastSubmittedTicket] = useState<string | null>(null);

  const filteredFaqs = INITIAL_FAQS.filter((f) => {
    if (!searchFaq.trim()) return true;
    const q = searchFaq.toLowerCase();
    return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) return;

    const tkt = createSupportTicket({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      category,
      subject: subject.trim(),
      message: message.trim(),
    });

    setLastSubmittedTicket(tkt.ticketNumber);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Header */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
          Executive Assistance
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
          DREAD DYN Support & Concierge Desk
        </h1>
        <p className="text-xs sm:text-sm text-[#4A5F7D] max-w-2xl leading-relaxed">
          Need assistance with card activation, vault delivery courier tracking, or higher transactional ceiling authorization? Our executive operations team is available 24/7.
        </p>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-[#DFEAF7]">
          <a
            href="mailto:dreaddyn@gmail.com"
            className="p-4 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] hover:border-[#087CF0] transition flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-white border border-[#DFEAF7] text-[#087CF0] group-hover:bg-[#087CF0] group-hover:text-white transition">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#102544]">Official Operations Email</div>
              <div className="text-xs text-[#087CF0] font-semibold mt-0.5">dreaddyn@gmail.com</div>
              <div className="text-[10px] text-[#4A5F7D] mt-1">Average response &lt; 15 mins</div>
            </div>
          </a>

          <a
            href="https://wa.me/?text=Hello%20DREAD%20DYN%20Executive%20Support,%20I%20need%20assistance%20with%20my%20card%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] hover:border-emerald-500 transition flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#102544]">Direct WhatsApp Desk</div>
              <div className="text-xs text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                <span>Start Direct Chat</span>
                <ExternalLink className="w-3 h-3" />
              </div>
              <div className="text-[10px] text-[#4A5F7D] mt-1">Real-time mobile concierge</div>
            </div>
          </a>

          <div className="p-4 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-white border border-[#DFEAF7] text-[#087CF0]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#102544]">Operations Coverage</div>
              <div className="text-xs text-[#102544] font-semibold mt-0.5">24 Hours / 7 Days</div>
              <div className="text-[10px] text-[#4A5F7D] mt-1">Global financial hub routing</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Searchable FAQ */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="font-extrabold text-base text-[#102544] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#087CF0]" />
                <span>Frequently Asked Questions</span>
              </h2>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-[#4A5F7D] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchFaq}
                  onChange={(e) => setSearchFaq(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F4F8FC] border border-[#DFEAF7] rounded-lg text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>
            </div>

            {/* Accordion Items */}
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#DFEAF7] rounded-xl overflow-hidden bg-white transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#102544] hover:bg-[#F4F8FC] transition"
                    >
                      <span className="pr-4">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#087CF0] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#4A5F7D] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-[#4A5F7D] leading-relaxed border-t border-[#DFEAF7]/50 bg-[#F4F8FC]/50">
                        <div className="pt-2">{faq.a}</div>
                        <div className="mt-2 text-[10px] text-[#087CF0] font-semibold uppercase">
                          Category: {faq.category}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-xs text-[#4A5F7D]">
                  No matching questions found for &ldquo;{searchFaq}&rdquo;. Please submit a ticket below.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Support Ticket Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="border-b border-[#DFEAF7] pb-3">
              <h2 className="font-extrabold text-base text-[#102544]">
                Submit Support Ticket
              </h2>
              <p className="text-xs text-[#4A5F7D] mt-0.5">
                Direct transmission to the DREAD DYN concierge resolution portal.
              </p>
            </div>

            {lastSubmittedTicket && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ticket Registered: {lastSubmittedTicket}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Our duty officer will review your request and send an encrypted response to your email.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmitTicket} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#102544] block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Julian Sterling"
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                >
                  <option value="Card Activation">Card Activation & Virtual Key</option>
                  <option value="Limits & Upgrades">Daily Spend Limit Ceiling Upgrade</option>
                  <option value="Vault Delivery">Armored Courier & Tracking</option>
                  <option value="Billing & Invoice">Corporate Invoicing & Wire Verification</option>
                  <option value="Other">General Concierge Inquiries</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Requesting $200k daily ceiling authorization"
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Message Details *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide specifics including order reference number if applicable..."
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-md shadow-blue-500/15"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket to Concierge</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
