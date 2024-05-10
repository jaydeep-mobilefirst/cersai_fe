import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileBranchForm from "./ProfileBranchForm";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useForm } from "react-hook-form";
import infoIcon from "../../../assets/images/info-circle.svg";
import { bffUrl } from "../../../utils/api";

import Swal from "sweetalert2";
import { useBranchStore } from "../../../store/upate-profile/branch";

const ProfileBranches = () => {
  const { branches, addBranch, removeBranch, setBranches } = useBranchStore(
    (state) => ({
      branches: state.branches,
      addBranch: state.addBranch,
      removeBranch: state.removeBranch,
      setBranches: state.setBranches,
    })
  );
  const [isChecked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          `${bffUrl}/deposit-taker/branch/DT1715261417146`
        );
        console.log(response.data.data.branches, "fetched data");
        setBranches(response.data.data.branches);
        reset({
          branches: response.data.data.branches.map((branch: any) => ({
            addressLine1: branch.addressLine1,
            addressLine2: branch.addressLine2,
            pinCode: branch.pinCode,
            state: branch.state,
            district: branch.district,
          })),
        }); // Properly initializing form with fetched data
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };

    fetchBranches();
  }, [reset, setBranches]);

  const onSubmit = async (data: any) => {
    console.log(data, "data from all branches");
    try {
      const response = await axios.post(
        `${bffUrl}/deposit-taker/branch/DT1715261417146`,
        {
          branches: data.branches,
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        text: "Branch update successfully",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Failed to submit branches:", error);
      Swal.fire({
        icon: "error",
        text: "Failed to update Entity Details",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleCheckboxChange = () => setChecked(!isChecked);
  // h-screen custom-scrollbar overflow-auto
  return (
    <div className="bg-white p-7 w-full h-full">
      <h1 className="font-semibold text-2xl mb-3">Upload Branches</h1>
      <div className="flex flex-row justify-start align-middle text-gray-400">
        <img
          src={infoIcon}
          alt="info"
          className="mr-2"
          height={25}
          width={25}
        />
        <div>
          You can upload branches in bulk. Please use this given template.
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {branches.map((branch: any, index: any) => (
          <ProfileBranchForm
            key={index}
            branch={branch}
            i={index}
            control={control}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            removeBranch={() => removeBranch(branch.id)}
            addBranch={addBranch}
          />
        ))}
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-4 w-4 mr-2 rounded-lg accent-green-900"
            />
            I declare all the information provided is correct as per my
            knowledge.
          </label>
        </div>
        <Footer disabled={!isChecked} />
        <button type="submit" className="mt-4 btn-primary"></button>
      </form>
    </div>
  );
};

export default ProfileBranches;
