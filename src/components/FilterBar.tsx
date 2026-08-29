import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  LayoutGrid, 
  Columns2, 
  Table as TableIcon, 
  BarChart3, 
  ArrowUpDown, 
  Check, 
  BookmarkCheck,
  ChevronDown
} from 'lucide-react';
import { FilterState, ViewMode } from '../types';

interface FilterBarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  availableThemes: { name: string; count: number }[];
  availableOrgs: { name: string; count: number }[];
  availableTags: { name: string; count: number }[];
  totalResults: number;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  setFilter,
  viewMode,
  setViewMode,
  availableThemes,
  availableOrgs,
  availableTags,
  totalResults,
  onReset
}) => {
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);
  const [showOrgMenu, setShowOrgMenu] = React.useState(false);
  const [orgSearch, setOrgSearch] = React.useState('');

  const filteredOrgsList = availableOrgs.filter(o => 
    o.name.toLowerCase().includes(orgSearch.toLowerCase())
  );

  const hasActiveFilters = 
    filter.searchQuery || 
    filter.selectedThemes.length > 0 || 
    filter.selectedOrgs.length > 0 || 
    filter.selectedTags.length > 0 || 
    filter.onlyFavorites;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Top Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={filter.searchQuery}
              onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search by PS ID (e.g. 26001), Title, Ministry, or Keyword..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            />
            {filter.searchQuery && (
              <button
                onClick={() => setFilter(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Switcher & Sort Selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
            
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filter.sortBy}
                onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-transparent focus:outline-none cursor-pointer pr-1 font-medium"
              >
                <option value="id_asc">PS ID (Ascending)</option>
                <option value="id_desc">PS ID (Descending)</option>
                <option value="title_asc">Title (A to Z)</option>
                <option value="title_desc">Title (Z to A)</option>
                <option value="org_asc">Organization (A to Z)</option>
                <option value="length_desc">Detail Length (High to Low)</option>
              </select>
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Split Reader View"
              >
                <Columns2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Dense Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'analytics'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Analytics & Charts"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Filter Dropdowns & Active Badges Row */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
          
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Theme Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  setShowOrgMenu(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border transition-all ${
                  filter.selectedThemes.length > 0
                    ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                }`}
              >
                <span>Theme {filter.selectedThemes.length > 0 ? `(${filter.selectedThemes.length})` : ''}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {showThemeMenu && (
                <div 
                  className="absolute left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50"
                  onMouseLeave={() => setShowThemeMenu(false)}
                >
                  <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-100 dark:border-slate-700 px-1 font-semibold text-slate-500 text-[11px] uppercase tracking-wider">
                    <span>Filter by Theme</span>
                    {filter.selectedThemes.length > 0 && (
                      <button 
                        onClick={() => setFilter(prev => ({ ...prev, selectedThemes: [] }))}
                        className="text-brand-600 hover:underline text-[11px]"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {availableThemes.map(t => {
                    const isChecked = filter.selectedThemes.includes(t.name);
                    return (
                      <label
                        key={t.name}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer text-slate-800 dark:text-slate-200"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setFilter(prev => ({
                                ...prev,
                                selectedThemes: isChecked
                                  ? prev.selectedThemes.filter(name => name !== t.name)
                                  : [...prev.selectedThemes, t.name]
                              }));
                            }}
                            className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-3.5 w-3.5"
                          />
                          <span className="truncate">{t.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 ml-2 font-mono">{t.count}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Organization Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowOrgMenu(!showOrgMenu);
                  setShowThemeMenu(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border transition-all ${
                  filter.selectedOrgs.length > 0
                    ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                }`}
              >
                <span>Ministry / Org {filter.selectedOrgs.length > 0 ? `(${filter.selectedOrgs.length})` : ''}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {showOrgMenu && (
                <div 
                  className="absolute left-0 mt-2 w-80 max-h-80 overflow-y-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50"
                  onMouseLeave={() => setShowOrgMenu(false)}
                >
                  <div className="p-1 mb-2 border-b border-slate-100 dark:border-slate-700">
                    <input
                      type="text"
                      placeholder="Search Ministry / Org..."
                      value={orgSearch}
                      onChange={(e) => setOrgSearch(e.target.value)}
                      className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  {filteredOrgsList.map(o => {
                    const isChecked = filter.selectedOrgs.includes(o.name);
                    return (
                      <label
                        key={o.name}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer text-slate-800 dark:text-slate-200"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setFilter(prev => ({
                                ...prev,
                                selectedOrgs: isChecked
                                  ? prev.selectedOrgs.filter(name => name !== o.name)
                                  : [...prev.selectedOrgs, o.name]
                              }));
                            }}
                            className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-3.5 w-3.5"
                          />
                          <span className="truncate">{o.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 ml-2 font-mono">{o.count}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Starred / Favorites Filter Button */}
            <button
              onClick={() => setFilter(prev => ({ ...prev, onlyFavorites: !prev.onlyFavorites }))}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border transition-all ${
                filter.onlyFavorites
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Bookmarked Only</span>
            </button>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-medium flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}

          </div>

          {/* Results Counter */}
          <div className="text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-900 dark:text-white">{totalResults}</strong> problem statements
          </div>

        </div>

      </div>
    </div>
  );
};
