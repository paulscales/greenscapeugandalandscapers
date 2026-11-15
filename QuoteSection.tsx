import { FormEvent, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BUSINESS_INFO, LOGO_IMAGE_URL } from '../data/businessData';

interface QuoteSectionProps {
  selectedServices: string[];
  onRemoveService: (serviceName: string) => void;
  onClearServices: () => void;
}

interface QuoteFormState {
  fullName: string;
  phone: string;
  neighborhood: string;
  propertyType: string;
  compoundSize: string;
  notes: string;
}

const INITIAL_FORM: QuoteFormState = {
  fullName: '',
  phone: '',
  neighborhood: '',
  propertyType: 'Residential Compound',
  compoundSize: 'Medium Plot (50 × 100 ft / ~450 sqm)',
  notes: '',
};

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function QuoteSection({
  selectedServices,
  onRemoveService,
  onClearServices,
}: QuoteSectionProps) {
  const [form, setForm] = useState<QuoteFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormState, string>>>({});
  const [submittedBrief, setSubmittedBrief] = useState<{
    whatsappUrl: string;
    plainText: string;
    summaryLines: string[];
  } | null>(null);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof QuoteFormState, string>> = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your name.';
    }
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      nextErrors.phone = 'Enter a valid Uganda phone or WhatsApp number (e.g. 0781 021371).';
    }
    if (form.neighborhood.trim().length < 2) {
      nextErrors.neighborhood = 'Enter your Kampala area or estate (e.g. Bugolobi, Kololo, Ntinda).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const servicesList =
      selectedServices.length > 0 ? selectedServices.join(', ') : 'General Landscaping Consultation';

    const messageText = [
      'Hello GreenScape Uganda, I would like to request a site visit / quote:',
      `• Name: ${form.fullName.trim()}`,
      `• Phone: ${form.phone.trim()}`,
      `• Location: ${form.neighborhood.trim()}`,
      `• Property Type: ${form.propertyType}`,
      `• Estimated Area: ${form.compoundSize}`,
      `• Services Needed: ${servicesList}`,
      form.notes.trim() ? `• Notes: ${form.notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(messageText)}`;
    const plainText = [
      'GREENSCAPE UGANDA — SITE VISIT & PROJECT BRIEF',
      `Studio: ${BUSINESS_INFO.address}`,
      `Phone / WhatsApp: ${BUSINESS_INFO.phoneIntl}`,
      '--------------------------------------------------',
      `Client Name: ${form.fullName.trim()}`,
      `Phone / WhatsApp: ${form.phone.trim()}`,
      `Location: ${form.neighborhood.trim()}`,
      `Property Type: ${form.propertyType}`,
      `Estimated Area: ${form.compoundSize}`,
      `Services Requested: ${servicesList}`,
      form.notes.trim() ? `Project Notes: ${form.notes.trim()}` : '',
      `Generated: ${new Date().toLocaleDateString()}`,
    ]
      .filter(Boolean)
      .join('\n');

    setSubmittedBrief({
      whatsappUrl,
      plainText,
      summaryLines: [
        `${form.fullName.trim()} (${form.phone.trim()})`,
        `${form.propertyType} in ${form.neighborhood.trim()} · ${form.compoundSize}`,
        `Scope: ${servicesList}`,
      ],
    });
  };

  const handleDownloadBrief = () => {
    if (!submittedBrief) return;
    const blob = new Blob([submittedBrief.plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'greenscape-uganda-project-brief.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="quote" className="py-16 lg:py-24 bg-[#EFF2EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Columns: Direct Kampala Studio & Nursery Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <p className="text-sm font-medium text-[#1B5E3A] mb-2">
                Book a Site Visit or Plant Pickup
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111915] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Speak directly with our Kampala landscaping team.
              </h2>
              <p className="text-base text-[#46524B] leading-relaxed">
                Visit our plant store on Old Port Bell Road or send your compound details for an
                on-site measurement and tailored quotation anywhere in Greater Kampala.
              </p>
            </div>

            <div className="bg-white border border-[#DCE2DA] rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-4 pb-5 border-b border-[#EAEFEA]">
                <img
                  src={LOGO_IMAGE_URL}
                  alt="GreenScape Uganda – Design, Create, Maintain"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-contain rounded-xl border border-[#EAEFEA] bg-white p-1 shrink-0"
                />
                <div>
                  <div className="font-display text-base font-bold text-[#111915]">
                    GreenScape Uganda
                  </div>
                  <div className="text-xs font-medium text-[#1B5E3A] mt-0.5">
                    Design · Create · Maintain
                  </div>
                  <div className="text-xs text-[#546159] mt-1">
                    Kampala Studio &amp; Plant Nursery
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#1B5E3A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-sm font-semibold text-[#111915]">
                    Studio &amp; Plant Store
                  </div>
                  <div className="text-sm text-[#46524B] mt-0.5">{BUSINESS_INFO.address}</div>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1.5 text-xs font-semibold text-[#1B5E3A] hover:underline underline-offset-4"
                  >
                    Get Google Maps Directions
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAEFEA] flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#1B5E3A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-sm font-semibold text-[#111915]">Opening Hours</div>
                  <div className="text-sm text-[#46524B] mt-0.5">
                    Opens 9:00 AM Saturday · Weekday site visits by appointment
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAEFEA] flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#1B5E3A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-sm font-semibold text-[#111915]">Call or WhatsApp</div>
                  <div className="text-sm text-[#46524B] mt-0.5 tabular-nums">
                    {BUSINESS_INFO.phoneDisplay} ({BUSINESS_INFO.phoneIntl})
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    <a
                      href={BUSINESS_INFO.telHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#111915] bg-[#EFF2EE] hover:bg-[#E2E7E0] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                    </a>
                    <a
                      href={BUSINESS_INFO.whatsappBase}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Open WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Selected Services Summary */}
            <div className="bg-white border border-[#DCE2DA] rounded-2xl p-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-sm font-semibold text-[#111915]">
                  Selected Scope ({selectedServices.length})
                </h3>
                {selectedServices.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearServices}
                    className="text-xs font-medium text-[#546159] hover:text-[#111915] cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {selectedServices.length === 0 ? (
                <p className="text-xs text-[#546159] leading-relaxed">
                  No specific services pre-selected yet. You can select items in the Services section
                  above or describe your project in the form.
                </p>
              ) : (
                <ul className="space-y-2">
                  <AnimatePresence initial={false}>
                    {selectedServices.map((service) => (
                      <motion.li
                        key={service}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-between gap-2 text-xs text-[#111915] py-1.5 border-b border-[#EAEFEA] last:border-b-0"
                      >
                        <span>{service}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveService(service)}
                          aria-label={`Remove ${service}`}
                          className="p-1 text-[#546159] hover:text-[#111915] cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </motion.div>

          {/* Right 7 Columns: Validated Site Visit & Instant WhatsApp Quote Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7 bg-white border border-[#DCE2DA] rounded-2xl p-6 sm:p-8 lg:p-10"
          >
            <AnimatePresence mode="wait">
              {submittedBrief ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                  className="py-4 space-y-6"
                >
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2
                      className="w-7 h-7 text-[#1B5E3A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[#111915]">
                        Your site visit brief is ready
                      </h3>
                      <p className="text-sm text-[#46524B] mt-1 leading-relaxed">
                        Send this structured brief directly to GreenScape Uganda on WhatsApp so our
                        team can confirm a site visit slot or give an initial estimate.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F6F7F5] border border-[#DCE2DA] rounded-xl p-5 space-y-2 text-sm text-[#111915]">
                    {submittedBrief.summaryLines.map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 no-print">
                    <motion.a
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      href={submittedBrief.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Brief via WhatsApp (0781 021371)</span>
                    </motion.a>

                    <button
                      type="button"
                      onClick={handleDownloadBrief}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[#111915] bg-white border border-[#CED6CC] hover:border-[#1B5E3A] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#1B5E3A]" aria-hidden="true" />
                      <span>Download Brief</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[#111915] bg-white border border-[#CED6CC] hover:border-[#1B5E3A] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-[#1B5E3A]" aria-hidden="true" />
                      <span>Print / Save PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedBrief(null)}
                      className="px-4 py-3.5 text-sm font-medium text-[#111915] bg-[#EFF2EE] hover:bg-[#E2E7E0] rounded-lg transition-colors cursor-pointer"
                    >
                      Edit Details
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#111915] tracking-tight">
                      Request a Site Visit &amp; Quote
                    </h3>
                    <p className="text-sm text-[#46524B] mt-1">
                      Share your compound location and scope—takes under 45 seconds.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-[#111915] mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => {
                          setForm({ ...form, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="e.g. Sarah Namukasa"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAF8] border border-[#CED6CC] rounded-lg focus:outline-none focus:border-[#1B5E3A] focus:ring-1 focus:ring-[#1B5E3A]"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-red-700" role="alert">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[#111915] mb-1.5"
                      >
                        Phone / WhatsApp Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="e.g. 0781 021371"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAF8] border border-[#CED6CC] rounded-lg focus:outline-none focus:border-[#1B5E3A] focus:ring-1 focus:ring-[#1B5E3A] tabular-nums"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-700" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="neighborhood"
                        className="block text-sm font-medium text-[#111915] mb-1.5"
                      >
                        Kampala Area / Estate
                      </label>
                      <input
                        id="neighborhood"
                        type="text"
                        value={form.neighborhood}
                        onChange={(e) => {
                          setForm({ ...form, neighborhood: e.target.value });
                          if (errors.neighborhood) setErrors({ ...errors, neighborhood: undefined });
                        }}
                        placeholder="e.g. Bugolobi, Kololo, Ntinda, Kira"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAF8] border border-[#CED6CC] rounded-lg focus:outline-none focus:border-[#1B5E3A] focus:ring-1 focus:ring-[#1B5E3A]"
                      />
                      {errors.neighborhood && (
                        <p className="mt-1.5 text-xs text-red-700" role="alert">
                          {errors.neighborhood}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="propertyType"
                        className="block text-sm font-medium text-[#111915] mb-1.5"
                      >
                        Property Type
                      </label>
                      <select
                        id="propertyType"
                        value={form.propertyType}
                        onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAF8] border border-[#CED6CC] rounded-lg focus:outline-none focus:border-[#1B5E3A] focus:ring-1 focus:ring-[#1B5E3A]"
                      >
                        <option>Residential Compound</option>
                        <option>Apartment / Housing Estate</option>
                        <option>Office / Restaurant / Hotel</option>
                        <option>Driveway &amp; Paver Installation Only</option>
                        <option>Indoor / Outdoor Plants Order</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="compoundSize"
                      className="block text-sm font-medium text-[#111915] mb-1.5"
                    >
                      Approximate Compound / Garden Size
                    </label>
                    <select
                      id="compoundSize"
                      value={form.compoundSize}
                      onChange={(e) => setForm({ ...form, compoundSize: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAF8] border border-[#CED6CC] rounded-lg focus:outline-none focus:border-[#1B5E3A] focus:ring-1 focus:ring-[#1B5E3A]"
                    >
                      <option>Compact Courtyard / Front Border (&lt; 200 sqm)</option>
                      <option>Medium Plot (50 × 100 ft / ~450 sqm)</option>
                      <option>Large Residence (100 × 100 ft / ~900+ sqm)</option>
                      <option>Commercial Grounds / Multi-Unit Estate</option>
                      <option>Not sure — please measure on site</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-[#111915] mb-1.5"
                    >
                      Project Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Tell us if you need driveway paving, grass planting, a rock garden, or indoor plants..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAF8] border border-[#CED6CC] rounded-lg focus:outline-none focus:border-[#1B5E3A] focus:ring-1 focus:ring-[#1B5E3A]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3.5 text-sm font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
                    >
                      Prepare Quote &amp; Site Visit Brief
                    </motion.button>
                    <p className="text-xs text-[#546159]">
                      Direct response via WhatsApp or phone call from {BUSINESS_INFO.phoneDisplay}.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
