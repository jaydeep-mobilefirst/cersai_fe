import React from "react";
import DownloadIcon from "../../assets/images/download-icon.svg";

interface DownloadComponentProps {
  title: string;
}

const DownloadItem: React.FC<DownloadComponentProps> = ({ title }) => {
  return (
    <div className="md:w-[643px] xl:w-[48%] w-full min-h-16 md:px-4 px-2 py-3 bg-white rounded-lg border border-neutral-700/opacity-20 flex justify-start items-center">
      <p className="w-[68%] md:w-full md:text-base text-[14px] font-bold text-gilroy-semibold">
        {title}
      </p>
      <div className="md:w-[140px] h-11 md:px-6 px-4 py-2.5 bg-blue-900 rounded-lg justify-center items-center gap-2 inline-flex">
        <img src={DownloadIcon} alt="download" className="w-6 h-6 " />
        <div className="text-white md:text-base text-[14px] font-normal text-gilroy-semibold">
          Download
        </div>
      </div>
    </div>
  );
};

export default DownloadItem;
