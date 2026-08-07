import React from 'react';
import { X, Activity, Wind, Shield, Zap, Flame, Award } from 'lucide-react';

interface ScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScienceModal: React.FC<ScienceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono text-slate-100 overflow-y-auto">
      <div className="bg-[#0d0e12] border border-[#ccff00]/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#ccff00]/20 text-[#ccff00] px-3 py-1 rounded-full text-xs font-bold uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>COURT LAB RESEARCH PAPER #088</span>
          </div>
          <h2 className="font-display font-black text-3xl text-white">
            THE SCIENCE OF PLAY: AERODYNAMICS & TEXTILES
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            How Court Lab's proprietary fabric matrices redefine player endurance and thermal equilibrium.
          </p>
        </div>

        <div className="space-y-4 font-sans text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          {/* Section 1 */}
          <div className="bg-black/50 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="font-mono text-xs text-[#ccff00] font-bold flex items-center gap-2">
              <Wind className="w-4 h-4" />
              1. BOUNDARY LAYER DRAG COEFFICIENT (0.18 Cd)
            </div>
            <p>
              In high-speed kitchen rallies, upper-body movement creates turbulent air wake around shoulders and chest. Court Lab's Aero-Vent micro-mesh breaks boundary-layer air friction, reducing aerodynamic drag by 14% compared to traditional cotton or standard polyester tees.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-black/50 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="font-mono text-xs text-[#ccff00] font-bold flex items-center gap-2">
              <Flame className="w-4 h-4" />
              2. EVAPORATIVE MOISTURE VAPOR DISPERSION (&lt;1.2 SECONDS)
            </div>
            <p>
              Unlike traditional hydrophobic synthetics that trap sweat against skin, our 3D capillary yarn structure pulls moisture outward across a wide surface matrix, accelerating evaporation speed to under 1.2 seconds.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-black/50 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="font-mono text-xs text-[#ccff00] font-bold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              3. ION SHIELD ANTIMICROBIAL INTEGRATION
            </div>
            <p>
              By permanently fusing elemental silver threads into the raw polymer before spinning, Court Lab textiles continuously deactivate odor-causing microbes at the cellular wall, keeping gear fresh across back-to-back tournament matches.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full bg-[#ccff00] text-black font-mono font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider"
          >
            RETURN TO COURT LAB SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
};
