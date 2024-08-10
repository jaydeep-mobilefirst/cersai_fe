import { create } from "zustand";

interface stateTypes {
  downloadPageDataa: any;
  setDownloadPageData: any;
}

// Create your store, which includes both state and (optionally) actions
export const useDownloadStore = create<stateTypes>((set: any) => ({
  downloadPageDataa: {},
  setDownloadPageData: (data: any) =>
    set(() => ({ downloadPageDataa: data })),
}));
