// import eyeShow from "../../assets/images/eye.svg";
// import React from "react";

// interface Notifications {
//   name: string;
//   text: string;
//   img: string | null;
//   link: string | null;
// }

// interface NotificationProps {
//   title: string;
//   date: string; // Ensure date is a string
//   links: string | null;
//   buttons: Notifications[]; // Ensure buttons is an array of Notifications
// }

// const NotificationItem: React.FC<NotificationProps> = ({
//   title,
//   date,
//   links,
//   buttons
// }) => {

//   const handleButtonClick = (link: string | null) => {
//     if (link) {
//       window.open(link, '_blank');
//     }
//   };
//   return (
//     <div className="p-3 bg-white rounded-lg border border-neutral-700/opacity-20 flex justify-between items-center md:mx-[56px] mx-[16px] mb-[12px]">
//       <div className="w-[80%]">
//         <div className="md:text-base text-[14px] font-bold text-[#393939] text-gilroy-semibold">
//           {title}
//         </div>
//         <div className="text-[#1D1D1B] opacity-60 md:text-base text-[14px] font-normal text-gilroy-medium">
//           {date}
//         </div>
//       </div>
//       <div className="h-11 md:px-4 px-3 md:py-2.5 py-2 bg-blue-900 rounded-lg justify-center items-center gap-2 inline-flex cursor-pointer" onClick={() => handleButtonClick(links)}>
//         <img src={buttons?.[0]?.img || ''} alt="eye" className="w-6 h-6" />
//         <p className="text-white text-base font-normal text-gilroy-semibold">
//         {buttons?.[0]?.text}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NotificationItem;

import React from "react";
import eyeShow from "../../assets/images/eye.svg";

interface Notifications {
  name: string;
  text: string;
  img: string | null;
  link: string | null;
}

interface NotificationProps {
  title: string;
  date: string;
  links: string | null;
  buttons: Notifications[];
}

const NotificationItem: React.FC<NotificationProps> = ({
  title,
  date,
  links,
  buttons,
}) => {

  const handleButtonClick = (link: string | null) => {
    if (link) {
      if (link.startsWith('https:/')) {
        window.open(link, '_blank');
      } else {
        window.open('https:/' + link, '_blank');
      }
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg border border-neutral-700/opacity-20 flex justify-between items-center md:mx-[56px] mx-[16px] mb-[12px]">
      <div className="w-[80%]">
        <div className="md:text-base text-[14px] font-bold text-[#393939] text-gilroy-semibold">
          {title}
        </div>
        <div className="text-[#1D1D1B] opacity-60 md:text-base text-[14px] font-normal text-gilroy-medium">
          {date}
        </div>
      </div>
      <div className="h-11 md:px-4 px-3 md:py-2.5 py-2 bg-blue-900 rounded-lg justify-center items-center gap-2 inline-flex cursor-pointer" onClick={() => handleButtonClick(links)}>
        <img src={buttons?.[0]?.img || ''} alt="eye" className="w-6 h-6" />
        <p className="text-white text-base font-normal text-gilroy-semibold">
          {buttons?.[0]?.text}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
