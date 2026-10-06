import { create } from 'zustand';
import { RenderResult } from '@/types/renderer';

interface HistoryState {
  history: RenderResult[];
  addResult: (result: RenderResult) => void;
  removeResult: (id: string) => void;
  clearHistory: () => void;
}

const STORAGE_KEY = 'html_to_visual_history_v1';

// Safe localStorage loader
const loadInitialHistory = (): RenderResult[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const useHistoryStore = create<HistoryState>((set) => ({
  history: loadInitialHistory(),

  addResult: (result) =>
    set((state) => {
      // Keep most recent 20 items
      const updated = [result, ...state.history.filter((i) => i.id !== result.id)].slice(0, 20);
      try {
        if (typeof window !== 'undefined') {
          // Store metadata without heavy blob references
          const persistable = updated.map(({ blob, ...rest }) => rest);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
        }
      } catch (err) {
        console.warn('Failed to persist history to localStorage', err);
      }
      return { history: updated };
    }),

  removeResult: (id) =>
    set((state) => {
      const updated = state.history.filter((item) => item.id !== id);
      try {
        if (typeof window !== 'undefined') {
          const persistable = updated.map(({ blob, ...rest }) => rest);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
        }
      } catch (err) {
        console.warn('Failed to update localStorage', err);
      }
      return { history: updated };
    }),

  clearHistory: () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.warn('Failed to clear localStorage', err);
    }
    set({ history: [] });
  },
}));
