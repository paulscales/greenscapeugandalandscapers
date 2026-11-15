import { useState } from 'react';
import { ArrowRight, Check, MessageCircle, Plus, Sprout } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ALL_SERVICES, BUSINESS_INFO, DISCIPLINES, ServiceItem } from '../data/businessData';

interface ServicesSectionProps {
  selectedServices: string[];
  onToggleService: (serviceName: string) => void;
  onSelectDisciplineScope: (services: string[]) => void;
  onJumpToQuote: () => void;
}

type CategoryFilter = 'all' | ServiceItem['category'];

const FILTER_OPTIONS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'design', label: 'Compound Design' },
  { id: 'hardscaping', label: 'Pavers & Hardscaping' },
  { id: 'planting', label: 'Lawns & Plants' },
  { id: 'maintenance', label: 'Maintenance' },
];

const DISCIPLINE_SCOPE_MAP: Record<ServiceItem['category'], string[]> = {
  design: ['Compound Designing', 'Custom Landscape Design', 'Landscape Architecture Services'],
  hardscaping: [
    'Pavers (Paving & Block) Installation',
    'Driveway or Path Paving',
    'Outdoor Step Construction',
  ],
  planting: [
    'Lawn Installation & Grass Planting',
    'Rock Garden Design',
    'Flowers Planting & Garden Decorating',
  ],
  maintenance: ['Lawn Care & Maintenance', 'Garden Maintenance & Gardening Services'],
};

const MARQUEE_ITEMS = [
  'Compound Designing',
  'Interlocking Paver Laying',
  'Rock Garden Design',
  'Grass & Lawn Installation',
  'Outdoor Step Construction',
  'Tree & Flower Planting',
  'Indoor & Outdoor Plants',
  'Garden Maintenance',
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ServicesSection({
  selectedServices,
  onToggleService,
  onSelectDisciplineScope,
  onJumpToQuote,
}: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredServices =
    activeFilter === 'all'
      ? ALL_SERVICES
      : ALL_SERVICES.filter((service) => service.category === activeFilter);

  return (
    <section id="services" className="border-b border-[#DCE2DA] overflow-hidden">
      {/* Continuous Gentle Services Ribbon */}
      <div className="bg-[#111915] text-white/85 py-3.5 border-b border-white/10 overflow-hidden">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span key={index} className="inline-flex items-center gap-8 text-xs sm:text-sm font-medium">
              <span>{item}</span>
              <span aria-hidden="true" className="text-[#8ED0A9]">
                ·
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1B5E3A] mb-2">
              Capabilities &amp; Botanical Supply
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111915] mb-4"
              style={{ textWrap: 'balance' }}
            >
              End-to-end outdoor construction, compound paving, and living gardens.
            </h2>
            <p className="text-base text-[#46524B] leading-relaxed">
              Whether you are finishing a new residence, upgrading a commercial courtyard, or laying
              heavy-duty driveway pavers, our crew handles design, groundworks, planting, and
              scheduled upkeep under one roof.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={onJumpToQuote}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
          >
            <span>Get a Free Quote</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.button>
        </motion.div>

        {/* Asymmetric 4-Discipline Bento Grid with Direct Service CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {DISCIPLINES.map((discipline, idx) => (
            <motion.div
              key={discipline.index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
              whileHover={{ y: -3 }}
              className={`${
                discipline.featured ? 'lg:col-span-2' : 'lg:col-span-1'
              } bg-white border border-[#DCE2DA] hover:border-[#B6C5B6] rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#111915] tracking-tight">
                    <span className="text-[#1B5E3A] mr-2 tabular-nums">{discipline.index}</span>
                    {discipline.title}
                  </h3>
                </div>
                <p className="text-base font-medium text-[#111915] mb-2">{discipline.headline}</p>
                <p className="text-sm text-[#46524B] leading-relaxed mb-6">
                  {discipline.description}
                </p>
              </div>

              <div className="pt-5 border-t border-[#EAEFEA] flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-[#546159]">{discipline.highlights.join(' · ')}</p>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveFilter(discipline.category)}
                    className="text-xs font-medium text-[#46524B] hover:text-[#111915] underline underline-offset-4 cursor-pointer whitespace-nowrap"
                  >
                    Inspect services
                  </button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      onSelectDisciplineScope(DISCIPLINE_SCOPE_MAP[discipline.category])
                    }
                    className="group inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
                  >
                    <span>Book This Service</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Service Scope Builder + Plant Nursery Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="bg-white border border-[#DCE2DA] rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#EAEFEA]">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#111915] tracking-tight mb-1">
                Build Your Project Scope
              </h3>
              <p className="text-sm text-[#46524B]">
                Select any of our 20+ specialized services below to prepare an instant site visit
                quote.
              </p>
            </div>

            {/* Interactive Segmented Filter Bar with Sliding Active Indicator */}
            <div
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFF2EE] rounded-xl"
              role="tablist"
              aria-label="Filter landscaping services"
            >
              {FILTER_OPTIONS.map((option) => {
                const isActive = activeFilter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(option.id)}
                    className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A] ${
                      isActive ? 'text-[#111915]' : 'text-[#46524B] hover:text-[#111915]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="serviceFilterIndicator"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 bg-white rounded-lg shadow-xs"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clickable Service Items Grid with Smooth Filter Transitions */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 py-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => {
                const isSelected = selectedServices.includes(service.name);
                return (
                  <motion.button
                    layout
                    key={service.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => onToggleService(service.name)}
                    aria-pressed={isSelected}
                    className={`text-left p-4 rounded-xl border transition-colors duration-150 flex items-start justify-between gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A] ${
                      isSelected
                        ? 'bg-[#EDF5F0] border-[#1B5E3A]'
                        : 'bg-[#F9FAF8] border-[#E2E7E0] hover:border-[#B8C4B8]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#111915]">{service.name}</div>
                      <div className="text-xs text-[#546159] mt-1 leading-relaxed">
                        {service.summary}
                      </div>
                    </div>
                    <motion.span
                      key={isSelected ? 'checked' : 'plus'}
                      initial={{ scale: 0.75 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'bg-[#1B5E3A] text-white'
                          : 'bg-white border border-[#CED6CC] text-[#546159]'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </motion.span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* High-Converting Services CTA & Plant Store Bar */}
          <div className="pt-6 border-t border-[#EAEFEA] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EFF2EE] text-[#1B5E3A] flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-sm">
                <span className="font-semibold text-[#111915]">
                  Indoor &amp; Outdoor Plant Store — Old Port Bell Road:
                </span>{' '}
                <span className="text-[#46524B]">
                  Healthy potted plants ready for homes, offices, restaurants &amp; hotels.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(
                  selectedServices.length > 0
                    ? `Hello GreenScape Uganda, I would like a quote for: ${selectedServices.join(
                        ', '
                      )}.`
                    : 'Hello GreenScape Uganda, I would like to request pricing for your landscaping services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#111915] bg-[#EFF2EE] hover:bg-[#E2E7E0] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#1B5E3A]" aria-hidden="true" />
                <span>WhatsApp Estimate</span>
              </a>

              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJumpToQuote}
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
              >
                <span>
                  {selectedServices.length > 0
                    ? `Request Quote (${selectedServices.length} Selected)`
                    : 'Request Service Quote'}
                </span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
