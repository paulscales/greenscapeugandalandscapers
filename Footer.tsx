import { BUSINESS_INFO, LOGO_IMAGE_URL } from '../data/businessData';

export function Footer() {
  return (
    <footer className="bg-[#111915] text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/12">
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-2 shrink-0">
                <img
                  src={LOGO_IMAGE_URL}
                  alt="GreenScape Uganda logo"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div>
                <div className="font-display text-xl font-bold tracking-tight">
                  {BUSINESS_INFO.name}
                </div>
                <p className="mt-2 text-sm text-white/75 max-w-sm leading-relaxed">
                  Landscape architecture, compound designing, paver laying, rock gardens, lawn
                  installations, and indoor/outdoor plants in Kampala, Uganda.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2 text-sm text-white/75">
            <div className="font-semibold text-white mb-2">Visit &amp; Contact</div>
            <p>{BUSINESS_INFO.address}</p>
            <p className="tabular-nums">
              Phone / WhatsApp:{' '}
              <a
                href={BUSINESS_INFO.telHref}
                className="text-white hover:underline underline-offset-4"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </p>
            <p>Opens 9:00 AM Saturday</p>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm text-white/75">
            <div className="font-semibold text-white mb-2">Explore</div>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram ({BUSINESS_INFO.instagramHandle})
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <p>© {new Date().getFullYear()} GreenScape Uganda. Always we design, create and maintain.</p>
          <p>Old Port Bell Road, Wankoko · Kampala, Uganda</p>
        </div>
      </div>
    </footer>
  );
}
