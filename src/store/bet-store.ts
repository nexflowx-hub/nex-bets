import { create } from 'zustand';

interface BetForm {
  nome: string;
  whatsapp: string;
  email: string;
  cpf: string;
}

interface BetState {
  // Champion
  selectedWinner: string;
  winnerStake: number;

  // Matches
  selectedMatches: Record<string, string>;
  matchesStake: number;

  // Checkout
  isCheckoutOpen: boolean;
  checkoutStep: number;
  formData: BetForm;
  isSubmitting: boolean;

  // Actions
  setSelectedWinner: (team: string) => void;
  setWinnerStake: (stake: number) => void;
  handleMatchSelect: (matchId: string, selection: string) => void;
  setMatchesStake: (stake: number) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setCheckoutStep: (step: number) => void;
  setFormData: (data: Partial<BetForm>) => void;
  setIsSubmitting: (submitting: boolean) => void;
  resetAll: () => void;
}

const initialForm: BetForm = {
  nome: '',
  whatsapp: '',
  email: '',
  cpf: '',
};

export const useBetStore = create<BetState>((set) => ({
  selectedWinner: 'Brasil',
  winnerStake: 50,
  selectedMatches: {},
  matchesStake: 100,
  isCheckoutOpen: false,
  checkoutStep: 1,
  formData: { ...initialForm },
  isSubmitting: false,

  setSelectedWinner: (team) => set({ selectedWinner: team }),
  setWinnerStake: (stake) => set({ winnerStake: stake }),

  handleMatchSelect: (matchId, selection) =>
    set((state) => {
      const newSelections = { ...state.selectedMatches };
      if (newSelections[matchId] === selection) {
        delete newSelections[matchId];
      } else {
        newSelections[matchId] = selection;
      }
      return { selectedMatches: newSelections };
    }),

  setMatchesStake: (stake) => set({ matchesStake: stake }),
  setIsCheckoutOpen: (open) => set({ isCheckoutOpen: open, checkoutStep: open ? 1 : 1 }),
  setCheckoutStep: (step) => set({ checkoutStep: step }),
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

  resetAll: () =>
    set({
      selectedWinner: 'Brasil',
      winnerStake: 50,
      selectedMatches: {},
      matchesStake: 100,
      isCheckoutOpen: false,
      checkoutStep: 1,
      formData: { ...initialForm },
      isSubmitting: false,
    }),
}));