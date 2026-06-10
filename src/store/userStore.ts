import { create } from 'zustand';
import { User } from '@/types';

interface UserState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateUserBalance: (balance: number, bonusBalance?: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  updateUserBalance: (balance, bonusBalance) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          balance,
          ...(bonusBalance !== undefined ? { bonusBalance } : {}),
        },
      };
    }),
}));
