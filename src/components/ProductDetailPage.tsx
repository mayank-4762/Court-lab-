import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  ArrowLeft,
  Star,
  ShieldCheck,
  Zap,
  Sliders,
  Check,
  Plus,
  ChevronRight,
  Activity,
  Award,
  Maximize2,
  X,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Droplets,
  Wind,
  Flame,
  RotateCcw,
  Ruler,
  Info
} from 'lucide-react';
import { Product, PageView } from '../types';
import { ProductViewer3D } from './3d/ProductViewer3D';
import { PRODUCTS } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, colorHex: string, qty?: number) => void;
  onAddBundleToCart: (primaryProduct: Product, primarySize: string, secondaryProduct: Product) => void;
  onOpenCalibrator: () => void;
  onNavigate: (page: PageView) => void;
  onSelectProduct?: (product: Product) => void;
}

interface Review {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
  playstyle: string;
  fitFeedback: string;
  likes: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    verified: true,
    rating: 5,
    date: '2 days ago',
    title: 'Absolute game changer for 3-hour kitchen battles',
    comment: 'The weightlessness and breathability are unmatched. I played a 4-hour tournament in 92°F heat and didn’t get drenched or weighed down once. The fabric stays dry and friction-free.',
    playstyle: 'Aggressive Kitchen Attacker',
    fitFeedback: 'True to Size',
    likes: 24,
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    verified: true,
    rating: 5,
    date: '1 week ago',
    title: 'Precision cut and incredible 4-way stretch',
    comment: 'Reaching for overhead slams used to cause hem pull with other brands. The Kinetic stretch cut keeps the shirt perfectly in place no matter how hard I dive or twist.',
    playstyle: 'Reset & Dinking Specialist',
    fitFeedback: 'Athletic Fitted',
    likes: 18,
  },
  {
    id: 'rev-3',
    author: 'David Chen',
    verified: true,
    rating: 5,
    date: '2 weeks ago',
    title: 'Lab quality is noticeable right out of the package',
    comment: 'You can immediately tell the difference in seam construction. Zero chafe under arms and the silver-ion anti-odor tech actually works after multiple washes.',
    playstyle: 'All-Court Power Driver',
    fitFeedback: 'True to Size',
    likes: 12,
  },
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onAddBundleToCart,
  onOpenCalibrator,
  onNavigate,
  onSelectProduct,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0] || { name: 'Obsidian Black', hex: '#0a0a0c' }
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'gallery' | '3d'>('gallery');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<'specs' | 'fit' | 'reviews' | 'care'>('specs');
  
  // Review form state
  const [reviewsList, setReviewsList] = useState<Review[]>(MOCK_REVIEWS);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    title: '',
    comment: '',
    playstyle: 'Dinking & Control',
    fitFeedback: 'True to Size',
  });

  // Reset image index when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedColor(product.colors[0] || { name: 'Default', hex: '#0a0a0c' });
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  // Find paired product for "Complete the Kit"
  const pairedProduct =
    PRODUCTS.find((p) => p.id === product.pairedProductId) ||
    PRODUCTS.find((p) => p.id !== product.id) ||
    PRODUCTS[0];

  // Related products from same collection or category
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

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

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.comment.trim()) return;

    const created: Review = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      verified: true,
      rating: newReview.rating,
      date: 'Just now',
      title: newReview.title || 'Verified Court Review',
      comment: newReview.comment,
      playstyle: newReview.playstyle,
      fitFeedback: newReview.fitFeedback,
      likes: 1,
    };

    setReviewsList([created, ...reviewsList]);
    setIsWriteReviewOpen(false);
    setNewReview({
      author: '',
      rating: 5,
      title: '',
      comment: '',
      playstyle: 'Dinking & Control',
      fitFeedback: 'True to Size',
    });
  };

  const mockupLabels = ['FRONT ATHLETIC VIEW', 'BACK PROFILE & VENTING', 'FABRIC CLOSE-UP TEXTURE', 'MODEL COURT FIT'];

  return (
    <div className="pb-24 pt-6 sm:pt-10 bg-[#08080a] min-h-screen font-sans text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb Nav Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-4 font-mono text-xs">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#ccff00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO COLLECTION CATALOG</span>
          </button>

          <div className="flex items-center gap-2 text-zinc-500 text-[11px] uppercase">
            <span>STORE</span>
            <span>/</span>
            <span className="text-zinc-400">{product.category}</span>
            <span>/</span>
            <span className="text-[#ccff00] font-bold truncate max-w-[150px] sm:max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Main 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (7 cols): High-Res Photos & 3D Interactive Viewer */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Mode Toggle Bar */}
            <div className="flex items-center justify-between gap-2 bg-[#121318] p-1.5 rounded-2xl border border-white/10 font-mono text-xs">
              <div className="flex items-center gap-1.5 flex-1">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'gallery'
                      ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>HIGH-RES LAB PHOTOS</span>
                </button>

                <button
                  onClick={() => setActiveTab('3d')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                    activeTab === '3d'
                      ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>360° 3D INSPECTOR</span>
                </button>
              </div>

              {activeTab === 'gallery' && (
                <button
                  onClick={() => setIsZoomModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl transition-all"
                  title="Expand Fullscreen Photo Inspector"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span className="text-[10px]">FULLSCREEN</span>
                </button>
              )}
            </div>

            {/* Display Box: Gallery or 3D Model */}
            {activeTab === 'gallery' ? (
              <div className="space-y-4">
                {/* Featured Main High-Res Image Box */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#0c0d12] rounded-2xl border border-white/15 overflow-hidden group shadow-2xl">
                  <img
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={`${product.name} - ${mockupLabels[selectedImageIndex] || 'Lab View'}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                    onClick={() => setIsZoomModalOpen(true)}
                  />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {product.badge && (
                      <span className="bg-[#ccff00] text-black font-mono text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <span className="bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {mockupLabels[selectedImageIndex] || `VIEW ${selectedImageIndex + 1}`}
                    </span>
                  </div>

                  {/* Expand Zoom Prompt Button */}
                  <button
                    onClick={() => setIsZoomModalOpen(true)}
                    className="absolute top-4 right-4 bg-black/80 hover:bg-[#ccff00] hover:text-black text-white p-2.5 rounded-xl border border-white/20 transition-all shadow-lg flex items-center gap-1.5 font-mono text-xs"
                    title="Click to Zoom Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span className="hidden sm:inline text-[10px] uppercase font-bold">INSPECT CLOSE-UP</span>
                  </button>

                  {/* Tech Specs Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center justify-between font-mono text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-[#ccff00]" />
                      <span>AIRFLOW DRAG: <strong>{product.specSheet.airflowDragCoeff}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Droplets className="w-4 h-4" />
                      <span>THERMAL: <strong>{product.specSheet.thermalDissipation}</strong></span>
                    </div>
                  </div>
                </div>

                {/* High-Res Image Thumbnails Strip */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-[4/3] bg-[#0c0d12] rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#ccff00] ring-2 ring-[#ccff00]/30 scale-[1.02]'
                          : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 left-1 right-1 bg-black/80 backdrop-blur-sm text-[8px] font-mono text-zinc-300 px-1 py-0.5 rounded text-center truncate uppercase">
                        {mockupLabels[idx]?.split(' ')[0] || `ANGLE ${idx + 1}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ProductViewer3D
                product={product}
                selectedColorHex={selectedColor.hex}
                className="w-full min-h-[440px]"
              />
            )}

            {/* Key Technical Features Grid */}
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#ccff00]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    ENGINEERED PERFORMANCE ADVANTAGES
                  </h3>
                </div>
                <span className="text-[10px] text-zinc-400 uppercase">COURT LAB CERTIFIED</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-[#0a0a0c] p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    <span>MOISTURE WICKING</span>
                  </div>
                  <div className="text-white font-bold text-xs">Under 1.2s Vapor Transfer</div>
                </div>

                <div className="bg-[#0a0a0c] p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                    <Wind className="w-3 h-3 text-[#ccff00]" />
                    <span>AERO VENTILATION</span>
                  </div>
                  <div className="text-[#ccff00] font-bold text-xs">Laser Spine Micro-Pores</div>
                </div>

                <div className="bg-[#0a0a0c] p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>4-WAY STRETCH</span>
                  </div>
                  <div className="text-white font-bold text-xs">{product.specSheet.elasticityCoefficient} Elastic Recovery</div>
                </div>

                <div className="bg-[#0a0a0c] p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>ANTI-ODOR TECH</span>
                  </div>
                  <div className="text-white font-bold text-xs">Silver-Ion Threading</div>
                </div>

                <div className="bg-[#0a0a0c] p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                    <Activity className="w-3 h-3 text-purple-400" />
                    <span>BONDED SEAMS</span>
                  </div>
                  <div className="text-white font-bold text-xs">Frictionless Construction</div>
                </div>

                <div className="bg-[#0a0a0c] p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#ccff00]" />
                    <span>DURABILITY INDEX</span>
                  </div>
                  <div className="text-[#ccff00] font-bold text-xs">{product.specSheet.durabilityIndex}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Buying Actions & Configuration Options */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#ccff00] uppercase font-bold tracking-wider">{product.collection}</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-zinc-400">({product.reviewsCount} Field Reviews)</span>
                </div>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                {product.name}
              </h1>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">{product.subtitle}</p>

              <div className="pt-2 font-mono flex items-baseline gap-3">
                <span className="font-black text-3xl sm:text-4xl text-white">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through font-bold">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="bg-[#ccff00]/15 text-[#ccff00] text-[10px] font-extrabold px-2.5 py-1 rounded border border-[#ccff00]/30 uppercase tracking-widest">
                  IN STOCK // READY TO SHIP
                </span>
              </div>
            </div>

            {/* Long Description Paragraphs */}
            <div className="space-y-3 text-zinc-200 text-xs sm:text-sm leading-relaxed bg-[#121318] p-5 rounded-2xl border border-white/10 font-sans">
              <p>
                Bright, casual, and quietly competitive — this lightweight tee speaks to anyone who lives for the quick point, perfect dink, or that tiny victory at the net. The bold neon "DINK" typography with a pickleball graphic feels playful and confident. It sits soft against the skin and layers easily under a hoodie or over a tank between matches. Wear it to warmups, weekend rallies, or while laughing with teammates over post-game snacks — it's the kind of shirt that announces your love for the game without shouting.
              </p>
              <p>
                The fit is classic and breathable, so it moves with you during practice and looks relaxed at the courtside café afterward. Subtle construction details keep it durable: reinforced shoulders, a resilient ribbed collar, and a smooth surface that holds bright prints well. This tee ages gently — the fabric stays comfortable wash after wash — and the stamped neck label adds to the easy, no-itch feel.
              </p>
              <p>
                If you count points the way others count steps, this tee blends athletic function with everyday wearability. It's for players who want a simple, sporty statement that's as much part of their weekend ritual as their paddle.
              </p>
            </div>

            {/* Product Features List */}
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-5 space-y-3 font-sans text-xs sm:text-sm">
              <h3 className="font-mono font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                Product features
              </h3>
              <ul className="space-y-1.5 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">&bull;</span>
                  <span>100% ring-spun cotton (lightweight 153 g/m²) for a soft, breathable feel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">&bull;</span>
                  <span>Tubular knit construction — no side seams for cleaner lines and less fabric waste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">&bull;</span>
                  <span>Ribbed collar with shoulder tape for shape retention and improved durability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">&bull;</span>
                  <span>Pearlized tear-away label for comfort; OEKO-TEX® STANDARD 100 certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">&bull;</span>
                  <span>DTG/DTF-friendly smooth surface that holds bright prints and sleeve/neck print options</span>
                </li>
              </ul>
            </div>

            {/* Care Instructions List */}
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-5 space-y-3 font-sans text-xs sm:text-sm">
              <h3 className="font-mono font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                Care instructions
              </h3>
              <ul className="space-y-1.5 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">-</span>
                  <span>Do not dryclean</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">-</span>
                  <span>Do not bleach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">-</span>
                  <span>Tumble dry: low heat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">-</span>
                  <span>Iron, steam or dry: low heat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">-</span>
                  <span>Machine wash: cold (max 30C or 90F), with similar colors</span>
                </li>
              </ul>
            </div>

            {/* Additional Mandatory Compliance Specs */}
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-5 space-y-2 font-sans text-xs text-zinc-300">
              <p>
                <strong className="text-white">Product Information:</strong> Gildan 64000, 2 year warranty in EU and Northern Ireland as per Directive 1999/44/EC
              </p>
              <p>
                <strong className="text-white">Warnings, Hazard:</strong> For adults, Made in Bangladesh
              </p>
              <p>
                <strong className="text-white">Care Instructions:</strong> Machine wash: cold (max 30C or 90F), with similar colors , Do not bleach, Tumble dry: low heat, Iron, steam or dry: low heat, Do not dryclean
              </p>
            </div>

            {/* Colorway Selection */}
            <div className="space-y-2.5 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 uppercase">COLORWAY:</span>
                <span className="text-white font-bold uppercase">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor.name === c.name
                        ? 'border-[#ccff00] ring-2 ring-[#ccff00]/40 scale-110'
                        : 'border-white/20 hover:border-white/50'
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
            <div className="space-y-2.5 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 uppercase">SELECT SIZE:</span>
                <button
                  onClick={onOpenCalibrator}
                  className="text-[#ccff00] hover:underline flex items-center gap-1 text-[11px] font-bold"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>CALIBRATE MY FIT</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 text-xs">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 rounded-xl border text-center font-bold transition-all ${
                      selectedSize === s
                        ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-md shadow-[#ccff00]/20'
                        : 'bg-[#121318] text-zinc-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Fit Note Reference */}
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 bg-white/5 p-2 rounded-lg border border-white/5">
                <Info className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                <span>Athletic tailoring. Model is 6'1" (185cm), 180 lbs, wearing Size L.</span>
              </div>
            </div>

            {/* Quantity & Primary Purchase Button */}
            <div className="flex items-center gap-3 pt-2 font-mono">
              <div className="flex items-center bg-[#121318] border border-white/15 rounded-xl px-3 py-3 text-sm text-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-zinc-400 hover:text-[#ccff00] font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 font-bold text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-zinc-400 hover:text-[#ccff00] font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#ccff00] hover:bg-[#b8e600] text-black py-4 rounded-xl font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.01]"
              >
                {addedToast ? (
                  <>
                    <Check className="w-5 h-5 text-black" />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 fill-black" />
                    <span>ADD TO BAG — ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* UPSELLING FEATURE: "COMPLETE THE KIT & SAVE 15%" */}
            {pairedProduct && (
              <div className="bg-[#121318] border-2 border-[#ccff00]/40 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#ccff00]" />
                    <span className="font-bold text-[#ccff00] uppercase">COMPLETE THE KIT & SAVE 15%</span>
                  </div>
                  <span className="bg-[#ccff00] text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    BUNDLE DEAL
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-black/60 p-3 rounded-xl border border-white/10">
                  <img
                    src={pairedProduct.images[0]}
                    alt={pairedProduct.name}
                    className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0 font-mono text-xs">
                    <div className="text-white font-bold truncate">{pairedProduct.name}</div>
                    <div className="text-zinc-400 text-[10px] truncate">{pairedProduct.subtitle}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[#ccff00] font-bold">
                        ${(pairedProduct.price * 0.85).toFixed(2)}
                      </span>
                      <span className="text-zinc-500 line-through text-[10px]">
                        ${pairedProduct.price}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="w-full bg-white/10 hover:bg-[#ccff00] hover:text-black text-white font-mono text-xs font-bold py-3 rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>KIT ADDED TO BAG!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>ADD BOTH TO KIT (SAVE ${(pairedProduct.price * 0.15).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Risk-Free Guarantee */}
            <div className="bg-[#0c0d12] border border-white/10 rounded-xl p-4 font-mono text-xs space-y-1.5 text-zinc-300">
              <div className="flex items-center gap-2 text-[#ccff00]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold uppercase text-[11px]">THE 30-DAY COURT TEST GUARANTEE</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Play, sweat, and compete in it for 30 full days on the court. If it doesn't improve your comfort or agility, return it for a 100% full refund.
              </p>
            </div>

          </div>
        </div>

        {/* Lower Section: Tabs for Specs, Fit Guide, Verified Reviews, Care */}
        <div className="mt-16 bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
          
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none font-mono text-xs">
            <button
              onClick={() => setActiveInfoTab('specs')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
                activeInfoTab === 'specs'
                  ? 'bg-[#ccff00] text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              LAB SPEC SHEET
            </button>
            <button
              onClick={() => setActiveInfoTab('fit')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
                activeInfoTab === 'fit'
                  ? 'bg-[#ccff00] text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              SIZE & MEASUREMENT GUIDE
            </button>
            <button
              onClick={() => setActiveInfoTab('reviews')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
                activeInfoTab === 'reviews'
                  ? 'bg-[#ccff00] text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              FIELD REVIEWS ({reviewsList.length})
            </button>
            <button
              onClick={() => setActiveInfoTab('care')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
                activeInfoTab === 'care'
                  ? 'bg-[#ccff00] text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              CARE & MAINTENANCE
            </button>
          </div>

          {/* TAB 1: SPEC SHEET */}
          {activeInfoTab === 'specs' && (
            <div className="space-y-6 font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#ccff00]" />
                  <span>WIND TUNNEL VERIFIED MEASUREMENTS</span>
                </h3>
                <span className="text-xs text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 px-3 py-1 rounded-full">
                  LAB REPORT #CL-8820
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#0a0a0c] p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase">BREATHABILITY RATING</span>
                  <div className="text-2xl font-black text-[#ccff00]">{product.specSheet.breathabilityRating}</div>
                  <p className="text-zinc-400 text-[11px] font-sans">Tested across 100% humidity kitchen drills.</p>
                </div>

                <div className="bg-[#0a0a0c] p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase">ELASTICITY COEFFICIENT</span>
                  <div className="text-2xl font-black text-white">{product.specSheet.elasticityCoefficient}</div>
                  <p className="text-zinc-400 text-[11px] font-sans">Omni-directional stretch elasticity.</p>
                </div>

                <div className="bg-[#0a0a0c] p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase">GARMENT WEIGHT</span>
                  <div className="text-2xl font-black text-white">{product.specSheet.weightGrams} grams</div>
                  <p className="text-zinc-400 text-[11px] font-sans">Featherlight zero-drag construction.</p>
                </div>

                <div className="bg-[#0a0a0c] p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase">AIRFLOW DRAG COEFFICIENT</span>
                  <div className="text-2xl font-black text-[#ccff00]">{product.specSheet.airflowDragCoeff}</div>
                  <p className="text-zinc-400 text-[11px] font-sans">Aero-contoured against wind friction.</p>
                </div>

                <div className="bg-[#0a0a0c] p-4 rounded-xl border border-white/10 space-y-1 sm:col-span-2">
                  <span className="text-zinc-500 text-[10px] uppercase">FABRIC BLEND COMPOSITION</span>
                  <div className="text-sm font-bold text-white">{product.specSheet.fabricComposition}</div>
                  <p className="text-zinc-400 text-[11px] font-sans">Recycled high-tenacity yarn blended with active silver ions.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FIT & MEASUREMENTS */}
          {activeInfoTab === 'fit' && (
            <div className="space-y-6 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-[#ccff00]" />
                    <span>GARMENT MEASUREMENT TABLE</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-sans">
                    Measurements taken flat in inches. Tailored for dynamic athletic court movement.
                  </p>
                </div>

                <button
                  onClick={onOpenCalibrator}
                  className="bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold px-4 py-2.5 rounded-xl uppercase flex items-center gap-2 shrink-0 transition-all"
                >
                  <Sliders className="w-4 h-4" />
                  <span>OPEN AI FIT CALIBRATOR</span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 bg-[#0a0a0c] text-zinc-400">
                      <th className="p-3">SIZE</th>
                      <th className="p-3">CHEST (INCHES)</th>
                      <th className="p-3">BODY LENGTH (INCHES)</th>
                      <th className="p-3">SHOULDER WIDTH</th>
                      <th className="p-3">REC. PLAYER HEIGHT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-zinc-300">
                    <tr className={selectedSize === 'S' ? 'bg-[#ccff00]/10 text-white font-bold' : ''}>
                      <td className="p-3 font-bold text-[#ccff00]">SMALL (S)</td>
                      <td className="p-3">36" - 38"</td>
                      <td className="p-3">27.5"</td>
                      <td className="p-3">16.5"</td>
                      <td className="p-3">5'6" - 5'9"</td>
                    </tr>
                    <tr className={selectedSize === 'M' ? 'bg-[#ccff00]/10 text-white font-bold' : ''}>
                      <td className="p-3 font-bold text-[#ccff00]">MEDIUM (M)</td>
                      <td className="p-3">39" - 41"</td>
                      <td className="p-3">28.5"</td>
                      <td className="p-3">17.5"</td>
                      <td className="p-3">5'9" - 6'0"</td>
                    </tr>
                    <tr className={selectedSize === 'L' ? 'bg-[#ccff00]/10 text-white font-bold' : ''}>
                      <td className="p-3 font-bold text-[#ccff00]">LARGE (L)</td>
                      <td className="p-3">42" - 44"</td>
                      <td className="p-3">29.5"</td>
                      <td className="p-3">18.5"</td>
                      <td className="p-3">6'0" - 6'2"</td>
                    </tr>
                    <tr className={selectedSize === 'XL' ? 'bg-[#ccff00]/10 text-white font-bold' : ''}>
                      <td className="p-3 font-bold text-[#ccff00]">X-LARGE (XL)</td>
                      <td className="p-3">45" - 47"</td>
                      <td className="p-3">30.5"</td>
                      <td className="p-3">19.5"</td>
                      <td className="p-3">6'2" - 6'4"</td>
                    </tr>
                    <tr className={selectedSize === 'XXL' ? 'bg-[#ccff00]/10 text-white font-bold' : ''}>
                      <td className="p-3 font-bold text-[#ccff00]">XX-LARGE (XXL)</td>
                      <td className="p-3">48" - 51"</td>
                      <td className="p-3">31.5"</td>
                      <td className="p-3">20.5"</td>
                      <td className="p-3">6'4"+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FIELD REVIEWS */}
          {activeInfoTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span>VERIFIED COURT FIELD REVIEWS</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-sans">
                    Feedback from competitive pickleball players tested on indoor & outdoor courts.
                  </p>
                </div>

                <button
                  onClick={() => setIsWriteReviewOpen(true)}
                  className="bg-white/10 hover:bg-[#ccff00] hover:text-black text-white text-xs font-bold px-4 py-2.5 rounded-xl uppercase transition-all border border-white/20 flex items-center gap-2 shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>SUBMIT FIELD REPORT</span>
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="bg-[#0a0a0c] p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{rev.author}</span>
                        {rev.verified && (
                          <span className="bg-[#ccff00]/10 text-[#ccff00] text-[9px] font-bold px-2 py-0.5 rounded border border-[#ccff00]/30 uppercase">
                            VERIFIED PLAYER
                          </span>
                        )}
                      </div>
                      <span className="text-zinc-500 text-[10px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-zinc-400 text-[10px]">PLAYSTYLE: <strong className="text-zinc-200">{rev.playstyle}</strong></span>
                      <span className="text-zinc-400 text-[10px]">FIT: <strong className="text-zinc-200">{rev.fitFeedback}</strong></span>
                    </div>

                    <h4 className="font-sans font-bold text-sm text-white">{rev.title}</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CARE & MAINTENANCE */}
          {activeInfoTab === 'care' && (
            <div className="space-y-6 font-mono text-xs">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#ccff00]" />
                <span>FABRIC CARE & LONGEVITY INSTRUCTIONS</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0a0a0c] p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-[#ccff00] font-bold text-sm">1. COLD WASH ONLY</span>
                  <p className="text-zinc-400 text-[11px] font-sans">
                    Machine wash cold (30°C/86°F) with similar colors to preserve the silver-ion anti-odor structure.
                  </p>
                </div>

                <div className="bg-[#0a0a0c] p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-[#ccff00] font-bold text-sm">2. AIR DRY PREFERRED</span>
                  <p className="text-zinc-400 text-[11px] font-sans">
                    Hang dry or tumble dry low. Do not use fabric softeners as they coat micro-vent pores.
                  </p>
                </div>

                <div className="bg-[#0a0a0c] p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-[#ccff00] font-bold text-sm">3. NO BLEACH OR IRON</span>
                  <p className="text-zinc-400 text-[11px] font-sans">
                    Avoid chlorine bleach or high heat irons to protect thermo-bonded seam tapes.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Related Products Section */}
        <div className="mt-20 border-t border-white/10 pt-12 space-y-8">
          <div className="flex items-center justify-between font-mono">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#121318] px-3 py-1 rounded-full text-[10px] text-[#ccff00] uppercase tracking-widest mb-2 border border-white/10">
                <Sparkles className="w-3 h-3" />
                <span>RECOMMENDED GEAR</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                MORE FROM THE APEX LAB COLLECTION
              </h3>
            </div>

            <button
              onClick={() => onNavigate('catalog')}
              className="text-xs text-[#ccff00] hover:underline font-bold uppercase flex items-center gap-1 hidden sm:flex"
            >
              <span>VIEW ALL CATALOG ({PRODUCTS.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                onClick={() => onSelectProduct ? onSelectProduct(relProduct) : onNavigate('product-detail')}
                className="bg-[#121318] border border-white/10 hover:border-[#ccff00]/50 rounded-2xl p-4 cursor-pointer group transition-all"
              >
                <div className="relative aspect-[4/3] bg-black rounded-xl overflow-hidden mb-3 border border-white/10">
                  <img
                    src={relProduct.images[0]}
                    alt={relProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {relProduct.badge && (
                    <span className="absolute top-2 left-2 bg-white text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {relProduct.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1 font-mono">
                  <div className="text-[10px] text-zinc-400">{relProduct.collection}</div>
                  <h4 className="font-sans font-bold text-sm text-white group-hover:text-[#ccff00] transition-colors truncate">
                    {relProduct.name}
                  </h4>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-extrabold text-sm text-white">${relProduct.price}</span>
                    <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {relProduct.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/20 transition-all z-10"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center space-y-4">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={`${product.name} Fullscreen`}
              className="max-h-[80vh] w-auto object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
            <div className="font-mono text-xs text-zinc-300 text-center flex items-center gap-4">
              <span className="text-[#ccff00] font-bold uppercase">{product.name}</span>
              <span>&bull;</span>
              <span>{mockupLabels[selectedImageIndex] || `PHOTO ${selectedImageIndex + 1}`}</span>
            </div>
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121318] border border-white/20 rounded-2xl p-6 max-w-md w-full font-mono text-xs space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white uppercase text-sm">SUBMIT FIELD REVIEW</h3>
              <button onClick={() => setIsWriteReviewOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReviewSubmit} className="space-y-3">
              <div>
                <label className="text-zinc-400 uppercase text-[10px] block mb-1">YOUR NAME / PLAYER ALIAS</label>
                <input
                  type="text"
                  required
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  placeholder="e.g., Jordan Miller"
                  className="w-full bg-[#0a0a0c] border border-white/15 rounded-xl px-3 py-2 text-white outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase text-[10px] block mb-1">RATING</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full bg-[#0a0a0c] border border-white/15 rounded-xl px-3 py-2 text-white outline-none focus:border-[#ccff00]"
                >
                  <option value={5}>5 Stars - Elite Performance</option>
                  <option value={4}>4 Stars - Great Gear</option>
                  <option value={3}>3 Stars - Satisfactory</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 uppercase text-[10px] block mb-1">REVIEW TITLE</label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="e.g., Unbelievable breathability"
                  className="w-full bg-[#0a0a0c] border border-white/15 rounded-xl px-3 py-2 text-white outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase text-[10px] block mb-1">COURT COMMENTS</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Describe fit, thermal control, durability during matches..."
                  className="w-full bg-[#0a0a0c] border border-white/15 rounded-xl px-3 py-2 text-white outline-none focus:border-[#ccff00]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold py-3 rounded-xl uppercase transition-all"
              >
                POST FIELD REVIEW
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE STICKY PURCHASE BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0a0a0c]/95 border-t border-white/15 p-3 flex items-center justify-between gap-3 backdrop-blur-xl shadow-2xl font-mono">
        <div>
          <div className="text-[10px] text-zinc-400 uppercase">{selectedSize} &bull; {selectedColor.name.split(' ')[0]}</div>
          <div className="text-lg font-black text-white">${(product.price * quantity).toFixed(2)}</div>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-[#ccff00] active:scale-95 text-black font-extrabold text-xs px-5 py-3 rounded-xl uppercase transition-all flex items-center gap-1.5 shadow-lg"
        >
          {addedToast ? (
            <>
              <Check className="w-4 h-4 text-black" />
              <span>ADDED!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 fill-black" />
              <span>ADD TO BAG</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
