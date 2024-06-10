import React from "react";
import LoaderSpin from "../LoaderSpin";

interface ButtonCompProps {
  onClose: () => void;
  title?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loader?: boolean;
  isAllFields?: boolean;
}

const ButtonComp: React.FC<ButtonCompProps> = ({
  onClose,
  title = "Save",
  type,
  disabled,
  loader = false,
  isAllFields,
}) => {
  const handleCancel = () => {
    onClose();
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // Add functionality for Save button if needed
  };

  return (
    <div className="flex flex-row justify-around">
      <button
        className="w-[40%] md:w-[224px] h-[56px] rounded-xl border border-[#1c468e] text-[#1c468e]"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        type={type}
        className={`ml-6 md:ml-[32px] w-[40%] md:w-[224px] h-[56px] rounded-xl text-white ${
          disabled
            ? "bg-gray-300 cursor-not-allowed text-white"
            : "bg-[#1c468e]"
        }`}
        onClick={handleSave}
        disabled={loader}
      >
        {loader ? <LoaderSpin /> : title}
      </button>
    </div>
  );
};

export default ButtonComp;
