import create from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  mSidebar: boolean;
  collapsed: boolean;
  url: string;
  activeTab: string;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  setUrl: (url: string) => void;
  setActiveTab: (tab: string) => void;
};

const useSidebarStore = create(
  persist<SidebarState>(
    (set) => ({
      mSidebar: false,
      collapsed: false,
      url: "",
      activeTab: localStorage.getItem("activeTab") || "dashboard",

      toggleSidebar: () => set((state) => ({ mSidebar: !state.mSidebar })),
      toggleCollapse: () => set((state) => ({ collapsed: !state.collapsed })),
      setUrl: (url) => set({ url }),
      setActiveTab: (tab) => {
        localStorage.setItem("activeTab", tab);
        set({ activeTab: tab });
      },
    }),
    {
      name: "sidebar-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useSidebarStore;
