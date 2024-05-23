import { useState } from "react";
import RoleSuccessPopup from "./RoleSuccessPopup";

interface AddRolePopupProps {
  onClose: () => void;
}

const AddRolePopup: React.FC<AddRolePopupProps> = ({ onClose }) => {
  const [roleFunctionality, setRoleFunctionality] = useState("");
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const functionalities = [
    { id: "f1", name: "Functionality 1" },
    { id: "f2", name: "Functionality 2" },
    { id: "f3", name: "Functionality 3" },
  ];

  const handleSave = () => {
    if (roleFunctionality !== "") {
      setIsSuccessPopupOpen(true);
    }
  };

  const handleSuccessPopupClose = () => {
    setIsSuccessPopupOpen(false);
    onClose(); // Close the AddRolePopup
  };

  return (
    <>
      {!isSuccessPopupOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-[90%] max-w-[500px] relative">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Add new role</h1>
            </div>
            <hr className="my-4" />
            <div className="mb-4">
              <label
                htmlFor="role-name"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <input
                id="role-name"
                type="text"
                placeholder="Type input"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role-functionality"
                className="block text-sm font-medium text-gray-700"
              >
                Functionalities mapped
              </label>
              <select
                id="role-functionality"
                value={roleFunctionality}
                onChange={(e) => setRoleFunctionality(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select functionality</option>
                {functionalities.map((func) => (
                  <option key={func.id} value={func.name}>
                    {func.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-transparent border border-blue-700 w-[45%] md:w-[224px] rounded-xl px-4 md:px-10 py-3 text-blue-700 font-semibold text-sm  transition-colors duration-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-[#1C468E] rounded-xl w-[45%] md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm hover:bg-blue-800 transition-colors duration-200"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isSuccessPopupOpen && (
        <RoleSuccessPopup
          closePopup={handleSuccessPopupClose}
          SuccessPopup={handleSuccessPopupClose}
        />
      )}
    </>
  );
};

export default AddRolePopup;
