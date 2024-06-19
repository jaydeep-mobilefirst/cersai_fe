import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ErrorCircleRed from "../../assets/images/info-circleRed.svg";
import add from "../../assets/images/add.svg";
import TextArea from "../../components/userFlow/common/TextArea";
import SelectButton from "../../components/userFlow/form/SelectButton";
import ButtonComp from "./ButtonComp";
import { axiosInstance } from "../../utils/axios";
import { useLocation } from "react-router-dom";

interface ReturnModelPopupProps {
  onClose: () => void;
  onSave: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

const SubRejectModelPopup: React.FC<ReturnModelPopupProps> = ({
  onClose,
  onSave,
}) => {
  const handleCloseModal = () => {
    // Call onClose function passed from parent component to close the modal
    onClose();
  };
  const countWords = (text: string) => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/);
    return words.length;
  };
  const [text, setText] = useState<string>("");
  const location = useLocation();
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");
  const [isSelected, setSelected] = useState<boolean>(false);
  const [istextEntered, setTextEntered] = useState<boolean>(false);
  const [optionData, setOptionData] = useState([]);
  const [selectedFunc, setSelectedFunc] = useState<string | null>(null);
  const [selectedRejectId, setSelectedRejectId] = useState<number | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [isApiSucess, setApiSuccess] = useState<boolean>(false);
  const [isApiError, setApiError] = useState<boolean>(false);
  const depositTakerId = location.state?.depositTakerId;

  useEffect(() => {
    setSelected(false);
  }, [selectedFunc]);

  useEffect(() => {
    setTextEntered(false);
  }, [text]);

  const apiCall = () => {
    axiosInstance
      .post("/approval-engine/reason-code?reasonFor=REJECT")
      .then((response: any) => {
        if (response.data.success) {
          console.log(response?.data?.data, "response");
          setOptionData(
            response?.data?.data?.map((f: any) => ({
              value: f.id,
              label: f.description,
            }))
          );
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleSearchInputChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue1(event.target.value);
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFunc) {
      setSelected(true);
    }
    if (!text) {
      setTextEntered(true);
    }

    if (!selectedFunc || !text) {
      return;
    }

    try {
      setLoader(true);
      const response = await axiosInstance.post(
        `/approval-engine/update-status`,
        {
          uniqueId: depositTakerId,
          status: "REJECTED",
          reasonCodeId: selectedRejectId,
          reason: text,
        }
      );
      setLoader(false);
      console.log(response, "response");
      if (response.status === 201) {
        setApiSuccess(true);
        setApiError(false);

        setTimeout(() => {
          onClose();
          onSave();
        }, 2500);
      } else {
      }
    } catch (error) {
      setLoader(false);
      setApiError(true);
      setApiSuccess(false);
    }
  };

  const handleSetFunc = (data: any) => {
    setSelectedFunc(data.label);
    setSelectedRejectId(data.value);
  };

  return (
    // <>
    //   <Modal
    //     open={true}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //     onClose={handleCloseModal}
    //   >
    //     <Box sx={style}>
    //       <div className="md:flex">
    //         <div className="m-[16px] md:m-16 w-[350px] md:w-[500px] lg:w-[500px] rounded-2xl p-[8px] text-gilroy-medium pb-[32px] shadow-xl bg-white">
    //           <div
    //             className="flex flex-row justify-end mb-[12px] cursor-pointer"
    //             onClick={handleCloseModal}
    //           >
    //             <img src={add} className="w-6 h-6" alt="icon" />
    //           </div>
    //           <div className=" flex flex-col  justify-center items-center relative">
    //             <img
    //               src={ErrorCircleRed}
    //               alt="ErrorCircle "
    //               className="w-12 my-2"
    //             />
    //             <h1 className="text-xl font-normal text-gilroy-medium">
    //               Are you sure you want to reject this
    //             </h1>
    //             <h2 className="text-xl font-normal text-gilroy-medium">
    //               deposit taker ?
    //             </h2>
    //             {isApiSucess && (
    //               <p className="text-green-700 absolute top-[120px]">
    //                 Deposit taker status updated successfully
    //               </p>
    //             )}
    //             {isApiError && (
    //               <p className="text-red-500 absolute top-[120px]">
    //                 Internal Server Error
    //               </p>
    //             )}
    //           </div>
    //           <form onSubmit={handleFormSubmit}>
    //             <div className="w-[300px] md:w-[450px] mx-3 my-4 ">
    //               <label
    //                 htmlFor="State"
    //                 className="text-base font-normal text-gilroy-medium"
    //               >
    //                 Rejection Reasons <span className="text-red-500">*</span>
    //               </label>
    //               <div className="mt-2 relative">
    //                 <SelectButton
    //                   setOption={handleSetFunc}
    //                   options={optionData}
    //                   selectedOption={selectedFunc}
    //                   placeholder="Select"
    //                   searchInputOnchange={handleSearchInputChange1}
    //                   searchInputValue={searchInputValue1}
    //                   showSearchInput={false}
    //                 />
    //                 {isSelected && (
    //                   <p className="text-red-500 absolute top-[55px]">
    //                     Please select regulator.
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //             <div className="flex flex-col  md:px-2 ">
    //               <label
    //                 htmlFor="bodyText"
    //                 className="text-black text-[16px] font-normal text-gilroy-medium self-start"
    //               >
    //                 Reason <span className="text-red-500">*</span>
    //               </label>
    //               <div className="relative">
    //                 <TextArea
    //                   mdWidth="460px"
    //                   value={text}
    //                   id="bodyText"
    //                   onChange={handleChange}
    //                   placeholder="Type your reason here"
    //                   className="mt-[8px] text-[16px] h-[90px] border border-[#E6E6E6] rounded-[16px] w-full p-[16px] focus:outline-none focus:ring-1 focus:ring-gray-100 textarea-component"
    //                 />
    //                 {istextEntered && (
    //                   <p className="text-red-500 absolute top-[100px]">
    //                     Please enter remarks.
    //                   </p>
    //                 )}
    //               </div>

    //               <div className="flex justify-between mt-[8px] md:w-[455px] ">
    //                 <p className="text-black text-base font-normal"></p>
    //                 <p className="text-right text-black text-opacity-40 text-xs font-normal leading-[14px]">
    //                   {countWords(text)}/500
    //                 </p>
    //               </div>
    //             </div>
    //             <div>
    //               <hr className="w-full bg-[#E6E6E6] mt-[27px] mb-[24px]"></hr>
    //               <ButtonComp
    //                 onClose={onClose}
    //                 title="Submit & reject"
    //                 loader={loader}
    //               />
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </Box>
    //   </Modal>
    // </>

    <>
      {/* <Modal
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
            <div className="bg-white rounded-lg p-8 w-full max-w-md md:max-w-xl lg:max-w-2xl relative">
              <div
                className="text-right cursor-pointer"
                onClick={handleCloseModal}
              >
                <img src={add} className="w-6 h-6" alt="icon" />
              </div>
              <div className="flex flex-col justify-center items-center relative">
                <img
                  src={ErrorCircleRed}
                  alt="ErrorCircle "
                  className="w-12 my-2"
                />
                <h1 className="text-xl font-normal text-gilroy-medium text-center">
                  Are you sure you want to reject this deposit taker?
                </h1>
                {isApiSucess && (
                  <p className="text-green-700 absolute top-24">
                    Deposit taker status updated successfully
                  </p>
                )}
                {isApiError && (
                  <p className="text-red-500 absolute top-24">
                    Internal Server Error
                  </p>
                )}
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="w-full my-4">
                  <label
                    htmlFor="State"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Rejection Reasons <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 relative">
                    <SelectButton
                      setOption={handleSetFunc}
                      options={optionData}
                      selectedOption={selectedFunc}
                      placeholder="Select"
                      searchInputOnchange={handleSearchInputChange1}
                      searchInputValue={searchInputValue1}
                      showSearchInput={false}
                    />
                    {isSelected && (
                      <p className="text-red-500 absolute top-14">
                        Please select regulator.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="bodyText"
                    className="text-black text-base font-normal text-gilroy-medium"
                  >
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TextArea
                      mdWidth="100%"
                      value={text}
                      id="bodyText"
                      onChange={handleChange}
                      placeholder="Type your reason here"
                      className="mt-2 text-base h-24 border border-gray-300 rounded-xl w-full p-4 focus:outline-none focus:ring-1 focus:ring-gray-100"
                    />
                    {istextEntered && (
                      <p className="text-red-500 absolute top-24">
                        Please enter remarks.
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mt-2 w-full">
                    <p className="text-black text-base font-normal"></p>
                    <p className="text-right text-black text-opacity-40 text-xs font-normal leading-4">
                      {countWords(text)}/500
                    </p>
                  </div>
                </div>
                <div>
                  <hr className="w-full bg-gray-300 mt-6 mb-6" />
                  <ButtonComp
                    onClose={onClose}
                    title="Submit & reject"
                    loader={loader}
                  />
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal> */}
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClose={handleCloseModal}
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
            <div className="bg-white rounded-lg p-8 w-full max-w-[300px] md:max-w-[40%] lg:max-w-[30%] relative flex flex-col">
              <div
                className="flex justify-end mb-4 cursor-pointer"
                onClick={handleCloseModal}
              >
                <img src={add} className="w-6 h-6" alt="icon" />
              </div>
              <div className="flex flex-col items-center relative">
                <img
                  src={ErrorCircleRed}
                  alt="ErrorCircle"
                  className="w-12 my-2"
                />
                <h1 className="text-xl font-normal">
                  Are you sure you want to reject this Deposit Taker
                </h1>
                {isApiSucess && (
                  <p className="text-green-700 absolute top-[120px]">
                    Deposit taker status updated successfully
                  </p>
                )}
                {isApiError && (
                  <p className="text-red-500 absolute top-[120px]">
                    Internal Server Error
                  </p>
                )}
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="my-5 mx-3">
                  <label htmlFor="State" className="text-base font-normal">
                    Rejection Reasons <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 relative">
                    <SelectButton
                      setOption={handleSetFunc}
                      options={optionData}
                      selectedOption={selectedFunc}
                      placeholder="Select"
                      searchInputOnchange={handleSearchInputChange1}
                      searchInputValue={searchInputValue1}
                      showSearchInput={false}
                    />
                    {isSelected && (
                      <p className="text-red-500 absolute top-[55px]">
                        Please select reason.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col px-2">
                  <label
                    htmlFor="bodyText"
                    className="text-black text-[16px] font-normal self-start"
                  >
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TextArea
                      mdWidth="460px"
                      value={text}
                      id="bodyText"
                      onChange={handleChange}
                      placeholder="Type your reason here"
                      className="mt-[8px] text-[16px] h-[90px] border border-[#E6E6E6] rounded-[16px] w-full p-[16px] focus:outline-none focus:ring-1 focus:ring-gray-100 textarea-component"
                    />
                    {istextEntered && (
                      <p className="text-red-500 absolute top-[100px]">
                        Please enter remarks.
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mt-[8px]">
                    <p className="text-black text-base font-normal"></p>
                    <p className="text-right text-black text-opacity-40 text-xs font-normal leading-[14px]">
                      {countWords(text)}/500
                    </p>
                  </div>
                </div>
                <div>
                  <hr className="w-full bg-[#E6E6E6] mt-[27px] mb-[24px]" />
                  <ButtonComp
                    onClose={onClose}
                    title="Submit & reject"
                    loader={loader}
                  />
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SubRejectModelPopup;
