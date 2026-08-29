const FAVORITES_KEY = 'sih2026_favorites';
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
