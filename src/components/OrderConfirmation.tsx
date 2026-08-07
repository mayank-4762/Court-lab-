import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Truck, ShieldCheck, MapPin, Package, ArrowRight, Zap } from 'lucide-react';
import { Order, PageView } from '../types';

interface OrderConfirmationProps {
  order: Order;
  onNavigate: (page: PageView) => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onNavigate }) => {
  useEffect(() => {
    // Fire festive confetti effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ccff00', '#ffffff', '#38bdf8'],
    });
  }, []);

  return (
    <div className="py-16 bg-[#08080a] min-h-screen font-mono text-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Header */}
        <div className="bg-[#0d0e12] border-2 border-[#ccff00] rounded-3xl p-8 text-center space-y-4 shadow-kinetic-glow">
          <div className="w-16 h-16 rounded-full bg-[#ccff00]/20 border border-[#ccff00] flex items-center justify-center mx-auto text-[#ccff00]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#ccff00] font-bold uppercase tracking-wider">
              ORDER TELEMETRY CONFIRMED
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
              YOUR KIT IS IN DEPLOYMENT
            </h1>
            <p className="text-xs text-slate-400">
              TRACKING NUMBER: <strong className="text-white">{order.trackingNumber}</strong>
            </p>
          </div>
        </div>

        {/* Real-Time Tracking Stepper */}
        <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
            <span className="text-slate-400">DEPLOYMENT STATUS:</span>
            <span className="text-[#ccff00] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
              {order.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-[10px] text-center">
            <div className="p-2 rounded-xl bg-[#ccff00] text-black font-bold">
              1. ORDER CALIBRATED
            </div>
            <div className="p-2 rounded-xl bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40 font-bold">
              2. IN DEPLOYMENT
            </div>
            <div className="p-2 rounded-xl bg-black/50 text-slate-500 border border-white/5">
              3. CARGO DISPATCHED
            </div>
            <div className="p-2 rounded-xl bg-black/50 text-slate-500 border border-white/5">
              4. DELIVERED
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-display font-bold text-base text-white border-b border-white/10 pb-3">
            DEPLOYMENT CARGO MANIFEST
          </h3>

          <div className="space-y-3">
            {order.items.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between bg-black/50 p-3 rounded-xl border border-white/5 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={i.product.images[0]}
                    alt={i.product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-white font-bold">{i.product.name}</div>
                    <div className="text-slate-400 text-[10px]">
                      SIZE: {i.selectedSize} × {i.quantity}
                    </div>
                  </div>
                </div>
                <div className="text-[#ccff00] font-bold">
                  ${(i.product.price * i.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-3 space-y-1 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>SUBTOTAL:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.hasPostPurchaseUpsell && (
              <div className="flex justify-between text-[#ccff00]">
                <span>POST-PURCHASE PADDLE COVER:</span>
                <span>+$15.00</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
              <span>TOTAL PAID:</span>
              <span className="text-[#ccff00]">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold text-xs px-8 py-4 rounded-xl shadow-kinetic-glow hover:scale-105 transition-all"
          >
            <span>RETURN TO COURT LAB HOME</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
