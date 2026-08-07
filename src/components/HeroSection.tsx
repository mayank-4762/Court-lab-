import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { GravityCoreBallCanvas } from './3d/GravityCoreBallCanvas';
import { PageView } from '../types';

interface HeroSectionProps {
  onNavigate: (page: PageView) => void;
  onOpenCalibrator: () => void;
}

const APPAREL_MOCKUPS = [
  {
    id: 'court-tee-pro-elite',
    name: 'Pro-Elite Court Tee',
    category: 'Aerodynamic Short Sleeve',
    badge: 'Aero-Vent Mesh',
    dragCoeff: '0.18 Cd',
    cooling: '-3.2°C',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    hotspots: [
      { label: 'Laser Venting', position: 'top-12 left-6' },
      { label: 'Zero-Chafe Seams', position: 'bottom-16 right-6' },
    ],
  },
  {
    id: 'apex-compression-short',
    name: 'Apex Compression Short',
    category: 'High-Velocity 2-in-1',
    badge: '4-Way Kinetic Flex',
    dragCoeff: '0.21 Cd',
    cooling: '-2.8°C',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    hotspots: [
      { label: 'Quad Liner', position: 'top-16 right-6' },
      { label: 'Ball Loop', position: 'bottom-12 left-6' },
    ],
  },
  {
    id: 'pro-vortex-polo',
    name: 'Pro-Vortex Aero Polo',
    category: 'High-Performance Collar',
    badge: 'Silver-Ion Thread',
    dragCoeff: '0.19 Cd',
    cooling: '-3.5°C',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    hotspots: [
      { label: 'Magnetic Placket', position: 'top-10 left-8' },
      { label: 'Spine Airflow', position: 'bottom-20 right-8' },
    ],
  },
  {
    id: 'kinetic-aero-tank',
    name: 'Kinetic Aero Tank',
    category: '3D Seamless Ergonomic',
    badge: 'Zero-Chafe Knit',
    dragCoeff: '0.16 Cd',
    cooling: '-3.8°C',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80',
    hotspots: [
      { label: 'Racerback Lattice', position: 'top-12 right-6' },
      { label: 'Rib Stretch', position: 'bottom-14 left-6' },
    ],
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenCalibrator }) => {
  const [activeMockupIndex, setActiveMockupIndex] = useState(0);
  const [show3dCore, setShow3dCore] = useState(false);

  const activeMockup = APPAREL_MOCKUPS[activeMockupIndex];

  return (
    <section className="relative min-h-[85vh] bg-[#0b0c0e] border-b border-white/10 flex flex-col justify-between overflow-hidden py-12 lg:py-20">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-lab-grid opacity-30 pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
        {/* Left Column - Clean Luxury Copy & Primary CTAs */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Tech Badge & Tagline */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-[#14161c] border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-zinc-300 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CALIBRATED COURT GEAR &bull; 2026 EDITION</span>
            </div>

            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold text-white uppercase tracking-[0.2em] bg-[#121318] border border-[#ccff00]/30 px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-3 h-[1.5px] bg-[#ccff00]" />
              <span className="text-zinc-200">PERFORMANCE ON EVERY POINT</span>
              <span className="w-3 h-[1.5px] bg-[#ccff00]" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl uppercase leading-[0.92] tracking-tight text-white">
            ENGINEERED<br />
            FOR THE <span className="text-zinc-400 italic font-serif font-normal">RALLY.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
            Where aerodynamic textile science meets elite court athletic performance. Micro-vented airflow, zero friction seams, and 4-way kinetic flex.
          </p>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-3 gap-4 max-w-lg font-mono text-xs pt-2">
            <div className="bg-[#121318] border border-white/10 p-3.5 rounded-xl">
              <div className="text-zinc-400 text-[10px] uppercase">AIRFLOW DRAG</div>
              <div className="text-white font-bold text-lg mt-0.5">{activeMockup.dragCoeff}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">-14% Drag</div>
            </div>

            <div className="bg-[#121318] border border-white/10 p-3.5 rounded-xl">
              <div className="text-zinc-400 text-[10px] uppercase">THERMAL COOLING</div>
              <div className="text-white font-bold text-lg mt-0.5">{activeMockup.cooling}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Active Vapor</div>
            </div>

            <div className="bg-[#121318] border border-white/10 p-3.5 rounded-xl">
              <div className="text-zinc-400 text-[10px] uppercase">KINETIC FLEX</div>
              <div className="text-white font-bold text-lg mt-0.5">142%</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Zero Restriction</div>
            </div>
          </div>

          {/* Streamlined Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 max-w-md">
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('anatomy')}
              className="flex items-center justify-center gap-2 bg-[#121318] hover:bg-white/10 text-zinc-200 border border-white/15 px-6 py-4 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>ANATOMY OF PLAY 3D</span>
            </button>
          </div>

          {/* Guarantee pill */}
          <div className="flex items-center gap-6 pt-2 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-300" />
              <span>30-Day Court Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-zinc-300" />
              <span>Express Dispatch</span>
            </div>
          </div>
        </div>

        {/* Right Column - Animated High-Performance Apparel Mockup Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full aspect-square max-w-[460px] relative border border-white/10 bg-[#121318]/90 backdrop-blur-xl p-5 rounded-3xl shadow-card-elevated flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Radial Glow behind Mockup */}
            <div className="absolute inset-0 bg-radial from-emerald-500/10 via-white/5 to-transparent animate-pulse-glow pointer-events-none" />

            {/* Header overlay */}
            <div className="flex items-center justify-between font-mono text-[10px] uppercase text-zinc-400 pb-3 border-b border-white/10 z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-bold tracking-wider">
                  {show3dCore ? '3D FABRIC CORE' : 'PERFORMANCE MOCKUP'}
                </span>
              </div>
              <button
                onClick={() => setShow3dCore(!show3dCore)}
                className="flex items-center gap-1.5 bg-[#1a1c24] hover:bg-white/10 border border-white/10 text-zinc-300 px-2.5 py-1 rounded-md transition-all cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-emerald-400" />
                <span>{show3dCore ? 'SHOW MOCKUP' : '3D CORE'}</span>
              </button>
            </div>

            {/* Apparel Item Selector Tabs */}
            {!show3dCore && (
              <div className="grid grid-cols-4 gap-1.5 my-2.5 z-10">
                {APPAREL_MOCKUPS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveMockupIndex(idx)}
                    className={`px-2 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-tight border transition-all text-center truncate ${
                      activeMockupIndex === idx
                        ? 'bg-white text-black font-bold border-white shadow-sm'
                        : 'bg-[#181a22] text-zinc-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {item.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            )}

            {/* Display Container */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-2 rounded-2xl bg-[#0b0c0e] border border-white/5">
              {show3dCore ? (
                <GravityCoreBallCanvas mode="ball" className="w-full h-full" />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  {/* Subtle Scan Line Motion Effect */}
                  <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-emerald-400/15 to-transparent animate-tech-scan pointer-events-none z-20" />

                  {/* Animated Apparel Image Container with Smooth Motion */}
                  <div className="relative w-full h-full max-h-[280px] flex items-center justify-center animate-apparel-float">
                    <img
                      src={activeMockup.image}
                      alt={activeMockup.name}
                      className="max-h-full max-w-full object-contain rounded-xl shadow-2xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Tech Badge Overlay on Image */}
                    <div className="absolute top-2 left-2 bg-[#0b0c0e]/85 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-md text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider shadow-md">
                      {activeMockup.badge}
                    </div>

                    {/* Floating Hotspots / Spec Callouts */}
                    {activeMockup.hotspots.map((hs, i) => (
                      <div
                        key={i}
                        className={`absolute ${hs.position} bg-[#0b0c0e]/90 border border-white/20 px-2.5 py-1 rounded-md text-[9px] font-mono text-white shadow-lg backdrop-blur-md hidden sm:flex items-center gap-1.5 animate-apparel-float-slow`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>{hs.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Info Bar */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-zinc-400 z-10">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{activeMockup.name}</span>
                <span className="text-zinc-500 hidden sm:inline">&bull; {activeMockup.category}</span>
              </div>
              <button
                onClick={onOpenCalibrator}
                className="text-white hover:text-emerald-400 font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                FIT CALIBRATOR &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

