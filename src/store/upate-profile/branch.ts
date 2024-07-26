// import { create, StateCreator } from "zustand";
// import { persist } from "zustand/middleware";

// interface Branch {
//   id: number; // Identifier for each branch
// }

// interface BranchState {
//   branches: Branch[];
//   addBranch: () => void;
//   removeBranch: (branchId: number) => void;
//   setBranches: (newBranches: Branch[]) => void; // Function to set new branches
// }

// type BranchStoreCreator = StateCreator<BranchState>;

// const initialBranchState: BranchState = {
//   branches: [{ id: 1 }],
//   addBranch: () => {},
//   removeBranch: () => {},
//   setBranches: () => {}, // Placeholder, will be overridden
// };

// export const useBranchStore = create<BranchState>(
//   persist<BranchState>(
//     (set) => ({
//       ...initialBranchState,
//       addBranch: () => {
//         set((state) => ({
//           branches: [
//             ...state.branches,
//             {
//               id:
//                 state.branches.reduce(
//                   (maxId, branch) => Math.max(branch.id, maxId),
//                   0
//                 ) + 1,
//             },
//           ],
//         }));
//       },
//       removeBranch: (branchId: number) => {
//         set((state) => ({
//           branches: state.branches.filter((branch) => branch.id !== branchId),
//         }));
//       },
//       setBranches: (newBranches: Branch[]) => {
//         set({ branches: newBranches });
//       },
//     }),
//     {
//       name: "branch-storage",
//       getStorage: () => sessionStorage,
//     }
//   ) as BranchStoreCreator
// );
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface Branch {
  id: number;
}

interface BranchState {
  branches: Branch[];
  isChecked: boolean;
  addBranch: () => void;
  removeBranch: (branchId: number) => void;
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
      // addBranch: () => {
      //   set((state) => ({
      //     branches: [
      //       ...state.branches,
      //       {
      //         id:
      //           state.branches.reduce(
      //             (maxId, branch) => Math.max(branch?.id, maxId),
      //             0
      //           ) + 1,
      //       },
      //     ],
      //   }));
      // },
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
      name: "branch-storage",
      getStorage: () => sessionStorage,
    }
  ) as BranchStoreCreator
);
