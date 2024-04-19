import create from "zustand";
import { persist } from "zustand/middleware";

interface FormData {
  nodalOfficerName: string;
  nodalOfficerEmail: string;
  nodalOfficerMobileNumber: string;
  nodalOfficerDesignation: string;
}

interface FormStore extends FormData {
  setNodalDetails: (data: Partial<FormData>) => void;
}

const useFormStore = create<FormStore>(
  persist(
    (set) => ({
      nodalOfficerName: "",
      nodalOfficerEmail: "",
      nodalOfficerMobileNumber: "",
      nodalOfficerDesignation: "",
      setNodalDetails: (data: Partial<FormData>) =>
        set((state: FormStore) => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: "formData",
      getStorage: () => localStorage,
    }
  ) as any
);

export default useFormStore;
