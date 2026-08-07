import React, { useState } from 'react';
import { Mail, MapPin, ShieldCheck, Send, CheckCircle2, Phone, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { PageView } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#08080a] min-h-screen text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121318] border border-[#ccff00]/30 text-[#ccff00] text-[11px] font-bold tracking-widest uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>ATHLETE SUPPORT & HQ INQUIRIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-display">
            CONTACT COURT LAB
          </h1>
          <p className="text-slate-400 font-sans text-sm max-w-xl mx-auto">
            Have a question about your order, sizing calibration, or high-velocity gear? Connect directly with our performance lab team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 space-y-2">
              <div className="text-xs text-[#ccff00] uppercase tracking-wider font-bold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                ATHLETE SUPPORT EMAIL
              </div>
              <div className="text-lg font-bold text-white">support@courtlab.io</div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                24/7 dedicated response within 1 hour for active order tracking & returns.
              </p>
            </div>

            <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 space-y-2">
              <div className="text-xs text-[#ccff00] uppercase tracking-wider font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                GLOBAL HEADQUARTERS
              </div>
              <div className="text-lg font-bold text-white">Court Lab Performance Hub</div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                1100 Congress Ave, Suite 400<br />
                Austin, TX 78701, United States
              </p>
            </div>

            <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 space-y-2">
              <div className="text-xs text-[#ccff00] uppercase tracking-wider font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                30-DAY RISK-FREE GUARANTEE
              </div>
              <div className="text-lg font-bold text-white">30-Day Court Test</div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Wear it on court. Play hard. If it doesn't elevate your game, return it for a 100% full refund.
              </p>
            </div>

            <div className="bg-[#09090c] border border-white/10 rounded-2xl p-5 text-center space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                NEED QUICK SHIPMENT STATUS?
              </div>
              <button
                onClick={() => onNavigate('order-tracking')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] hover:underline"
              >
                <span>OPEN SATELLITE ORDER TRACKER</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#ccff00] to-teal-400 rounded-t-2xl" />

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase">MESSAGE DISPATCHED!</h3>
                <p className="text-zinc-400 font-sans text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our Court Lab athlete support team has received your message and will email you back at <strong className="text-white">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', orderNumber: '', message: '' });
                  }}
                  className="bg-[#ccff00] text-black font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#09090c] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] font-mono text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="athlete@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#09090c] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] font-mono text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
                    ORDER NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CL-LAB-849201"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full bg-[#09090c] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] font-mono text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
                    MESSAGE / INQUIRY
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can Court Lab support your performance today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#09090c] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] font-sans text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#ccff00]/10"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH MESSAGE</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
