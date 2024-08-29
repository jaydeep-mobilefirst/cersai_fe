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
import ProfileManagementForm from "./ProfileManagementForm";
const ProfileManagement = () => {
  const screenWidth = useScreenWidth();
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");

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
          firstName: "",
          middleName: "",
          designation: "",
          landlineNumber: "",
          emailId: "",
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
      <h1 className="font-semibold text-2xl mb-3 text-[#1C468E]">Add User</h1>
      <div className="flex-row align-middle text-gray-400 flex justify-between"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loader ? (
          <LoaderSpin />
        ) : (
          branches?.map((branch: any, index: any) => (
            <ProfileManagementForm
              key={branch.id || index}
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

        <div>
          <Footer loader={loader} />
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

export default ProfileManagement;
