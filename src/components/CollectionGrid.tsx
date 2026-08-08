import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Zap, Search, X, Check, ArrowUpDown } from 'lucide-react';
import { Product, Category, PageView } from '../types';
import { PRODUCTS } from '../data/products';

interface CollectionGridProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, colorHex: string) => void;
  onNavigate: (page: PageView) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  onSelectProduct,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, string>>({});
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Filter products by category & search query
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    const matchesName = p.name.toLowerCase().includes(q);
    const matchesDesc = p.description.toLowerCase().includes(q);
    const matchesCategory = p.category.toLowerCase().includes(q);
    const matchesCollection = p.collection.toLowerCase().includes(q);
    const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));

    return matchesName || matchesDesc || matchesCategory || matchesCollection || matchesTags;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0; // featured default
  });

  const handleQuickAdd = (p: Product) => {
    const color = selectedColorMap[p.id] || p.colors[0]?.hex || '#0a0a0c';
    const size = p.sizes[0] || 'M';
    onAddToCart(p, size, color);
    setAddedToast(p.id);
    setTimeout(() => setAddedToast(null), 2000);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="collection-grid" className="py-20 bg-[#0b0c0e] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-6 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#14161c] border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-zinc-300 uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>LAB-CALIBRATED APPAREL & GEAR</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              THE COLLECTION
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === 'all'
                  ? 'border-[#ccff00] bg-[#ccff00] text-black font-bold'
                  : 'border-white/10 bg-[#121318] text-zinc-400 hover:text-white'
              }`}
            >
              ALL GEAR ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('men')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === 'men'
                  ? 'border-[#ccff00] bg-[#ccff00] text-black font-bold'
                  : 'border-white/10 bg-[#121318] text-zinc-400 hover:text-white'
              }`}
            >
              MEN
            </button>
            <button
              onClick={() => setSelectedCategory('women')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === 'women'
                  ? 'border-[#ccff00] bg-[#ccff00] text-black font-bold'
                  : 'border-white/10 bg-[#121318] text-zinc-400 hover:text-white'
              }`}
            >
              WOMEN
            </button>
            <button
              onClick={() => setSelectedCategory('accessories')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === 'accessories'
                  ? 'border-[#ccff00] bg-[#ccff00] text-black font-bold'
                  : 'border-white/10 bg-[#121318] text-zinc-400 hover:text-white'
              }`}
            >
              ACCESSORIES & PADDLES
            </button>
          </div>
        </div>

        {/* Toolbar: Real-time Search Input & Sorting Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-[#121318] border border-white/10 p-4 rounded-2xl font-mono text-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter products by name, tech or tag..."
              className="w-full bg-[#0b0c0e] border border-white/15 focus:border-[#ccff00] text-white text-xs pl-10 pr-9 py-2.5 rounded-xl outline-none placeholder:text-zinc-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                title="Clear filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown & Product Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-4 text-zinc-300 shrink-0">
            <span className="text-[11px] text-zinc-400 uppercase">
              SHOWING <strong className="text-white">{sortedProducts.length}</strong> OF {PRODUCTS.length}
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#ccff00]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#0b0c0e] border border-white/15 text-white text-xs px-3 py-2 rounded-xl outline-none cursor-pointer focus:border-[#ccff00]"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => {
              const activeColorHex =
                selectedColorMap[product.id] || product.colors[0]?.hex || '#0a0a0c';

              return (
                <div
                  key={product.id}
                  className="group bg-[#121318] border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-card-elevated"
                >
                  {/* Top Image Box */}
                  <div
                    className="relative aspect-[4/3] bg-[#0b0c0e] overflow-hidden cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={`Court Lab ${product.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-white text-black font-mono text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-sm">
                        {product.badge}
                      </div>
                    )}

                    {/* Quick Inspect Hover Prompt */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      INSPECT
                    </div>

                    {/* Tech Specs Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg flex items-center justify-between text-[11px] font-mono text-zinc-300 uppercase">
                      <span>DRAG: {product.specSheet.airflowDragCoeff}</span>
                      <span className="text-emerald-400">
                        TEMP: {product.specSheet.thermalDissipation}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
                        <span>{product.collection}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold text-white">{product.rating}</span>
                          <span className="text-zinc-500">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-display font-extrabold text-xl text-white group-hover:text-zinc-200 transition-colors cursor-pointer uppercase tracking-tight"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Swatches & Price */}
                    <div className="space-y-4 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        {/* Color swatches */}
                        <div className="flex items-center gap-2">
                          {product.colors.map((c) => (
                            <button
                              key={c.name}
                              onClick={() =>
                                setSelectedColorMap({
                                  ...selectedColorMap,
                                  [product.id]: c.hex,
                                })
                              }
                              className={`w-4 h-4 rounded-full border transition-all ${
                                activeColorHex === c.hex
                                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121318] scale-110'
                                  : 'border-white/20'
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>

                        {/* Pricing */}
                        <div className="font-mono text-right">
                          {product.originalPrice && (
                            <span className="text-xs text-zinc-500 line-through mr-2">
                              ${product.originalPrice}
                            </span>
                          )}
                          <span className="font-black text-xl text-white">
                            ${product.price}
                          </span>
                        </div>
                      </div>

                      {/* Single Streamlined Action Button */}
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="w-full bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        {addedToast === product.id ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>ADDED TO BAG</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>ADD TO BAG</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#121318] border border-white/10 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto font-mono">
            <Search className="w-8 h-8 text-zinc-500 mx-auto" />
            <h3 className="text-lg font-bold text-white uppercase">NO MATCHING PRODUCTS FOUND</h3>
            <p className="text-xs text-zinc-400">
              We couldn't find any items matching <span className="text-white font-bold">"{searchQuery}"</span> in category{' '}
              <span className="text-white font-bold">{selectedCategory.toUpperCase()}</span>.
            </p>
            <button
              onClick={clearFilters}
              className="bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold px-6 py-2.5 rounded-xl uppercase transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

