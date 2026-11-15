import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../data/missionData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'mission', label: 'Our Mission' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'journal', label: 'Journal' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f4]/95 backdrop-blur-sm border-b border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-forest-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 rounded-sm cursor-pointer"
        >
          Harvest Field
        </button>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 rounded-sm ${
                  isActive
                    ? 'text-forest-950'
                    : 'text-stone-600 hover:text-forest-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-harvest-500"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('partner')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-forest-900 hover:bg-forest-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest-800"
          >
            Partner &amp; Give
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#faf8f4] px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-forest-900 text-white'
                    : 'text-stone-800 hover:bg-stone-200/70'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
