import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, Trophy, Award, Zap, CheckCircle2, UserCheck, MessageSquarePlus } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  handle: string;
  role: string;
  category: 'pro' | 'd1' | 'instructor';
  rating: number;
  location: string;
  verifiedGear: string;
  statBadge: string;
  quote: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus "Vapor" Vance',
    handle: '@marcusv_pb',
    role: 'PPA Tour Pro (UTPR 5.4)',
    category: 'pro',
    rating: 5,
    location: 'Austin, TX Performance Lab',
    verifiedGear: 'Pro-Elite Kinetic Court Tee',
    statBadge: '-14% Airflow Drag',
    quote: 'The 0.18 Cd drag coefficient isn\'t just marketing—in 95°F tournament conditions, the active cooling micro-vents prevent thermal stickiness during quick kitchen re-resets. Court Lab is the most calibrated gear I have ever worn on tour.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    handle: '@elena_rostova',
    role: 'D1 Tennis Champion & Pro Pickleballer',
    category: 'd1',
    rating: 5,
    location: 'Miami, FL',
    verifiedGear: 'Aerodynamic Court Short',
    statBadge: '-3.2°C Thermal Cooling',
    quote: 'Zero chafing after 5 consecutive 3-set tournament matches. The 4-way kinetic stretch retains shape and compression even after 40+ high-temp wash cycles. Essential equipment for high-velocity baseliners.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    handle: '@dchen_pickleball',
    role: 'Master Director (USAPA 5.0)',
    category: 'instructor',
    rating: 5,
    location: 'Scottsdale, AZ',
    verifiedGear: 'Vapor-Tech Micro-Mesh Jersey',
    statBadge: '99.8% Antimicrobial Shield',
    quote: 'The silver-ion antimicrobial weave completely eliminates tournament bag odor. The precision ergonomic tailoring fits like a second skin without restricting overhead smashes or quick lateral drops.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'sydnie-thorne',
    name: 'Sydnie Thorne',
    handle: '@sydniethorne',
    role: 'National Women\'s Singles Finalist',
    category: 'pro',
    rating: 5,
    location: 'Laguna Beach, CA',
    verifiedGear: 'Pro-Elite Court Hoodie',
    statBadge: '0.4s Sweat Dispersal',
    quote: 'I was skeptical until I put it through the 30-Day Court Test. The moisture dispersal rate is instant. You step off the court feeling completely dry, light, and calibrated.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  },
];

export const CustomerPerspectives: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pro' | 'd1' | 'instructor'>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', role: '', gear: '', quote: '' });

  const filteredTestimonials = TESTIMONIALS.filter(
    (t) => filter === 'all' || t.category === filter
  );

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSubmitted(false);
      setNewReview({ name: '', role: '', gear: '', quote: '' });
    }, 2000);
  };

  return (
    <section className="bg-[#08080a] py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-white/10 font-mono relative overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ccff00_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-[#ccff00]/30 text-[#ccff00] text-[11px] font-bold tracking-widest uppercase">
              <Trophy className="w-3.5 h-3.5" />
              <span>FIELD TESTED BY TOUR ATHLETES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-display">
              CUSTOMER PERSPECTIVES
            </h2>
            <p className="text-slate-400 font-sans text-sm max-w-xl">
              Real telemetry feedback from PPA tour pros, D1 champions, and master coaches competing in high-velocity court conditions.
            </p>
          </div>

          {/* Filter & Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-[#121318] border border-white/10 rounded-xl p-1 flex items-center gap-1">
              {[
                { id: 'all', label: 'ALL ATHLETES' },
                { id: 'pro', label: 'PPA PROS' },
                { id: 'd1', label: 'D1 CHAMPIONS' },
                { id: 'instructor', label: 'MASTERS' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono transition-all ${
                    filter === tab.id
                      ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-[#181a22] hover:bg-[#222530] border border-[#ccff00]/40 text-[#ccff00] px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>SUBMIT ATHLETE LOG</span>
            </button>
          </div>
        </div>

        {/* Global Social Proof Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#121318] border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-2xl font-black text-white font-mono flex items-center justify-center md:justify-start gap-1">
              <span>4.98</span>
              <div className="flex text-[#ccff00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ccff00]" />
                ))}
              </div>
            </div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
              Average Athlete Rating
            </div>
          </div>

          <div className="space-y-1 text-center md:text-left border-l border-white/10 pl-4">
            <div className="text-2xl font-black text-[#ccff00] font-mono">
              1,420+
            </div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
              Verified Court Reviews
            </div>
          </div>

          <div className="space-y-1 text-center md:text-left border-l border-white/10 pl-4">
            <div className="text-2xl font-black text-white font-mono flex items-center justify-center md:justify-start gap-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>100%</span>
            </div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
              30-Day Risk-Free Tested
            </div>
          </div>

          <div className="space-y-1 text-center md:text-left border-l border-white/10 pl-4">
            <div className="text-2xl font-black text-[#ccff00] font-mono">
              0.18 Cd
            </div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
              Aerodynamic Verified
            </div>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#121318] border border-white/10 hover:border-[#ccff00]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#ccff00]/5 group relative"
            >
              {/* Quote Icon Background Accent */}
              <Quote className="w-12 h-12 text-white/5 absolute top-4 right-4 group-hover:text-[#ccff00]/10 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Header: Avatar, Name & Verified Badge */}
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/20 group-hover:border-[#ccff00] transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#ccff00] text-black p-0.5 rounded-full" title="Verified Tour Athlete">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white truncate group-hover:text-[#ccff00] transition-colors">
                        {testimonial.name}
                      </h3>
                    </div>
                    <div className="text-[11px] text-[#ccff00] font-mono font-bold truncate">
                      {testimonial.role}
                    </div>
                    <div className="text-[10px] text-zinc-500 truncate">
                      {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#ccff00]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#ccff00]" />
                  ))}
                  <span className="text-[10px] text-zinc-400 font-mono ml-1">
                    5.0 Verified
                  </span>
                </div>

                {/* Quote Body */}
                <p className="text-zinc-300 font-sans text-xs leading-relaxed italic border-l-2 border-[#ccff00]/30 pl-3 py-1">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Card Footer: Verified Gear & Performance Metric */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 uppercase tracking-wider text-[10px]">VERIFIED GEAR:</span>
                  <span className="text-zinc-300 font-bold font-mono text-[11px] truncate max-w-[150px]">
                    {testimonial.verifiedGear}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 w-full bg-[#09090c] border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-[#ccff00] uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-[#ccff00]" />
                  <span>{testimonial.statBadge}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Submit Athlete Feedback Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121318] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-5 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-[#ccff00] text-xs font-bold uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>ATHLETE LOG SUBMISSION</span>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold"
              >
                ✕ CLOSE
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#ccff00] mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-white uppercase">FEEDBACK LOGGED!</h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Thank you for contributing your performance telemetry to the Court Lab community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 font-bold uppercase">Athlete Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Smith"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-[#09090c] border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 font-bold uppercase">Tour Role / Ranking</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. USAPA 4.5 Competitive Player"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    className="w-full bg-[#09090c] border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 font-bold uppercase">Gear Tested</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pro-Elite Kinetic Court Tee"
                    value={newReview.gear}
                    onChange={(e) => setNewReview({ ...newReview, gear: e.target.value })}
                    className="w-full bg-[#09090c] border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 font-bold uppercase">Performance Review</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe breathability, kinetic fit, or drag reduction on court..."
                    value={newReview.quote}
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    className="w-full bg-[#09090c] border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-sans focus:outline-none focus:border-[#ccff00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  DISPATCH REVIEW
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
