import { create } from 'zustand';

interface UIState {
  currentYear: number;
  currentMonth: number;
  setCurrentMonth: (year: number, month: number) => void;
  prevMonth: () => void;
  nextMonth: () => void;
}

const now = new Date();

export const useUIStore = create<UIState>((set, get) => ({
  currentYear: now.getFullYear(),
  currentMonth: now.getMonth() + 1,

  setCurrentMonth: (year, month) => set({ currentYear: year, currentMonth: month }),

  prevMonth: () => {
    const { currentYear, currentMonth } = get();
    if (currentMonth === 1) {
      set({ currentYear: currentYear - 1, currentMonth: 12 });
    } else {
      set({ currentMonth: currentMonth - 1 });
    }
  },

  nextMonth: () => {
    const { currentYear, currentMonth } = get();
    if (currentMonth === 12) {
      set({ currentYear: currentYear + 1, currentMonth: 1 });
    } else {
      set({ currentMonth: currentMonth + 1 });
    }
  },
}));
