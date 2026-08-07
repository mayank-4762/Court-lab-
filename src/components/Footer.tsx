import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Mail, Check } from 'lucide-react';
import { PageView } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenScience: () => void;
  onOpenCalibrator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenScience,
  onOpenCalibrator,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (emailStr: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailStr.trim());
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setSubscribedEmail(email.trim());
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-slate-400 font-mono text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group focus:outline-none"
            >
              <Logo size="lg" variant="horizontal" showTagline={true} />
            </button>

            <p className="text-slate-400 font-sans text-xs leading-relaxed max-w-sm">
              Court Lab is the scientific intersection of aerodynamic textiles and elite pickleball performance. Engineered for zero friction, rapid evaporative cooling, and omnidirectional agility.
            </p>

            <div className="flex items-center gap-2 text-[#ccff00]">
              <ShieldCheck className="w-4 h-4" />
              <span>AUSTIN, TX LAB HQ // 30-DAY COURT TEST GUARANTEE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              LAB NAVIGATION
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Shop Apex Men Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Shop Kinetic Women Series
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('anatomy')}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Anatomy of Play (3D Breakdown)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order-tracking')}
                  className="hover:text-[#ccff00] font-bold text-white transition-colors"
                >
                  Track Your Shipment / Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Contact Athlete Support
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenScience}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Science of Play Research Papers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalibrator}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Biometric Fit Calibrator
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              POLICIES & GUARANTY
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('policies')}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  30-Day Court Test
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policies')}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Shipping & Carbon Neutral
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policies')}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Privacy & Encryption
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#ccff00] transition-colors"
                >
                  Our Mission & Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>LAB BRIEFINGS</span>
            </h4>
            <p className="text-[11px] text-slate-400 font-sans leading-snug">
              Subscribe for exclusive early access to limited product drops and 10% off your initial order.
            </p>

            {subscribed ? (
              <div className="bg-[#12141c] border border-[#ccff00]/50 p-3 rounded-xl space-y-2 text-left shadow-lg shadow-[#ccff00]/5">
                <div className="flex items-center gap-2 text-[#ccff00] text-xs font-bold">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>SUBSCRIPTION VERIFIED</span>
                </div>
                <p className="text-[10px] text-zinc-300 font-sans truncate">
                  Registered: <span className="text-white font-mono">{subscribedEmail}</span>
                </p>
                <div className="bg-[#090a0f] border border-white/10 rounded-lg p-2 text-center">
                  <span className="text-[10px] text-zinc-400 block uppercase">FIRST DROP DISCOUNT CODE:</span>
                  <span className="text-xs font-mono font-black text-[#ccff00] tracking-widest">LAB10</span>
                </div>
                <button
                  onClick={() => setSubscribed(false)}
                  className="text-[10px] text-zinc-400 hover:text-white underline block mx-auto pt-1 font-mono"
                >
                  Change Email Address
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="athlete@domain.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className={`w-full bg-[#090a0f] border rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-mono ${
                      error
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-white/20 focus:border-[#ccff00]'
                    }`}
                  />
                  {error && (
                    <p className="text-[10px] text-red-400 font-mono mt-1 font-bold">
                      ⚠️ {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.98] text-black font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#ccff00]/10"
                >
                  <span>JOIN VIP DROPS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & SEO telemetry footer */}
        <div className="border-t border-[#2A2A2A] pt-8 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono uppercase tracking-widest text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <span>STATUS:</span>
            <span className="text-[#CCFF00] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-ping" />
              OPERATIONAL
            </span>
          </div>
          <div className="hidden md:flex gap-6 text-zinc-400">
            <span>Atmospheric Drag: 0.02 Cd</span>
            <span>Vapor Permeability: High</span>
            <span>Ion-Tech: Active</span>
          </div>
          <div>&copy; {new Date().getFullYear()} COURT LAB INC. ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </footer>
  );
};
