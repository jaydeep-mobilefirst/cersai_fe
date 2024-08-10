import { create } from "zustand";

interface stateTypes {
  contactUsPageDataa: any;
  setcontactUsPageData: any;
}

// Create your store, which includes both state and (optionally) actions
export const useContactUsStore = create<stateTypes>((set: any) => ({
    contactUsPageDataa: {},
    setcontactUsPageData: (data: any) =>
    set(() => ({ contactUsPageDataa: data })),
}));
