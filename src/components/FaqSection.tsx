import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Textiles' | 'Ordering' | 'Fit & Science';
}

const FAQ_DATA: FAQItem[] = [
  {
    category: 'Textiles',
    question: 'What makes Court Lab performance textiles different from standard sportswear?',
    answer:
      'Court Lab apparel is engineered specifically for pickleball biomechanics. Unlike general athletic wear, our garments utilize an 82/18 Poly-Spandex kinetic matrix for 360° lateral flexibility, laser-cut micro-venting aligned with core heat zones, and anti-drag surface treatment to keep you agile during fast kitchen exchanges.',
  },
  {
    category: 'Fit & Science',
    question: 'How does the interactive Fit Calibrator determine my size?',
    answer:
      'Our Fit Calibrator algorithm factors in your primary court playing style (dink-heavy vs. power baseliner), physical measurements, and preferred compression level to recommend the precise size for maximum aerodynamic benefit and zero-drag mobility.',
  },
  {
    category: 'Textiles',
    question: 'How does the silver-ion antimicrobial thread work?',
    answer:
      'Silver-ion threads are permanently woven directly into the fabric matrix rather than applied as a surface coating. They actively neutralize odor-causing bacteria on contact, ensuring your kit remains fresh through multi-match tournament play and 100+ wash cycles.',
  },
  {
    category: 'Ordering',
    question: 'What is the "30-Day Court Tested" performance guarantee?',
    answer:
      'We stand by every stitch. Take your Court Lab gear onto the court, play full sets, and put it through rigorous movement. If you feel it does not outperform standard apparel in breathability and freedom of movement within 30 days, return it for a full refund or exchange.',
  },
  {
    category: 'Ordering',
    question: 'How fast is order processing and shipping?',
    answer:
      'Orders placed before 2:00 PM EST ship same-day from our fulfillment hub. Standard domestic shipping takes 2-4 business days, with express overnight options available at checkout. All orders over $100 qualify for free expedited shipping.',
  },
  {
    category: 'Fit & Science',
    question: 'How do I import this store structure into my Shopify Admin?',
    answer:
      'Court Lab includes a built-in Online Store 2.0 Shopify theme template in the ZIP export (`layout/theme.liquid`, section liquid schemas, and JSON templates). Simply upload the ZIP file in your Shopify Admin under Online Store > Themes.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Textiles', 'Ordering', 'Fit & Science'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0b0c0e] border-t border-b border-white/10 py-16 lg:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#14161c] border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-[#ccff00] tracking-widest uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>KNOWLEDGE BASE & FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans">
            FREQUENTLY ASKED <span className="text-[#ccff00]">QUESTIONS</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base font-sans">
            Everything you need to know about our lab-tested court textiles, sizing calibration, and order fulfillment.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold border-white shadow-md'
                  : 'bg-[#121318] text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#121318] border-white/20 shadow-xl'
                    : 'bg-[#121318]/60 border-white/10 hover:border-white/15 hover:bg-[#121318]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#ccff00] shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-white tracking-wide font-sans">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[#181a22] border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-white/10 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-white/5 text-zinc-300 text-sm leading-relaxed font-sans">
                    <div className="mt-3 text-zinc-400 font-sans">
                      {faq.answer}
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span className="uppercase text-emerald-400 font-bold">CATEGORY: {faq.category}</span>
                      <span>COURT LAB SPEC &bull; 2026</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Banner */}
        <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-[#121318] via-[#181a22] to-[#121318] border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white text-sm font-bold font-sans">Have a specific textile or custom order query?</div>
              <div className="text-zinc-400 text-xs font-sans">Our lab technicians and support team respond within 2 hours.</div>
            </div>
          </div>
          <a
            href="mailto:support@courtlab.com"
            className="bg-white hover:bg-zinc-200 text-black px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap"
          >
            CONTACT SUPPORT
          </a>
        </div>
      </div>
    </section>
  );
};
