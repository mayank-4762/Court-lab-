import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowUpRight, Tag, Star, Sparkles, Filter, Sliders } from 'lucide-react';
import { PageView, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { Logo } from './Logo';

interface NavbarProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCalibrator: () => void;
  onOpenScience: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenCalibrator,
  onOpenScience,
  onSelectProduct,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Cmd/Ctrl + K) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Focus input on open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
      setSelectedCategory('all');
    }
  }, [searchOpen]);

  // Filter products by name, category, subtitle, collection or tags
  const filteredProducts = PRODUCTS.filter((product) => {
    const q = searchQuery.toLowerCase().trim();

    // Category filter tab
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'men' && product.category !== 'men') return false;
      if (selectedCategory === 'women' && product.category !== 'women') return false;
      if (selectedCategory === 'accessories' && product.category !== 'accessories') return false;
    }

    if (!q) return true;

    const matchesName = product.name.toLowerCase().includes(q);
    const matchesCategory = product.category.toLowerCase().includes(q);
    const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
    const matchesCollection = product.collection.toLowerCase().includes(q);
    const matchesTags = product.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesName || matchesCategory || matchesSubtitle || matchesCollection || matchesTags;
  });

  const handleProductClick = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      onNavigate('product-detail');
    }
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0c0e]/95 backdrop-blur-xl border-b border-white/10">
      {/* Top Refined Announcement Bar */}
      <div className="bg-[#14161c] text-zinc-300 py-1.5 px-4 text-[11px] font-mono font-medium tracking-widest uppercase flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2 mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>COMPLIMENTARY EXPRESS SHIPPING OVER $150 &bull; 30-DAY COURT TEST GUARANTEE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="group shrink-0 text-left focus:outline-none"
            aria-label="Court Lab Home"
          >
            <Logo size="md" variant="horizontal" showTagline={true} />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-6 lg:gap-8 text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors hover:text-white py-1 ${
                activePage === 'home' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-400'
              }`}
            >
              Collection
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`transition-colors hover:text-white py-1 ${
                activePage === 'catalog' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-400'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => onNavigate('anatomy')}
              className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 ${
                activePage === 'anatomy' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-400'
              }`}
            >
              Anatomy 3D
            </button>
            <button
              onClick={() => onNavigate('shopify')}
              className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 ${
                activePage === 'shopify' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Shopify Store
            </button>
            <button
              onClick={() => onNavigate('order-tracking')}
              className={`transition-colors hover:text-white py-1 ${
                activePage === 'order-tracking' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-400'
              }`}
            >
              Track Order
            </button>
            <button
              onClick={() => onNavigate('order-history')}
              className={`transition-colors hover:text-white py-1 ${
                activePage === 'order-history' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-400'
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`transition-colors hover:text-white py-1 ${
                activePage === 'contact' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-400'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`transition-colors hover:text-white py-1 ${
                activePage === 'about' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-400'
              }`}
            >
              Mission
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Quick Search Header Component */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-[#14161f] border border-white/15 hover:border-[#ccff00]/50 text-zinc-300 p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-mono transition-all hover:bg-white/5"
              title="Search Catalog (⌘K)"
            >
              <Search className="w-4 h-4 text-[#ccff00] shrink-0" />
              <span className="hidden sm:inline text-zinc-400">Search products...</span>
              <kbd className="hidden md:inline-block bg-white/10 border border-white/15 px-1.5 py-0.5 rounded text-[10px] text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-[#ccff00] text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-black shrink-0" />
              <span className="hidden sm:inline">BAG</span>
              {cartCount > 0 && (
                <span className="bg-black text-white font-black w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle - Prominent 3-line icon button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2.5 bg-white/10 hover:bg-white/20 active:bg-[#ccff00] active:text-black border border-white/20 rounded-xl text-white transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
              aria-label="Toggle navigation menu"
              title="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d12]/98 backdrop-blur-2xl border-b border-white/15 px-5 py-6 space-y-3 font-mono text-xs uppercase tracking-wider text-zinc-300 shadow-2xl animate-fade-in">
          {/* Quick Search & Tools Bar in Mobile Menu */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-[#181a24] hover:bg-[#202330] border border-white/15 p-2.5 rounded-xl text-zinc-200 text-xs font-bold transition-all"
            >
              <Search className="w-4 h-4 text-[#ccff00]" />
              <span>SEARCH</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalibrator();
              }}
              className="flex items-center justify-center gap-2 bg-[#181a24] hover:bg-[#202330] border border-white/15 p-2.5 rounded-xl text-[#ccff00] text-xs font-bold transition-all"
            >
              <Sliders className="w-4 h-4" />
              <span>FIT FITTER</span>
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                activePage === 'home'
                  ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/15'
                  : 'bg-white/5 text-zinc-200 hover:bg-white/10'
              }`}
            >
              <span>FEATURED COLLECTION</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                onNavigate('catalog');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                activePage === 'catalog'
                  ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/15'
                  : 'bg-white/5 text-zinc-200 hover:bg-white/10'
              }`}
            >
              <span>SHOP ALL CATALOG</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                onNavigate('anatomy');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                activePage === 'anatomy' ? 'bg-[#ccff00] text-black' : 'bg-white/5 text-zinc-200 hover:bg-white/10'
              }`}
            >
              <span>ANATOMY 3D EXPLORER</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                onNavigate('shopify');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                activePage === 'shopify'
                  ? 'bg-[#ccff00] text-black'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SHOPIFY STOREFRONT
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                onNavigate('order-tracking');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                activePage === 'order-tracking'
                  ? 'bg-[#ccff00] text-black'
                  : 'bg-white/5 text-zinc-200 hover:bg-white/10'
              }`}
            >
              <span>TRACK ORDER</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                onNavigate('order-history');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                activePage === 'order-history'
                  ? 'bg-[#ccff00] text-black'
                  : 'bg-white/5 text-zinc-200 hover:bg-white/10'
              }`}
            >
              <span>ORDER HISTORY & LOGS</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>

            <div className="grid grid-cols-3 gap-1.5 pt-2">
              <button
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="bg-white/5 hover:bg-white/10 text-zinc-300 py-2.5 px-2 rounded-xl text-center text-[10px] font-bold"
              >
                CONTACT
              </button>
              <button
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className="bg-white/5 hover:bg-white/10 text-zinc-300 py-2.5 px-2 rounded-xl text-center text-[10px] font-bold"
              >
                MISSION
              </button>
              <button
                onClick={() => {
                  onNavigate('policies');
                  setMobileMenuOpen(false);
                }}
                className="bg-white/5 hover:bg-white/10 text-zinc-300 py-2.5 px-2 rounded-xl text-center text-[10px] font-bold"
              >
                POLICIES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Dropdown Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-12 sm:pt-20 px-4">
          <div className="bg-[#121318] border border-white/20 rounded-2xl p-5 sm:p-6 w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
            {/* Close Button */}
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Title */}
            <div className="flex items-center gap-2 mb-3 font-mono text-xs text-zinc-400 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>SEARCH COURT LAB CATALOG & TECH</span>
            </div>

            {/* Search Input Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#ccff00]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tees, shorts, carbon paddles, compression..."
                className="w-full bg-[#0a0b0e] border border-white/20 rounded-xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] font-mono transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10 overflow-x-auto text-xs font-mono scrollbar-none">
              <span className="text-zinc-500 text-[10px] uppercase font-bold flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-[#ccff00]" />
                CATEGORY:
              </span>
              {[
                { id: 'all', label: 'ALL PRODUCTS' },
                { id: 'men', label: "MEN'S APPAREL" },
                { id: 'women', label: "WOMEN'S APPAREL" },
                { id: 'accessories', label: 'PADDLES & GEAR' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-bold ${
                    selectedCategory === cat.id
                      ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/15'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Results Dropdown List */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-2.5">
              {filteredProducts.length > 0 ? (
                <>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-1">
                    <span>
                      MATCHING LAB ITEMS ({filteredProducts.length})
                    </span>
                    <span className="text-[#ccff00] text-[10px]">CLICK TO INSPECT</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="group flex items-center gap-4 bg-[#181a22] hover:bg-[#20232e] border border-white/10 hover:border-[#ccff00]/50 p-3 rounded-xl cursor-pointer transition-all shadow-md"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.badge && (
                            <span className="absolute top-0 left-0 bg-[#ccff00] text-black text-[8px] font-mono font-black px-1 py-0.5 uppercase">
                              {product.badge.split(' ')[0]}
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-[#ccff00] uppercase font-bold bg-[#ccff00]/10 px-2 py-0.5 rounded border border-[#ccff00]/20">
                              {product.category}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400 truncate">
                              {product.collection}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors truncate font-sans">
                            {product.name}
                          </h4>
                          <p className="text-xs text-zinc-400 truncate font-sans">
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="text-right shrink-0 font-mono">
                          <div className="flex items-center justify-end gap-1.5">
                            {product.originalPrice && (
                              <span className="text-xs text-zinc-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                            <span className="text-sm font-extrabold text-white">
                              ${product.price}
                            </span>
                          </div>
                          <div className="flex items-center justify-end gap-1 text-[10px] text-amber-400 mt-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{product.rating}</span>
                          </div>
                        </div>

                        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ccff00] transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-12 text-center space-y-3 font-mono">
                  <p className="text-sm text-zinc-400">
                    No products matching "<span className="text-white">{searchQuery}</span>"
                  </p>
                  <p className="text-xs text-zinc-500">
                    Try searching for <span className="text-[#ccff00]">"tee"</span>, <span className="text-[#ccff00]">"shorts"</span>, or <span className="text-[#ccff00]">"paddle"</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    Reset Search Query
                  </button>
                </div>
              )}
            </div>

            {/* Popular Searches Bar */}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
              <span className="text-zinc-500 uppercase text-[10px] font-bold">SUGGESTED:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Pro-Elite Court Tee', 'Apex Compression Short', 'Carbon Paddle T700', 'Kinetic Aero Tank'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setSelectedCategory('all');
                      }}
                      className="bg-white/5 hover:bg-[#ccff00] hover:text-black border border-white/10 px-2.5 py-1 rounded-md text-zinc-300 transition-colors text-[10px]"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

