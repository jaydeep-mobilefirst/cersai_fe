import React from "react";

interface OtpInputProps {
  label: string;
  infoText: string;
  resendText: string;
  timer: string;
  error: string;
  onResend: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
  label,
  infoText,
  resendText,
  timer,
  error,
  onResend,
}) => {
  const timerSeconds = parseInt(timer, 10);

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <label className="block text-sm sm:text-base font-medium">
          {label} <span className="text-red-600">*</span>
        </label>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <div className="text-xs sm:text-sm text-black opacity-50">
            {timer}
          </div>

          <button
            onClick={onResend}
            className={`text-sm sm:text-base ${
              timerSeconds > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-500 cursor-pointer"
            }`}
            disabled={timerSeconds > 0}
          >
            {resendText}
          </button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            placeholder="0"
            type="text"
            maxLength={1}
            className="w-12 sm:w-14 h-12 sm:h-14 bg-white rounded-lg border border-neutral-200 text-center text-lg"
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs sm:text-sm text-black opacity-50">
          {infoText}
        </span>
        {/* {error && (
          <span className="text-xs sm:text-sm text-red-500">{error}</span>
        )} */}
      </div>
    </div>
  );
};

export default OtpInput;
