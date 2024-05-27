import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface Branch {
  id: number; // Identifier for each branch
}

interface BranchState {
  branches: Branch[];
  addBranch: () => void;
  removeBranch: (branchId: number) => void;
  setBranches: (newBranches: Branch[]) => void; // Function to set new branches
}

type BranchStoreCreator = StateCreator<BranchState>;

const initialBranchState: BranchState = {
  branches: [{ id: 1 }],
  addBranch: () => {},
  removeBranch: () => {},
  setBranches: () => {}, // Placeholder, will be overridden
};

export const useBranchStore = create<BranchState>(
  persist<BranchState>(
    (set) => ({
      ...initialBranchState,
      addBranch: () => {
        set((state) => ({
          branches: [
            ...state.branches,
            {
              id:
                state.branches.reduce(
                  (maxId, branch) => Math.max(branch.id, maxId),
                  0
                ) + 1,
            },
          ],
        }));
      },
      removeBranch: (branchId: number) => {
        set((state) => ({
          branches: state.branches.filter((branch) => branch.id !== branchId),
        }));
      },
      setBranches: (newBranches: Branch[]) => {
        set({ branches: newBranches });
      },
    }),
    {
      name: "branch-storage",
      getStorage: () => sessionStorage,
    }
  ) as BranchStoreCreator
);
