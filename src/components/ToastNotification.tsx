import React, { useEffect, useState } from 'react';
import { ShoppingBag, Check, X, ArrowRight, Sparkles, Sliders, AlertCircle } from 'lucide-react';
import { Product } from '../types';

export interface ToastItem {
  id: string;
  type?: 'cart' | 'success' | 'info' | 'warning';
  title: string;
  message?: string;
  product?: Product;
  selectedSize?: string;
  selectedColorHex?: string;
  selectedColorName?: string;
  quantity?: number;
  duration?: number; // duration in ms, default 4500
  onViewCart?: () => void;
  onCheckout?: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

interface ToastNotificationProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  onOpenCart?: () => void;
  onNavigateCheckout?: () => void;
}

export const ToastNotificationContainer: React.FC<ToastNotificationProps> = ({
  toasts,
  onDismiss,
  onOpenCart,
  onNavigateCheckout,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] flex flex-col gap-3 max-w-sm w-[calc(100vw-2rem)] pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastCard
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast.id)}
          onOpenCart={onOpenCart}
          onNavigateCheckout={onNavigateCheckout}
        />
      ))}
    </div>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: () => void;
  onOpenCart?: () => void;
  onNavigateCheckout?: () => void;
}

const ToastCard: React.FC<ToastCardProps> = ({
  toast,
  onDismiss,
  onOpenCart,
  onNavigateCheckout,
}) => {
  const duration = toast.duration || 4500;
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          onDismiss();
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, isHovered, onDismiss]);

  const handleViewBagClick = () => {
    if (toast.onViewCart) {
      toast.onViewCart();
    } else if (onOpenCart) {
      onOpenCart();
    }
    onDismiss();
  };

  const handleCheckoutClick = () => {
    if (toast.onCheckout) {
      toast.onCheckout();
    } else if (onNavigateCheckout) {
      onNavigateCheckout();
    }
    onDismiss();
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="pointer-events-auto bg-[#0f1017]/95 backdrop-blur-xl border border-[#ccff00]/40 rounded-2xl shadow-2xl p-4 text-white relative overflow-hidden transform transition-all duration-300 animate-slide-in-right shadow-[#ccff00]/10"
    >
      {/* Toast Content */}
      <div className="flex items-start gap-3.5">
        {/* Toast Type Icon / Product Thumbnail */}
        {toast.type === 'cart' && toast.product ? (
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-white/20 shadow-md">
            <img
              src={toast.product.images[0]}
              alt={toast.product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 right-0 bg-[#ccff00] text-black p-0.5 rounded-bl">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center shrink-0 text-[#ccff00]">
            {toast.type === 'success' ? (
              <Check className="w-5 h-5 stroke-[2.5]" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-400" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </div>
        )}

        {/* Text details */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            <h4 className="font-mono text-xs font-black uppercase text-[#ccff00] tracking-wider">
              {toast.title}
            </h4>
          </div>

          {toast.product ? (
            <div className="space-y-1">
              <p className="font-sans font-bold text-sm text-white truncate leading-snug">
                {toast.product.name}
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-zinc-300">
                {toast.selectedSize && (
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-200 border border-white/15">
                    SIZE: {toast.selectedSize}
                  </span>
                )}
                {toast.selectedColorHex && (
                  <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-200 border border-white/15">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/30"
                      style={{ backgroundColor: toast.selectedColorHex }}
                    />
                    {toast.selectedColorName || 'Color'}
                  </span>
                )}
                {toast.quantity && toast.quantity > 1 && (
                  <span className="text-[#ccff00] font-bold">
                    QTY: {toast.quantity}
                  </span>
                )}
                {toast.product.price && (
                  <span className="font-extrabold text-white ml-auto">
                    ${toast.product.price * (toast.quantity || 1)}
                  </span>
                )}
              </div>
            </div>
          ) : (
            toast.message && (
              <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                {toast.message}
              </p>
            )
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Action Buttons for Cart Toasts */}
      {toast.type === 'cart' && (
        <div className="mt-3.5 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
          <button
            onClick={handleViewBagClick}
            className="w-full bg-[#1e202c] hover:bg-[#282b3a] text-white font-mono text-[11px] font-extrabold py-2 px-3 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-white/15 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>VIEW BAG</span>
          </button>
          <button
            onClick={handleCheckoutClick}
            className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-[11px] font-black py-2 px-3 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#ccff00]/20"
          >
            <span>CHECKOUT</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      )}

      {/* Custom Action Button if present */}
      {toast.type !== 'cart' && toast.onAction && toast.actionLabel && (
        <div className="mt-3 pt-2.5 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              toast.onAction!();
              onDismiss();
            }}
            className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-bold px-3 py-1.5 rounded-lg uppercase transition-colors"
          >
            {toast.actionLabel}
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-[#ccff00] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
