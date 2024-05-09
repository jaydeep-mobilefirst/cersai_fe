// import create from "zustand";

// interface BranchState {
//   branches: number[];
//   addBranch: () => void;
//   removeBranch: (indexToRemove: number) => void;
// }

// const useBranchStore = create<BranchState>((set) => ({
//   branches: [1], // Initial state
//   addBranch: () =>
//     set((state) => ({
//       branches: [
//         ...state.branches,
//         state.branches.length ? Math.max(...state.branches) + 1 : 1,
//       ],
//     })),
//   removeBranch: (indexToRemove: number) =>
//     set((state) => ({
//       branches: state.branches.filter((index) => index !== indexToRemove),
//     })),
// }));

// export default useBranchStore;
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface BranchState {
  branches: number[];
  addBranch: () => void;
  removeBranch: (indexToRemove: number) => void;
}

// Define a type for the store creator
type BranchStoreCreator = StateCreator<BranchState>;

// Define the initial state and actions
const initialBranchState: BranchState = {
  branches: [1],
  addBranch: () => {},
  removeBranch: () => {},
};

// Create the store
export const useBranchStore = create<BranchState>(
  persist<BranchState>(
    (set) => ({
      ...initialBranchState,
      addBranch: () =>
        set((state) => ({
          branches: [
            ...state.branches,
            state.branches.length ? Math.max(...state.branches) + 1 : 1,
          ],
        })),
      removeBranch: (indexToRemove: number) =>
        set((state) => ({
          branches: state.branches.filter((index) => index !== indexToRemove),
        })),
    }),
    {
      name: "branch-storage", // name of the item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  ) as BranchStoreCreator // Cast to the correct type
);
