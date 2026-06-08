import { create } from 'zustand';
import type { SumbittedForm } from '@/types/SumbittedForm';

interface FormState {
  forms: SumbittedForm[];

  addForm: (item: SumbittedForm) => void;
}

const useFormStore = create<FormState>((set) => ({
  forms: [],

  addForm: (item: SumbittedForm) => {
    set((state) => ({ forms: [...state.forms, item] }));
  },
}));

export { useFormStore };
