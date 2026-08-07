import React, { useState } from 'react';
import { Sliders, X, Check, ArrowRight, Activity, Zap } from 'lucide-react';

interface FitCalibratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation?: (recommendedSize: string) => void;
}

export const FitCalibratorModal: React.FC<FitCalibratorModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendation,
}) => {
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [weightLbs, setWeightLbs] = useState(175);
  const [playStyle, setPlayStyle] = useState<'dinker' | 'balanced' | 'power-driver'>('balanced');
  const [climate, setClimate] = useState<'hot-humid' | 'indoor' | 'cooler'>('hot-humid');
  const [calibrated, setCalibrated] = useState(false);

  if (!isOpen) return null;

  // Calculation for recommended fit
  let recommendedSize = 'M';
  if (weightLbs < 140) recommendedSize = 'S';
  else if (weightLbs < 170) recommendedSize = 'M';
  else if (weightLbs < 200) recommendedSize = 'L';
  else recommendedSize = 'XL';

  const handleCalibrate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalibrated(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono text-slate-100">
      <div className="bg-[#0d0e12] border border-[#ccff00]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#ccff00] font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>BIOMETRIC FIT CALIBRATOR</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white">
            CALIBRATE YOUR PERFECT FIT
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Input your biometric profile for precision size and textile density recommendations.
          </p>
        </div>

        {!calibrated ? (
          <form onSubmit={handleCalibrate} className="space-y-4 text-xs">
            {/* Height & Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400">HEIGHT (FT/IN)</label>
                <div className="flex gap-2">
                  <select
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full bg-[#18181b] border border-white/15 rounded-xl p-3 text-white focus:border-[#ccff00] outline-none"
                  >
                    {[4, 5, 6, 7].map((ft) => (
                      <option key={ft} value={ft}>
                        {ft} ft
                      </option>
                    ))}
                  </select>
                  <select
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full bg-[#18181b] border border-white/15 rounded-xl p-3 text-white focus:border-[#ccff00] outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inc) => (
                      <option key={inc} value={inc}>
                        {inc} in
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">WEIGHT (LBS)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full bg-[#18181b] border border-white/15 rounded-xl p-3 text-white focus:border-[#ccff00] outline-none"
                />
              </div>
            </div>

            {/* Play Style */}
            <div className="space-y-1">
              <label className="text-slate-400">COURT PLAY STYLE</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPlayStyle('dinker')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    playStyle === 'dinker'
                      ? 'bg-[#ccff00] text-black font-bold border-[#ccff00]'
                      : 'bg-[#18181b] text-slate-300 border-white/10'
                  }`}
                >
                  Kitchen Dinker
                </button>
                <button
                  type="button"
                  onClick={() => setPlayStyle('balanced')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    playStyle === 'balanced'
                      ? 'bg-[#ccff00] text-black font-bold border-[#ccff00]'
                      : 'bg-[#18181b] text-slate-300 border-white/10'
                  }`}
                >
                  All-Court
                </button>
                <button
                  type="button"
                  onClick={() => setPlayStyle('power-driver')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    playStyle === 'power-driver'
                      ? 'bg-[#ccff00] text-black font-bold border-[#ccff00]'
                      : 'bg-[#18181b] text-slate-300 border-white/10'
                  }`}
                >
                  Power Spiker
                </button>
              </div>
            </div>

            {/* Climate */}
            <div className="space-y-1">
              <label className="text-slate-400">PRIMARY COURT CLIMATE</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setClimate('hot-humid')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    climate === 'hot-humid'
                      ? 'bg-[#ccff00] text-black font-bold border-[#ccff00]'
                      : 'bg-[#18181b] text-slate-300 border-white/10'
                  }`}
                >
                  Hot Outdoor
                </button>
                <button
                  type="button"
                  onClick={() => setClimate('indoor')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    climate === 'indoor'
                      ? 'bg-[#ccff00] text-black font-bold border-[#ccff00]'
                      : 'bg-[#18181b] text-slate-300 border-white/10'
                  }`}
                >
                  Indoor Air
                </button>
                <button
                  type="button"
                  onClick={() => setClimate('cooler')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    climate === 'cooler'
                      ? 'bg-[#ccff00] text-black font-bold border-[#ccff00]'
                      : 'bg-[#18181b] text-slate-300 border-white/10'
                  }`}
                >
                  Cooler Climate
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black py-4 rounded-xl font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-kinetic-glow transition-all pt-2"
            >
              <span>RUN BIOMETRIC CALIBRATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="bg-black/60 border border-[#ccff00] p-6 rounded-2xl text-center space-y-2">
              <span className="text-[#ccff00] font-bold text-xs">CALIBRATION RESULT:</span>
              <div className="font-display font-black text-5xl text-white">
                SIZE {recommendedSize}
              </div>
              <p className="text-slate-300 text-xs font-sans">
                Recommended Series: <strong className="text-[#ccff00]">The Apex Collection</strong> with 4-Way Kinetic Stretch.
              </p>
            </div>

            <div className="bg-[#18181b] p-4 rounded-xl border border-white/10 space-y-1 text-slate-300">
              <div className="text-white font-bold">TEXTILE SPECS MATCH:</div>
              <p className="text-[11px] text-slate-400">
                Aero-Vent Micro Mesh with -3.2°C active cooling matches your outdoor court humidity profile.
              </p>
            </div>

            <button
              onClick={() => {
                if (onApplyRecommendation) onApplyRecommendation(recommendedSize);
                onClose();
              }}
              className="w-full bg-[#ccff00] text-black font-bold py-3 rounded-xl uppercase tracking-wider"
            >
              APPLY SIZE {recommendedSize} TO SHOPPING SESSION
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
