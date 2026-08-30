import React from 'react';
import { 
  Headphones,
  BookOpen,
  Scale, 
  Bookmark, 
  Moon, 
  Sun, 
  Download, 
  FileText, 
  Zap, 
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  FileCode
} from 'lucide-react';
import { ProblemStatement } from '../types';
import { exportToJSON, exportToCSV } from '../utils/export';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenGuidelines: () => void;
  onOpenFreeStackGuide: () => void;
  onOpenAboutTutorial: () => void;
  onOpenContact: () => void;
  filteredItems: ProblemStatement[];
  totalSoftwareCount: number;
  totalAllCount: number;
  categoryFilter: 'all' | 'Software' | 'Hardware';
  setCategoryFilter: (cat: 'all' | 'Software' | 'Hardware') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  favoritesCount,
  onOpenFavorites,
  compareCount,
  onOpenCompare,
  onOpenGuidelines,
  onOpenFreeStackGuide,
  onOpenAboutTutorial,
  onOpenContact,
  filteredItems,
  totalSoftwareCount,
  totalAllCount,
  categoryFilter,
  setCategoryFilter,
}) => {
  const [showResourcesMenu, setShowResourcesMenu] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              title="SIH 2026 Problem Statement Explorer - Flugelsoft Labs"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 font-black text-sm tracking-wider group-hover:scale-105 transition-transform">
                SIH
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                    SIH <span className="text-brand-600 dark:text-brand-400">2026</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5">
                  Flugelsoft Labs Innovation Portal
                </p>
              </div>
            </a>
          </div>

          {/* Center: Clean Category Switcher (Desktop) */}
          <nav className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/70 dark:border-slate-700/60 shadow-inner text-xs font-semibold">
            <button
              onClick={() => setCategoryFilter('Software')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                categoryFilter === 'Software'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>💻 Software</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {totalSoftwareCount}
              </span>
            </button>
            <button
              onClick={() => setCategoryFilter('Hardware')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                categoryFilter === 'Hardware'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>⚙️ Hardware</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                54
              </span>
            </button>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                categoryFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>All ({totalAllCount})</span>
            </button>
          </nav>

          {/* Right: Primary Support & Contact Us Link + Decluttered Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Support / Contact Us Button (Primary, Prominent & User Friendly) */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-500/20 transition-all border border-emerald-500/30 active:scale-95 shrink-0"
              title="Need help setting up projects or requesting faculty workshops? Contact Flugelsoft Support"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-100" />
              <span className="tracking-tight">Support / Contact Us</span>
            </button>

            {/* Tutorial & Student Guide Button */}
            <button
              onClick={onOpenAboutTutorial}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shrink-0"
              title="Why we built this, project setup tutorials, and student guides"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Tutorial &amp; Guide</span>
            </button>

            {/* Resources Dropdown (Decluttered: Guidelines, Zero-Cost Stack, Export, Official Portal) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowResourcesMenu(!showResourcesMenu)}
                className={`flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-xl border transition-colors ${
                  showResourcesMenu
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600'
                    : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
                title="Explore guidelines, templates, and export options"
              >
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {showResourcesMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 text-xs animate-fadeIn"
                  onMouseLeave={() => setShowResourcesMenu(false)}
                >
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Guides &amp; Blueprints
                  </div>
                  
                  <button
                    onClick={() => {
                      onOpenFreeStackGuide();
                      setShowResourcesMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2.5 transition-colors"
                  >
                    <Zap className="w-4 h-4 text-amber-500 shrink-0 fill-amber-500/20" />
                    <div>
                      <div className="font-semibold">Zero-Cost Free Stack</div>
                      <div className="text-[10px] text-slate-500">$0 Hosting &amp; Cloud Blueprint</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenGuidelines();
                      setShowResourcesMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-brand-500 shrink-0" />
                    <div>
                      <div className="font-semibold">Official Guidelines &amp; PPT</div>
                      <div className="text-[10px] text-slate-500">Format and Evaluation Rules</div>
                    </div>
                  </button>

                  <div className="my-1.5 border-t border-slate-100 dark:border-slate-700/60" />
                  
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Export Datasets ({filteredItems.length})
                  </div>

                  <button
                    onClick={() => {
                      exportToJSON(filteredItems, `sih2026_${categoryFilter}_problem_statements.json`);
                      setShowResourcesMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export as JSON</span>
                  </button>

                  <button
                    onClick={() => {
                      exportToCSV(filteredItems, `sih2026_${categoryFilter}_problem_statements.csv`);
                      setShowResourcesMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export as Spreadsheet (CSV)</span>
                  </button>

                  <div className="my-1.5 border-t border-slate-100 dark:border-slate-700/60" />

                  <a
                    href="https://sih.gov.in/sih2026PS"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 text-brand-600 dark:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center justify-between transition-colors"
                  >
                    <span className="font-semibold">Official sih.gov.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Subtle Divider */}
            <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Compare Shortlisted Problem Statements"
            >
              <Scale className="w-4 h-4" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Favorites / Bookmarks */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Saved / Bookmarked Problem Statements"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title={darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors lg:hidden"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-2 animate-fadeIn text-xs">
            {/* Category Filter Pills on Mobile */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl font-semibold mb-2">
              <button
                onClick={() => { setCategoryFilter('Software'); setMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 text-center rounded-lg ${categoryFilter === 'Software' ? 'bg-white dark:bg-slate-900 text-brand-600 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Software ({totalSoftwareCount})
              </button>
              <button
                onClick={() => { setCategoryFilter('Hardware'); setMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 text-center rounded-lg ${categoryFilter === 'Hardware' ? 'bg-white dark:bg-slate-900 text-brand-600 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Hardware (54)
              </button>
              <button
                onClick={() => { setCategoryFilter('all'); setMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 text-center rounded-lg ${categoryFilter === 'all' ? 'bg-white dark:bg-slate-900 text-brand-600 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                All ({totalAllCount})
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { onOpenAboutTutorial(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 font-semibold"
              >
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Tutorial &amp; Guide</span>
              </button>
              <button
                onClick={() => { onOpenFreeStackGuide(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 font-semibold"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Zero-Cost Stack</span>
              </button>
              <button
                onClick={() => { onOpenGuidelines(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 font-semibold"
              >
                <FileText className="w-4 h-4 text-brand-500" />
                <span>Guidelines &amp; PPT</span>
              </button>
              <button
                onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-2 font-bold border border-emerald-200 dark:border-emerald-800"
              >
                <Headphones className="w-4 h-4 text-emerald-500" />
                <span>Support &amp; Contact</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
