import React, { useEffect, useState } from "react";
import { useScreenWidth } from "../../../utils/screenSize";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputFields from "../../../components/userFlow/common/InputField";
import { UserManagementValidation } from "../../../components/UserManagement/UserManagementValidation";
import UserSuccessPopup from "../../../components/UserManagement/UserCreatedPopUp";
// import infocircle from "../../../assets/images/info-circle (1).svg";
import infocircle from "../../../assets/images/info-circle (1).svg";
import { useNavigate } from "react-router-dom";
import useSidebarStore from "../../../store/SidebarStore";
import SelectButton from "../../../components/userFlow/form/SelectButton";
import Swal from "sweetalert2";
import uamStore from "../../../store/uamStore";
import AdditionSuccessfulModalOne from "../../../components/UserManagement/AdditonSuccessfulModalOne";
import failedLogo from "../../../assets/images/FailedIcon.svg";
import LoaderSpin from "../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../utils/axios";
import InputFieldsV2 from "../../../components/userFlow/common/InputFiledV2";

const AddUserForm = () => {
  const [successData, setSuccessData] = useState<{
    heading: string;
    paragraph: string;
    logo: any;
  }>({ heading: "", paragraph: "", logo: undefined });
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const editUserData = sessionStorage.getItem("editUserData");
  const operation = sessionStorage.getItem("operation");
  const parsedEditUSerData = JSON.parse(editUserData ?? "{}");
  const userCreationURL = sessionStorage.getItem("userCreationURL");
  const { handleRefreshUAM } = uamStore((state) => state);
  const [roleName, setRoleName] = useState("");
  const [selectedRole, setRoleSelected] = useState("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const screenWidth = useScreenWidth();
  const navigate = useNavigate();
  const { collapsed } = useSidebarStore();

  // Array of roles
  const roles = [
    { label: "Select Role", value: "", id: "" },
    ...JSON.parse(sessionStorage.getItem("customRoles") ?? "[]"),
  ];

  const handleButtonClick = () => {
    // Set showPopup to true to display the popup
    setShowPopup(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(UserManagementValidation),
  });

  const onSubmit = (data: any) => {
    setLoader(true);
    let finalResult = {
      entityUniqueId: sessionStorage.getItem("entityUniqueId"),
      entityType: sessionStorage.getItem("entityType"),
      first_name: data?.firstName,
      middle_name: data?.middleName,
      last_name: data?.lastName,
      role_id: parseInt(data?.role),
      email_id: data?.email,
      mobile: data?.mobileNumber,
      nodalOfficerId: operation === "edit" ? parsedEditUSerData?.id : undefined,
    };

    axiosTokenInstance[operation === "edit" ? "put" : "post"](
      `/user/${operation === "edit" ? "update" : "add"}`,
      finalResult
    )
      .then((res: any) => {
        let data = res?.data;
        if (data?.success) {
          handleRefreshUAM();
          setSubmitted(true);
          setSuccessData({
            heading: `User ${
              operation === "edit" ? "updated " : "added"
            } Successfully`,
            paragraph: `User has been ${
              operation === "edit" ? "updated " : "added"
            } successfully`,
            logo: undefined,
          });
          setShowPopup(true);
        } else {
          setSuccessData({
            heading: "Error",
            paragraph: "Unable to add user, Please try again later!",
            logo: failedLogo,
          });
          setShowPopup(true);
        }
      })
      .catch((err: any) => {
        let data = err?.response?.data;
        setSuccessData({
          heading: "Error",
          paragraph: data?.message,
          logo: failedLogo,
        });
        setShowPopup(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleBackButtonClick = () => {
    if (submitted) {
      setShowPopup(false);
      reset();
      navigate(
        userCreationURL ??
          `/${sessionStorage.getItem("entityType")?.toLocaleLowerCase()}`
      );
    } else {
      setShowPopup(false);
    }
  };

  const handleSelectRole = (value: any) => {
    setRoleSelected(value?.label);
    if (value?.value !== "") {
      setValue("role", value?.id.toString());
      clearErrors("role");
    } else {
      setValue("role", "");
      setError("role", { message: "Role id required" });
    }
  };

  useEffect(() => {
    if (
      operation === "edit" &&
      editUserData !== "" &&
      editUserData !== undefined &&
      editUserData !== null
    ) {
      const data = JSON.parse(editUserData);
      console.log(data.firstName, "data");

      setValue("email", data?.emailId);
      setValue("firstName", data.firstName);
      setValue("lastName", data?.lastName);
      setValue("middleName", data?.middleName);
      setValue("mobileNumber", data?.mobile);
      setRoleSelected(data?.role);
      setValue("role", data?.roleId);
    } else {
      setRoleSelected("");
      reset();
    }
  }, [editUserData]);

  return (
    <div className="mt-2 ">
      <div className="-ml-9 -mr-9">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full lg:h-[75vh] "
        >
          <div
            className="w-full"
            // style={{
            //   // width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            //   width: `${screenWidth > 1024
            //       ? `calc(100vw - ${collapsed ? "110px" : "349px"})`
            //       : "100vw"
            //     }`,
            // }}
          >
            <div className="flex flex-col p-6 w-full ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor="firstname"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    First name <span className="text-red-500">*</span>
                  </label>
                  <InputFieldsV2
                    placeholder="Type here"
                    {...register("firstName")}
                  />
                  {errors?.firstName && (
                    <p className="text-red-500">{errors?.firstName?.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="minInvestment"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Middle name
                  </label>
                  <InputFieldsV2
                    placeholder="Type here"
                    {...register("middleName")}
                  />
                  {/* {errors?.middleName && (
                    <p className="text-red-500">
                      {errors?.middleName?.message}
                    </p>
                  )} */}
                </div>

                <div>
                  <label
                    htmlFor="numberOfInvestors"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <InputFieldsV2
                    placeholder="Type here"
                    {...register("lastName")}
                  />
                  {errors?.lastName && (
                    <p className="text-red-500">{errors?.lastName?.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="role-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role<span className="text-red-500">*</span>
                  </label>
                  <SelectButton
                    options={roles}
                    placeholder="Select Role"
                    selectedOption={selectedRole}
                    onSelect={handleSelectRole}
                  />
                  {/* <select
                    id="role-name"
                    value={roleName}
                    {...register("role")}
                    className="mt-1 w-full px-4  py-2 border border-gray-300 rounded-lg outline-none  h-14"
                  >
                    <option value="">Select role</option>
                    {roles.map((role : any) => (
                      <option key={role} value={role?.id}>
                        {role?.label}
                      </option>
                    ))}
                  </select> */}
                  {errors?.role && (
                    <p className="text-red-500">{errors?.role?.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="minInvestment"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Email Id <span className="text-red-500">*</span>
                  </label>
                  <InputFieldsV2
                    placeholder="Type here"
                    {...register("email")}
                  />
                  {errors?.email && (
                    <p className="text-red-500">{errors?.email?.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="minInvestment"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    <div className="flex flex-row">
                      Mobile no <span className="text-red-500 mr-2">*</span>
                      <img src={infocircle} alt="inforcircle" />
                    </div>
                  </label>
                  <div className="flex flex-row items-center">
                    <span className="border flex  items-center border-gray-300 rounded-lg px-2 text-base font-normal text-gilroy-medium h-14 border-r-0 rounded-tr-none rounded-br-none">
                      +91
                    </span>
                    <InputFieldsV2
                      placeholder="1234567890"
                      {...register("mobileNumber")}
                      className="border-l-0 rounded-tl-none rounded-bl-none"
                    />
                  </div>
                  {errors?.mobileNumber && (
                    <p className="text-red-500">
                      {errors?.mobileNumber?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center "
              style={{
                width: `${
                  screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                }`,
              }}
            >
              <div className="flex flex-row items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="#1D1D1B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <button
                  onClick={() => {
                    navigate(
                      userCreationURL ??
                        `/${sessionStorage
                          .getItem("entityType")
                          ?.toLocaleLowerCase()}`
                    );
                  }}
                  role="button"
                  type="button"
                  className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]"
                >
                  Back
                </button>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="bg-[#1C468E] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
                >
                  {loader ? <LoaderSpin /> : "Submit"}
                </button>
              </div>
            </div>
            <div>
              <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

              <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
                © 2024 Protean BUDs, All Rights Reserved.
              </p>
            </div>
          </div>
        </form>
      </div>
      {showPopup && (
        <AdditionSuccessfulModalOne
          heading={successData.heading}
          paragraph={successData.paragraph}
          onClose={() => {
            setShowPopup(false);
          }}
          onSave={handleBackButtonClick}
          logo={successData.logo}
        />
      )}
    </div>
  );
};

export default AddUserForm;
