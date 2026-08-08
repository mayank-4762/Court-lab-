import React, { useState } from 'react';
import { ShoppingBag, Store, Check, Star, ShieldCheck, ArrowRight, Globe, Lock } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const ShopifyStorefrontSection: React.FC = () => {
  const product = PRODUCTS.find((p) => p.id === 'dink-addict-graphic-tee') || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('L');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="py-12 bg-[#08080a] min-h-screen text-zinc-100 font-sans border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Shopify Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ccff00] text-black font-black flex items-center justify-center text-sm">
              S
            </div>
            <div>
              <span className="text-white font-bold block uppercase tracking-wider">OFFICIAL SHOPIFY HEADLESS STOREFRONT</span>
              <span className="text-zinc-500 text-[11px]">Domain: 2.myshopify.com &bull; GraphQL Powered</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#121318] border border-white/10 px-3 py-1.5 rounded-full text-zinc-300">
            <Globe className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>US $ &bull; EN</span>
          </div>
        </div>

        {/* Main Product Spotlight Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Product Gallery (Left Column) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square bg-[#121318] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#ccff00] text-black font-mono text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider shadow-lg">
                COMMUNITY FAVORITE
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square bg-[#121318] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-[#ccff00] ring-2 ring-[#ccff00]/30 scale-[1.02]'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Buying Details (Right Column) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="font-mono text-xs text-[#ccff00] uppercase tracking-widest mb-1 font-bold">
                {product.collection}
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-3 font-mono">
                <span className="text-2xl font-black text-white">${product.price.toFixed(2)}</span>
                <span className="text-sm text-zinc-500 line-through">${product.originalPrice?.toFixed(2)}</span>
                <span className="bg-[#ccff00]/10 text-[#ccff00] text-[10px] font-bold px-2.5 py-1 rounded border border-[#ccff00]/30 uppercase">
                  SAVE 20% TODAY
                </span>
              </div>
            </div>

            {/* Colorway Selection */}
            <div className="space-y-2.5 font-mono text-xs">
              <label className="text-zinc-400 uppercase block font-bold">
                COLORWAY: <span className="text-white">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-offset-2 ring-offset-black ring-[#ccff00] scale-110'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.name === c.name && (
                      <Check className={`w-4 h-4 ${c.hex === '#f8fafc' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2.5 font-mono text-xs">
              <label className="text-zinc-400 uppercase block font-bold">
                SELECT SIZE: <span className="text-white">{selectedSize}</span>
              </label>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-xl font-bold uppercase transition-all ${
                      selectedSize === sz
                        ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20'
                        : 'bg-[#121318] text-zinc-300 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Buying Action Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.99] text-black font-extrabold text-sm py-4 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 text-black" />
                  <span>ADDED TO SHOPIFY CART!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 fill-black" />
                  <span>ADD TO CART &bull; ${product.price.toFixed(2)}</span>
                </>
              )}
            </button>

            {/* Detailed Description Paragraphs */}
            <div className="space-y-4 text-zinc-300 text-sm leading-relaxed border-t border-white/10 pt-6">
              <p>{product.description}</p>
              <p>{product.longDescription}</p>
            </div>

            {/* Product Features List */}
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
              <h3 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                <span>PRODUCT FEATURES</span>
              </h3>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#ccff00] font-bold">&bull;</span>
                  <span>100% ring-spun cotton (lightweight 153 g/m²) for a soft, breathable feel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ccff00] font-bold">&bull;</span>
                  <span>Tubular knit construction — no side seams for cleaner lines and less fabric waste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ccff00] font-bold">&bull;</span>
                  <span>Ribbed collar with shoulder tape for shape retention and improved durability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ccff00] font-bold">&bull;</span>
                  <span>Pearlized tear-away label for comfort; OEKO-TEX® STANDARD 100 certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ccff00] font-bold">&bull;</span>
                  <span>DTG/DTF-friendly smooth surface that holds bright prints and sleeve/neck print options</span>
                </li>
              </ul>
            </div>

            {/* Care Instructions & Specs */}
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
              <h3 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                CARE INSTRUCTIONS &amp; COMPLIANCE
              </h3>
              <div className="space-y-2 text-zinc-300">
                <p><strong>Care:</strong> Machine wash cold (max 30C or 90F), with similar colors &bull; Do not bleach &bull; Tumble dry low heat &bull; Iron/steam low heat &bull; Do not dryclean</p>
                <p><strong>Product Info:</strong> Gildan 64000, 2 year warranty in EU and Northern Ireland as per Directive 1999/44/EC</p>
                <p><strong>Warnings/Hazard:</strong> For adults, Made in Bangladesh</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bar matching the screenshot */}
        <div className="border-t border-white/10 pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Court-lab-/main</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-md text-zinc-300">🇺🇸 US $</span>
            <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-md text-zinc-300">🌐 EN</span>
            <button className="text-[#ccff00] hover:underline font-bold">Edit theme</button>
          </div>
        </div>

      </div>
    </section>
  );
};


