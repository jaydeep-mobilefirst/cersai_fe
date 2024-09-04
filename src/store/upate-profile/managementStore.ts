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

      // removeBranch: (branchId: number) => {
      //   set((state) => ({
      //     branches: state.branches.filter((branch) => branch.id !== branchId),
      //   }));
      // },
      // removeBranch: (branchId, afterRemove) => {
      //   set((state) => {
      //     const branch: any = state.branches.find(
      //       (branch: any) => branch.id === branchId
      //     );

      //     Swal.fire({
      //       title: "Are you sure?",
      //       text: "Do you want to remove this user?",
      //       icon: "warning",
      //       showCancelButton: true,
      //       confirmButtonText: "Yes, remove it!",
      //       cancelButtonText: "No, cancel!",
      //     }).then((result) => {
      //       if (result.isConfirmed) {
      //         if (branch && branch.firstName) {
      //           axiosTokenInstance
      //             .delete(`deposit-taker/management-team/${branchId}`)
      //             .then(() => {
      //               console.log(`Branch ${branchId} removed from API`);
      //               if (afterRemove) {
      //                 afterRemove(); // Call the callback function after removal
      //               }
      //             });
      //         }
      //       }
      //     });
      //     if (branch && branch.firstName) {
      //       // axiosTokenInstance
      //       //   .delete(`deposit-taker/management-team/${branchId}`)
      //       //   .then(() => {
      //       //     console.log(`Branch ${branchId} removed from API`);
      //       //   });
      //     }
      //     return {
      //       branches: state.branches.filter((branch) => branch.id !== branchId),
      //     };
      //   });
      // },
      removeBranch: (branchId: number, afterRemove?: () => void) => {
        // Find the branch that matches the given branchId
        set((state) => {
          const branchToRemove: any = state.branches.find(
            (branch: any) => branch.id === branchId
          );

          if (branchToRemove) {
            Swal.fire({
              title: "Are you sure?",
              text: "Do you want to remove this user?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, remove it!",
              cancelButtonText: "No, cancel!",
            }).then((result) => {
              if (result.isConfirmed) {
                // Check if both id and firstname are present
                if (branchToRemove.id && branchToRemove.firstName) {
                  // Call the API if both id and firstname exist
                  axiosTokenInstance
                    .delete(`/deposit-taker/management-team/${branchId}`)
                    .then(() => {
                      // Remove the branch from Zustand state after API success
                      set((state) => ({
                        branches: state.branches.filter(
                          (branch) => branch.id !== branchId
                        ),
                      }));

                      if (afterRemove) {
                        afterRemove(); // Call the callback function after removal
                      }

                      Swal.fire({
                        icon: "success",
                        text: `User with ID ${branchId} has been removed successfully.`,
                        confirmButtonText: "Ok",
                      });
                    })
                    .catch((error) => {
                      console.error("Failed to remove the branch:", error);
                      Swal.fire({
                        icon: "error",
                        text: "Failed to remove the user from management.",
                        confirmButtonText: "Ok",
                      });
                    });
                } else if (branchToRemove.id) {
                  // If only id is present, remove directly from state without API call
                  set((state) => ({
                    branches: state.branches.filter(
                      (branch) => branch.id !== branchId
                    ),
                  }));

                  // if (afterRemove) {
                  //   afterRemove(); // Call the callback function after removal
                  // }

                  Swal.fire({
                    icon: "success",
                    text: `Branch with ID ${branchId} has been removed successfully.`,
                    confirmButtonText: "Ok",
                  });
                }
              }
            });
          }

          return state;
        });
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
