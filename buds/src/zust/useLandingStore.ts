import { create } from "zustand";

interface stateTypes {
  homePageData: any;
  setHomePageData: any;
}

// Create your store, which includes both state and (optionally) actions
export const useLandingStore = create<stateTypes>((set: any) => ({
  homePageData: {},
  setHomePageData: (data: any) => set(() => ({ homePageData: data })),
}));
