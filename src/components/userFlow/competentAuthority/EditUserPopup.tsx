import { useState, useEffect } from "react";
import CrossIcon from "../../../assets/images/CrossIcon.svg";

type TableType = {
  sno: string;
  depositTakerName: string;
  depositTakerId: string;
  status: string;
  action: boolean;
};

interface EditRolePopupProps {
  user: TableType;
  onClose: () => void;
}

const EditRolePopup: React.FC<EditRolePopupProps> = ({ user, onClose }) => {
  const [userName, setUserName] = useState(user.depositTakerName);
  const [role, setRole] = useState(user.depositTakerId);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  useEffect(() => {
    setUserName(user.depositTakerName);
    setRole(user.depositTakerId);
  }, [user]);

  const handleSave = () => {
    if (userName !== "" && role !== "") {
      setIsSuccessPopupOpen(true);
      // You can handle the save logic here, such as updating the user data
      // and closing the popup after saving.
      onClose();
    }
  };

  return (
    <>
      {!isSuccessPopupOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-200 popup-container">
          <div className="bg-white rounded-lg p-8 w-[90%] max-w-[500px] relative">
            <img
              src={CrossIcon}
              alt="Close"
              className="cursor-pointer absolute top-2 right-2"
              onClick={onClose}
            />
            <div className="flex justify-center items-center">
              <h1 className="text-xl font-semibold">Edit User</h1>
            </div>
            <hr className="my-4" />
            <div className="mb-4">
              <label
                htmlFor="user-name"
                className="block text-sm font-medium text-gray-700"
              >
                User Name:
              </label>
              <input
                id="user-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Type input"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role:
              </label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Type input"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-center space-x-4">
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
