import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import Swal from "sweetalert2";

interface Branch {
  id: number;
}

interface BranchState {
  branches: Branch[];
  removedBranches: Branch[];
  isChecked: boolean;
  addBranch: () => void;
  removeBranch: (branchId: number) => void;
  setBranches: (newBranches: Branch[]) => void;
  setRemovedBranches: (newRemovedBranches: Branch[]) => void;
  setChecked: (value: boolean) => void;
  toggleChecked: () => void;
  clearRemovedBranches: () => void; // New function to clear removed branches
}

type BranchStoreCreator = StateCreator<BranchState>;

const initialBranchState: BranchState = {
  branches: [{ id: 1 }],
  removedBranches: [],
  isChecked: false,
  addBranch: () => {},
  removeBranch: () => {},
  setBranches: () => {},
  setRemovedBranches: () => {},
  setChecked: () => {},
  toggleChecked: () => {},
  clearRemovedBranches: () => {}, // Initialize the new function
};

export const useBranchStore = create<BranchState>(
  persist<BranchState>(
    (set) => ({
      ...initialBranchState,

      addBranch: () => {
        set((state) => {
          const maxBranches = parseInt(
            process.env.REACT_APP_MAX_MANAGEMENT || "10",
            10
          );
          if (state.branches.length >= maxBranches) {
            Swal.fire({
              icon: "error",
              title: "Limit reached",
              text: "You cannot add more than 10 Management Details.",
            });
            return { ...state };
          }
          const newId =
            state.branches.reduce(
              (maxId, branch) =>
                Math.max(Number.isFinite(branch.id) ? branch.id : 0, maxId),
              0
            ) + 1;
          return {
            branches: [...state.branches, { id: newId }],
          };
        });
      },

      removeBranch: (branchId: number) => {
        set((state) => {
          const branchToRemove = state.branches.find(
            (branch) => branch.id === branchId
          );
          console.log(branchToRemove, "branchToRemove");
          if (branchToRemove) {
            return {
              branches: state.branches.filter(
                (branch) => branch.id !== branchId
              ),
              removedBranches: [...state.removedBranches, branchToRemove],
            };
          }
          return state;
        });
      },

      setBranches: (newBranches: Branch[]) => {
        set({ branches: newBranches });
      },

      setRemovedBranches: (newRemovedBranches: Branch[]) => {
        set({ removedBranches: newRemovedBranches });
      },

      setChecked: (value: boolean) => {
        set({ isChecked: value });
      },

      toggleChecked: () => {
        set((state) => ({ isChecked: !state.isChecked }));
      },

      clearRemovedBranches: () => {
        set({ removedBranches: [] }); // Clears the removedBranches array
      },
    }),
    {
      name: "management-store",
      getStorage: () => sessionStorage,
    }
  ) as BranchStoreCreator
);
