import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProfileBranchForm from "./ProfileBranchForm";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useForm } from "react-hook-form";
import infoIcon from "../../../assets/images/info-circle.svg";

import Swal from "sweetalert2";
import { useBranchStore } from "../../../store/upate-profile/branch";
import { useScreenWidth } from "../../../utils/screenSize";
import Button from "../../../components/userFlow/common/Button";
import uploadIcon from "../../../assets/images/directbox-send.svg";
import LoaderSpin from "../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../utils/axios";
const ProfileBranches = () => {
  const screenWidth = useScreenWidth();
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");

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
  // const [isChecked, setChecked] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [uploadInputKey, setUploadKey] = useState<number>(0);
  const uploadButtonRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();

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
        });
      }
      setBranches(fetchedBranches);
      reset({
        branches: fetchedBranches?.map((branch: any) => ({
          ...branch, // Spread the entire branch object
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

  const onSubmit = async (data: any) => {
    setLoader(true);
    try {
      const branchesToSubmit = data.branches.map((branch: any) => {
        const { id, ...branchData } = branch;
        return branch.id ? { id, ...branchData } : branchData;
      });
      const response = await axiosTokenInstance.post(
        `/deposit-taker/branch/${entityUniqueId}`,
        {
          branches: branchesToSubmit,
        }
      );

      await fetchBranches();
      setLoader(false);

      Swal.fire({
        icon: "success",
        text: response?.data?.message,
        confirmButtonText: "Ok",
      });
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
                I declare all the information provided is correct as per my
                knowledge.
              </label>
            </div>
          </>
        )}

        <div>
          <Footer disabled={!isChecked} loader={loader} />
          <button
            onSubmit={onSubmit}
            type="submit"
            className="mt-4 btn-primary"
          ></button>
        </div>
      </form>
    </div>
  );
};

export default ProfileBranches;
