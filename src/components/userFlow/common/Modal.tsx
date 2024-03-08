import closeCircle from "../../../assets/images/closeCircle.svg";
import Modal from 'react-modal';
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (entityType: string) => void;
}

const SingUpPopup: React.FC<ModalProps> = ({ isOpen, onClose, onSelect }) => {
  // This function will be called when the user clicks on the 'Select' button
  const handleSelect = (entityType: string) => {
    // onSelect(entityType);
    onClose();
  };

  // This renders nothing if the 'isOpen' prop is false
  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-[586px] h-[370px] p-10 rounded-3xl flex flex-col justify-start gap-4 inline-flex">
      <div className="modal w-[50%]">
        <div className="flex flex-row justify-between items-center">
        <h2 className="text-black text-2xl font-normal font-['Gilroy-Medium'] leading-loose">
          Entity Type
        </h2>
        <div className="modal-header flex">
          <button onClick={onClose}>&times;</button>
        </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSelect("selected-entity-type");
          }}
        >
          <div className="w-[244px] h-14 pl-4 pr-[18px] py-4 bg-green-50 rounded-xl flex-col justify-start items-start gap-2 inline-flex">
            <div className="justify-start items-center gap-4 inline-flex">
              <div className="w-6 h-6 justify-center items-center flex">
                <div className="w-6 h-6 relative"></div>
              </div>
              <div className="text-lime-900 text-lg font-normal font-['Gilroy-Medium']">
                <label>
                  <input type="radio" name="entity" value="Deposit Taker" />{" "}
                  Deposit Taker
                </label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Select</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUpPopup;

// // App Component
// const Abc: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Function to handle closing the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Function to handle the selection of an entity type
//   const handleSelect = (entityType: string) => {
//     console.log("Entity Selected:", entityType);
//   };

//   return (
//     <div className="App">
//       <button onClick={() => setIsModalOpen(true)}>Entity Type</button>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSelect={handleSelect}
//       />
//     </div>
//   );
// };

// export default Abc;


// import React, { useRef, useState, useEffect } from "react";
// import righttick from "../../assets/righttick.svg";
// import fileuploadsuccess from "../../assets/fileuploadsuccess.svg";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     padding: "0px",
//     border: 'none',
//     backgroundColor:'transparent',
//   },
//   overlay: {
//     backgroundColor: "rgb(8 8 8 / 75%)",
//   },
// };

// interface SignupModalProps {
//   isSuccessModalOpen: boolean;
//   SuccessModalopen: () => void;
//   handleSuccessClose: () => void;
// }


// const SignupModal: React.FC<SignupModalProps> = ({
//   isSuccessModalOpen,
//   SuccessModalopen,
//   handleSuccessClose,
// }) => {

//   return (
//     <Modal
//       isOpen={isSuccessModalOpen}
//       onRequestClose={handleSuccessClose}
//       style={customStyles}
//     >
//       {isSuccessModalOpen && (
//         <>
//           <div>
//             <h1>hai</h1>
//           </div>
//         </>
//       )}
//       </Modal>
      
//   );
// };
// export default SignupModal;

