// import React, { useState } from "react";
// import infoIcon from "../../../assets/images/info-circle.svg";
// import ProfileBranchForm from "./ProfileBranchForm";
// import Footer from "../../../components/userFlow/userProfile/Footer";
// import { useBranchStore } from "../../../store/upate-profile/branch";
// import { useScreenWidth } from "../../../utils/screenSize";

// const ProfileBranches = () => {
//   const screenWidth = useScreenWidth();
//   const { branches, addBranch, removeBranch } = useBranchStore((state) => ({
//     branches: state.branches,
//     addBranch: state.addBranch,
//     removeBranch: state.removeBranch,
//   }));
//   const [isChecked, setChecked] = useState(false);

//   const handleCheckboxChange = () => {
//     setChecked(!isChecked);
//   };

//   return (
//     <div className="bg-white p-7 w-full h-full">
//       <h1 className="font-semibold text-2xl mb-3">Upload Branches</h1>
//       <div className="w-full flex flex-row max-[950px]:flex-col max-[950px]:items-start align-middle items-center">
//         <div className="flex flex-row justify-start align-middle text-gray-400 w-full items-start max-[950px]:mb-3">
//           <img src={infoIcon} alt="" className="mr-2" height={25} width={25} />
//           <div>
//             You can upload branches in bulk. Please use this given template.
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         {branches.map((index) => (
//           <div className="my-3" key={index}>
//             <ProfileBranchForm
//               i={index}
//               onRemove={removeBranch}
//               addBranch={addBranch}
//             />
//           </div>
//         ))}
//       </div>
//       <div>
//         <span className="flex flex-row justify-start align-middle items-center">
//           <input
//             type="checkbox"
//             checked={isChecked}
//             onChange={handleCheckboxChange}
//             className="h-4 w-4 mr-2 rounded-lg accent-green-900"
//           />
//           I declare all the information provided is correct as per my knowledge.
//         </span>
//       </div>
//       <div>
//         <Footer disabled={!isChecked} />
//       </div>
//     </div>
//   );
// };

// export default ProfileBranches;
import React, { useState } from "react";
import axios from "axios";
import ProfileBranchForm from "./ProfileBranchForm";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useForm } from "react-hook-form";

import infoIcon from "../../../assets/images/info-circle.svg";
import { bffUrl } from "../../../utils/api";
import { useBranchStore } from "../../../store/upate-profile/branch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfileBranches = () => {
  // const { branches, addBranch, removeBranch } = useBranchStore();
  const { branches, addBranch, removeBranch } = useBranchStore((state) => ({
    branches: state.branches,
    addBranch: state.addBranch,
    removeBranch: state.removeBranch,
  }));
  const [isChecked, setChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      branches: branches.map(() => ({
        addressLine1: "",
        addressLine2: "",
        pinCode: "",
        state: "",
        district: "",
      })),
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data, "data from all branches");
    setFormSubmitted(true);
    try {
      const response = await axios.post(
        `${bffUrl}/deposit-taker/branch/DT1715261417146`,
        { branches: data.branches }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        text: "Branch  update  successfully ",
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
        <div className="mt-4">
          {branches.map((branch, index: any) => (
            <ProfileBranchForm
              key={index}
              i={index}
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              removeBranch={() => removeBranch(index)}
              addBranch={() => addBranch()}
            />
          ))}
        </div>
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
