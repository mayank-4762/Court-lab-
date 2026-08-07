import React from 'react';
import { Cpu, Activity, Award, ShieldCheck, Zap, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageView } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-16 bg-[#08080a] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0d0e12] border border-[#ccff00]/40 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#ccff00]">
            <Cpu className="w-3.5 h-3.5" />
            <span>SEO MISSION & TEXTILE PHILOSOPHY</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight">
            OUR MISSION | THE FUTURE OF PICKLEBALL PERFORMANCE
          </h1>
          <p className="font-mono text-sm text-[#ccff00] tracking-wider uppercase">
            COURT LAB PHILOSOPHY // REVOLUTIONIZING ATHLETIC WEAR THROUGH TEXTILE SCIENCE
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-bold text-3xl text-white">
              "PICKLEBALL MOVED FASTER THAN THE GEAR. WE FOUNDED COURT LAB TO CLOSE THE GAP."
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed font-sans text-base">
              <p>
                Pickleball is the fastest growing sport in modern history, characterized by rapid kitchen reaction speeds, lateral explosive pivots, and intense outdoor solar exposure. Yet for years, players settled for generic golf polos or heavy running shirts.
              </p>
              <p>
                Based in <strong className="text-white">Austin, Texas</strong>, our engineering team treats every stitch like an experiment in speed and thermal comfort. We built a dedicated wind-tunnel testing facility to measure boundary-layer drag and skin-temperature dissipation across 3-set matches.
              </p>
              <p>
                Every piece of Court Lab gear is built with recycled high-tenacity yarns, bonded flatlock seams, and elemental silver ion microbial shields.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs text-[#ccff00]">
              <div className="bg-[#0d0e12] border border-[#ccff00]/30 px-4 py-2 rounded-xl">
                ✓ 100% Wind Tunnel Calibrated
              </div>
              <div className="bg-[#0d0e12] border border-[#ccff00]/30 px-4 py-2 rounded-xl">
                ✓ Carbon Neutral Processing
              </div>
              <div className="bg-[#0d0e12] border border-[#ccff00]/30 px-4 py-2 rounded-xl">
                ✓ Pro Athlete Tested
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0d0e12] p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Court Lab High-Tech Textile Laboratory"
                className="w-full h-80 object-cover rounded-2xl opacity-80"
              />
              <div className="mt-4 p-4 bg-black/60 rounded-xl font-mono text-xs border border-white/10 space-y-2">
                <div className="text-[#ccff00] font-bold flex items-center justify-between">
                  <span>FACILITY LOG // LAB 01</span>
                  <span>AUSTIN, TX</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Laser fabric spectrography & drag coefficient calibration room.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Metadata Tag Inspection Card */}
        <div className="bg-[#0d0e12] border border-white/10 rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-mono text-sm text-[#ccff00] font-bold uppercase tracking-wider">
              SEO ARCHITECTURE & DOMAIN KEYWORDS
            </h3>
            <span className="font-mono text-xs text-slate-400">STRUCTURED DATA VERIFIED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="space-y-2 bg-black/50 p-4 rounded-2xl border border-white/5">
              <span className="text-slate-500">PAGE TITLE:</span>
              <div className="text-white font-bold">
                Our Mission | Court Lab – The Future of Pickleball Performance
              </div>
            </div>

            <div className="space-y-2 bg-black/50 p-4 rounded-2xl border border-white/5">
              <span className="text-slate-500">META DESCRIPTION:</span>
              <div className="text-slate-300">
                Discover how Court Lab is revolutionizing pickleball apparel through textile science and athlete-focused design. Premium gear for the modern player.
              </div>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <span className="text-slate-400">TARGET INDEX KEYWORDS:</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Premium pickleball clothing',
                'performance athletic wear',
                'court-tested apparel',
                'Court Lab philosophy',
                'Aero-Vent mesh technology',
                'pickleball apparel Austin',
              ].map((kw) => (
                <span
                  key={kw}
                  className="bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 px-3 py-1 rounded-lg"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Signals: Field Tests & Lab Telemetry */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="font-display font-extrabold text-3xl text-white">
              TRUST SIGNALS: FIELD TESTS & LAB METRICS
            </h3>
            <p className="font-mono text-xs text-slate-400 mt-2">
              BIOMETRIC DATA COLLECTED ACROSS 1,200+ MATCH HOURS
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 text-center space-y-2">
              <div className="font-display font-black text-4xl text-[#ccff00]">99.4%</div>
              <div className="font-mono text-xs text-white">Sweat Evaporation Rate</div>
              <p className="text-slate-400 text-xs">Verified in 90°F high humidity court trials</p>
            </div>

            <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 text-center space-y-2">
              <div className="font-display font-black text-4xl text-[#ccff00]">50,000+</div>
              <div className="font-mono text-xs text-white">Martindale Abrasion Cycles</div>
              <p className="text-slate-400 text-xs">Zero seam fraying or piling detected</p>
            </div>

            <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 text-center space-y-2">
              <div className="font-display font-black text-4xl text-[#ccff00]">30 DAYS</div>
              <div className="font-mono text-xs text-white">Zero Risk Court Trial</div>
              <p className="text-slate-400 text-xs">Full refund if not completely satisfied</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t border-white/10">
          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-sm font-extrabold px-8 py-4 rounded-xl shadow-kinetic-glow uppercase tracking-wider"
          >
            <span>SHOP COURT-TESTED GEAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
