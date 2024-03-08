// import React, { useState } from "react";
// import Logo from "../../assets/images/logo.svg";
// import {
//   contactDetails,
//   authlable,
// } from "../../utils/hardText/landingpageText";
// import SingUpPopup from "../userFlow/common/Modal";

// interface AuthButtonProps {
//   buttontext: string;
// }

// const TopDetail: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Function to handle closing the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Function to handle the selection of an entity type
//   const handleSelect = (entityType: string) => {
//     console.log("Entity Selected:", entityType);
//   };

//   const downloadReport = () => {};
//   return (
//     <div className="flex items-center justify-between flex-col md:flex-row my-[19px] mx-[16px] lg:mx-[169px]">
//       <div className="m-4 md:m-0">
//         <img src={Logo} alt="logo" />
//       </div>
//       <div className="flex items-start justify-start flex-col">
//         {contactDetails.map((data, idx) => {
//           return (
//             <div className="flex items-center justify-center mb-2" key={idx}>
//               <div>
//                 <img src={data?.imgsrc} alt="icon" />
//               </div>
//               {idx === 2 ? (
//                 <>
//                   <div
//                     className="ml-4 text-[#797979] text-gilroy-regular cursor-pointer underline"
//                     onClick={downloadReport}
//                   >
//                     {data?.text}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="ml-4 text-[#797979] text-gilroy-regular">
//                     {data?.text}
//                   </div>
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//       <div className="flex items-center m-4 md:m-0">
//         <AuthButton buttontext={authlable[1]}
//          />
//         <SingUpPopup
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           onSelect={handleSelect}
//         />
//         <AuthButton buttontext={authlable[0]} />
//       </div>
//     </div>
//   );
// };

// const AuthButton: React.FC<AuthButtonProps> = ({ buttontext }) => {
//   return (
//     <div className="ml-2">
//       <button
//         className={`w-full px-[24px] h-10 border rounded-[8px] ${
//           buttontext === "Register"
//             ? "bg-white text-[#338218] border-[#338218]"
//             : "bg-[#338218] text-white"
//         } rounded-lg justify-center items-center inline-flex`}
//       >
//         <div className="text-center text-base font-normal text-gilroy-medium  leading-normal">
//           {buttontext}
//         </div>
//       </button>
//     </div>
//   );
// };

// export default TopDetail;

import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { contactDetails, authlable } from "../../utils/hardText/landingpageText";
import SingUpPopup from "../userFlow/common/Modal";

interface AuthButtonProps {
  buttontext: string;
  onClick?: () => void; // Add onClick prop here
}

const TopDetail: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // // Function to handle closing the modal
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // // Function to handle the selection of an entity type
  // const handleSelect = (entityType: string) => {
  //   console.log("Entity Selected:", entityType);
  // };

  const downloadReport = () => {};

  return (
    <div className="flex items-center justify-between flex-col md:flex-row my-[19px] mx-[16px] lg:mx-[169px]">
      <div className="m-4 md:m-0">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex items-start justify-start flex-col">
        {contactDetails.map((data, idx) => (
          <div className="flex items-center justify-center mb-2" key={idx}>
            <div>
              <img src={data?.imgsrc} alt="icon" />
            </div>
            {idx === 2 ? (
              <div
                className="ml-4 text-[#797979] text-gilroy-regular cursor-pointer underline"
                onClick={downloadReport}
              >
                {data?.text}
              </div>
            ) : (
              <div className="ml-4 text-[#797979] text-gilroy-regular">
                {data?.text}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center m-4 md:m-0">
        <AuthButton
          buttontext={authlable[1]}
          // onClick={() => setIsModalOpen(true)}
        />
        {/* <SingUpPopup
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelect={handleSelect}
        /> */}
        <AuthButton buttontext={authlable[0]} />
      </div>
    </div>
  );
};

const AuthButton: React.FC<AuthButtonProps> = ({ buttontext, onClick }) => {
  return (
    <div className="ml-2">
      <button
        className={`w-full px-[24px] h-10 border rounded-[8px] ${
          buttontext === "Register"
            ? "bg-white text-[#338218] border-[#338218]"
            : "bg-[#338218] text-white"
        } rounded-lg justify-center items-center inline-flex`}
          onClick={onClick} // Add onClick prop here
      >
        <div className="text-center text-base font-normal text-gilroy-medium leading-normal">
          {buttontext}
        </div>
      </button>
    </div>
  );
};

export default TopDetail;
