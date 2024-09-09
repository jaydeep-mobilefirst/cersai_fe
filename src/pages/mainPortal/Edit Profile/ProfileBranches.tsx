import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProfileBranchForm from "./ProfileBranchForm";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useForm } from "react-hook-form";
import infoIcon from "../../../assets/images/info-circle.svg";

import Swal from "sweetalert2";
import { useBranchStore } from "../../../store/upate-profile/branch";
import { useBranchStore as useManagementStore } from "../../../store/upate-profile/managementStore";
import { useScreenWidth } from "../../../utils/screenSize";
import Button from "../../../components/userFlow/common/Button";
import uploadIcon from "../../../assets/images/directbox-send.svg";
import LoaderSpin from "../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../utils/axios";
import useProfileRegulatorStore from "../../../zust/useProfileRegulatorStore";
import useProfileEntityStore from "../../../zust/useProfileEntityStore";
import useProfileNodalStore from "../../../zust/useProfileNodalStore";
import userProfileUploadStore from "../../../zust/userProfileUploadStore";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { useLocation } from "react-router-dom";
import InputFieldsV2 from "../../../components/userFlow/common/InputFiledV2";
import FooterDT2 from "./FooterDT2";
import { Link, useNavigate } from "react-router-dom";

const ProfileBranches = () => {
  const screenWidth = useScreenWidth();
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");
  const location = useLocation();
  const callapi = location.state?.callSaveandcontinue;
  const managementData = location.state?.managementData;
  const status = sessionStorage.getItem("user_status");
  const Navigate = useNavigate();

  console.log({ callapi, managementData }, "callapi");
  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  console.log({ allFormData, documentData }, "allFormData");
  const regulatorStore = useProfileRegulatorStore(
    (state) => state.regulatorStore
  );
  const regulatorData = useProfileRegulatorStore((state) => state.formData);

  const nodaldetailsStore = useProfileNodalStore(
    (state) => state.nodaldetailsStore
  );
  const nodalDetailData = useProfileNodalStore((state) => state.formData);
  const entitydetails = useProfileEntityStore((state) => state.entitydetails);
  const entityData = useProfileEntityStore((state) => state.formData);
  const uploadDocument = userProfileUploadStore(
    (state) => state.uploadDocument
  );
  const uploadData = userProfileUploadStore((state) => state.formData);

  // const { branches, addBranch, removeBranch, setBranches } = useBranchStore(
  //   (state) => ({
  //     branches: state.branches,
  //     addBranch: state.addBranch,
  //     removeBranch: state.removeBranch,
  //     setBranches: state.setBranches,
  //   })
  // );

  const {
    branches,
    addBranch,
    removeBranch,
    setBranches,
    isChecked,
    setChecked,
    toggleChecked,
  } = useBranchStore((state) => ({
    branches: state.branches,
    addBranch: state.addBranch,
    removeBranch: state.removeBranch,
    setBranches: state.setBranches,
    isChecked: state.isChecked,
    setChecked: state.setChecked,
    toggleChecked: state.toggleChecked,
  }));
  const { removedBranches: removedBranchesData, clearRemovedBranches } =
    useManagementStore((state) => ({
      removedBranches: state.removedBranches,
      clearRemovedBranches: state.clearRemovedBranches,
    }));

  console.log({ removedBranchesData }, "removedBranchesData");

  const filterManagement: any = removedBranchesData?.map(
    ({ id, firstName }: any) => ({
      id,
      firstName,
    })
  );

  const filterManagementID: any = removedBranchesData?.map(({ id }: any) => id);
  console.log(
    { filterManagement, filterManagementID },
    "filterManagement",
    "filtermangementID"
  );

  // const [isChecked, setChecked] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [uploadInputKey, setUploadKey] = useState<number>(0);
  const uploadButtonRef = useRef<HTMLInputElement>(null);
  const [place, setPlace] = useState("");
  const [placeError, setPlaceError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();
  const formData =
    allFormData?.formFields?.form_fields &&
    allFormData?.formFields?.form_fields?.map((field: any) => ({
      fieldId: field.id,
      sectionCode: field.entityRegSection?.sectionName,
      label: field.label,
      value: field.userInput,
    }));

  const formDataDocument =
    documentData &&
    documentData?.map((field: any) => ({
      fieldId: field.id,
      sectionCode: "Upload Documents",
      label: field.documentName,
      value: field.uploadFileId,
    }));

  const combinedFormData = [...formData, ...formDataDocument];

  const fetchBranches = async () => {
    try {
      setLoader(true);
      const response = await axiosTokenInstance.get(
        `/deposit-taker/branch/${entityUniqueId}`
      );
      const fetchedBranches = response.data.data.branches;
      if (fetchedBranches.length === 0) {
        fetchedBranches.push({
          addressLine1: "",
          addressLine2: "",
          pinCode: "",
          state: "",
          district: "",
          // place: "",
        });
      }
      // console.log(response.data?.branchCreatePlace, "response.data.data");
      setBranches(fetchedBranches);
      setPlace(response.data?.branchCreatePlace);
      reset({
        branches: fetchedBranches?.map((branch: any) => ({
          ...branch, // Spread the entire branch objects
        })),
      }); // Properly initializing form with fetched data including IDs
      setLoader(false);
    } catch (error) {
      console.error("Failed to fetch branches:", error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [reset, setBranches, uploadInputKey]);
  // const handlePlaceChange = (event: any) => {
  //   const { value } = event.target;
  //   // Check if the input is empty
  //   if (!value.trim()) {
  //     setPlaceError("Place is required");
  //   } else if (value.length > 10) {
  //     setPlaceError("Place cannot be longer than 10 characters");
  //   } else {
  //     setPlaceError(""); // Clear error if input is valid
  //   }
  //   setPlace(value);
  // };
  const handlePlaceChange = (event: any) => {
    const { value } = event.target;
    // Check if the input length is greater than 3
    if (value.length <= 3) {
      setPlaceError("Place must be longer than 3 characters");
    } else {
      setPlaceError(""); // Clear error if input is valid
    }
    setPlace(value);
  };

  const removeManagement = async (ids: any) => {
    console.log(ids, "id");
    try {
      const response = await axiosTokenInstance.delete(
        `/deposit-taker/management-team/${entityUniqueId}`,
        { data: { ids } } // Passing the ID in the body of the DELETE request
      );
      console.log({ response }, "response");
      if (response.data.status === "success") {
        setLoader(true);
        // Swal.fire({
        //   icon: "success",
        //   text: response?.data?.message,
        //   confirmButtonText: "Ok",
        // }).then(() => {
        //   // Additional actions after confirmation if needed
        // });
      }
    } catch (error) {
      console.error("Failed to remove management:", error);
      // Swal.fire({
      //   icon: "error",
      //   text: "Failed to remove management",
      //   confirmButtonText: "Ok",
      // });
    } finally {
      setLoader(false); // Ensure loader is turned off regardless of success or failure
    }
  };

  const onSubmit = async (data: any) => {
    if (!place.trim()) {
      setPlaceError("Place is required");
      return; // Prevent form submission if the place is empty
    }

    if (placeError) {
      return; // Prevent form submission if there is a place error
    }
    setLoader(true);
    try {
      const branchesToSubmit = data.branches.map((branch: any) => {
        const { id, ...branchData } = branch;
        return branch.id ? { id, ...branchData } : branchData;
      });
      // const response = await axiosTokenInstance.post(
      //   `/deposit-taker/branch/${entityUniqueId}`,
      //   {
      //     branches: branchesToSubmit,
      //   }
      // );
      const response = await axiosTokenInstance.post(
        `/deposit-taker/branch/${entityUniqueId}`,
        {
          branches: branchesToSubmit,
          place: place, // assuming you want to send place as part of the request
        }
      );

      if (callapi) {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to proceed with updating the details?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, upload!",
          cancelButtonText: "No, cancel!",
        }).then((result) => {
          if (result.isConfirmed) {
            const membersToSubmit = managementData?.branches?.map(
              (member: any) => {
                const { id, ...memberData } = member;
                return member.id ? { id, ...memberData } : memberData;
              }
            );
            axiosTokenInstance.post(
              `/deposit-taker/management-team/${entityUniqueId}`,
              {
                members: membersToSubmit, // Changed from branches to members
              }
            );
          }
          axiosTokenInstance
            .patch(
              `/deposit-taker/${sessionStorage?.getItem("entityUniqueId")}`,
              {
                formData: combinedFormData,
              }
            )
            .then((response) => {
              Swal.fire({
                icon: "success",
                text: response?.data?.message || "",
                confirmButtonText: "Ok",
              });
              setLoader(false);
              sessionStorage.setItem("user_status", "PENDING");
              Navigate("/dt/dashboard");
            });
          if (
            Array.isArray(filterManagement) &&
            filterManagement.some(
              (management: any) => management.id && management.firstName
            )
          ) {
            // Collect all ids in an array format like [10, 5, 8]
            const idsToRemove = filterManagement
              .filter(
                (management: any) => management.id && management.firstName
              )
              .map((management: any) => management.id);

            // Pass the collected ids to your removal function
            if (idsToRemove.length > 0) {
              removeManagement(idsToRemove); // Adjust according to your actual removal logic
              clearRemovedBranches();
            }
          }
        });
      } else {
        Swal.fire({
          icon: "success",
          text: response?.data?.message,
          confirmButtonText: "Ok",
        });
      }

      // if (regulatorData.length > 0) {
      //   regulatorStore();
      // }
      // if (nodalDetailData.length > 0) {
      //   nodaldetailsStore();
      // }
      // if (entityData.length > 0) {
      //   entitydetails();
      // }
      // if (uploadData.length > 0) {
      //   uploadDocument();
      // }

      await fetchBranches();
      setLoader(false);
    } catch (error) {
      console.error("Failed to submit branches:", error);
      Swal.fire({
        icon: "error",
        text: "Failed to update Entity Details",
        confirmButtonText: "Ok",
      });
      setLoader(false);
    }
  };

  // const handleCheckboxChange = () => setChecked(!isChecked);
  const handleCheckboxChange = () => toggleChecked();

  // const handleFileUpload = (event: any) => {
  //   setLoader(true);
  //   const file = event.target.files[0];
  //   console.log(file, "file");
  //   const formData = new FormData();
  //   formData.set("file", file);
  //   const entityId = sessionStorage.getItem("entityUniqueId");
  //   axiosTokenInstance
  //     .post(`/deposit-taker/bulk-upload/${entityId}`, formData)
  //     .then((res) => {
  //       let data = res.data;

  //       if (data.success) {
  //         Swal.fire({
  //           icon: "success",
  //           text: data?.message,
  //           title: "Successful",
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           text: data?.message,
  //           title: "Error",
  //         });
  //       }
  //     })
  //     .catch((e) => {
  //       Swal.fire({
  //         title: "Unable upload file",
  //         text: e?.response?.data?.detail?.message,
  //         icon: "error",
  //       });
  //     })
  //     .finally(() => {
  //       setLoader(false);
  //       setUploadKey(uploadInputKey + 1);
  //     });
  // };
  const handleFileUpload = async (event: any) => {
    setLoader(true);
    const file = event.target.files[0];

    if (!file) {
      Swal.fire({
        icon: "error",
        text: "No file selected for upload",
        title: "Error",
      });
      setLoader(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const entityId = sessionStorage.getItem("entityUniqueId");

    try {
      const response = await axiosTokenInstance.post(
        `/deposit-taker/bulk-upload/${entityId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          title: "Successful",
        });
        setUploadKey(uploadInputKey + 1); // Reset the file input
      } else {
        Swal.fire({
          icon: "error",
          text: response.data.message,
          title: "Error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Unable to upload file",
        text: error?.response?.data?.detail?.message || "An error occurred",
        icon: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  const handleDownloadTemplate = () => {
    axiosTokenInstance
      .get(`/deposit-taker/branches/sample-download`, {
        method: "GET",
        responseType: "blob", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  };

  const disabledField = sessionStorage.getItem("user_status");

  const checkStatus = (status: any): any => {
    switch (disabledField) {
      case "TRANSIT":
        return true;
      case "MOD_REFER_TO_REGULATOR":
        return true;
      case "REFER_TO_REGULATOR":
        return true;
      case "MOD_TRANSIT":
        return true;
      case "PENDING":
        return true;
      case "MOD_PENDING":
        return true;
      default:
        return false;
    }
  };

  const disableFieldStatus = checkStatus(disabledField);

  return (
    <div className="bg-white p-7 w-full h-full ">
      <h1 className="font-semibold text-2xl mb-3">Upload Branches</h1>
      <div className="flex-row align-middle text-gray-400 flex justify-between">
        <div className="flex flex-row align-middle justify-start">
          <img
            src={infoIcon}
            alt="info"
            className="mr-2"
            height={25}
            width={25}
          />
          <div className="my-auto">
            You can upload branches in bulk. Please use this given{" "}
            <span
              onClick={handleDownloadTemplate}
              className="text-blue-400 hover:cursor-pointer"
            >
              Template
            </span>
            .
          </div>
        </div>

        <div
          onClick={() => {
            uploadButtonRef.current?.click();
          }}
          className="w-[133px] h-10 px-6 py-2 bg-blue-900 rounded-lg flex-col justify-start items-start gap-2 inline-flex cursor-pointer"
        >
          <input
            onChange={handleFileUpload}
            type="file"
            name=""
            id=""
            className="hidden"
            accept=".xls, .xlsx"
            ref={uploadButtonRef}
            key={uploadInputKey}
            disabled={disableFieldStatus}
          />
          <div className="justify-start items-center gap-1.5 inline-flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative">
                <img src={uploadIcon} alt="" />
              </div>
            </div>
            <div className="text-white text-base font-normal">Upload</div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loader ? (
          <LoaderSpin />
        ) : (
          branches?.map((branch: any, index: any) => (
            <ProfileBranchForm
              key={branch.id || index} // Use index as key if branch.id is undefined
              branch={branch}
              branchId={branch.id}
              i={index}
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              removeBranch={() => removeBranch(branch.id || index)}
              addBranch={addBranch}
            />
          ))
        )}
        <div className="mt-4">
          <label className="flex items-center">
            Place <span className="text-red-500">*</span>
          </label>
          <InputFieldsV2
            type="text"
            placeholder="enter place"
            value={place}
            disabled={status === "INCOMPLETE" ? false : true}
            onChange={handlePlaceChange}
          />
          {placeError && <p className="text-red-500">{placeError}</p>}
        </div>
        {disableFieldStatus ? (
          <></>
        ) : (
          <>
            {" "}
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 mr-2 rounded-lg accent-[#1c468e]"
                />
                <div className="leading-[24px] ml-4 text-gilroy-medium text-[14px]">
                  I solemnly affirm to the best of my knowledge and belief, that
                  the information given in the Form is correct, and the nothing
                  material has been concealed therefrom and I agree to the&nbsp;
                  <Link
                    className="text-[#1c468e] underline cursor-pointer"
                    target={"_blank"}
                    to="https://storage.googleapis.com/cersai-buds/files/termsandcondition.pdf"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </label>
            </div>
          </>
        )}

        {status === "INCOMPLETE" ? (
          <div>
            <FooterDT2
              disabled={!isChecked}
              loader={loader}
              hidecontiuebtn={true}
              showbackbtn={true}
              path={"/dt/profile?current=documents"}
            />
            <button
              onSubmit={onSubmit}
              type="submit"
              className="mt-4 btn-primary"
            ></button>
          </div>
        ) : (
          <div>
            <Footer
              disabled={!isChecked}
              loader={loader}
              hidecontiuebtn={true}
              showbackbtn={true}
              path={"/dt/profile?current=documents"}
            />
            <button
              onSubmit={onSubmit}
              type="submit"
              className="mt-4 btn-primary"
            ></button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileBranches;
