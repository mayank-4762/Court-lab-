import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  ShieldCheck,
  ArrowRight,
  MapPin,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Download,
  Copy,
  Check,
  Box,
  Satellite,
  ChevronRight,
  Building2,
  Mail,
  FileText
} from 'lucide-react';
import { PageView, Order } from '../types';
import { PRODUCTS } from '../data/products';

interface OrderTrackingPageProps {
  onNavigate: (page: PageView) => void;
  initialOrder?: Order | null;
}

// Sample mock database of known orders for demo lookup
const DEMO_ORDERS: Record<string, Order> = {
  'CL-LAB-849201': {
    orderId: 'CL-LAB-849201',
    items: [
      {
        id: 'court-tee-pro-elite-#0a0a0c-L',
        product: PRODUCTS[0],
        selectedColor: PRODUCTS[0].colors[0],
        selectedSize: 'L',
        quantity: 1,
      },
      {
        id: 'kinetic-short-m-#121318-M',
        product: PRODUCTS[1],
        selectedColor: PRODUCTS[1].colors[0],
        selectedSize: 'M',
        quantity: 1,
      },
    ],
    subtotal: 168,
    discount: 0,
    shippingFee: 0,
    total: 168,
    shippingAddress: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@courtlab.io',
      address: '1100 Congress Ave, Suite 400',
      city: 'Austin',
      postalCode: '78701',
      country: 'United States',
    },
    hasPostPurchaseUpsell: false,
    createdAt: '2026-08-05T14:32:00.000Z',
    trackingNumber: 'CL-SATELLITE-88219X',
    status: 'In Deployment',
  },
  'CL-LAB-992014': {
    orderId: 'CL-LAB-992014',
    items: [
      {
        id: 'apex-jacket-#0a0a0c-XL',
        product: PRODUCTS[2] || PRODUCTS[0],
        selectedColor: PRODUCTS[0].colors[0],
        selectedSize: 'XL',
        quantity: 1,
      },
    ],
    subtotal: 145,
    discount: 15,
    shippingFee: 0,
    total: 130,
    shippingAddress: {
      fullName: 'Sarah Jenkins',
      email: 'sarah.j@courtlab.io',
      address: '450 Ocean Drive, Apt 12B',
      city: 'Miami',
      postalCode: '33139',
      country: 'United States',
    },
    hasPostPurchaseUpsell: true,
    createdAt: '2026-08-03T09:15:00.000Z',
    trackingNumber: 'CL-SATELLITE-44021M',
    status: 'Out for Delivery',
  },
};

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  onNavigate,
  initialOrder,
}) => {
  const [orderInput, setOrderInput] = useState(
    initialOrder ? initialOrder.orderId : ''
  );
  const [emailInput, setEmailInput] = useState(
    initialOrder ? initialOrder.shippingAddress.email : ''
  );
  
  const [isSearching, setIsSearching] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(
    initialOrder || DEMO_ORDERS['CL-LAB-849201']
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [showNoteSubmitted, setShowNoteSubmitted] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    const cleanId = orderInput.trim().toUpperCase();
    const cleanEmail = emailInput.trim().toLowerCase();

    if (!cleanId) {
      setErrorMessage('Please enter a valid Order ID (e.g. CL-LAB-849201)');
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      // Look up in mock db or generate dynamic response for entered ID
      if (initialOrder && (initialOrder.orderId.toUpperCase() === cleanId || cleanId.length > 3)) {
        setTrackedOrder(initialOrder);
      } else if (DEMO_ORDERS[cleanId]) {
        setTrackedOrder(DEMO_ORDERS[cleanId]);
      } else {
        // Create dynamic order response so user query always produces a valid result
        const generatedOrder: Order = {
          orderId: cleanId.startsWith('CL-') ? cleanId : `CL-LAB-${cleanId}`,
          items: [
            {
              id: `${PRODUCTS[0].id}-L`,
              product: PRODUCTS[0],
              selectedColor: PRODUCTS[0].colors[0],
              selectedSize: 'L',
              quantity: 1,
            },
          ],
          subtotal: 98,
          discount: 0,
          shippingFee: 0,
          total: 98,
          shippingAddress: {
            fullName: 'Verified Customer',
            email: cleanEmail || 'athlete@courtlab.io',
            address: '742 Evergreen Terrace',
            city: 'Austin',
            postalCode: '78704',
            country: 'United States',
          },
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          trackingNumber: `CL-SATELLITE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          status: 'In Deployment',
        };
        setTrackedOrder(generatedOrder);
      }
    }, 800);
  };

  const handleCopyTracking = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handleLoadDemo = (id: string, email: string) => {
    setOrderInput(id);
    setEmailInput(email);
    setTrackedOrder(DEMO_ORDERS[id] || null);
    setErrorMessage('');
  };

  const handleAddDeliveryNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryNote.trim()) {
      setShowNoteSubmitted(true);
      setTimeout(() => setShowNoteSubmitted(false), 3000);
    }
  };

  // Status mapping and steps
  const steps = [
    {
      id: 'processing',
      label: 'Processing',
      sublabel: 'Order Confirmed',
      date: 'Aug 5, 02:32 PM',
      desc: 'Payment verified & lab dispatch ticket created',
      icon: Clock,
    },
    {
      id: 'shipped',
      label: 'Shipped',
      sublabel: 'Quality Calibrated',
      date: 'Aug 5, 04:15 PM',
      desc: 'Silver-ion & aerodynamic tension check passed',
      icon: Box,
    },
    {
      id: 'in-transit',
      label: 'In-Transit',
      sublabel: 'Logistics Hub',
      date: 'Aug 6, 08:10 AM',
      desc: 'Departed Austin TX Performance Hub',
      icon: Truck,
    },
    {
      id: 'out-for-delivery',
      label: 'Out for Delivery',
      sublabel: 'Local Courier',
      date: 'Aug 7, 07:30 AM',
      desc: 'On satellite local courier unit',
      icon: MapPin,
    },
    {
      id: 'delivered',
      label: 'Delivered',
      sublabel: 'Destination Reached',
      date: 'Aug 8, 02:00 PM',
      desc: '30-Day Court Test Guarantee active',
      icon: CheckCircle2,
    },
  ];

  const getActiveStepIndex = (status: string) => {
    switch (status) {
      case 'Processing':
        return 0;
      case 'Calibrating Cargo':
      case 'Shipped':
        return 1;
      case 'In Deployment':
      case 'In-Transit':
        return 2;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 2;
    }
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (trackedOrder) {
      setTrackedOrder({
        ...trackedOrder,
        status: newStatus as Order['status'],
      });
    }
  };

  const activeStep = trackedOrder ? getActiveStepIndex(trackedOrder.status) : 2;
  const progressPercentage = Math.round((activeStep / (steps.length - 1)) * 100);

  return (
    <div className="bg-[#08080a] min-h-screen text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-[#ccff00]/30 text-[#ccff00] text-[11px] font-bold tracking-widest uppercase">
            <Satellite className="w-3.5 h-3.5 animate-pulse" />
            <span>REAL-TIME SHIPMENT TELEMETRY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-display">
            TRACK YOUR SHIPMENT
          </h1>
          <p className="text-slate-400 font-sans text-sm max-w-xl mx-auto">
            Input your Court Lab Order ID and email address below to inspect live dispatch status, satellite tracking coordinates, and delivery timeline.
          </p>
        </div>

        {/* Order Input Card */}
        <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#ccff00] to-teal-400" />
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-5 space-y-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-[#ccff00]" />
                Order ID / Number
              </label>
              <input
                type="text"
                placeholder="e.g. CL-LAB-849201"
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                className="w-full bg-[#09090c] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] font-mono text-sm transition-colors"
                required
              />
            </div>

            <div className="sm:col-span-5 space-y-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#ccff00]" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="athlete@domain.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#09090c] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] font-mono text-sm transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#ccff00]/10 disabled:opacity-50"
              >
                {isSearching ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>TRACK</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Demo Pre-fill presets */}
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
            <span className="text-[11px] uppercase tracking-wider text-zinc-500">
              TEST DEMO ORDERS:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleLoadDemo('CL-LAB-849201', 'alex.morgan@courtlab.io')}
                className="bg-[#181a22] hover:bg-[#222530] border border-white/10 text-zinc-300 hover:text-white px-2.5 py-1 rounded-lg text-[11px] transition-colors"
              >
                #CL-LAB-849201 (In Deployment)
              </button>
              <button
                type="button"
                onClick={() => handleLoadDemo('CL-LAB-992014', 'sarah.j@courtlab.io')}
                className="bg-[#181a22] hover:bg-[#222530] border border-white/10 text-zinc-300 hover:text-white px-2.5 py-1 rounded-lg text-[11px] transition-colors"
              >
                #CL-LAB-992014 (Out for Delivery)
              </button>
            </div>
          </div>
        </div>

        {/* Tracked Order Details Card */}
        {trackedOrder && (
          <div className="space-y-8 animate-fade-in">
            {/* Status Header Overview Banner */}
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl font-black text-white tracking-wider font-display">
                    ORDER #{trackedOrder.orderId}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {trackedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Placed on {new Date(trackedOrder.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} &bull; Estimated Arrival: <strong className="text-white">Aug 8 - Aug 10, 2026</strong>
                </p>
              </div>

              {/* Tracking Number & Quick Action */}
              <div className="bg-[#09090c] border border-white/10 p-4 rounded-xl flex items-center justify-between md:justify-end gap-4">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    SATELLITE TRACKING NO.
                  </div>
                  <div className="text-sm font-bold text-[#ccff00] font-mono">
                    {trackedOrder.trackingNumber}
                  </div>
                </div>
                <button
                  onClick={() => handleCopyTracking(trackedOrder.trackingNumber)}
                  className="bg-[#1c1e28] hover:bg-[#282b3a] p-2.5 rounded-lg text-white transition-colors"
                  title="Copy Tracking Number"
                >
                  {copiedTracking ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Visual Step Progress Bar */}
            <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#ccff00]" />
                    VISUAL SHIPMENT PROGRESS
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans">
                    Step {activeStep + 1} of {steps.length} &bull; <strong className="text-[#ccff00]">{steps[activeStep].label}</strong> ({progressPercentage}% Dispatched)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-32 bg-[#09090c] border border-white/10 rounded-full h-3 p-0.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-[#ccff00] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#ccff00] font-mono">
                    {progressPercentage}%
                  </span>
                </div>
              </div>

              {/* Status Simulation Controls for Interactive Testing */}
              <div className="bg-[#09090c] border border-white/10 p-3 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-[#ccff00]" />
                  SIMULATE TELEMETRY STATUS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { key: 'Processing', label: 'Processing' },
                    { key: 'Shipped', label: 'Shipped' },
                    { key: 'In-Transit', label: 'In-Transit' },
                    { key: 'Out for Delivery', label: 'Out for Delivery' },
                    { key: 'Delivered', label: 'Delivered' },
                  ].map((st) => (
                    <button
                      key={st.key}
                      onClick={() => handleUpdateStatus(st.key)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition-all ${
                        trackedOrder.status === st.key
                          ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20'
                          : 'bg-[#181a22] hover:bg-[#222530] text-zinc-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Interactive Timeline */}
              <div className="relative py-6">
                {/* Horizontal Bar for Desktop */}
                <div className="hidden md:block absolute top-[2.25rem] left-[10%] right-[10%] h-1.5 bg-zinc-800 z-0 rounded-full" />
                <div
                  className="hidden md:block absolute top-[2.25rem] left-[10%] h-1.5 bg-gradient-to-r from-emerald-500 via-[#ccff00] to-teal-400 z-0 rounded-full transition-all duration-700 shadow-sm shadow-[#ccff00]/30"
                  style={{ width: `${(activeStep / (steps.length - 1)) * 80}%` }}
                />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= activeStep;
                    const isCurrent = idx === activeStep;
                    const StepIcon = step.icon;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleUpdateStatus(step.label)}
                        className={`group flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3 transition-transform ${
                          isCurrent ? 'scale-105' : 'hover:scale-102'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                            isCompleted
                              ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/30 border border-[#ccff00]'
                              : 'bg-[#181a22] border border-white/15 text-zinc-500 group-hover:border-white/30'
                          } ${isCurrent ? 'ring-4 ring-[#ccff00]/40 animate-pulse' : ''}`}
                        >
                          <StepIcon className={`w-5 h-5 ${isCompleted ? 'text-black' : 'text-zinc-500'}`} />
                        </div>

                        <div className="space-y-1">
                          <div className={`text-xs font-extrabold uppercase tracking-wider ${isCompleted ? 'text-white' : 'text-zinc-500'}`}>
                            {step.label}
                          </div>
                          <div className="text-[10px] text-[#ccff00] font-mono font-bold">
                            {step.sublabel}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-sans leading-tight hidden md:block max-w-[140px] mx-auto">
                            {step.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Live Telemetry Hub Logs */}
              <div className="mt-8 bg-[#09090c] border border-white/10 rounded-xl p-5 space-y-4">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  LIVE TRANSIT TELEMETRY LOGS
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex items-start gap-3 text-zinc-200 border-l-2 border-emerald-400 pl-3 py-0.5">
                    <span className="text-[#ccff00] font-bold">07:30 AM &bull; Today</span>
                    <span>Arrived at Local Carrier Depot (Austin Regional Distribution Hub)</span>
                  </div>
                  <div className="flex items-start gap-3 text-zinc-400 border-l-2 border-zinc-700 pl-3 py-0.5">
                    <span className="text-zinc-500 font-bold">08:15 PM &bull; Yesterday</span>
                    <span>Departed Central Airport Sorting Facility (DFW Hub)</span>
                  </div>
                  <div className="flex items-start gap-3 text-zinc-500 border-l-2 border-zinc-800 pl-3 py-0.5">
                    <span className="text-zinc-500 font-bold">02:30 PM &bull; Aug 5</span>
                    <span>Package Scanned & Calibrated at Court Lab Austin HQ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid for Package Items & Address */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Package Contents */}
              <div className="lg:col-span-7 bg-[#121318] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-4">
                  <Package className="w-4 h-4 text-[#ccff00]" />
                  PACKAGE CONTENTS ({trackedOrder.items.reduce((s, i) => s + i.quantity, 0)} ITEMS)
                </h3>

                <div className="space-y-4 divide-y divide-white/5">
                  {trackedOrder.items.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex items-center gap-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-[#08080a] border border-white/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate font-sans">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-zinc-400 font-mono mt-1 flex flex-wrap gap-3">
                          <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                          <span>Color: <strong className="text-white">{item.selectedColor.name}</strong></span>
                          <span>Qty: <strong className="text-white">{item.quantity}</strong></span>
                        </div>
                      </div>
                      <div className="text-right font-mono font-bold text-white text-sm">
                        ${item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-white/10 pt-4 space-y-2 text-xs font-mono text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${trackedOrder.subtotal}</span>
                  </div>
                  {trackedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Lab Member Discount</span>
                      <span>-${trackedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Air Shipping</span>
                    <span className="text-white">
                      {trackedOrder.shippingFee === 0 ? 'FREE' : `$${trackedOrder.shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white border-t border-white/10 pt-2 mt-2">
                    <span>Total Paid</span>
                    <span className="text-[#ccff00]">${trackedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address & Carrier Notes */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Destination */}
                <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-3">
                    <Building2 className="w-4 h-4 text-[#ccff00]" />
                    DELIVERY ADDRESS
                  </h3>

                  <div className="text-xs text-zinc-300 font-sans space-y-1 leading-relaxed">
                    <div className="font-bold text-white text-sm">
                      {trackedOrder.shippingAddress.fullName}
                    </div>
                    <div>{trackedOrder.shippingAddress.address}</div>
                    <div>
                      {trackedOrder.shippingAddress.city}, {trackedOrder.shippingAddress.postalCode}
                    </div>
                    <div className="text-zinc-500 font-mono text-[11px]">
                      {trackedOrder.shippingAddress.country}
                    </div>
                    <div className="text-emerald-400 font-mono text-[11px] pt-2">
                      &bull; Contact: {trackedOrder.shippingAddress.email}
                    </div>
                  </div>
                </div>

                {/* Courier / Special Instructions */}
                <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-3">
                    <FileText className="w-4 h-4 text-[#ccff00]" />
                    SPECIAL DELIVERY INSTRUCTIONS
                  </h3>

                  <form onSubmit={handleAddDeliveryNote} className="space-y-3">
                    <textarea
                      rows={2}
                      placeholder="e.g. Leave package at front gate or call upon arrival..."
                      value={deliveryNote}
                      onChange={(e) => setDeliveryNote(e.target.value)}
                      className="w-full bg-[#09090c] border border-white/15 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] font-sans"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#181a22] hover:bg-[#222530] text-zinc-200 border border-white/15 hover:border-white/30 py-2 rounded-xl text-xs font-mono font-bold transition-colors"
                    >
                      UPDATE CARRIER NOTE
                    </button>
                    {showNoteSubmitted && (
                      <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Carrier instruction dispatched to courier!</span>
                      </div>
                    )}
                  </form>
                </div>

                {/* Need Help Box */}
                <div className="bg-[#09090c] border border-white/10 rounded-2xl p-5 text-center space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    HAVE A QUESTION ABOUT THIS SHIPMENT?
                  </div>
                  <p className="text-xs text-zinc-400 font-sans">
                    Our Court Lab athlete support team responds within 1 hour.
                  </p>
                  <button
                    onClick={() => onNavigate('policies')}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#ccff00] hover:underline"
                  >
                    <span>CONTACT COURT LAB ATHLETE SUPPORT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
