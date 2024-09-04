import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProfileBranchForm from "./ProfileBranchForm";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useForm } from "react-hook-form";
import infoIcon from "../../../assets/images/info-circle.svg";

import Swal from "sweetalert2";
// import { useBranchStore } from "../../../store/upate-profile/branch";
import { useScreenWidth } from "../../../utils/screenSize";
import Button from "../../../components/userFlow/common/Button";
import uploadIcon from "../../../assets/images/directbox-send.svg";
import LoaderSpin from "../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../utils/axios";
import ProfileManagementForm from "./ProfileManagementForm";
import { useNavigate } from "react-router-dom";
import { useBranchStore } from "../../../store/upate-profile/managementStore";
import FooterDT from "./FooterDT";
const ProfileManagement = () => {
  const screenWidth = useScreenWidth();
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");
  const status = sessionStorage.getItem("user_status");
  const Navigate = useNavigate();

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
  console.log({ branches }, "branches");
  // const [isChecked, setChecked] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [loader1, setLoader1] = useState(false);
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

  const profile_management_api = sessionStorage.getItem(
    "profile_management_api"
  );

  const fetchBranches = async () => {
    try {
      setLoader(true);
      const response = await axiosTokenInstance.get(
        `/deposit-taker/management-team/${entityUniqueId}`
      );
      console.log({ response }, "response");
      const fetchedBranches = response.data.data;
      if (fetchedBranches.length === 0) {
        fetchedBranches.push({
          firstName: "",
          middleName: "",
          lastName: "",
          designation: "",
          landlineNumber: "",
          email: "",
          addressLine1: "",
          addressLine2: "",
          pincode: "",
          state: "",
          district: "",
        });
      }
      if (profile_management_api === "true") {
        setBranches(fetchedBranches);
        reset({
          branches: fetchedBranches?.map((branch: any) => ({
            ...branch, // Spread the entire branch object
          })),
        }); // Properly initializing form with fetched data including IDs
        setTimeout(() => {
          sessionStorage.setItem("profile_management_api", "false");
        }, 1000);
      } else {
        reset({
          branches: branches?.map((branch: any) => ({
            ...branch, // Spread the entire branch object
          })),
        }); // Properly initializing form with fetched data including IDs
        // setBranches(fetchedBranches);
      }

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
  }, [reset, setBranches]);

  console.log({ branches }, "branches");

  // const onSubmit = async (data: any) => {
  //   console.log("Data", data);
  //   setLoader(true);
  //   try {
  //     const membersToSubmit = data?.branches?.map((member: any) => {
  //       const { id, ...memberData } = member;
  //       return member.id ? { id, ...memberData } : memberData;
  //     });

  //     const response = await axiosTokenInstance.post(
  //       `/deposit-taker/management-team/${entityUniqueId}`,
  //       {
  //         members: membersToSubmit, // Changed from branches to members
  //       }
  //     );

  //     await fetchBranches();
  //     setLoader(false);

  //     Swal.fire({
  //       icon: "success",
  //       text: response?.data?.message,
  //       confirmButtonText: "Ok",
  //     }).then(() => {
  //       Navigate("/dt/profile?current=documents");
  //     });
  //   } catch (error) {
  //     console.error("Failed to submit members:", error);
  //     Swal.fire({
  //       icon: "error",
  //       text: "Failed to update Entity Details",
  //       confirmButtonText: "Ok",
  //     });
  //     setLoader(false);
  //   }
  // };
  const onSubmit = async (data: any) => {
    console.log("Data", data);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the Management Details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoader(true);
        try {
          const membersToSubmit = data?.branches?.map((member: any) => {
            const { id, ...memberData } = member;
            return member.id ? { id, ...memberData } : memberData;
          });

          const response = await axiosTokenInstance.post(
            `/deposit-taker/management-team/${entityUniqueId}`,
            {
              members: membersToSubmit,
            }
          );

          // await fetchBranches();
          setBranches(data?.branches);
          setLoader(false);

          Swal.fire({
            icon: "success",
            text: response?.data?.message,
            confirmButtonText: "Ok",
          }).then(() => {
            Navigate("/dt/profile?current=documents");
          });
        } catch (error) {
          console.error("Failed to submit members:", error);
          Swal.fire({
            icon: "error",
            text: "Failed to update Entity Details",
            confirmButtonText: "Ok",
          });
          setLoader(false);
        }
      }
    });
  };

  console.log({ branches }, "mangement detail data");

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
  const onClick = async (data: any) => {
    console.log("Data form onClick", data);

    setBranches(data?.branches);
    Navigate("/dt/profile?current=documents", {
      state: {
        managementData: data,
      },
    });
  };

  return (
    <div className="bg-white p-7 w-full h-full ">
      <h1 className="font-semibold text-2xl mb-3 text-[#1C468E]">
        {" "}
        Add management personnel{" "}
      </h1>
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
              removeBranch={() =>
                removeBranch(branch.id || index, fetchBranches)
              }
              addBranch={addBranch}
            />
          ))
        )}
        {status === "INCOMPLETE" ? (
          <div>
            <FooterDT
              onSubmit={handleSubmit(onClick)}
              loader={loader}
              showbackbtn={true}
              path={"/dt/profile?current=regulator"}
            />
          </div>
        ) : (
          <div>
            <div>
              <Footer
                loader={loader}
                onClick={handleSubmit(onClick)}
                showbackbtn={true}
                path={"/dt/profile?current=regulator"}
              />
              <button
                onSubmit={onSubmit}
                type="submit"
                className="mt-4 btn-primary"
              ></button>
              <button
                onSubmit={handleSubmit(onClick)}
                type="submit"
                className="mt-4 btn-primary"
              ></button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileManagement;
