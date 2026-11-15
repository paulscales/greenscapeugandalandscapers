import { ExternalLink, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO, REVIEWS, SOCIAL_UPDATES } from '../data/businessData';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 lg:py-24 border-b border-[#DCE2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left 8 Columns: Verified 5.0 Google Reviews */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
            >
              <div>
                <p className="text-sm font-medium text-[#1B5E3A] mb-2">Client Proof</p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111915]"
                  style={{ textWrap: 'balance' }}
                >
                  5.0 out of 5.0 from verified Kampala property owners.
                </h2>
              </div>

              <div className="shrink-0">
                <div className="flex items-center gap-1 text-[#D97706]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" aria-hidden="true" />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-[#111915] tabular-nums">
                    5.0 (5 Google Reviews)
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REVIEWS.map((review, idx) => (
                <motion.article
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-[#DCE2DA] rounded-2xl p-6 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className="flex items-center gap-0.5 text-[#D97706]"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: review.rating }).map((_, starIdx) => (
                          <Star key={starIdx} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                        ))}
                      </div>
                      <span className="text-xs text-[#546159]">{review.timeAgo}</span>
                    </div>

                    <p className="text-sm sm:text-base text-[#111915] leading-relaxed">
                      “{review.quote}”
                    </p>

                    {review.servicesTag && (
                      <p className="mt-3 text-xs text-[#546159]">Scope: {review.servicesTag}</p>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[#EAEFEA]">
                    <div>
                      <div className="text-sm font-semibold text-[#111915]">{review.author}</div>
                      <div className="text-xs text-[#546159]">{review.meta}</div>
                    </div>

                    {review.ownerReply && (
                      <div className="bg-[#F6F7F5] border border-[#E6EBE4] rounded-xl p-3.5">
                        <p className="text-xs font-semibold text-[#1B5E3A] mb-1">
                          Response from GreenScape Uganda · {review.ownerReplyTime}
                        </p>
                        <p className="text-xs text-[#46524B] leading-relaxed">
                          {review.ownerReply}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right 4 Columns: Latest Studio & Plant Stock Updates */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="lg:col-span-4 flex flex-col justify-between bg-[#111915] text-white rounded-2xl p-7 sm:p-8"
          >
            <div>
              <p className="text-xs font-medium text-[#8ED0A9] tracking-wide mb-2">
                Recent Studio Updates
              </p>
              <h3 className="font-display text-2xl font-bold tracking-tight mb-6">
                Fresh from our Kampala plant store &amp; field crew.
              </h3>

              <div className="divide-y divide-white/12">
                {SOCIAL_UPDATES.map((post) => (
                  <div key={post.id} className="py-5 first:pt-0 last:pb-0">
                    <p className="text-xs text-white/60 mb-1.5">
                      {post.channel} · {post.timeAgo}
                    </p>
                    <h4 className="font-display text-base font-semibold text-white mb-1.5">
                      {post.title}
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">{post.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col gap-3">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-4 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Follow {BUSINESS_INFO.instagramHandle}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-4 py-3 text-sm font-medium text-white/85 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Read &amp; Rate on Google Maps</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
