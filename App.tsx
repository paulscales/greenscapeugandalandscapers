/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { PortfolioSection } from './components/PortfolioSection';
import { QuoteSection } from './components/QuoteSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ServicesSection } from './components/ServicesSection';

export default function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Compound Designing',
  ]);

  const scrollToQuote = () => {
    const quoteEl = document.getElementById('quote');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((item) => item !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleSelectProjectScope = (services: string[]) => {
    setSelectedServices((prev) => {
      const merged = new Set([...prev, ...services]);
      return Array.from(merged);
    });
    scrollToQuote();
  };

  const handleRemoveService = (serviceName: string) => {
    setSelectedServices((prev) => prev.filter((item) => item !== serviceName));
  };

  const handleClearServices = () => {
    setSelectedServices([]);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F6F7F5] text-[#111915]">
        <Navbar onBookVisitClick={scrollToQuote} />
        <main className="flex-1">
          <Hero onRequestQuote={scrollToQuote} />
          <ServicesSection
            selectedServices={selectedServices}
            onToggleService={handleToggleService}
            onSelectDisciplineScope={handleSelectProjectScope}
            onJumpToQuote={scrollToQuote}
          />
          <PortfolioSection onSelectProjectScope={handleSelectProjectScope} />
          <FaqSection onRequestQuote={scrollToQuote} />
          <ReviewsSection />
          <QuoteSection
            selectedServices={selectedServices}
            onRemoveService={handleRemoveService}
            onClearServices={handleClearServices}
          />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
