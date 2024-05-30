import { useState, useEffect } from "react";

type TableType = {
  id: string;
  compositeRoleName: string;
  status: string;
  isActive: boolean;
};

interface EditRolePopupProps {
  roleData: TableType;
  onClose: () => void;
}

const EditRolePopup: React.FC<EditRolePopupProps> = ({ roleData, onClose }) => {
  const [roleName, setRoleName] = useState(roleData.compositeRoleName);
  const [selectedFunctionality, setSelectedFunctionality] = useState("");
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [roleNameError, setRoleNameError] = useState("");
  const [functionalityError, setFunctionalityError] = useState("");

  useEffect(() => {
    setRoleName(roleData.compositeRoleName);
  }, [roleData]);

  const handleSave = () => {
    let valid = true;

    if (roleName === "") {
      setRoleNameError("Role name is required.");
      valid = false;
    } else {
      setRoleNameError("");
    }

    if (selectedFunctionality === "") {
      setFunctionalityError("You must select a functionality.");
      valid = false;
    } else {
      setFunctionalityError("");
    }

    if (valid) {
      setIsSuccessPopupOpen(true);
    }
  };

  const functionalities = [
    "Functionality 1",
    "Functionality 2",
    "Functionality 3",
  ];

  return (
    <>
      {!isSuccessPopupOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-200 popup-container">
          <div className="bg-white rounded-lg p-8 w-[90%] max-w-[544px] relative">
            <div className="flex justify-start items-start">
              <h1 className="text-xl font-semibold">Edit Role</h1>
            </div>
            <hr className="my-4 mt-5" />
            <div className="mb-4 mt-3">
              <label
                htmlFor="role-name"
                className="block text-sm font-medium text-gray-700"
              >
                Role <span className="text-red-700">*</span>
              </label>
              <input
                id="role-name"
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Type Role Name"
                className="mt-3 h-[56px] w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {roleNameError && (
                <p className="text-red-600 text-sm mt-1">{roleNameError}</p>
              )}
            </div>
            <div className="mb-4 mt-3">
              <label
                htmlFor="functionality-dropdown"
                className="block text-sm font-medium text-gray-700"
              >
                Functionalities mapped <span className="text-red-700">*</span>
              </label>
              <select
                id="functionality-dropdown"
                value={selectedFunctionality}
                onChange={(e) => setSelectedFunctionality(e.target.value)}
                className="mt-3 h-[56px] w-full  px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" disabled>
                  Select a functionality
                </option>
                {functionalities.map((functionality) => (
                  <option key={functionality} value={functionality}>
                    {functionality}
                  </option>
                ))}
              </select>
              {functionalityError && (
                <p className="text-red-600 text-sm mt-1">
                  {functionalityError}
                </p>
              )}
            </div>

            <div className="flex justify-center space-x-7">
              <button
                className="bg-transparent border border-blue-700 w-[45%] md:w-[224px] rounded-xl px-4 md:px-10 py-3 text-blue-700 font-semibold text-sm transition-colors duration-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-[#1C468E] rounded-xl w-[45%] md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm transition-colors duration-200"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditRolePopup;
