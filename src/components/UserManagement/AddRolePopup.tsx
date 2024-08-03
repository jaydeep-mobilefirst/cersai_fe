import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import InputFields from "../userFlow/form/InputField";
import SelectButtonMultiselect from "./SelectButtonMultiselect";
import LoaderSpin from "../LoaderSpin";
import Swal from "sweetalert2";
import uamStore from "../../store/uamStore";
import { axiosTokenInstance } from "../../utils/axios";

interface AddRolePopupProps {
  onClose: () => void;
  functionalities: any[];
  selectedFuncs?: any[];
  roleId?: number;
  roleName?: string;
  isActive?: boolean;
  entityType: "DT" | "RG" | "CA" | "DC"
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

const AddRolePopup: React.FC<AddRolePopupProps> = ({ onClose, functionalities, isActive, roleId, roleName, selectedFuncs = [], entityType }) => {
  
  const operation = sessionStorage.getItem('operation');

  const handleRoleAddedState = uamStore((state) => state.handleRefreshUAM);
  const [loader, setLoader] = useState<boolean>(false)
  const [selectedFunctionalities, setSelectedFunctionalities] =
    useState<any[]>(selectedFuncs);
  const [errors, setErrors] = useState<{ roleName: string; dropdown: string }>({
    roleName: "",
    dropdown: "",
  });
  const [nameOfRole, setNameOfRole] = useState<string>(
    roleName ? roleName : ""
  );
  const handleChangeRoleName = (event: any) => {
    const { value } = event.target;
    if (value === "") {
      setErrors((prev) => ({ ...prev, roleName: "Please enter name" }));
    } else {
      setErrors((prev) => ({ ...prev, roleName: "" }));
    }
    setNameOfRole(value);
  };

  const handleSetOption1 = (value: any) => {
    if (
      functionalities.length > 0 &&
      !selectedFunctionalities.find((f) => f.value === value.value)
    ) {
      const selected = functionalities.find((f) => f.value === value.value);
      setSelectedFunctionalities((prev) => [...prev, selected]);
      setErrors((prev) => ({ ...prev, dropdown: "" }));
    }
  };

  const remove = (data: any) => {
    const filtered = selectedFunctionalities.filter(
      (f) => f.value !== data.value
    );
    if (filtered.length === 0) {
      setErrors((prev) => ({
        ...prev,
        dropdown: "Please select at least 1 functionality",
      }));
    } else {
      setErrors((prev) => ({ ...prev, dropdown: "" }));
    }
    setSelectedFunctionalities(filtered);
  };

  useEffect(() => {
    if (operation === 'add') {
    setSelectedFunctionalities([])
    setErrors({ roleName: '', dropdown: '' })
    setNameOfRole('')
    }
  }, [])
  // const handleSave = () => {
  //   if (roleFunctionality !== "") {
  //     setIsSuccessPopupOpen(true);
  //   }
  // };

  // const handleSuccessPopupClose = () => {
  //   setIsSuccessPopupOpen(false);
  //   onClose(); // Close the AddRolePopup
  // };

  const handleClose = () => {
    onClose();
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (selectedFunctionalities.length === 0) {
      setErrors((prev) => ({
        ...prev,
        dropdown: "Please select at least 1 functionality",
      }));
    } else {
      setErrors((prev) => ({ ...prev, dropdown: "" }));
    }

    if (nameOfRole === "") {
      setErrors((prev) => ({ ...prev, roleName: "Please enter name" }));
    } else {
      setErrors((prev) => ({ ...prev, roleName: "" }));
    }

    setLoader(true)
    let resultObject;
    let entityId = sessionStorage.getItem('entityUniqueId');
    if (roleId) {
      resultObject = {
        compositeRoleName: nameOfRole,
        basicRoleIds: selectedFunctionalities.map((f) => f.value),
        description: "Admin Role With all access",
        compositeRoleId: roleId,
        isActive: isActive,
        entityType: entityType,
        entityId
      };
    } else {
      resultObject = {
        compositeRoleName: nameOfRole,
        basicRoleIds: selectedFunctionalities.map((f) => f.value),
        description: "Admin Role With all access",
        entityType: entityType,
        entityId
      };
    }

    if (
      resultObject.compositeRoleName !== "" &&
      resultObject.basicRoleIds.length > 0
    ) {

      axiosTokenInstance[roleId ? "put" : "post"](
        `/role/${roleId ? "update" : "add"}/`,
        resultObject
      )
        .then((res: any) => {

          if (res?.data?.success) {
            handleClose();
            handleRoleAddedState();
            Swal.fire({
              title: `Role ${roleId ? "updated" : "added"} successfully`,
              icon: "success",
            });
            setNameOfRole("");
          }

          if (!res?.data?.success) {
            handleClose();
            Swal.fire({
              title: "Error",
              icon: "error",
              text: res?.data?.error?.errorMessage
            })

          }
        })
        .catch((e:any) => {
          console.log("role error",e)
          handleClose();
          Swal.fire({
            title: e?.response?.data?.message || "Internal Server Error!",
            icon: "error",
          });
        })
        .finally(() => setLoader(false))
    }
  };


  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="m-[16px] md:m-[0px] w-[350px] md:w-[544px] rounded-2xl p-4 md:p-[32px] text-gilroy-medium pb-[38px] shadow-xl backdrop-blur-lg bg-white">
          <h1 className=" text-black text-[24px] font-normal">
            {roleId ? "Edit role" : "Add new role"}
          </h1>

          <hr className="w-full bg-[#E6E6E6] mt-[24px] mb-[24px]"></hr>
          <form>
            <div className="mb-[24px]">
              <label
                htmlFor="documentName"
                className=" text-black text-[16px]  mb-[8px] text-gilroy-medium font-bold "
              >
                Role
                <span className="text-red-400 ml-1">*</span>
              </label>
              <InputFields
                onChange={handleChangeRoleName}
                type="text"
                value={nameOfRole}
                disabled={!!roleId}
                name="roleName"
                id="documentName"
                placeholder="Type Role Name"
                className="shadow appearance-none border border-#E6E6E6 rounded-2xl h-[61px]  mt-[8px] w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="text-red-500">{errors["roleName"]}</span>
            </div>
            <div>
              <label
                htmlFor="fileTypes"
                className=" text-black text-base font-bold mb-[8px] text-gilroy-medium"
              >
                Functionalities mapped
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="mt-[8px]">
                <SelectButtonMultiselect
                  setOption={handleSetOption1}
                  options={functionalities}
                  placeholder="Select"
                  multiselect={true}
                  allSelectedOptions={selectedFunctionalities}
                  remove={remove}
                  className="relative"
                />
                <span className="text-red-400 ml-1">
                  {errors["dropdown"]}
                </span>
              </div>
            </div>
            <div className="mt-[24px]">
              <div className="flex flex-row justify-around">
                <button
                  className="w-[40%] md:w-[224px] h-[56px] rounded-xl border border-[#1C468E] text-[#1C468E]"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-6 md:ml-[32px] w-[40%] md:w-[224px] h-[56px] bg-[#1C468E] rounded-xl text-white"
                  onClick={handleOnSubmit}
                >
                  {loader ? <LoaderSpin /> : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default AddRolePopup;
