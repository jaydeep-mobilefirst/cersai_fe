// import { create } from "zustand";

// interface StateTypes {
//   language: string;
//   setLangugae: (data: string) => void;
// }

// // Create your store, which includes both state and (optionally) actions
// export const useLangugaeStore = create<StateTypes>((set) => ({
//   language: "en",
//   setLangugae: (data: string) => set(() => ({ language: data })),
// }));
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface StateTypes {
  language: string;
  setLanguage: (data: string) => void;
}

export const useLangugaeStore = create<StateTypes>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (data: string) => set({ language: data }),
    }),
    {
      name: "language-store",
      getStorage: () => sessionStorage,
    } as PersistOptions<StateTypes>
  )
);