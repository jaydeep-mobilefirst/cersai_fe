import { create } from "zustand";

interface stateTypes {
    notificationPageDataa: any;
  setNotificationPageData: any;
}

// Create your store, which includes both state and (optionally) actions
export const useNotificationStore = create<stateTypes>((set: any) => ({
    notificationPageDataa: {},
  setNotificationPageData: (data: any) =>
    set(() => ({ notificationPageDataa: data })),
}));
