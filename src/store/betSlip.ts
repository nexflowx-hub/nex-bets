import { create } from 'zustand';
import { BetSelection } from '@/types';

interface BetSlipState {
  selections: BetSelection[];
  stakes: Record<string, number>;
  isOpen: boolean;
  addSelection: (selection: BetSelection) => void;
  removeSelection: (id: string) => void;
  clearSlip: () => void;
  setStake: (id: string, stake: number) => void;
  toggleSlip: () => void;
  totalOdds: () => number;
  totalStake: () => number;
  potentialReturn: () => number;
}

export const useBetSlipStore = create<BetSlipState>((set, get) => ({
  selections: [],
  stakes: {},
  isOpen: false,

  addSelection: (selection) =>
    set((state) => {
      const exists = state.selections.find((s) => s.id === selection.id);
      if (exists) return state;
      return {
        selections: [...state.selections, selection],
        stakes: { ...state.stakes, [selection.id]: 10 },
      };
    }),

  removeSelection: (id) =>
    set((state) => ({
      selections: state.selections.filter((s) => s.id !== id),
      stakes: Object.fromEntries(
        Object.entries(state.stakes).filter(([key]) => key !== id)
      ),
    })),

  clearSlip: () => set({ selections: [], stakes: {} }),

  setStake: (id, stake) =>
    set((state) => ({
      stakes: { ...state.stakes, [id]: Math.max(0, stake) },
    })),

  toggleSlip: () => set((state) => ({ isOpen: !state.isOpen })),

  totalOdds: () => {
    const { selections } = get();
    if (selections.length === 0) return 0;
    return selections.reduce((acc, s) => acc * s.odds, 1);
  },

  totalStake: () => {
    const { selections, stakes } = get();
    return selections.reduce(
      (acc, s) => acc + (stakes[s.id] || 0),
      0
    );
  },

  potentialReturn: () => {
    const state = get();
    return state.totalOdds() * state.totalStake();
  },
}));
