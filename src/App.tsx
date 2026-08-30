import React from 'react';
import rawSoftwareData from './data/software_ps.json';
import rawAllData from './data/all_ps.json';
import { ProblemStatement, FilterState, ViewMode } from './types';
import { 
  getStoredFavorites, 
  toggleStoredFavorite, 
  getStoredNotes, 
  saveStoredNote, 
  getStoredDarkMode, 
  setStoredDarkMode,
  getStoredCompareList,
  toggleStoredCompare
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PSCard } from './components/PSCard';
import { PSDetailModal } from './components/PSDetailModal';
import { SplitView } from './components/SplitView';
import { TableView } from './components/TableView';
import { AnalyticsView } from './components/AnalyticsView';
import { CompareModal } from './components/CompareModal';
import { GuidelinesModal } from './components/GuidelinesModal';
import { FreeStackGuideModal } from './components/FreeStackGuideModal';
import { AboutAndTutorialModal } from './components/AboutAndTutorialModal';
import { ContactModal } from './components/ContactModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { FullAppRunner } from './components/FullAppRunner';
import { StandaloneAppView } from './components/StandaloneAppView';
import { Pagination } from './components/Pagination';
import { updateSeoMeta, getSeoFriendlyAppUrl, parsePsIdFromLocation } from './utils/seo';
import { Sparkles, Layers, RefreshCw, ShieldAlert, Heart, ExternalLink, Zap, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  const softwareData = rawSoftwareData as ProblemStatement[];
  const allData = rawAllData as ProblemStatement[];

  // App State
  const [darkMode, setDarkMode] = React.useState<boolean>(getStoredDarkMode);
  const [favorites, setFavorites] = React.useState<string[]>(getStoredFavorites);
  const [notes, setNotes] = React.useState<Record<string, string>>(getStoredNotes);
  const [compareList, setCompareList] = React.useState<string[]>(getStoredCompareList);
  
  const [selectedPS, setSelectedPS] = React.useState<ProblemStatement | null>(null);
  const [runningAppPS, setRunningAppPS] = React.useState<ProblemStatement | null>(null);
  const [standalonePS, setStandalonePS] = React.useState<ProblemStatement | null>(null);
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');

  // Pagination State
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(24);

  // Modals / Drawers
  const [showCompareModal, setShowCompareModal] = React.useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = React.useState(false);
  const [showFreeStackModal, setShowFreeStackModal] = React.useState(false);
  const [showAboutTutorialModal, setShowAboutTutorialModal] = React.useState(false);
  const [showContactModal, setShowContactModal] = React.useState(false);
  const [showFavoritesDrawer, setShowFavoritesDrawer] = React.useState(false);

  // Check URL parameters & search-friendly pathnames for direct live app launch e.g. /ps/sih26028-slug or /?app=SIH26028
  React.useEffect(() => {
    const checkUrl = () => {
      const appId = parsePsIdFromLocation(window.location.pathname, window.location.search);

      if (appId) {
        const raw = appId.toLowerCase().trim();
        const cleanNumber = raw.replace(/^sih/, '');
        
        // Match by ps_number or id
        const match = allData.find(p => {
          const pPsNumber = (p.ps_number || '').toLowerCase();
          const pId = String(p.id).toLowerCase();
          return pPsNumber === raw ||
                 pPsNumber === `sih${cleanNumber}` ||
                 pId === cleanNumber ||
                 pId === raw;
        });

        if (match) {
          setStandalonePS(match);
          updateSeoMeta({ ps: match });
          return;
        }
      }

      setStandalonePS(null);
      updateSeoMeta({});
    };

    checkUrl();
    window.addEventListener('popstate', checkUrl);
    return () => window.removeEventListener('popstate', checkUrl);
  }, [allData]);

  // Filters
  const initialFilter: FilterState = {
    searchQuery: '',
    category: 'Software',
    selectedThemes: [],
    selectedOrgs: [],
    selectedTags: [],
    sortBy: 'id_asc',
    onlyFavorites: false
  };

  const [filter, setFilter] = React.useState<FilterState>(initialFilter);

  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter, viewMode]);

  // Apply Dark Mode Class to HTML tag
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setStoredDarkMode(darkMode);
  }, [darkMode]);

  // Derived available options based on chosen category dataset
  const currentDataset = React.useMemo(() => {
    if (filter.category === 'Software') return softwareData;
    if (filter.category === 'Hardware') return allData.filter(d => d.category.toLowerCase() === 'hardware');
    return allData;
  }, [filter.category, softwareData, allData]);

  // Extract themes with counts
  const availableThemes = React.useMemo(() => {
    const counts: Record<string, number> = {};
    currentDataset.forEach(ps => {
      if (ps.theme) counts[ps.theme] = (counts[ps.theme] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [currentDataset]);

  // Extract orgs with counts
  const availableOrgs = React.useMemo(() => {
    const counts: Record<string, number> = {};
    currentDataset.forEach(ps => {
      if (ps.organization) counts[ps.organization] = (counts[ps.organization] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [currentDataset]);

  // Extract tags with counts
  const availableTags = React.useMemo(() => {
    const counts: Record<string, number> = {};
    currentDataset.forEach(ps => {
      ps.tags?.forEach(t => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [currentDataset]);

  // Filter and Sort logic
  const filteredItems = React.useMemo(() => {
    return currentDataset.filter(ps => {
      if (filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase().trim();
        const matchId = (ps.ps_number || '').toLowerCase().includes(q) || String(ps.id).includes(q);
        const matchTitle = (ps.title || '').toLowerCase().includes(q);
        const matchTheme = (ps.theme || '').toLowerCase().includes(q);
        const matchOrg = (ps.organization || '').toLowerCase().includes(q);
        const matchDesc = (ps.description || '').toLowerCase().includes(q);
        const matchTags = ps.tags?.some(t => t.toLowerCase().includes(q));

        if (!matchId && !matchTitle && !matchTheme && !matchOrg && !matchDesc && !matchTags) {
          return false;
        }
      }

      if (filter.selectedThemes.length > 0 && !filter.selectedThemes.includes(ps.theme)) {
        return false;
      }

      if (filter.selectedOrgs.length > 0 && !filter.selectedOrgs.includes(ps.organization)) {
        return false;
      }

      if (filter.selectedTags.length > 0 && !filter.selectedTags.some(t => ps.tags?.includes(t))) {
        return false;
      }

      if (filter.onlyFavorites && !favorites.includes(ps.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'id_asc') {
        return (Number(a.id) || 0) - (Number(b.id) || 0);
      }
      if (filter.sortBy === 'id_desc') {
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      }
      if (filter.sortBy === 'title_asc') {
        return a.title.localeCompare(b.title);
      }
      if (filter.sortBy === 'title_desc') {
        return b.title.localeCompare(a.title);
      }
      if (filter.sortBy === 'org_asc') {
        return a.organization.localeCompare(b.organization);
      }
      if (filter.sortBy === 'length_desc') {
        return (b.description?.length || 0) - (a.description?.length || 0);
      }
      return 0;
    });
  }, [currentDataset, filter, favorites]);

  // Paginated Slice for Grid / Table
  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const paginatedItems = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string) => {
    const updated = toggleStoredFavorite(id);
    setFavorites(updated);
  };

  const handleToggleCompare = (id: string) => {
    const updated = toggleStoredCompare(id);
    setCompareList(updated);
  };

  const handleSaveNote = (id: string, note: string) => {
    const updated = saveStoredNote(id, note);
    setNotes(updated);
  };

  const handleQuickTagSelect = (tag: string) => {
    setFilter(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag) ? [] : [tag]
    }));
  };

  const handleResetFilters = () => {
    setFilter(prev => ({
      ...initialFilter,
      category: prev.category
    }));
  };

  const handleSelectPS = (ps: ProblemStatement | null) => {
    setSelectedPS(ps);
    if (ps) {
      const friendlyUrl = getSeoFriendlyAppUrl(ps, false);
      window.history.pushState(null, '', friendlyUrl);
      updateSeoMeta({ ps });
    } else {
      window.history.pushState(null, '', '/');
      updateSeoMeta({});
    }
  };

  const handleLaunchApp = (ps: ProblemStatement) => {
    const friendlyUrl = getSeoFriendlyAppUrl(ps, false);
    window.history.pushState(null, '', friendlyUrl);
    setRunningAppPS(ps);
    updateSeoMeta({ ps });
  };

  const handleCloseApp = () => {
    window.history.pushState(null, '', '/');
    setRunningAppPS(null);
    updateSeoMeta({});
  };

  const handleExitStandalone = () => {
    window.history.pushState(null, '', '/');
    setStandalonePS(null);
    updateSeoMeta({});
  };

  const comparedItems = React.useMemo(() => {
    return allData.filter(ps => compareList.includes(ps.id));
  }, [compareList, allData]);

  // If directly navigated to standalone mode via URL
  if (standalonePS) {
    return (
      <StandaloneAppView
        ps={standalonePS}
        onExit={handleExitStandalone}
        onOpenTutorial={() => {
          setRunningAppPS(standalonePS);
        }}
        onOpenCodebase={() => {
          setRunningAppPS(standalonePS);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans transition-colors">
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setShowFavoritesDrawer(true)}
        compareCount={compareList.length}
        onOpenCompare={() => setShowCompareModal(true)}
        onOpenGuidelines={() => setShowGuidelinesModal(true)}
        onOpenFreeStackGuide={() => setShowFreeStackModal(true)}
        onOpenAboutTutorial={() => setShowAboutTutorialModal(true)}
        onOpenContact={() => setShowContactModal(true)}
        filteredItems={filteredItems}
        totalSoftwareCount={softwareData.length}
        totalAllCount={allData.length}
        categoryFilter={filter.category}
        setCategoryFilter={(cat) => setFilter(prev => ({ ...prev, category: cat }))}
      />

      {/* Hero Section */}
      <Hero
        totalSoftware={softwareData.length}
        totalHardware={allData.length - softwareData.length}
        themesCount={availableThemes.length}
        orgsCount={availableOrgs.length}
        onSelectQuickTag={handleQuickTagSelect}
        activeTag={filter.selectedTags[0] || ''}
        onOpenAboutTutorial={() => setShowAboutTutorialModal(true)}
      />

      {/* Filter and Control Bar */}
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        availableThemes={availableThemes}
        availableOrgs={availableOrgs}
        availableTags={availableTags}
        totalResults={filteredItems.length}
        onReset={handleResetFilters}
      />

      {/* Main Content Area on Pure White Background */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white text-slate-900">
        
        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No problem statements matched your filters
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Try changing or resetting your search keywords, themes, or organization selections.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedItems.map(ps => (
                    <PSCard
                      key={ps.id}
                      ps={ps}
                      isFavorite={favorites.includes(ps.id)}
                      onToggleFavorite={handleToggleFavorite}
                      isCompared={compareList.includes(ps.id)}
                      onToggleCompare={handleToggleCompare}
                      onSelect={handleSelectPS}
                      onLaunchApp={handleLaunchApp}
                      searchQuery={filter.searchQuery}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredItems.length}
                  onPageChange={handlePageChange}
                  onPageSizeChange={setPageSize}
                />
              </>
            )}

            {viewMode === 'split' && (
              <SplitView
                items={filteredItems}
                selectedPS={selectedPS}
                onSelectPS={handleSelectPS}
                onLaunchApp={handleLaunchApp}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
                notes={notes}
                onSaveNote={handleSaveNote}
              />
            )}

            {viewMode === 'table' && (
              <>
                <TableView
                  items={paginatedItems}
                  onSelectPS={handleSelectPS}
                  onLaunchApp={handleLaunchApp}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  compareList={compareList}
                  onToggleCompare={handleToggleCompare}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredItems.length}
                  onPageChange={handlePageChange}
                  onPageSizeChange={setPageSize}
                />
              </>
            )}

            {viewMode === 'analytics' && (
              <AnalyticsView
                items={filteredItems}
                onSelectTheme={(theme) => setFilter(prev => ({ ...prev, selectedThemes: [theme] }))}
                onSelectOrg={(org) => setFilter(prev => ({ ...prev, selectedOrgs: [org] }))}
                onSelectTag={(tag) => setFilter(prev => ({ ...prev, selectedTags: [tag] }))}
              />
            )}
          </>
        )}

      </main>

      {/* Comprehensive Footer with Disclaimer & Copyrights */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Footer Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  SIH
                </div>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  Smart India Hackathon 2026 Explorer
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Software Category Problem Statements Directory & Participant Companion.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 flex-wrap">
              <button 
                onClick={() => setShowAboutTutorialModal(true)}
                className="text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 font-bold"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>Why We Built This & Tutorial</span>
              </button>
              <span>•</span>
              <button 
                onClick={() => setShowFreeStackModal(true)}
                className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Zero-Cost Tech Stack</span>
              </button>
              <span>•</span>
              <a 
                href="https://sih.gov.in/sih2026PS" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Official SIH 2026 Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span>•</span>
              <button 
                onClick={() => setShowGuidelinesModal(true)}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Guidelines & PPT
              </button>
              <span>•</span>
              <button 
                onClick={() => setShowFavoritesDrawer(true)}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Saved List ({favorites.length})
              </button>
            </div>
          </div>

          {/* Disclaimer Box */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Disclaimer</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This platform is an independent exploration and reference tool created to help students, participants, and mentors navigate problem statements effectively. All problem statement titles, problem IDs, descriptions, organization trademarks, themes, and related intellectual property belong exclusively to their respective Government Ministries, Departments, Public Sector Undertakings (PSUs), and the Smart India Hackathon / AICTE / Ministry of Education Innovation Cell (MIC), Government of India. Official registrations, college SPOC nominations, and idea submissions must be submitted directly on the official portal at{' '}
              <a href="https://sih.gov.in" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 font-semibold underline">
                sih.gov.in
              </a>.
            </p>
          </div>

          {/* Bottom Copyrights Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="font-semibold text-slate-700 dark:text-slate-300">
              © 2026 Flugelsoft Labs. All Rights Reserved.
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              Designed & Built with precision by Flugelsoft Labs
            </div>
          </div>

        </div>
      </footer>

      {/* Full Detail Modal */}
      {selectedPS && (
        <PSDetailModal
          ps={selectedPS}
          onClose={() => handleSelectPS(null)}
          isFavorite={favorites.includes(selectedPS.id)}
          onToggleFavorite={handleToggleFavorite}
          isCompared={compareList.includes(selectedPS.id)}
          onToggleCompare={handleToggleCompare}
          note={notes[selectedPS.id] || ''}
          onSaveNote={handleSaveNote}
          onLaunchApp={handleLaunchApp}
        />
      )}

      {/* Live Full Application Runner */}
      {runningAppPS && (
        <FullAppRunner
          ps={runningAppPS}
          onClose={handleCloseApp}
        />
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <CompareModal
          comparedItems={comparedItems}
          onClose={() => setShowCompareModal(false)}
          onRemove={handleToggleCompare}
          onSelectPS={handleSelectPS}
        />
      )}

      {/* Guidelines Modal */}
      {showGuidelinesModal && (
        <GuidelinesModal
          onClose={() => setShowGuidelinesModal(false)}
        />
      )}

      {/* Free Stack Guide Modal */}
      {showFreeStackModal && (
        <FreeStackGuideModal
          onClose={() => setShowFreeStackModal(false)}
        />
      )}

      {/* Why We Built This & Student Tutorial Modal */}
      {showAboutTutorialModal && (
        <AboutAndTutorialModal
          onClose={() => setShowAboutTutorialModal(false)}
          onOpenGuidelines={() => setShowGuidelinesModal(true)}
          onOpenContact={() => setShowContactModal(true)}
        />
      )}

      {/* Contact Support & Workshop Request Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={showFavoritesDrawer}
        onClose={() => setShowFavoritesDrawer(false)}
        favorites={favorites}
        allPS={allData}
        onSelectPS={handleSelectPS}
        onToggleFavorite={handleToggleFavorite}
        notes={notes}
      />

    </div>
  );
};
