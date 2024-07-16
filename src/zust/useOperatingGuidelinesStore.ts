import { create } from "zustand";

interface stateTypes {
  guidelinesPageData: any;
  setGuidelinesPageData: any;
}

// Create your store, which includes both state and (optionally) actions
export const useOperatingGuidelinesStore = create<stateTypes>((set: any) => ({
    guidelinesPageData: {},
    setGuidelinesPageData: (data: any) =>
    set(() => ({ guidelinesPageData: data })),
}));
