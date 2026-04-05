import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BriefingFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  companySize: string;
  interest: string;
  cloudStack: string;
  message: string;
}

interface BriefingStore {
  formData: BriefingFormData;
  hasSubmitted: boolean;
  isDirty: boolean; // true if user has typed anything

  updateField: (field: keyof BriefingFormData, value: string) => void;
  prefill: (data: Partial<BriefingFormData>) => void;
  markSubmitted: () => void;
  resetForm: () => void;
}

const defaultFormData: BriefingFormData = {
  name: '',
  email: '',
  company: '',
  role: '',
  companySize: '',
  interest: '',
  cloudStack: '',
  message: '',
};

export const useBriefingStore = create<BriefingStore>()(
  persist(
    (set) => ({
      formData: { ...defaultFormData },
      hasSubmitted: false,
      isDirty: false,

      updateField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
          isDirty: true,
        })),

      prefill: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
          isDirty: true,
        })),

      markSubmitted: () =>
        set({
          hasSubmitted: true,
          isDirty: false,
          formData: { ...defaultFormData },
        }),

      resetForm: () =>
        set({
          formData: { ...defaultFormData },
          hasSubmitted: false,
          isDirty: false,
        }),
    }),
    {
      name: 'ai4bharat-briefing', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist the draft form data, not the submission status
      partialize: (state) => ({
        formData: state.formData,
        isDirty: state.isDirty,
      }),
    }
  )
);
