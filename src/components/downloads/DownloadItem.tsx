import React from "react";

interface Download {
  name: string;
  text: string;
  img: string | null;
  link: string | null;
}

interface DownloadComponentProps {
  title: string;
  link:string | null;
  buttons: Array<Download>;
}

const DownloadItem: React.FC<DownloadComponentProps> = ({ title,link,buttons }) => {

  const handleButtonClick = (link: string | null) => {
    if (link) {
      window.open(link, '_blank');
    }
  };
  return (
    <div className="md:w-[643px] xl:w-[48%] w-full min-h-16 md:px-4 px-2 py-3 bg-white rounded-lg border border-neutral-700/opacity-20 flex justify-start items-center">
      <p className="w-[68%] md:w-full md:text-base text-[14px] font-bold text-gilroy-semibold">
        {title}
      </p>
      <div className="md:w-[140px] h-11 md:px-6 px-4 py-2.5 bg-blue-900 rounded-lg justify-center items-center gap-2 inline-flex cursor-pointer" onClick={() => handleButtonClick(link)}>
        <img src={buttons[0]?.img || ''} alt="download" className="w-6 h-6 " />
        <div className="text-white md:text-base text-[14px] font-normal text-gilroy-semibold">
          {buttons[0]?.text}
        </div>
      </div>
    </div>
  );
};

export default DownloadItem;
