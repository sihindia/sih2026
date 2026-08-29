import React from 'react';
import { 
  Sparkles, 
  Bookmark, 
  Scale, 
  Download, 
  Moon, 
  Sun, 
  FileText, 
  ExternalLink,
  Zap,
  BookOpen,
  Heart
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
  filteredItems,
  totalSoftwareCount,
  totalAllCount,
  categoryFilter,
  setCategoryFilter,
}) => {
  const [showExportMenu, setShowExportMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 font-bold text-lg">
              SIH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  SIH <span className="text-brand-600 dark:text-brand-400">2026</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Official PS Hub
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Smart India Hackathon Problem Statement Explorer
              </p>
            </div>
          </div>

          {/* Center Category Pills */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setCategoryFilter('Software')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'Software'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              💻 Software ({totalSoftwareCount})
            </button>
            <button
              onClick={() => setCategoryFilter('Hardware')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'Hardware'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ⚙️ Hardware (54)
            </button>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({totalAllCount})
            </button>
          </div>

          {/* Right Action Icons & Header Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Why We Built This & Student Guide Link */}
            <button
              onClick={onOpenAboutTutorial}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20 hover:from-brand-700 hover:to-indigo-700 transition-all animate-pulse-subtle"
              title="Why this was built, why software is easy, and how to get started"
            >
              <Heart className="w-3.5 h-3.5 text-rose-300 fill-current" />
              <span>Why We Built This & Tutorial</span>
            </button>

            {/* Zero-Cost Stack Trigger */}
            <button
              onClick={onOpenFreeStackGuide}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
              title="100% Free Hosting & Zero-Cost Tech Stack Blueprint"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>Zero-Cost Stack</span>
            </button>

            {/* Guidelines & PPT Button */}
            <button
              onClick={onOpenGuidelines}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
              title="Official Guidelines & Presentation Template"
            >
              <FileText className="w-3.5 h-3.5 text-brand-500" />
              <span>Guidelines</span>
            </button>

            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Compare Problem Statements"
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
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Saved / Shortlisted Problem Statements"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Export Data"
              >
                <Download className="w-4 h-4" />
              </button>

              {showExportMenu && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 text-xs"
                  onMouseLeave={() => setShowExportMenu(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Export Filtered ({filteredItems.length})
                  </div>
                  <button
                    onClick={() => {
                      exportToJSON(filteredItems, `sih2026_${categoryFilter}_problem_statements.json`);
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2"
                  >
                    <span>JSON Dataset (.json)</span>
                  </button>
                  <button
                    onClick={() => {
                      exportToCSV(filteredItems, `sih2026_${categoryFilter}_problem_statements.csv`);
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2"
                  >
                    <span>Excel / Spreadsheet (.csv)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Official SIH Link */}
            <a
              href="https://sih.gov.in/sih2026PS"
              target="_blank"
              rel="noreferrer"
              className="hidden xl:flex items-center gap-1.5 ml-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/50 border border-brand-200/60 dark:border-brand-800/60 transition-colors"
            >
              <span>sih.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>

          </div>
        </div>
      </div>
    </header>
  );
};
