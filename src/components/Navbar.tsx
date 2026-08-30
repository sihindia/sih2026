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
    <header className="sticky top-0 z-40 w-full border-b border-[#1E3E62] bg-[#0B192C] text-white shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Left: Brand Identity with Navy Theme */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              title="SIH 2026 Problem Statement Explorer - Flugelsoft Labs"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-[#0B192C] shadow-md shadow-blue-500/20 font-black text-sm tracking-wider group-hover:scale-105 transition-transform">
                SIH
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                    SIH <span className="text-cyan-400">2026</span>
                  </span>
                </div>
                <p className="text-[11px] text-blue-200 hidden sm:block mt-0.5 font-medium">
                  Flugelsoft Labs Innovation Portal
                </p>
              </div>
            </a>
          </div>

          {/* Center: Category Switcher (Desktop) with Navy Blue styling */}
          <nav className="hidden lg:flex items-center bg-[#102A43] p-1 rounded-xl border border-[#243B53] shadow-inner text-xs font-semibold">
            <button
              onClick={() => setCategoryFilter('Software')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                categoryFilter === 'Software'
                  ? 'bg-white text-[#0B192C] shadow-sm font-black'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <span>💻 Software</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                categoryFilter === 'Software' ? 'bg-blue-100 text-[#0B192C]' : 'bg-[#1E3E62] text-white'
              }`}>
                {totalSoftwareCount}
              </span>
            </button>
            <button
              onClick={() => setCategoryFilter('Hardware')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                categoryFilter === 'Hardware'
                  ? 'bg-white text-[#0B192C] shadow-sm font-black'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <span>⚙️ Hardware</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                categoryFilter === 'Hardware' ? 'bg-blue-100 text-[#0B192C]' : 'bg-[#1E3E62] text-white'
              }`}>
                54
              </span>
            </button>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                categoryFilter === 'all'
                  ? 'bg-white text-[#0B192C] shadow-sm font-black'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <span>All ({totalAllCount})</span>
            </button>
          </nav>

          {/* Right: Primary Support & Contact Us Link + Decluttered Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Support / Contact Us Button */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-500/20 transition-all border border-emerald-400/40 active:scale-95 shrink-0"
              title="Need help setting up projects or requesting faculty workshops? Contact Flugelsoft Support"
            >
              <Headphones className="w-3.5 h-3.5 text-white" />
              <span className="tracking-tight">Support / Contact</span>
            </button>

            {/* Tutorial & Student Guide Button */}
            <button
              onClick={onOpenAboutTutorial}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[#102A43] hover:bg-[#1E3E62] text-slate-200 hover:text-white transition-colors border border-[#243B53] shrink-0"
              title="Why we built this, project setup tutorials, and student guides"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tutorial &amp; Guide</span>
            </button>

            {/* Resources Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowResourcesMenu(!showResourcesMenu)}
                className={`flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-xl border transition-colors ${
                  showResourcesMenu
                    ? 'bg-[#1E3E62] text-white border-blue-400'
                    : 'bg-[#102A43] text-slate-200 hover:bg-[#1E3E62] border-[#243B53]'
                }`}
                title="Explore guidelines, templates, and export options"
              >
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {showResourcesMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-[#1E3E62] py-2 z-50 text-xs animate-fadeIn"
                  onMouseLeave={() => setShowResourcesMenu(false)}
                >
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    Guides &amp; Blueprints
                  </div>
                  
                  <button
                    onClick={() => {
                      onOpenFreeStackGuide();
                      setShowResourcesMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-200 hover:bg-[#1E3E62] hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400/20" />
                    <div>
                      <div className="font-semibold">Zero-Cost Free Stack</div>
                      <div className="text-[10px] text-blue-300">$0 Hosting &amp; Cloud Blueprint</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenGuidelines();
                      setShowResourcesMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-200 hover:bg-[#1E3E62] hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="font-semibold">Official Guidelines &amp; PPT</div>
                      <div className="text-[10px] text-blue-300">Format and Evaluation Rules</div>
                    </div>
                  </button>

                  <div className="my-1.5 border-t border-[#1E3E62]" />
                  
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    Export Datasets ({filteredItems.length})
                  </div>

                  <button
                    onClick={() => {
                      exportToJSON(filteredItems, `sih2026_${categoryFilter}_problem_statements.json`);
                      setShowResourcesMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-slate-200 hover:bg-[#1E3E62] hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export as JSON</span>
                  </button>

                  <button
                    onClick={() => {
                      exportToCSV(filteredItems, `sih2026_${categoryFilter}_problem_statements.csv`);
                      setShowResourcesMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-slate-200 hover:bg-[#1E3E62] hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export as Spreadsheet (CSV)</span>
                  </button>

                  <div className="my-1.5 border-t border-[#1E3E62]" />

                  <a
                    href="https://sih.gov.in/sih2026PS"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 text-cyan-400 hover:bg-[#1E3E62] hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span className="font-semibold">Official sih.gov.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-6 w-px bg-[#1E3E62] mx-1" />

            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="relative p-2 text-slate-200 hover:bg-[#1E3E62] hover:text-white rounded-xl transition-colors"
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
              className="relative p-2 text-slate-200 hover:bg-[#1E3E62] hover:text-white rounded-xl transition-colors"
              title="Saved / Bookmarked Problem Statements"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-[#0B192C] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:bg-[#1E3E62] rounded-xl transition-colors lg:hidden"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1E3E62] py-3 space-y-2 animate-fadeIn text-xs bg-[#0B192C]">
            {/* Category Filter Pills on Mobile */}
            <div className="flex items-center bg-[#102A43] p-1 rounded-xl font-semibold mb-2 border border-[#243B53]">
              <button
                onClick={() => { setCategoryFilter('Software'); setMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 text-center rounded-lg ${categoryFilter === 'Software' ? 'bg-white text-[#0B192C] font-black shadow-sm' : 'text-slate-300'}`}
              >
                Software ({totalSoftwareCount})
              </button>
              <button
                onClick={() => { setCategoryFilter('Hardware'); setMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 text-center rounded-lg ${categoryFilter === 'Hardware' ? 'bg-white text-[#0B192C] font-black shadow-sm' : 'text-slate-300'}`}
              >
                Hardware (54)
              </button>
              <button
                onClick={() => { setCategoryFilter('all'); setMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 text-center rounded-lg ${categoryFilter === 'all' ? 'bg-white text-[#0B192C] font-black shadow-sm' : 'text-slate-300'}`}
              >
                All ({totalAllCount})
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { onOpenAboutTutorial(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-[#102A43] text-white flex items-center gap-2 font-semibold hover:bg-[#1E3E62]"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Tutorial &amp; Guide</span>
              </button>
              <button
                onClick={() => { onOpenFreeStackGuide(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-[#102A43] text-white flex items-center gap-2 font-semibold hover:bg-[#1E3E62]"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Zero-Cost Stack</span>
              </button>
              <button
                onClick={() => { onOpenGuidelines(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-[#102A43] text-white flex items-center gap-2 font-semibold hover:bg-[#1E3E62]"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Guidelines &amp; PPT</span>
              </button>
              <button
                onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-emerald-600 text-white flex items-center gap-2 font-bold hover:bg-emerald-500 shadow-sm"
              >
                <Headphones className="w-4 h-4 text-white" />
                <span>Support &amp; Contact</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
