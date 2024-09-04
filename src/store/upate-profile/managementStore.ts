import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { axiosTokenInstance } from "../../utils/axios";
import Swal from "sweetalert2";

interface Branch {
  id: number;
}

interface BranchState {
  branches: Branch[];
  isChecked: boolean;
  addBranch: () => void;
  // removeBranch: (branchId: number) => void;
  removeBranch: (branchId: number, afterRemove?: () => void) => void;
  setBranches: (newBranches: Branch[]) => void;
  setChecked: (value: boolean) => void;
  toggleChecked: () => void;
}

type BranchStoreCreator = StateCreator<BranchState>;

const initialBranchState: BranchState = {
  branches: [{ id: 1 }],
  isChecked: false,
  addBranch: () => {},
  removeBranch: () => {},
  setBranches: () => {},
  setChecked: () => {},
  toggleChecked: () => {},
};

export const useBranchStore = create<BranchState>(
  persist<BranchState>(
    (set) => ({
      ...initialBranchState,

      addBranch: () => {
        set((state) => {
          // Check if all IDs are valid numbers; otherwise, default them to 0
          const newId =
            state.branches.reduce(
              (maxId, branch) =>
                Math.max(Number.isFinite(branch.id) ? branch.id : 0, maxId),
              0 // Ensure the initial value is 0
            ) + 1;

          // console.log(`Adding branch with ID: ${newId}`);
          return {
            branches: [...state.branches, { id: newId }],
          };
        });
      },

      removeBranch: (branchId: number) => {
        set((state) => ({
          branches: state.branches.filter((branch) => branch.id !== branchId),
        }));
      },

      setBranches: (newBranches: Branch[]) => {
        set({ branches: newBranches });
      },
      setChecked: (value: boolean) => {
        set({ isChecked: value });
      },
      toggleChecked: () => {
        set((state) => ({ isChecked: !state.isChecked }));
      },
    }),
    {
      name: "management-store",
      getStorage: () => sessionStorage,
    }
  ) as BranchStoreCreator
);
