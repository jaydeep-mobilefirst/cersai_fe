import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ErrorCircleRed from "../../assets/images/info-circleRed.svg";
import add from "../../assets/images/add.svg";

import { axiosTokenInstance } from "../../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import SelectButtonV3 from "../userFlow/form/SelectButtonV3";
import ButtonComp from "./ButtonComp";

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

const ApprovePopup: React.FC<ReturnModelPopupProps> = ({ onClose, onSave }) => {
  const handleCloseModal = () => {
    // Call onClose function passed from parent component to close the modal
    onClose();
  };
  const countWords = (text: string) => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/);
    return words.length;
  };
  const location = useLocation();
  const [text, setText] = useState<string>("");
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");
  const [isDocSelected, setDocSelected] = useState<boolean>(false);
  const [isCheckerSelected, setCheckerSelected] = useState<boolean>(false);
  const [supportDocument, setSupportDocument] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [selectedFunc, setSelectedFunc] = useState<string | null>(null);
  const [selectedFuncChecker, setSelectedFuncChecker] = useState<string | null>(
    null
  );
  const [approvalDocumentId, setApprovalDocumentId] = useState<number | null>(
    null
  );

  const [checkerId, setCheckerId] = useState<number | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [isApiSucess, setApiSuccess] = useState<boolean>(false);
  const [isApiError, setApiError] = useState<boolean>(false);
  const depositTakerId = location.state?.depositTakerId;
  const status = location?.state?.status;

  const userid = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    setDocSelected(false);
  }, [selectedFunc]);

  // useEffect(() => {
  //   setCheckerSelected(false);
  // }, [checkerId]);

  const apiCall = () => {
    axiosTokenInstance
      .get("/approval-documents/list")
      .then((response: any) => {
        if (response.data.success) {
          setSupportDocument(
            response?.data?.data?.map((f: any) => ({
              value: f.id,
              label: f.name,
            }))
          );
        }
      })
      .catch((err:any) => {});
  };
  // const apiCallChecker = () => {
  //   axiosUAMInstance
  //     .get("/admin/user/checker")
  //     .then((response: any) => {
  //       if (response.data.success) {
  //         setChecklist(
  //           response?.data?.data?.map((f: any) => ({
  //             value: f.id,
  //             // label: f.name,
  //             label: `${f.firstName} ${f.lastName}`,
  //           }))
  //         );
  //       }
  //     })
  //     .catch((err) => {});
  // };
  // const apiCallChecker = () => {
  //   const firstName = sessionStorage.getItem("firstName");
  //   const lastName = sessionStorage.getItem("lastName");

  //   axiosInstance
  //     .get("/admin/user/checker")
  //     .then((response: any) => {
  //       if (response.data.success) {

  //         // Filter out the checker if their name matches the one stored in sessionStorage
  //         const filteredCheckers = response?.data?.data?.filter((f: any) => {
  //           return (
  //             `${f.firstName} ${f.lastName}` !== `${firstName} ${lastName}`
  //           );
  //         });

  //         setChecklist(
  //           filteredCheckers.map((f: any) => ({
  //             value: f.id,
  //             label: `${f.firstName} ${f.lastName}`,
  //           }))
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  useEffect(() => {
    apiCall();
    // apiCallChecker();
  }, []);

  const options1 = [
    { value: "Pvt Ltd", label: "Pvt Ltd" },
    { value: "LLP", label: "LLP" },
    { value: "Sole Partnership", label: "Sole Partnership" },
  ];
  const options2 = [
    { value: "Pvt Ltd", label: "Pvt Ltd" },
    { value: "LLP", label: "LLP" },
    { value: "Sole Partnership", label: "Sole Partnership" },
  ];
  const handleSetOption1 = (option: any) => {
    setSelectedOption1(option.value);
  };
  const handleSetOption2 = (option: any) => {
    setSelectedOption2(option.value);
  };

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
    // if (!selectedFunc) {
    //   setDocSelected(true);
    // }
    // if (!checkerId) {
    //   setCheckerSelected(true);
    // }
    // if (!selectedFunc || !checkerId) {
    //   return;
    // }
    // if (!selectedFunc) {
    //   return;
    // }

    try {
      setLoader(true);
      const response = await axiosTokenInstance.post(
        `/approval-engine/update-status`,
        {
          uniqueId: depositTakerId,
          status: "APPROVED",
          // approvalDocumentId: approvalDocumentId,
          approverId: Number(userid),
        }
      );

      setLoader(false);
      if (response.status === 201) {
        setApiSuccess(true);
        setApiError(false);

        setTimeout(() => {
          onClose();
          onSave();
          // navigate("/mytask/deposit");
          navigate(-1);
        }, 2500);
      } else {
      }
    } catch (error) {
      setLoader(false);
      setApiError(true);
      setApiSuccess(false);
    }
  };

  const handleFormSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFunc) {
      setDocSelected(true);
    }

    if (approvalDocumentId) {
      try {
        setLoader(true);
        const response = await axiosTokenInstance.post(
          `/approval-engine/update-status`,
          {
            uniqueId: depositTakerId,
            status: "APPROVED",
            // approvalDocumentId: approvalDocumentId,
            approverId: Number(userid),
          }
        );

        setLoader(false);
        if (response.status === 201) {
          setApiSuccess(true);
          setApiError(false);

          setTimeout(() => {
            onClose();
            onSave();
            navigate(-1);
          }, 2500);
        } else {
        }
      } catch (error) {
        setLoader(false);
        setApiError(true);
        setApiSuccess(false);
      }
    }
  };

  const handleSetFunc = (data: any) => {
    setSelectedFunc(data.label);
    setApprovalDocumentId(data.value);
  };
  // const handleSetFuncChecker = (data: any) => {
  //   setSelectedFuncChecker(data.label);
  //   setCheckerId(data.value);
  // };

  return (
    <>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleCloseModal}
      >
        <Box sx={style}>
          <div className="md:flex">
            <div className="m-[16px] md:m-16 w-[350px] md:w-[500px] lg:w-[500px] rounded-2xl p-[8px] text-gilroy-medium pb-[32px] shadow-xl bg-white">
              <div
                className="flex flex-row justify-end mb-[12px] cursor-pointer"
                onClick={handleCloseModal}
              >
                <img src={add} className="w-6 h-6" alt="icon" />
              </div>
              <div className=" flex flex-col  justify-center items-center relative">
                <img
                  src={ErrorCircleRed}
                  alt="ErrorCircle "
                  className="w-12 my-2"
                />
                <h1 className="text-xl font-normal text-gilroy-medium">
                  Are you sure you want to
                </h1>
                <h2 className="text-xl font-normal text-gilroy-medium">
                  approve this application ?
                </h2>
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
              <form
                // onSubmit={
                //   status === "TRANSIT" ? handleFormSubmit2 : handleFormSubmit
                // }
                onSubmit={handleFormSubmit}
              >
                {/* <div className="w-[300px] md:w-[450px] mx-3 my-4 ">
                  <label
                    htmlFor="State"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Supporting Document
                  </label>
                  <div className="mt-2 relative">
                    <SelectButtonV3
                      setOption={handleSetFunc}
                      options={supportDocument}
                      selectedOption={selectedFunc}
                      placeholder="Select"
                      searchInputOnchange={handleSearchInputChange1}
                      searchInputValue={searchInputValue1}
                      showSearchInput={false}
                      width="100%"
                    />
                    {isDocSelected && (
                      <p className="text-red-500 absolute top-[55px]">
                        Please select document.
                      </p>
                    )}
                  </div>
                </div> */}
                {/* {status !== "TRANSIT" && (
                  <div className="w-[300px] md:w-[450px] mx-3 my-4 ">
                    <label
                      htmlFor="State"
                      className="text-base font-normal text-gilroy-medium"
                    >
                      Checker
                    </label>
                    <div className="mt-2 relative">
                      <SelectButtonV3
                        setOption={handleSetFuncChecker}
                        options={checklist}
                        selectedOption={selectedFuncChecker}
                        placeholder="Select"
                        searchInputOnchange={handleSearchInputChange1}
                        searchInputValue={searchInputValue1}
                        showSearchInput={false}
                        width="100%"
                      />
                      {isCheckerSelected && (
                        <p className="text-red-500 absolute top-[55px]">
                          Please select checker.
                        </p>
                      )}
                    </div>
                  </div>
                )} */}

                <div>
                  <hr className="w-full bg-[#E6E6E6] mt-[27px] mb-[24px]"></hr>
                  <ButtonComp
                    onClose={onClose}
                    title="Confirm"
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

export default ApprovePopup;
