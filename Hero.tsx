import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO, HERO_IMAGE_URL } from '../data/businessData';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onRequestQuote: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ onRequestQuote }: HeroProps) {
  return (
    <section className="pt-8 pb-12 lg:pt-14 lg:pb-16 border-b border-[#DCE2DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split-Screen Architectural Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Proposition & Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-4"
          >
            <div>
              {/* Quiet unboxed metadata line */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#46524B] mb-6">
                <span className="font-medium text-[#111915]">Kampala, Uganda</span>
                <span aria-hidden="true">·</span>
                <span>Old Port Bell Road, Wankoko</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-medium text-[#111915] tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" aria-hidden="true" />
                  5.0 Google Rating (5)
                </span>
              </div>

              <h1
                className="font-display font-bold tracking-tight text-[#111915] leading-[1.06] mb-6 max-w-2xl"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', textWrap: 'balance' }}
              >
                Architectural Landscapes &amp; Compound Design in Kampala.
              </h1>

              <p className="text-base sm:text-lg text-[#404C45] leading-relaxed max-w-xl mb-8">
                We design, pave, plant, and maintain enduring outdoor spaces for homes, apartments,
                offices, and hospitality venues—combining interlocking driveways, lush turf,
                sculpted rockeries, and vibrant tropical foliage.
              </p>

              {/* Single Primary CTA + Clean Secondary WhatsApp Action */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  onClick={onRequestQuote}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
                >
                  <span>Request Free Site Visit</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </motion.button>

                <motion.a
                  href={`${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(
                    'Hello GreenScape Uganda, I would like to inquire about landscaping / compound design in Kampala.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-[#111915] bg-white border border-[#CED6CC] hover:border-[#1B5E3A] hover:text-[#1B5E3A] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
                >
                  <MessageCircle className="w-4 h-4 text-[#1B5E3A]" aria-hidden="true" />
                  <span>WhatsApp {BUSINESS_INFO.phoneDisplay}</span>
                </motion.a>
              </div>
            </div>

            <p className="mt-8 pt-6 border-t border-[#E2E7E0] text-sm text-[#546159]">
              Serving Kololo, Naguru, Bugolobi, Muyenga, Ntinda, Kira &amp; Greater Kampala ·{' '}
              <span className="text-[#111915] font-medium">
                Always we design, create and maintain.
              </span>
            </p>
          </motion.div>

          {/* Right Column: Dominant 16:9 / Matching-Height Visual with Gentle Ambient Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#DCE2DA] bg-[#E7ECE5] min-h-[320px] sm:min-h-[420px]"
          >
            <motion.div
              animate={{ scale: [1, 1.045, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              <ResilientImage
                src={HERO_IMAGE_URL}
                alt="Custom flagstone courtyard patio, manicured lawn, firepit seating, and tropical borders designed by GreenScape Uganda"
                className="w-full h-full lg:h-full object-cover"
                fallbackTitle="Flagstone Courtyard & Tropical Borders"
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end pointer-events-none">
              <p className="text-xs font-medium text-white/80 tracking-wide mb-1">
                Featured Compound Transformation
              </p>
              <p className="font-display text-lg sm:text-xl font-semibold text-white">
                Flagstone Walkways, Turf Lawn &amp; Tropical Border Design
              </p>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Proof & Studio Operations Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: EASE_OUT_EXPO }}
          className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#DCE2DA] bg-white rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-[#DCE2DA]"
        >
          <div className="p-5 sm:p-6 transition-colors duration-150 hover:bg-[#FAFBF9]">
            <div className="font-display text-2xl font-bold text-[#111915] tabular-nums">
              5.0 / 5.0
            </div>
            <div className="mt-1 text-sm text-[#546159]">
              Verified Google Rating across Kampala clients
            </div>
          </div>
          <div className="p-5 sm:p-6 transition-colors duration-150 hover:bg-[#FAFBF9]">
            <div className="font-display text-2xl font-bold text-[#111915] tabular-nums">
              20+ Services
            </div>
            <div className="mt-1 text-sm text-[#546159]">
              Design, paver laying, turfing, rockeries &amp; care
            </div>
          </div>
          <div className="p-5 sm:p-6 transition-colors duration-150 hover:bg-[#FAFBF9]">
            <div className="font-display text-2xl font-bold text-[#111915]">Wankoko Studio</div>
            <div className="mt-1 text-sm text-[#546159]">
              Opposite MOTV, Old Port Bell Rd · Opens 9 AM Sat
            </div>
          </div>
          <div className="p-5 sm:p-6 transition-colors duration-150 hover:bg-[#FAFBF9]">
            <div className="font-display text-2xl font-bold text-[#1B5E3A] tabular-nums">
              {BUSINESS_INFO.phoneDisplay}
            </div>
            <div className="mt-1 text-sm text-[#546159]">
              Direct call or WhatsApp for site assessments
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
