/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { PageId } from './data/missionData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MissionPage } from './pages/MissionPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { GalleryPage } from './pages/GalleryPage';
import { JournalPage } from './pages/JournalPage';
import { PartnerPage } from './pages/PartnerPage';

const VALID_PAGES: PageId[] = ['home', 'mission', 'leadership', 'gallery', 'journal', 'partner'];

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#', '').split('/')[0] as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const next = getInitialPage();
      setCurrentPage(next);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (page !== 'journal') {
      setSelectedArticleSlug(null);
    }
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string | null) => {
    setSelectedArticleSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-[#1c1917]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectArticle={(slug) => setSelectedArticleSlug(slug)}
          />
        )}
        {currentPage === 'mission' && <MissionPage onNavigate={handleNavigate} />}
        {currentPage === 'leadership' && <LeadershipPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'journal' && (
          <JournalPage
            selectedSlug={selectedArticleSlug}
            onSelectArticle={handleSelectArticle}
          />
        )}
        {currentPage === 'partner' && <PartnerPage />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
