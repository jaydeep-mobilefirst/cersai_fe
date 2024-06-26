import React from "react";

type Props = {};

const UploadButtonSvg1 = (props: Props) => {
  return (
    <div className="p-[8px] rounded-md" style={{ backgroundColor: "#1C468E" }}>
      <svg
        width={24}
        height={24}
        color="#ffffff"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 20.8201C15.426 22.392 8.574 22.392 2 20.8201"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0508 16V2"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.09961 6.21997L10.6096 2.60986C10.7895 2.42449 11.0048 2.27715 11.2427 2.17651C11.4806 2.07588 11.7363 2.02417 11.9946 2.02417C12.2529 2.02417 12.5086 2.07588 12.7465 2.17651C12.9844 2.27715 13.1997 2.42449 13.3796 2.60986L16.8996 6.21997"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default UploadButtonSvg1;
