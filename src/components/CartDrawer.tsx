import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CartItem, PageView } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-[#0d0e12] border-l border-white/10 h-full flex flex-col justify-between p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ccff00]" />
            <h2 className="font-display font-extrabold text-lg text-white">
              THE LAB CART
            </h2>
            <span className="font-mono text-xs bg-[#ccff00]/20 text-[#ccff00] px-2 py-0.5 rounded font-bold">
              ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar Header */}
        <div className="py-3 font-mono text-[11px] text-slate-400 border-b border-white/5 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span>CARBON-NEUTRAL FREE SHIPPING</span>
            <span className="text-[#ccff00] font-bold">
              {subtotal >= freeShippingThreshold
                ? 'QUALIFIED!'
                : `$${(freeShippingThreshold - subtotal).toFixed(2)} AWAY`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ccff00] rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-3 font-mono">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-xs">YOUR LAB CART IS EMPTY</p>
              <button
                onClick={onClose}
                className="bg-[#ccff00] text-black font-bold text-xs px-4 py-2 rounded-xl"
              >
                BROWSE COLLECTION
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-black/50 border border-white/10 p-3.5 rounded-2xl flex gap-3 items-center"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-white/10"
                />

                <div className="flex-1 font-mono text-xs">
                  <div className="text-white font-bold">{item.product.name}</div>
                  <div className="text-slate-400 text-[11px] flex gap-2 mt-0.5">
                    <span>SIZE: {item.selectedSize}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      COLOR:
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-white/30"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                    </span>
                  </div>
                  <div className="text-[#ccff00] font-extrabold mt-1">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Buttons */}
                <div className="flex flex-col items-end gap-2 font-mono text-xs">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-white/20 rounded-lg px-2 py-0.5 bg-black">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-1 text-slate-300 hover:text-[#ccff00]"
                    >
                      -
                    </button>
                    <span className="px-2 font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-1 text-slate-300 hover:text-[#ccff00]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-4 font-mono">
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING:</span>
                <span className="text-[#ccff00]">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$12.00'}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-white/10 text-white font-extrabold">
                <span>ESTIMATED TOTAL:</span>
                <span className="text-[#ccff00]">
                  $
                  {(
                    subtotal + (subtotal >= freeShippingThreshold ? 0 : 12)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-kinetic-glow transition-all"
            >
              <span>PROCEED TO DEPLOYMENT (CHECKOUT)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
