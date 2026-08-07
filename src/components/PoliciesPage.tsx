import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock, CheckCircle, Globe, ChevronRight } from 'lucide-react';
import { PageView } from '../types';

interface PoliciesPageProps {
  onNavigate: (page: PageView) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy'>('shipping');

  return (
    <div className="py-16 bg-[#08080a] min-h-screen text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0d0e12] border border-[#ccff00]/40 px-3 py-1 rounded-full text-xs font-mono text-[#ccff00]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRANSPARENT TRUST & GUARANTEES</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
            COURT LAB POLICIES
          </h1>
          <p className="font-mono text-xs text-slate-400">
            ENGINEERED WITH THE SAME PRECISION AS OUR TEXTILES
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-bold transition-all ${
              activeTab === 'shipping'
                ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-kinetic-glow'
                : 'bg-[#0d0e12] text-slate-300 border-white/10 hover:border-white/30'
            }`}
          >
            <Truck className="w-4 h-4" />
            SHIPPING POLICY
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-bold transition-all ${
              activeTab === 'returns'
                ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-kinetic-glow'
                : 'bg-[#0d0e12] text-slate-300 border-white/10 hover:border-white/30'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            THE 30-DAY COURT TEST
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-bold transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-kinetic-glow'
                : 'bg-[#0d0e12] text-slate-300 border-white/10 hover:border-white/30'
            }`}
          >
            <Lock className="w-4 h-4" />
            PRIVACY & SECURITY
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-[#0d0e12] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl">
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Truck className="w-6 h-6 text-[#ccff00]" />
                <h2 className="font-display font-bold text-2xl text-white">
                  SHIPPING & DEPLOYMENT POLICY
                </h2>
              </div>

              <div className="space-y-4 text-slate-300 font-sans text-sm leading-relaxed">
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs text-[#ccff00]">
                  "Next-Day Processing. Carbon-neutral shipping on all orders over $150. Global tracking from the moment it leaves the lab."
                </div>

                <h3 className="font-mono text-xs text-white font-bold uppercase tracking-wider pt-2">
                  1. NEXT-DAY FULFILLMENT
                </h3>
                <p>
                  Every order submitted before 2 PM CST is calibrated, quality-inspected, and dispatched from our Austin lab within 24 business hours.
                </p>

                <h3 className="font-mono text-xs text-white font-bold uppercase tracking-wider pt-2">
                  2. CARBON-NEUTRAL DELIVERY
                </h3>
                <p>
                  Orders over $150 qualify for complimentary Carbon-Neutral Express Shipping. We offset 100% of transport emissions through certified reforestation projects.
                </p>

                <h3 className="font-mono text-xs text-white font-bold uppercase tracking-wider pt-2">
                  3. REAL-TIME TELEMETRY TRACKING
                </h3>
                <p>
                  Upon dispatch, you will receive an encrypted satellite tracking link with real-time location updates until your kit reaches your court.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <RotateCcw className="w-6 h-6 text-[#ccff00]" />
                <h2 className="font-display font-bold text-2xl text-white">
                  THE 30-DAY COURT TEST (RETURNS & GUARANTEE)
                </h2>
              </div>

              <div className="space-y-4 text-slate-300 font-sans text-sm leading-relaxed">
                <div className="bg-[#ccff00]/10 border border-[#ccff00]/30 p-4 rounded-xl font-mono text-xs text-[#ccff00]">
                  "The 30-Day Court Test. If it doesn’t improve your game, send it back. No questions asked."
                </div>

                <p>
                  We stand behind our textile science with total confidence. Take your Court Lab apparel to your local courts, play in the heat, slide into kitchen dinks, and put the gear through real match stress.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[#ccff00] font-bold">✓ ZERO RESTOCKING FEES</span>
                    <p className="text-slate-400 text-[11px]">
                      Pre-paid return shipping label generated automatically.
                    </p>
                  </div>

                  <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[#ccff00] font-bold">✓ NO QUESTIONS ASKED</span>
                    <p className="text-slate-400 text-[11px]">
                      Full refund returned to original payment method within 3 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Lock className="w-6 h-6 text-[#ccff00]" />
                <h2 className="font-display font-bold text-2xl text-white">
                  PRIVACY POLICY & DATA ENCRYPTION
                </h2>
              </div>

              <div className="space-y-4 text-slate-300 font-sans text-sm leading-relaxed">
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs text-[#ccff00]">
                  "Clear, GDPR-compliant language emphasizing secure data encryption for premium clients."
                </div>

                <p>
                  Court Lab utilizes end-to-end AES-256 SSL encryption for all transaction telemetry. We strictly respect your privacy and never rent, sell, or disclose client data to third-party ad brokers.
                </p>

                <ul className="space-y-2 font-mono text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ccff00]" />
                    <span>GDPR & CCPA Compliant Data Controls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ccff00]" />
                    <span>Encrypted Payment Processing via Stripe / ShopPay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ccff00]" />
                    <span>One-Click Data Purge Available Upon Request</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
