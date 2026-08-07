import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShieldCheck, Check, ArrowRight, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface PostPurchaseModalProps {
  isOpen: boolean;
  onAcceptUpsell: () => void;
  onDeclineUpsell: () => void;
}

export const PostPurchaseModal: React.FC<PostPurchaseModalProps> = ({
  isOpen,
  onAcceptUpsell,
  onDeclineUpsell,
}) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const paddleCover = PRODUCTS.find((p) => p.id === 'pro-guard-paddle-cover') || PRODUCTS[6];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 font-mono">
      <div className="bg-[#0d0e12] border-2 border-[#ccff00] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-kinetic-glow-lg relative overflow-hidden space-y-6">
        {/* Top Timer Bar */}
        <div className="bg-[#ccff00] text-black py-2 px-4 rounded-xl flex items-center justify-between font-extrabold text-xs">
          <div className="flex items-center gap-1.5 uppercase">
            <Clock className="w-4 h-4 fill-black" />
            <span>ONE-TIME POST-PURCHASE OFFER</span>
          </div>
          <div className="bg-black text-[#ccff00] px-2.5 py-0.5 rounded text-xs font-bold">
            EXPIRES IN: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>

        {/* Headline */}
        <div className="text-center space-y-2">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            PROTECT YOUR PADDLE FACE
          </h2>
          <p className="text-xs text-slate-300">
            Add a Court Lab 'Pro-Guard' Paddle Cover for just{' '}
            <strong className="text-[#ccff00] font-extrabold">$15</strong> (Normally $30).
          </p>
        </div>

        {/* Product Card Showcase */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <img
            src={paddleCover.images[0]}
            alt="Pro-Guard Paddle Cover"
            className="w-24 h-24 rounded-xl object-cover border border-white/10"
          />
          <div className="space-y-1 text-xs">
            <div className="text-white font-bold">{paddleCover.name}</div>
            <div className="text-slate-400 text-[11px]">{paddleCover.subtitle}</div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-[#ccff00] font-black text-lg">$15.00</span>
              <span className="text-slate-500 line-through text-xs">$30.00</span>
              <span className="bg-[#ccff00]/20 text-[#ccff00] text-[10px] font-bold px-1.5 py-0.5 rounded">
                SAVE 50%
              </span>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#ccff00]" />
            <span>4mm Neoprene Heat Deflector Layer</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#ccff00]" />
            <span>Silent Magnetic Quick-Latch Zipper</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#ccff00]" />
            <span>Fence Clip Carabiner Included</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onAcceptUpsell}
            className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm py-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-kinetic-glow transition-all"
          >
            <span>YES! ADD TO MY DEPLOYMENT ORDER (+$15)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onDeclineUpsell}
            className="w-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-xs py-3 rounded-xl transition-colors"
          >
            No thanks, complete my order as is
          </button>
        </div>
      </div>
    </div>
  );
};
