import React from "react";

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ExtensionModal: React.FC<CustomModalProps> = ({
  open,
  handleClose,
  title,
  children,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="px-4 py-2 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {children}
          <p className="mt-4">
            Please install the SignerDigital browser extension using
            <a
              href="https://web.signer.digital/GetStarted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline ml-1"
            >
              this link.
            </a>
          </p>
        </div>
        <div className="px-4 py-2 border-t flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionModal;
