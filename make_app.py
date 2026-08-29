import os
import json

# Ensure dirs exist
os.makedirs('src/types', exist_ok=True)
os.makedirs('src/utils', exist_ok=True)
os.makedirs('src/components', exist_ok=True)
os.makedirs('src/data', exist_ok=True)

# 1. src/types/index.ts
with open('src/types/index.ts', 'w', encoding='utf-8') as f:
    f.write('''export interface ExternalLink {
  text: string;
  url: string;
}

export interface ProblemStatement {
  s_no: number | string;
  id: string;
  ps_number: string;
  modal_id: string;
  title: string;
  category: 'Software' | 'Hardware' | string;
  theme: string;
  organization: string;
  department: string;
  description: string;
  submitted_ideas: string;
  deadline: string;
  youtube_links: ExternalLink[];
  dataset_links: ExternalLink[];
  desc_links: ExternalLink[];
  contact_info: string;
  sections?: {
    background: string;
    description: string;
    expected_solution: string;
  };
  tags?: string[];
  stats?: {
    word_count: number;
    read_time_mins: number;
  };
}

export type ViewMode = 'grid' | 'split' | 'table' | 'analytics';

export interface FilterState {
  searchQuery: string;
  category: 'all' | 'Software' | 'Hardware';
  selectedThemes: string[];
  selectedOrgs: string[];
  selectedTags: string[];
  sortBy: 'id_asc' | 'id_desc' | 'title_asc' | 'title_desc' | 'org_asc' | 'length_desc';
  onlyFavorites: boolean;
}
''')

# 2. src/utils/storage.ts
with open('src/utils/storage.ts', 'w', encoding='utf-8') as f:
    f.write('''const FAVORITES_KEY = 'sih2026_favorites';
const NOTES_KEY = 'sih2026_notes';
const THEME_KEY = 'sih2026_dark_theme';
const COMPARE_KEY = 'sih2026_compare';

export const getStoredFavorites = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const toggleStoredFavorite = (id: string): string[] => {
  const favs = getStoredFavorites();
  const index = favs.indexOf(id);
  let updated: string[];
  if (index >= 0) {
    updated = favs.filter(item => item !== id);
  } else {
    updated = [...favs, id];
  }
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
};

export const getStoredNotes = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export const saveStoredNote = (id: string, note: string): Record<string, string> => {
  const notes = getStoredNotes();
  const updated = { ...notes, [id]: note };
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
};

export const getStoredDarkMode = (): boolean => {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw !== null) {
      return raw === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (e) {
    return false;
  }
};

export const setStoredDarkMode = (isDark: boolean) => {
  try {
    localStorage.setItem(THEME_KEY, String(isDark));
  } catch (e) {}
};

export const getStoredCompareList = (): string[] => {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const toggleStoredCompare = (id: string): string[] => {
  const list = getStoredCompareList();
  const exists = list.includes(id);
  let updated: string[];
  if (exists) {
    updated = list.filter(item => item !== id);
  } else {
    if (list.length >= 3) {
      updated = [...list.slice(1), id];
    } else {
      updated = [...list, id];
    }
  }
  try {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
};
''')

# 3. src/utils/export.ts
with open('src/utils/export.ts', 'w', encoding='utf-8') as f:
    f.write('''import { ProblemStatement } from '../types';

export const exportToJSON = (items: ProblemStatement[], filename = 'sih2026_software_problem_statements.json') => {
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToCSV = (items: ProblemStatement[], filename = 'sih2026_problem_statements.csv') => {
  const headers = ['PS Number', 'Title', 'Category', 'Theme', 'Organization', 'Department', 'Deadline', 'Description'];
  
  const rows = items.map(ps => [
    `"${ps.ps_number || ps.id}"`,
    `"${ps.title.replace(/"/g, '""')}"`,
    `"${ps.category}"`,
    `"${ps.theme}"`,
    `"${ps.organization.replace(/"/g, '""')}"`,
    `"${ps.department.replace(/"/g, '""')}"`,
    `"${ps.deadline}"`,
    `"${ps.description.replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const generateMarkdownPS = (ps: ProblemStatement, teamNote?: string): string => {
  let md = `# [${ps.ps_number || ps.id}] ${ps.title}\\n\\n`;
  md += `**Category:** ${ps.category}  \\n`;
  md += `**Theme:** ${ps.theme}  \\n`;
  md += `**Organization:** ${ps.organization}  \\n`;
  md += `**Department:** ${ps.department}  \\n`;
  md += `**Submission Deadline:** ${ps.deadline}  \\n`;
  md += `**Official SIH Reference:** https://sih.gov.in/sih2026PS\\n\\n`;

  if (ps.tags && ps.tags.length > 0) {
    md += `**Relevant Tech/Tags:** ${ps.tags.join(', ')}\\n\\n`;
  }

  if (ps.youtube_links && ps.youtube_links.length > 0) {
    md += `**YouTube Reference:** ${ps.youtube_links.map(l => l.url).join(', ')}\\n\\n`;
  }

  if (ps.dataset_links && ps.dataset_links.length > 0) {
    md += `**Dataset Reference:** ${ps.dataset_links.map(l => l.url).join(', ')}\\n\\n`;
  }

  md += `## Problem Description\\n\\n${ps.description}\\n\\n`;

  if (teamNote) {
    md += `## Team Brainstorming Notes\\n\\n${teamNote}\\n\\n`;
  }

  md += `---\\n*Exported from SIH 2026 Problem Statement Explorer*\\n`;
  return md;
};

export const downloadMarkdown = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};
''')

print('Types and utils created successfully!')
