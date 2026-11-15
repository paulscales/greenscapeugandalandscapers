import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LOGO_IMAGE_URL } from '../data/businessData';

interface NavbarProps {
  onBookVisitClick: () => void;
}

export function Navbar({ onBookVisitClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#quote' },
  ];

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F7F5]/95 backdrop-blur-sm border-b border-[#DCE2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo Mark + Single-line Wordmark */}
        <a
          href="#"
          className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-bold tracking-tight text-[#111915] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5E3A] rounded-sm"
        >
          <span className="w-10 h-10 rounded-lg bg-white border border-[#DCE2DA] overflow-hidden flex items-center justify-center shrink-0">
            <img
              src={LOGO_IMAGE_URL}
              alt="GreenScape Uganda emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain scale-[1.85] origin-[48%_33%]"
            />
          </span>
          <span>GreenScape Uganda</span>
        </a>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#46524B]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#111915] hover:underline underline-offset-4 decoration-[#1B5E3A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5E3A] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookVisitClick}
            className="px-4 py-2.5 text-sm font-medium text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
          >
            Book Site Visit
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2.5 text-[#111915] hover:bg-[#E7ECE5] rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#DCE2DA] bg-[#F6F7F5] px-4 py-4 space-y-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-[#111915] hover:bg-[#E7ECE5] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
