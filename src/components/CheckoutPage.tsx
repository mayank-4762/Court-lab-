import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, Zap, ArrowLeft, ArrowRight, Truck } from 'lucide-react';
import { CartItem, ShippingAddress, Order } from '../types';

interface CheckoutPageProps {
  items: CartItem[];
  onBackToCart: () => void;
  onCompleteCheckout: (shippingAddress: ShippingAddress, hasUpsell: boolean) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onBackToCart,
  onCompleteCheckout,
}) => {
  const [step, setStep] = useState<3 | 4>(3); // 3 = Deployment Shipping, 4 = Final Payment
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@courtlab.io',
    address: '1100 Congress Ave, Suite 400',
    city: 'Austin',
    postalCode: '78701',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'express' | 'card'>('express');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      setStep(4);
    } else {
      onCompleteCheckout(address, false);
    }
  };

  return (
    <div className="py-12 bg-[#08080a] min-h-screen font-mono text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Progress Bar Component specified in Prompt Requirement #6 */}
        <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="text-[10px] text-[#ccff00] font-bold uppercase tracking-widest mb-3 text-center">
            CHECKOUT TELEMETRY FLOW
          </div>
          <div className="grid grid-cols-4 gap-2 text-[11px] text-center font-bold">
            <div className="p-2 rounded-lg bg-black/60 text-slate-500 border border-white/5">
              1. SELECTION
            </div>
            <div className="p-2 rounded-lg bg-black/60 text-slate-400 border border-white/5">
              2. THE LAB (CART)
            </div>
            <div
              className={`p-2 rounded-lg transition-all ${
                step === 3
                  ? 'bg-[#ccff00] text-black shadow-kinetic-glow font-extrabold'
                  : 'bg-black/80 text-[#ccff00] border border-[#ccff00]/40'
              }`}
            >
              3. DEPLOYMENT (SHIPPING)
            </div>
            <div
              className={`p-2 rounded-lg transition-all ${
                step === 4
                  ? 'bg-[#ccff00] text-black shadow-kinetic-glow font-extrabold'
                  : 'bg-black/60 text-slate-500 border border-white/5'
              }`}
            >
              4. FINAL CHECK (PAYMENT)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-7 bg-[#0d0e12] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display font-bold text-xl text-white">
                {step === 3 ? '3. DEPLOYMENT ADDRESS' : '4. FINAL PAYMENT CHECK'}
              </h2>
              <button
                onClick={onBackToCart}
                className="text-xs text-slate-400 hover:text-[#ccff00] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                RETURN TO CART
              </button>
            </div>

            {/* Express Checkout 1-Click Buttons */}
            <div className="bg-black/60 border border-[#ccff00]/30 p-4 rounded-2xl space-y-3">
              <div className="text-[10px] text-[#ccff00] font-bold uppercase tracking-wider">
                EXPRESS ONE-CLICK CHECKOUT
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onCompleteCheckout(address, false)}
                  className="bg-white hover:bg-slate-200 text-black py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1"
                >
                   Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => onCompleteCheckout(address, false)}
                  className="bg-black border border-white/20 hover:bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  G Pay
                </button>
                <button
                  type="button"
                  onClick={() => onCompleteCheckout(address, false)}
                  className="bg-[#5a31f4] hover:bg-[#4823d1] text-white py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  ShopPay
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {step === 3 ? (
                <>
                  <div className="space-y-1">
                    <label className="text-slate-400">FULL ATHLETE NAME</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      className="w-full bg-[#18181b] border border-white/15 rounded-xl p-3 text-white focus:border-[#ccff00] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">EMAIL FOR DISPATCH TELEMETRY</label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={(e) =>
                        setAddress({ ...address, email: e.target.value })
                      }
                      className="w-full bg-[#18181b] border border-white/15 rounded-xl p-3 text-white focus:border-[#ccff00] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">STREET ADDRESS</label>
                    <input
                      type="text"
                      required
                      value={address.address}
                      onChange={(e) =>
                        setAddress({ ...address, address: e.target.value })
                      }
                      className="w-full bg-[#18181b] border border-white/15 rounded-xl p-3 text-white focus:border-[#ccff00] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400">CITY</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        className="w-full bg-[#18181b] border border-white/15 rounded-xl p-3 text-white focus:border-[#ccff00] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">POSTAL CODE</label>
                      <input
                        type="text"
                        required
                        value={address.postalCode}
                        onChange={(e) =>
                          setAddress({ ...address, postalCode: e.target.value })
                        }
                        className="w-full bg-[#18181b] border border-white/15 rounded-xl p-3 text-white focus:border-[#ccff00] outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black py-4 rounded-xl font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-kinetic-glow transition-all"
                  >
                    <span>CONTINUE TO FINAL PAYMENT CHECK</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="text-slate-400">SHIPPING DEPLOYMENT DESTINATION:</div>
                    <div className="text-white font-bold">
                      {address.fullName} — {address.address}, {address.city},{' '}
                      {address.postalCode}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-slate-400">ENCRYPTED CARD DETAILS (AES-256)</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#18181b] border border-white/15 rounded-xl pl-11 pr-4 py-3 text-white focus:border-[#ccff00] outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-kinetic-glow transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>AUTHORIZE & DISPATCH ORDER (${total.toFixed(2)})</span>
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Right Column Order Summary */}
          <div className="lg:col-span-5 bg-[#0d0e12] border border-white/10 rounded-3xl p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-white border-b border-white/10 pb-3">
              KIT SUMMARY ({items.length} ITEMS)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((i) => (
                <div
                  key={i.id}
                  className="flex items-center gap-3 bg-black/40 p-2.5 rounded-xl border border-white/5"
                >
                  <img
                    src={i.product.images[0]}
                    alt={i.product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-xs">
                    <div className="text-white font-bold">{i.product.name}</div>
                    <div className="text-slate-400 text-[10px]">
                      SIZE: {i.selectedSize} × {i.quantity}
                    </div>
                  </div>
                  <div className="text-[#ccff00] font-bold text-xs">
                    ${(i.product.price * i.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3 space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>CARBON SHIPPING:</span>
                <span className="text-[#ccff00]">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>TOTAL:</span>
                <span className="text-[#ccff00]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
