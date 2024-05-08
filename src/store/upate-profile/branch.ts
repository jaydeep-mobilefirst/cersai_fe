import create from "zustand";

interface BranchState {
  branches: number[];
  addBranch: () => void;
  removeBranch: (indexToRemove: number) => void;
}

const useBranchStore = create<BranchState>((set) => ({
  branches: [1], // Initial state
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
}));

export default useBranchStore;
