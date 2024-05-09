import React, { useState } from "react";
import infoIcon from "../../../assets/images/info-circle.svg";
import ProfileBranchForm from "./ProfileBranchForm";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useBranchStore } from "../../../store/upate-profile/branch";
// import useBranchStore from "../../../store/upate-profile/branch";

const ProfileBranches = () => {
  const { branches, addBranch, removeBranch } = useBranchStore((state) => ({
    branches: state.branches,
    addBranch: state.addBranch,
    removeBranch: state.removeBranch,
  }));

  return (
    <div className="bg-white p-7 w-full h-full">
      <h1 className="font-semibold text-2xl mb-3">Upload Branches</h1>
      <div className="w-full flex flex-row max-[950px]:flex-col max-[950px]:items-start align-middle items-center">
        <div className="flex flex-row justify-start align-middle text-gray-400 w-full items-start max-[950px]:mb-3">
          <img src={infoIcon} alt="" className="mr-2" height={25} width={25} />
          <div>
            You can upload branches in bulk. Please use this given template.
          </div>
        </div>
      </div>
      <div className="mt-4">
        {branches.map((index) => (
          <div className="my-3" key={index}>
            <ProfileBranchForm
              i={index}
              onRemove={removeBranch}
              addBranch={addBranch}
            />
          </div>
        ))}
      </div>
      <div>
        <span className="flex flex-row justify-start align-middle items-center">
          <input
            type="checkbox"
            className="h-4 w-4 mr-2 rounded-lg accent-green-900"
          />
          I declare all the information provided is correct as per my knowledge.
        </span>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileBranches;
