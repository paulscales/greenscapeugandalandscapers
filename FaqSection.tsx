import { useState } from 'react';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BUSINESS_INFO, FAQS, FaqItem } from '../data/businessData';

interface FaqSectionProps {
  onRequestQuote: () => void;
}

type FaqFilter = 'all' | FaqItem['category'];

const FAQ_FILTERS: { id: FaqFilter; label: string }[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'pricing', label: 'Pricing & Quotes' },
  { id: 'timelines', label: 'Timelines' },
  { id: 'plant-care', label: 'Plant Care' },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FaqSection({ onRequestQuote }: FaqSectionProps) {
  const [filter, setFilter] = useState<FaqFilter>('all');
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  const visibleFaqs =
    filter === 'all' ? FAQS : FAQS.filter((item) => item.category === filter);

  const handleFilterChange = (nextFilter: FaqFilter) => {
    setFilter(nextFilter);
    const nextVisible =
      nextFilter === 'all' ? FAQS : FAQS.filter((item) => item.category === nextFilter);
    if (nextVisible.length > 0 && !nextVisible.some((item) => item.id === openId)) {
      setOpenId(nextVisible[0].id);
    }
  };

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#F6F7F5] border-b border-[#DCE2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Columns: Intro & Direct Consultation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <p className="text-sm font-medium text-[#1B5E3A] mb-2">
              Planning &amp; Care Questions
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111915] mb-4"
              style={{ textWrap: 'balance' }}
            >
              Clear answers on pricing, project timelines, and plant care.
            </h2>
            <p className="text-base text-[#46524B] leading-relaxed mb-8">
              Everything you need to know before booking a Kampala site measurement, choosing
              paver patterns, or bringing home indoor and outdoor plants.
            </p>

            <div className="bg-white border border-[#DCE2DA] rounded-2xl p-6 space-y-4">
              <div className="text-sm font-semibold text-[#111915]">
                Need an estimate for your specific plot?
              </div>
              <p className="text-xs sm:text-sm text-[#46524B] leading-relaxed">
                Send photos or rough dimensions on WhatsApp or schedule a site visit with our crew.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRequestQuote}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
                >
                  <span>Book Site Visit</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </motion.button>

                <a
                  href={`${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(
                    'Hello GreenScape Uganda, I have a question about pricing / timelines for my compound.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#111915] bg-[#EFF2EE] hover:bg-[#E2E7E0] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-[#1B5E3A]" aria-hidden="true" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right 7 Columns: Category Tabs & Interactive Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7"
          >
            {/* Segmented Filter Controls */}
            <div
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFF2EE] border border-[#DCE2DA] rounded-xl mb-6"
              role="tablist"
              aria-label="Filter FAQ topics"
            >
              {FAQ_FILTERS.map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleFilterChange(tab.id)}
                    className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A] ${
                      isActive ? 'text-[#111915]' : 'text-[#46524B] hover:text-[#111915]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="faqFilterIndicator"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 bg-white rounded-lg shadow-xs"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Accordion List */}
            <div className="bg-white border border-[#DCE2DA] rounded-2xl divide-y divide-[#EAEFEA] overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleFaqs.map((item) => {
                  const isOpen = openId === item.id;
                  const panelId = `faq-panel-${item.id}`;
                  const buttonId = `faq-button-${item.id}`;

                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-[#FAFBF9] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1B5E3A]"
                      >
                        <div>
                          <span className="block text-xs font-medium text-[#1B5E3A] mb-1">
                            {item.categoryLabel}
                          </span>
                          <span className="font-display text-base sm:text-lg font-semibold text-[#111915] leading-snug">
                            {item.question}
                          </span>
                        </div>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                          className="w-8 h-8 rounded-lg bg-[#EFF2EE] text-[#111915] flex items-center justify-center shrink-0 mt-1"
                          aria-hidden="true"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#46524B] leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
