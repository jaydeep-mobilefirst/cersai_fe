import { create } from "zustand";

interface stateTypes {
  faqPageDataa: any;
  setFaqPageData: any;
}

// Create your store, which includes both state and (optionally) actions
export const useFaqStore = create<stateTypes>((set: any) => ({
  faqPageDataa: {},
  setFaqPageData: (data: any) => set(() => ({ faqPageDataa: data })),
}));
