import React, { useState } from 'react';
import { ShoppingBag, Store } from 'lucide-react';

export const ShopifyStorefrontSection: React.FC = () => {
  const [storeDomain] = useState('mock.shop');
  const [activeCollection, setActiveCollection] = useState('unisex');

  const handleOpenCart = () => {
    const cartEl = document.getElementById('main-shopify-cart') as any;
    if (cartEl && typeof cartEl.showModal === 'function') {
      cartEl.showModal();
    }
  };

  return (
    <section className="py-16 bg-[#08090c] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#14161c] border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-300 uppercase tracking-widest mb-3">
              <Store className="w-3.5 h-3.5 text-emerald-400" />
              <span>SHOPIFY STOREFRONT WEB COMPONENTS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              LIVE HEADLESS STOREFRONT
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              Powered by Shopify Storefront Web Components &amp; GraphQL Engine.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCart}
              className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase transition-all shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>OPEN SHOPIFY CART</span>
            </button>
          </div>
        </div>

        {/* Live Shopify Web Components Wrapper */}
        <shopify-store
          store-domain={storeDomain}
          country="US"
          language="en"
        >
          {/* Featured Product Single Card */}
          <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 shadow-card-elevated">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span className="text-emerald-400 font-bold">&bull; FEATURED EMBEDDED SHOPIFY ITEM</span>
              <span>HANDLE: hoodie</span>
            </div>

            <shopify-context
              type="product"
              handle="hoodie"
              dangerouslySetInnerHTML={{
                __html: `
                  <template>
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div class="md:col-span-5 bg-[#0b0c0e] rounded-xl p-4 border border-white/5 flex items-center justify-center">
                        <shopify-media query="product.selectedOrFirstAvailableVariant.image" aspect-ratio="1/1" class="w-full max-w-sm rounded-lg overflow-hidden"></shopify-media>
                      </div>
                      <div class="md:col-span-7 space-y-4">
                        <div class="font-mono text-xs text-zinc-500 uppercase">OFFICIAL SHOPIFY CATALOG</div>
                        <h3 class="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                          <shopify-data query="product.title"></shopify-data>
                        </h3>
                        <div class="font-mono text-xl font-black text-white">
                          <shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
                        </div>

                        <div class="pt-2">
                          <label class="block font-mono text-xs text-zinc-400 mb-2 uppercase">
                            Select Variant:
                          </label>
                          <shopify-variant-selector class="shopify-variant-theme"></shopify-variant-selector>
                        </div>

                        <div class="pt-4 flex flex-col sm:flex-row gap-3">
                          <button
                            onclick="document.getElementById('main-shopify-cart').addLine(event); document.getElementById('main-shopify-cart').showModal();"
                            class="bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold py-3.5 px-8 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                          >
                            <span>ADD TO SHOPIFY CART</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </template>
                `,
              }}
            />
          </div>

          {/* Shopify Collection Context Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 uppercase">
              <span>SHOPIFY COLLECTION GRID ({activeCollection.toUpperCase()})</span>
              <div className="flex gap-2">
                {['unisex', 'sweatpants', 'puffer'].map((handle) => (
                  <button
                    key={handle}
                    onClick={() => setActiveCollection(handle)}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      activeCollection === handle
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-[#121318] text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {handle.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <shopify-context
              key={activeCollection}
              type="collection"
              handle={activeCollection}
              dangerouslySetInnerHTML={{
                __html: `
                  <template>
                    <shopify-list-context type="product" query="collection.products" first="6">
                      <template>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div class="bg-[#121318] border border-white/10 hover:border-white/30 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between shadow-card-elevated">
                            <div class="bg-[#0b0c0e] rounded-xl p-3 mb-4 overflow-hidden aspect-square flex items-center justify-center">
                              <shopify-media query="product.selectedOrFirstAvailableVariant.image" aspect-ratio="1/1" class="w-full h-full object-contain"></shopify-media>
                            </div>
                            <div class="space-y-2">
                              <h4 class="font-display font-extrabold text-lg text-white uppercase">
                                <shopify-data query="product.title"></shopify-data>
                              </h4>
                              <div class="font-mono text-base font-bold text-white">
                                <shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
                              </div>
                              <div class="pt-2">
                                <button
                                  onclick="document.getElementById('main-shopify-cart').addLine(event); document.getElementById('main-shopify-cart').showModal();"
                                  class="w-full bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                                >
                                  <span>ADD TO CART</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </shopify-list-context>
                  </template>
                `,
              }}
            />
          </div>

          {/* Shopify Cart Web Component */}
          <shopify-cart id="main-shopify-cart"></shopify-cart>
        </shopify-store>
      </div>
    </section>
  );
};

