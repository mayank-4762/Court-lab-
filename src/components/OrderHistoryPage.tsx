import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Search,
  SlidersHorizontal,
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  FileText,
  Download,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  User,
  Zap,
  MapPin,
  Calendar,
  X,
  Printer
} from 'lucide-react';
import { Order, CartItem, PageView, Product } from '../types';

interface OrderHistoryPageProps {
  orders: Order[];
  onNavigate: (page: PageView) => void;
  onSelectOrderForTracking?: (order: Order) => void;
  onAddToCart?: (product: Product, size: string, colorHex: string, quantity: number) => void;
  onSelectProduct?: (product: Product) => void;
}

export const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({
  orders,
  onNavigate,
  onSelectOrderForTracking,
  onAddToCart,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest'>('newest');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [reorderedOrderId, setReorderedOrderId] = useState<string | null>(null);

  // Copy Order ID helper
  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reorder all items in order
  const handleReorderOrder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      order.items.forEach((item) => {
        onAddToCart(
          item.product,
          item.selectedSize,
          item.selectedColor.hex,
          item.quantity
        );
      });
      setReorderedOrderId(order.orderId);
      setTimeout(() => setReorderedOrderId(null), 2500);
    }
  };

  // Track order handler
  const handleTrackOrder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectOrderForTracking) {
      onSelectOrderForTracking(order);
    } else {
      onNavigate('order-tracking');
    }
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      // Status filter
      if (statusFilter === 'active') {
        if (order.status === 'Delivered') return false;
      } else if (statusFilter === 'delivered') {
        if (order.status !== 'Delivered') return false;
      } else if (statusFilter !== 'all') {
        if (order.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }

      // Search term
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      const matchesId = order.orderId.toLowerCase().includes(term);
      const matchesTracking = order.trackingNumber.toLowerCase().includes(term);
      const matchesItem = order.items.some(
        (i) =>
          i.product.name.toLowerCase().includes(term) ||
          i.product.subtitle.toLowerCase().includes(term)
      );
      return matchesId || matchesTracking || matchesItem;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'highest') {
        return b.total - a.total;
      }
      return 0;
    });

  // Calculate high-level metrics
  const totalSpent = orders.reduce((acc, o) => acc + o.total, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'Delivered').length;
  const totalItemsPurchased = orders.reduce(
    (acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  // Status Badge Styling Helper
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
        };
      case 'Out for Delivery':
        return {
          bg: 'bg-[#ccff00]/10 border-[#ccff00]/40 text-[#ccff00]',
          dot: 'bg-[#ccff00] animate-ping',
          icon: <Truck className="w-3.5 h-3.5 text-[#ccff00]" />,
        };
      case 'In Deployment':
        return {
          bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          dot: 'bg-cyan-400 animate-pulse',
          icon: <Clock className="w-3.5 h-3.5 text-cyan-400" />,
        };
      default:
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-400',
          icon: <Package className="w-3.5 h-3.5 text-amber-400" />,
        };
    }
  };

  return (
    <div className="bg-[#08080a] min-h-screen text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#141620] border border-white/15 px-3.5 py-1 rounded-full text-xs font-mono text-[#ccff00] uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span>ATHLETE ACCOUNT &bull; REPOSITORY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight text-white">
              ORDER HISTORY & LOGS
            </h1>
            <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-2xl mt-2">
              Review previous textile deployments, inspect technical specifications, reorder calibrated gear in 1-click, or print tax receipts.
            </p>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="self-start md:self-auto bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-black px-5 py-3 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#ccff00]/15"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>NEW DEPLOYMENT</span>
          </button>
        </div>

        {/* Member Account Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#12131a] border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-[#ccff00]/30 transition-all">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider">TOTAL ORDERS</span>
              <Package className="w-4 h-4 text-[#ccff00]" />
            </div>
            <p className="text-2xl sm:text-4xl font-black font-display text-white">{orders.length}</p>
            <p className="text-[10px] font-mono text-zinc-500 mt-1">{totalItemsPurchased} Items Dispatched</p>
          </div>

          <div className="bg-[#12131a] border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-[#ccff00]/30 transition-all">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider">ACTIVE TRANSIT</span>
              <Truck className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl sm:text-4xl font-black font-display text-cyan-400">
              {activeOrdersCount}
            </p>
            <p className="text-[10px] font-mono text-zinc-500 mt-1">In Satellite Pipeline</p>
          </div>

          <div className="bg-[#12131a] border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-[#ccff00]/30 transition-all">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider">INVESTMENT</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-4xl font-black font-display text-white">${totalSpent}</p>
            <p className="text-[10px] font-mono text-zinc-500 mt-1">USD Lifetime Value</p>
          </div>

          <div className="bg-[#12131a] border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-[#ccff00]/30 transition-all">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider">ATHLETE LEVEL</span>
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
            </div>
            <p className="text-lg sm:text-2xl font-black font-display text-[#ccff00]">PRO LAB TIER</p>
            <p className="text-[10px] font-mono text-zinc-500 mt-1">Free Express Shipping</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#101118] border border-white/10 rounded-2xl p-4 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Order ID (e.g. CL-LAB-849201), item name, or tracking..."
                className="w-full bg-[#181a24] border border-white/15 focus:border-[#ccff00] rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#181a24] border border-white/15 text-xs font-mono text-white rounded-xl px-3 py-2.5 focus:border-[#ccff00] focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
              </select>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 font-mono text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                statusFilter === 'active'
                  ? 'bg-[#ccff00] text-black font-bold shadow-md shadow-[#ccff00]/15'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              Active Transit ({activeOrdersCount})
            </button>
            <button
              onClick={() => setStatusFilter('delivered')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                statusFilter === 'delivered'
                  ? 'bg-emerald-400 text-black font-bold shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              Delivered ({orders.length - activeOrdersCount})
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-[#101118] border border-white/10 rounded-2xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-mono font-bold uppercase text-white">No Matching Deployments Found</h3>
            <p className="text-xs font-sans text-zinc-400 max-w-md mx-auto">
              We couldn't find any orders matching "{searchTerm}". Try clearing your search parameters or check another tab.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-mono text-xs px-4 py-2 rounded-xl"
              >
                Reset Filters
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-bold px-4 py-2 rounded-xl"
              >
                Shop Catalog
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusStyle = getStatusBadge(order.status);
              const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={order.orderId}
                  className="bg-[#101118] border border-white/15 hover:border-[#ccff00]/40 rounded-2xl p-5 sm:p-6 transition-all space-y-5 shadow-xl group"
                >
                  {/* Top Header: Order ID, Date, Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Order ID & Copy */}
                      <div className="flex items-center gap-2 bg-[#181a24] border border-white/15 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-white">
                        <span className="text-zinc-400">ID:</span>
                        <span className="text-[#ccff00]">{order.orderId}</span>
                        <button
                          onClick={(e) => handleCopyId(order.orderId, e)}
                          className="text-zinc-400 hover:text-white transition-colors ml-1 p-0.5"
                          title="Copy Order ID"
                        >
                          {copiedId === order.orderId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{orderDate}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider ${statusStyle.bg}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                      {statusStyle.icon}
                      <span>{order.status}</span>
                    </div>
                  </div>

                  {/* Items List Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectProduct && onSelectProduct(item.product)}
                        className="bg-[#181a24] border border-white/10 hover:border-white/30 rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer group/item"
                      >
                        {/* Thumbnail Image */}
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-white/15">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                          />
                          {item.quantity > 1 && (
                            <span className="absolute bottom-1 right-1 bg-[#ccff00] text-black font-mono font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                              {item.quantity}
                            </span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-sans font-bold text-xs text-white truncate group-hover/item:text-[#ccff00] transition-colors">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 mt-1">
                            <span className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-200">
                              SIZE: {item.selectedSize}
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-zinc-200">
                              <span
                                className="w-2 h-2 rounded-full border border-white/30"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              {item.selectedColor.name.split(' ')[0]}
                            </span>
                          </div>
                          <p className="font-mono text-xs font-bold text-white mt-1">
                            ${item.product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Actions & Price Summary */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Price Breakdown */}
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">TOTAL AMOUNT</span>
                        <span className="text-lg font-extrabold text-white">${order.total}</span>
                      </div>
                      <div className="h-6 w-px bg-white/10" />
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">SATELLITE REF</span>
                        <span className="text-zinc-300">{order.trackingNumber}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Track Button */}
                      <button
                        onClick={(e) => handleTrackOrder(order, e)}
                        className="bg-[#1e202d] hover:bg-[#282b3d] text-white border border-white/20 font-mono text-xs font-bold px-3.5 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>TRACK DEPLOYMENT</span>
                      </button>

                      {/* Reorder Button */}
                      <button
                        onClick={(e) => handleReorderOrder(order, e)}
                        className={`font-mono text-xs font-bold px-3.5 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                          reorderedOrderId === order.orderId
                            ? 'bg-emerald-500 text-black border-emerald-400'
                            : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                        }`}
                      >
                        {reorderedOrderId === order.orderId ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>ADDED TO BAG!</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-3.5 h-3.5 text-[#ccff00]" />
                            <span>REORDER KIT</span>
                          </>
                        )}
                      </button>

                      {/* View Invoice Receipt */}
                      <button
                        onClick={() => setSelectedOrderForInvoice(order)}
                        className="bg-[#ccff00]/10 hover:bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/30 font-mono text-xs font-bold px-3.5 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>INVOICE</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Digital Receipt / Invoice Modal */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0f1017] border border-[#ccff00]/40 rounded-2xl max-w-2xl w-full text-white overflow-hidden shadow-2xl relative my-8 animate-fade-in">
            {/* Modal Header */}
            <div className="bg-[#181a24] p-5 border-b border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ccff00] text-black font-black flex items-center justify-center font-display text-xs">
                  CL
                </div>
                <div>
                  <h3 className="font-mono font-black text-sm uppercase text-white tracking-wider">
                    OFFICIAL DEPLOYMENT INVOICE
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400">
                    COURT LAB ATHLETIC TEXTILES INC.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Invoice Body */}
            <div className="p-6 space-y-6">
              {/* Top Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#141620] border border-white/10 rounded-xl p-4 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">ORDER ID</span>
                  <span className="text-[#ccff00] font-bold">{selectedOrderForInvoice.orderId}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">DATE PLACED</span>
                  <span className="text-white font-bold">
                    {new Date(selectedOrderForInvoice.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">TRANSIT STATUS</span>
                  <span className="text-cyan-400 font-bold">{selectedOrderForInvoice.status}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">TRACKING CODE</span>
                  <span className="text-zinc-300 font-bold">{selectedOrderForInvoice.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">PAYMENT METHOD</span>
                  <span className="text-zinc-300 font-bold">Encrypted Credit Card</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">DISPATCH LAB</span>
                  <span className="text-zinc-300 font-bold">Austin HQ Hub</span>
                </div>
              </div>

              {/* Shipping Recipient Address */}
              <div className="bg-[#141620] border border-white/10 rounded-xl p-4 space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#ccff00] tracking-widest block mb-1">
                  SHIPPING RECIPIENT
                </span>
                <p className="font-sans font-bold text-sm text-white">
                  {selectedOrderForInvoice.shippingAddress.fullName}
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  {selectedOrderForInvoice.shippingAddress.address}
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  {selectedOrderForInvoice.shippingAddress.city},{' '}
                  {selectedOrderForInvoice.shippingAddress.postalCode},{' '}
                  {selectedOrderForInvoice.shippingAddress.country}
                </p>
                <p className="font-mono text-xs text-zinc-400 pt-1">
                  Email: {selectedOrderForInvoice.shippingAddress.email}
                </p>
              </div>

              {/* Items Breakdown Table */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase text-zinc-400 tracking-wider">
                  ITEMIZED DEPLOYMENT SPECIFICATIONS
                </h4>
                <div className="border border-white/15 rounded-xl overflow-hidden font-mono text-xs">
                  <div className="bg-[#181a24] px-4 py-2.5 grid grid-cols-12 text-[10px] text-zinc-400 font-bold uppercase border-b border-white/10">
                    <span className="col-span-6">ITEM / SPEC</span>
                    <span className="col-span-2 text-center">SIZE / COLOR</span>
                    <span className="col-span-2 text-center">QTY</span>
                    <span className="col-span-2 text-right">TOTAL</span>
                  </div>
                  <div className="divide-y divide-white/10 bg-[#101118]">
                    {selectedOrderForInvoice.items.map((item) => (
                      <div key={item.id} className="px-4 py-3 grid grid-cols-12 items-center">
                        <div className="col-span-6 pr-2">
                          <p className="font-sans font-bold text-white text-xs">{item.product.name}</p>
                          <p className="text-[10px] text-zinc-500 font-sans">{item.product.subtitle}</p>
                        </div>
                        <div className="col-span-2 text-center text-zinc-300 text-[11px]">
                          {item.selectedSize} / {item.selectedColor.name.split(' ')[0]}
                        </div>
                        <div className="col-span-2 text-center font-bold text-white">
                          {item.quantity}
                        </div>
                        <div className="col-span-2 text-right font-extrabold text-white">
                          ${item.product.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtotal & Totals Box */}
              <div className="bg-[#141620] border border-white/10 rounded-xl p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">${selectedOrderForInvoice.subtotal}</span>
                </div>
                {selectedOrderForInvoice.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Post-Purchase Upgrade Discount</span>
                    <span>-${selectedOrderForInvoice.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Express Satellite Shipping</span>
                  <span className="text-white">
                    {selectedOrderForInvoice.shippingFee === 0 ? 'FREE' : `$${selectedOrderForInvoice.shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-[#ccff00]">
                  <span>TOTAL PAID</span>
                  <span>${selectedOrderForInvoice.total} USD</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="bg-[#181a24] p-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl uppercase transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#ccff00]" />
                <span>PRINT RECEIPT</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleTrackOrder(selectedOrderForInvoice, {} as any);
                    setSelectedOrderForInvoice(null);
                  }}
                  className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-black px-4 py-2.5 rounded-xl uppercase transition-colors flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>TRACK DEPLOYMENT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
