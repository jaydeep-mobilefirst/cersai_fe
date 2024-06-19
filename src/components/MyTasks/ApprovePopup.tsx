// import React from "react";
// import { Box } from "@mui/material";
// import Modal from "@mui/material/Modal";
// import add from "../../assets/images/add.svg";
// interface ApproveProps {
//   closePopup: () => void;
//   SuccessPopup: () => void;
// }

// const ApprovePopup: React.FC<ApproveProps> = ({ closePopup, SuccessPopup }) => {
//   return (
//     <Modal
//       open={true}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//         }}
//       >
//         <div className="fixed  inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white  rounded-lg p-8 w-full max-w-[300px] md:max-w-[40%] lg:max-w-[30%] relative">
//             <div className="text-right">
//               <img
//                 src={add}
//                 onClick={closePopup}
//                 className="absolute top-1 right-2 cursor-pointer p-5"
//                 alt="cross"
//               />
//             </div>
//             <div className="text-center mb-4">
//               <p className="text-[#666666] mb-4 text-sm">
//                 Are you sure you want to approve this application ?
//               </p>
//             </div>
//             <hr className="my-4" />
//             <div className="flex justify-center space-x-4">
//               <button className="bg-transparent border border-blue-700 w-[45%] md:w-[224px] rounded-xl px-4 md:px-10 py-3 text-blue-700 font-semibold text-sm  transition-colors duration-200">
//                 Cancel
//               </button>
//               <button className="bg-[#1C468E] rounded-xl w-[45%] md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm  transition-colors duration-200">
//                 Approve
//               </button>
//             </div>
//           </div>
//         </div>
//       </Box>
//     </Modal>
//   );
// };

// export default ApprovePopup;

import React from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import add from "../../assets/images/add.svg";

interface ApproveProps {
  closePopup: () => void;
  SuccessPopup: () => void;
}

const ApprovePopup: React.FC<ApproveProps> = ({ closePopup, SuccessPopup }) => {
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white h-[300px] rounded-lg p-8 w-full max-w-[300px] md:max-w-[40%] lg:max-w-[30%] relative flex flex-col justify-end">
            <div className="text-right">
              <img
                src={add}
                onClick={closePopup}
                className="absolute top-1 right-2 cursor-pointer p-5"
                alt="cross"
              />
            </div>
            <div className="text-center mb-4">
              <h1 className="text-[#000000]  mb-4 font-gilroy-medium text-2xl font-normal leading-[29.11px]">
                Are you sure you want to approve this application?
              </h1>
            </div>
            <hr className="my-4" />
            <div className="flex justify-center space-x-4">
              <button
                onClick={closePopup}
                className="bg-transparent border border-blue-700 w-[45%] md:w-[224px] rounded-xl px-4 md:px-10 py-3 text-blue-700 font-semibold text-sm transition-colors duration-200"
              >
                Cancel
              </button>
              <button className="bg-[#1C468E] rounded-xl w-[45%] md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm transition-colors duration-200">
                Approve
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ApprovePopup;
