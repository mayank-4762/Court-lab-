import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Zap, Sliders, Check, Plus, ChevronRight, Activity, Award } from 'lucide-react';
import { Product, SpecSheet, PageView } from '../types';
import { ProductViewer3D } from './3d/ProductViewer3D';
import { PRODUCTS } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, colorHex: string, qty?: number) => void;
  onAddBundleToCart: (primaryProduct: Product, primarySize: string, secondaryProduct: Product) => void;
  onOpenCalibrator: () => void;
  onNavigate: (page: PageView) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onAddBundleToCart,
  onOpenCalibrator,
  onNavigate,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', hex: '#0a0a0c' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'gallery'>('3d');

  // Find paired product for "Complete the Kit"
  const pairedProduct = PRODUCTS.find((p) => p.id === product.pairedProductId) || PRODUCTS[1];

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor.hex, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleAddBundle = () => {
    if (pairedProduct) {
      onAddBundleToCart(product, selectedSize, pairedProduct);
      setBundleAdded(true);
      setTimeout(() => setBundleAdded(false), 2500);
    }
  };

  return (
    <div className="py-12 bg-[#08080a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#ccff00] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO COLLECTION CATALOG</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive 3D Model & Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs mb-2">
              <button
                onClick={() => setActiveTab('3d')}
                className={`px-4 py-2 rounded-xl border transition-all ${
                  activeTab === '3d'
                    ? 'bg-[#ccff00] text-black font-extrabold border-[#ccff00]'
                    : 'bg-[#0d0e12] text-slate-400 border-white/10'
                }`}
              >
                360° INTERACTIVE 3D INSPECTOR
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-2 rounded-xl border transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-[#ccff00] text-black font-extrabold border-[#ccff00]'
                    : 'bg-[#0d0e12] text-slate-400 border-white/10'
                }`}
              >
                HIGH-RES LAB PHOTOS
              </button>
            </div>

            {activeTab === '3d' ? (
              <ProductViewer3D
                product={product}
                selectedColorHex={selectedColor.hex}
                className="w-full min-h-[440px]"
              />
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {product.images.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full rounded-2xl border border-white/10 object-cover max-h-[480px]"
                  />
                ))}
              </div>
            )}

            {/* The Spec Sheet Technical Table */}
            <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#ccff00]" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    THE SPEC SHEET (LAB MEASUREMENTS)
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded border border-[#ccff00]/30">
                  VERIFIED BY WIND TUNNEL
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px]">BREATHABILITY RATING</div>
                  <div className="text-[#ccff00] font-extrabold text-base mt-1">
                    {product.specSheet.breathabilityRating}
                  </div>
                </div>

                <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px]">ELASTICITY COEFFICIENT</div>
                  <div className="text-white font-extrabold text-base mt-1">
                    {product.specSheet.elasticityCoefficient}
                  </div>
                </div>

                <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px]">GARMENT WEIGHT</div>
                  <div className="text-white font-extrabold text-base mt-1">
                    {product.specSheet.weightGrams}g
                  </div>
                </div>

                <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px]">AIRFLOW DRAG COEFF</div>
                  <div className="text-[#ccff00] font-extrabold text-base mt-1">
                    {product.specSheet.airflowDragCoeff}
                  </div>
                </div>

                <div className="bg-black/50 p-3 rounded-xl border border-white/5 col-span-2 sm:col-span-2">
                  <div className="text-slate-400 text-[10px]">FABRIC BLEND COMPOSITION</div>
                  <div className="text-slate-200 text-xs mt-1">
                    {product.specSheet.fabricComposition}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Buying Options & "Complete the Kit" Upsell */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] mb-2">
                <span>{product.collection}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#ccff00]" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} Court Field Reviews)</span>
                </div>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
                {product.name}
              </h1>
              <p className="font-mono text-sm text-slate-400 mt-1">{product.subtitle}</p>

              <div className="mt-4 font-mono flex items-baseline gap-3">
                <span className="font-black text-3xl text-white">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="bg-[#ccff00]/20 text-[#ccff00] text-xs font-bold px-2.5 py-1 rounded border border-[#ccff00]/40">
                  IN STOCK // READY TO SHIP
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{product.longDescription}</p>

            {/* Color Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">COLORWAY:</span>
                <span className="text-white font-bold">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor.name === c.name
                        ? 'border-[#ccff00] scale-110 shadow-kinetic-glow'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">SELECT SIZE:</span>
                <button
                  onClick={onOpenCalibrator}
                  className="text-[#ccff00] underline hover:text-white flex items-center gap-1"
                >
                  <Sliders className="w-3 h-3" />
                  CALIBRATE MY FIT
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 font-mono text-xs">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 rounded-xl border text-center font-bold transition-all ${
                      selectedSize === s
                        ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-kinetic-glow'
                        : 'bg-[#0d0e12] text-slate-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Primary Add To Cart Button */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center bg-[#0d0e12] border border-white/15 rounded-xl px-3 py-3 font-mono text-sm text-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 hover:text-[#ccff00]"
                >
                  -
                </button>
                <span className="px-4 font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 hover:text-[#ccff00]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#ccff00] hover:bg-[#b8e600] text-black py-4 rounded-xl font-mono text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-kinetic-glow hover:scale-[1.01]"
              >
                {addedToast ? (
                  <>
                    <Check className="w-5 h-5" />
                    ADDED TO LAB CART!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 fill-black" />
                    ADD TO LAB CART — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            {/* UP SELLING FEATURE: "COMPLETE THE KIT" WIDGET */}
            {pairedProduct && (
              <div className="bg-[#0d0e12] border-2 border-[#ccff00]/50 rounded-2xl p-5 shadow-kinetic-glow space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#ccff00]" />
                    <span className="font-mono text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                      COMPLETE THE KIT & SAVE 15%
                    </span>
                  </div>
                  <span className="bg-[#ccff00] text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                    BUNDLE DEAL
                  </span>
                </div>

                <div className="flex items-center gap-4 bg-black/60 p-3 rounded-xl border border-white/10">
                  <img
                    src={pairedProduct.images[0]}
                    alt={pairedProduct.name}
                    className="w-16 h-16 rounded-lg object-cover border border-white/10"
                  />
                  <div className="flex-1 font-mono text-xs">
                    <div className="text-white font-bold">{pairedProduct.name}</div>
                    <div className="text-slate-400 text-[11px]">{pairedProduct.subtitle}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[#ccff00] font-bold">
                        ${(pairedProduct.price * 0.85).toFixed(2)}
                      </span>
                      <span className="text-slate-500 line-through text-[10px]">
                        ${pairedProduct.price}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="w-full bg-white/10 hover:bg-[#ccff00] hover:text-black text-white font-mono text-xs font-bold py-3 rounded-xl transition-colors border border-white/20 flex items-center justify-center gap-2"
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      BUNDLE ADDED TO CART!
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      ADD BOTH TO KIT (SAVE ${(pairedProduct.price * 0.15).toFixed(2)})
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Risk-Free Guarantee */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2 text-[#ccff00]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold">THE 30-DAY COURT TEST GUARANTEE</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Play in it, sweat in it for 30 days on the court. If it doesn't improve your agility or game comfort, return it for a 100% refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
