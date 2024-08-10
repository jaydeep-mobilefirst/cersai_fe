import create from "zustand";
import { persist } from "zustand/middleware";

type TopDetailState = {
  isOpen: boolean;
  showLoginModel: boolean;
  showForgetModel: boolean;
  showRegisterMailModel: boolean;
  showsNewPasswordModel: boolean;
  showsPasswordUpdateModel: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setShowLoginModel: (showLoginModel: boolean) => void;
  setShowForgetModel: (showForgetModel: boolean) => void;
  setShowRegisterMailModel: (showRegisterMailModel: boolean) => void;
  setShowsNewPasswordModel: (showsNewPasswordModel: boolean) => void;
  setShowsPasswordUpdateModel: (showsPasswordUpdateModel: boolean) => void;
};

const useTopDetailStore = create(
  persist<TopDetailState>(
    (set) => ({
      isOpen: false,
      showLoginModel: false,
      showForgetModel: false,
      showRegisterMailModel: false,
      showsNewPasswordModel: true,
      showsPasswordUpdateModel: false,
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      setShowLoginModel: (showLoginModel: boolean) => set({ showLoginModel }),
      setShowForgetModel: (showForgetModel: boolean) =>
        set({ showForgetModel }),
      setShowRegisterMailModel: (showRegisterMailModel: boolean) =>
        set({ showRegisterMailModel }),
      setShowsNewPasswordModel: (showsNewPasswordModel: boolean) =>
        set({ showsNewPasswordModel }),
      setShowsPasswordUpdateModel: (showsPasswordUpdateModel: boolean) =>
        set({ showsPasswordUpdateModel }),
    }),
    {
      name: "topdetail",
      getStorage: () => sessionStorage,
    }
  )
);

export default useTopDetailStore;
