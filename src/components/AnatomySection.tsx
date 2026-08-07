import React, { useState } from 'react';
import { Layers, Wind, Flame, Shield, CheckCircle2, ArrowRight, Activity, RotateCw, Eye } from 'lucide-react';
import { GravityCoreBallCanvas } from './3d/GravityCoreBallCanvas';
import { PageView } from '../types';

interface AnatomySectionProps {
  onNavigate: (page: PageView) => void;
  onOpenScience: () => void;
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({ onNavigate, onOpenScience }) => {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'3d' | 'thermal' | 'airflow'>('3d');
  const [airflowVelocity, setAirflowVelocity] = useState<number>(24); // mph wind speed

  const layers = [
    {
      id: 0,
      title: 'Aero-Vent Mesh',
      subtitle: 'Laser-Mapped Heat Dissipation',
      spec: '98.4% Vapor Dispersion',
      badge: 'TOP LAYER',
      description: 'Body-mapped micro-perforations located over high-perspiration zones (upper back, underarms). Channelized airflow strips create negative pressure zones that accelerate evaporative cooling during 80+ minute rallies.',
      icon: Wind,
      color: '#ccff00',
    },
    {
      id: 1,
      title: '4-Way Kinetic Stretch',
      subtitle: 'Unrestricted Omnidirectional Range',
      spec: '4.8x Elasticity Index',
      badge: 'MID LAYER',
      description: 'Micro-denier elastane matrix knitted with dynamic recovery memory. Engineered to expand during explosive overhead smashes without permanent fabric bagginess or drag.',
      icon: Layers,
      color: '#38bdf8',
    },
    {
      id: 2,
      title: 'Anti-Odor Ion Tech',
      subtitle: '99.9% Microbial Inhibition',
      spec: 'Pure Silver Fiber Thread',
      badge: 'CORE LINER',
      description: 'Elemental silver ions permanently bonded into the yarn structure neutralize odor-causing bacteria at a molecular level before sweat breaks down into volatile compounds.',
      icon: Shield,
      color: '#a855f7',
    },
    {
      id: 3,
      title: 'Carbon-Weave Collar',
      subtitle: 'Friction-Free Neck Alignment',
      spec: 'Bonded Flush Placket',
      badge: 'ACCENT TECH',
      description: 'Zero-stitch bonded collar structure with internal magnetic closure prevents skin friction and stay-flat structured alignment across intense temperature shifts.',
      icon: Flame,
      color: '#f43f5e',
    },
  ];

  return (
    <section className="py-20 bg-[#0b0c0e] border-y border-white/10 relative overflow-hidden">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 bg-lab-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#14161c] border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-300 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 text-zinc-300" />
            <span>INTERACTIVE DECONSTRUCTED BREAKDOWN</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            THE ANATOMY OF PLAY
          </h2>
          <p className="font-mono text-xs sm:text-sm text-zinc-400 uppercase tracking-wider font-semibold">
            "CALIBRATION OVER DESIGN. EVERY STITCH IS AN EXPERIMENT."
          </p>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            Explore the multi-layered textile engineering behind Court Lab apparel. Each layer is calibrated in our aerodynamic wind tunnels to deliver measurable court advantages.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10 font-mono text-xs uppercase tracking-wider">
          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${
              viewMode === '3d'
                ? 'bg-white text-black font-bold border-white'
                : 'bg-[#121318] text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            3D Mesh Model
          </button>
          <button
            onClick={() => setViewMode('thermal')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${
              viewMode === 'thermal'
                ? 'bg-white text-black font-bold border-white'
                : 'bg-[#121318] text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            Thermal Heat Map
          </button>
          <button
            onClick={() => setViewMode('airflow')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${
              viewMode === 'airflow'
                ? 'bg-white text-black font-bold border-white'
                : 'bg-[#121318] text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <Wind className="w-4 h-4" />
            Wind Tunnel Sim
          </button>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column - Deconstructed 3D Canvas / Heatmap */}
          <div className="lg:col-span-7 bg-[#121318] border border-white/10 rounded-3xl p-6 relative flex flex-col justify-between shadow-card-elevated">
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-semibold">
                  MODE: {viewMode.toUpperCase()} VIEW
                </span>
              </div>
              <div>TEXTILE LAB // TEST ID 884</div>
            </div>

            {/* Visual Canvas Display */}
            <div className="relative min-h-[380px] flex items-center justify-center rounded-2xl bg-[#0b0c0e] overflow-hidden border border-white/10">
              {viewMode === '3d' && (
                <div className="w-full h-full relative flex items-center justify-center">
                  <GravityCoreBallCanvas mode="wireframe" className="w-full h-[360px]" />
                  {/* Floating Interactive Popups */}
                  {layers.map((l, index) => (
                    <button
                      key={l.id}
                      onClick={() => setActiveLayer(index)}
                      className={`absolute px-3.5 py-2 rounded-xl border font-mono text-xs font-bold transition-all ${
                        activeLayer === index
                          ? 'bg-white text-black border-white scale-105 z-20 shadow-lg'
                          : 'bg-black/80 text-zinc-300 border-white/20 hover:border-white/50'
                      }`}
                      style={{
                        top: `${20 + index * 20}%`,
                        left: index % 2 === 0 ? '8%' : '65%',
                      }}
                    >
                      📍 {l.title}
                    </button>
                  ))}
                </div>
              )}

              {viewMode === 'thermal' && (
                <div className="p-8 text-center space-y-4">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-tr from-blue-600 via-emerald-500 to-amber-200 blur-2xl opacity-60 animate-pulse" />
                  <div className="font-mono text-xs text-emerald-400 font-bold">
                    THERMAL GRAPH: -3.2°C COOLING DELTA AT 80% HUMIDITY
                  </div>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Infrared thermography proves Court Lab Aero-Vent Mesh maintains optimal skin temperature under direct sunlight exposure.
                  </p>
                </div>
              )}

              {viewMode === 'airflow' && (
                <div className="p-6 w-full space-y-6">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-300">
                    <span>WIND SPEED: {airflowVelocity} MPH</span>
                    <span>AERO DRAG: {(0.22 - airflowVelocity * 0.0015).toFixed(2)} Cd</span>
                  </div>

                  {/* Wind Velocity Slider */}
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={airflowVelocity}
                    onChange={(e) => setAirflowVelocity(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />

                  {/* Wind Lines Animation */}
                  <div className="relative h-24 bg-black/60 rounded-xl overflow-hidden border border-white/10 flex items-center justify-around">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-0.5 bg-zinc-400 rounded-full animate-scanline"
                        style={{
                          width: `${i * 12 + 20}%`,
                          animationDuration: `${2 / (airflowVelocity / 10)}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-zinc-400 text-center">
                    Drag slider to test aerodynamic drag coefficient against standard athletic poly.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Layer Selector Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 font-mono text-xs">
              {layers.map((l, index) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLayer(index)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeLayer === index
                      ? 'bg-white/10 border-white text-white'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-zinc-500 font-bold">{l.badge}</div>
                  <div className="font-semibold text-xs truncate">{l.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Deep Specs for Active Layer */}
          <div className="lg:col-span-5 bg-[#121318] border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-card-elevated">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-white text-black font-mono text-xs font-bold px-3 py-1 rounded-md">
                  LAYER {activeLayer + 1} OF 4
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  {layers[activeLayer].badge}
                </span>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {layers[activeLayer].title}
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  {layers[activeLayer].subtitle}
                </p>
              </div>

              <div className="bg-black/60 border border-white/10 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-400">CALIBRATION INDEX:</span>
                  <span className="text-white font-bold">{layers[activeLayer].spec}</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${85 + activeLayer * 4}%` }}
                  />
                </div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                {layers[activeLayer].description}
              </p>

              <div className="space-y-2 font-mono text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tested across 50,000 friction cycles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero color fade under UV solar exposure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Recycled Ocean Poly blend</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => onNavigate('catalog')}
                className="w-full bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold py-3.5 rounded-xl transition-all shadow-md text-center"
              >
                SHOP THIS GEAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
