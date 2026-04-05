import { create } from 'zustand';

interface UIStore {
  // Mobile menu state
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // Search modal state
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  // Scroll lock (synced with mobile menu)
  isScrollLocked: boolean;

  // Global notification/toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isScrollLocked: false,
  isSearchOpen: false,
  toast: null,

  openMobileMenu: () => {
    set({ isMobileMenuOpen: true, isScrollLocked: true });
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  },

  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false, isScrollLocked: false });
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  },

  toggleMobileMenu: () => {
    set((state) => {
      const next = !state.isMobileMenuOpen;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = next ? 'hidden' : '';
      }
      return { isMobileMenuOpen: next, isScrollLocked: next };
    });
  },

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 4000);
  },

  clearToast: () => set({ toast: null }),
}));
