import { create } from 'zustand';

type ModalType = 'checkout' | 'contact-sales' | null;

interface SelectedPlan {
  id: string;
  name: string;
  price: string;
  period: string;
}

interface ModalStore {
  activeModal: ModalType;
  selectedPlan: SelectedPlan | null;

  openCheckout: (plan: SelectedPlan) => void;
  openContactSales: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  selectedPlan: null,

  openCheckout: (plan) => set({ activeModal: 'checkout', selectedPlan: plan }),
  openContactSales: () => set({ activeModal: 'contact-sales', selectedPlan: null }),
  closeModal: () => set({ activeModal: null, selectedPlan: null }),
}));
