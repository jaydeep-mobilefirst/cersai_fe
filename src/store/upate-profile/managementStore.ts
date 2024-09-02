import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface Management {
  id: number;
}

interface ManagementState {
  managements: Management[];
  isChecked: boolean;
  addManagement: () => void;
  removeManagement: (managementId: number) => void;
  setManagements: (newManagements: Management[]) => void;
  setChecked: (value: boolean) => void;
  toggleChecked: () => void;
}

type ManagementStoreCreator = StateCreator<ManagementState>;

const initialManagementState: ManagementState = {
  managements: [{ id: 1 }],
  isChecked: false,
  addManagement: () => {},
  removeManagement: () => {},
  setManagements: () => {},
  setChecked: () => {},
  toggleChecked: () => {},
};

export const useManagementStore = create<ManagementState>(
  persist<ManagementState>(
    (set) => ({
      ...initialManagementState,

      addManagement: () => {
        set((state) => {
          // Check if all IDs are valid numbers; otherwise, default them to 0
          const newId =
            state.managements.reduce(
              (maxId, management) =>
                Math.max(
                  Number.isFinite(management.id) ? management.id : 0,
                  maxId
                ),
              0 // Ensure the initial value is 0
            ) + 1;

          // console.log(`Adding management with ID: ${newId}`);
          return {
            managements: [...state.managements, { id: newId }],
          };
        });
      },

      removeManagement: (managementId: number) => {
        set((state) => ({
          managements: state.managements.filter(
            (management) => management.id !== managementId
          ),
        }));
      },
      setManagements: (newManagements: Management[]) => {
        set({ managements: newManagements });
      },
      setChecked: (value: boolean) => {
        set({ isChecked: value });
      },
      toggleChecked: () => {
        set((state) => ({ isChecked: !state.isChecked }));
      },
    }),
    {
      name: "management-storage",
      getStorage: () => sessionStorage,
    }
  ) as ManagementStoreCreator
);
