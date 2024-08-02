// import React, { useRef, useState } from "react";
// import Calender from "./svgs/Calender";

// type Props = {
//   disabled ?: boolean
//   onChange?: (event: any) => void;
//   userValue?: string;
//   backgroundColor?: string; // New background color prop
// };

// const DatePicker = ({ onChange, userValue, backgroundColor, disabled }: Props) => {
//   const hiddenDateInput = useRef<HTMLInputElement>(null);
//   const [dateSelected, setDateSelected] = useState<string | undefined>(
//     userValue
//   );

//   const handleDateButtonClick = () => {
//     if (hiddenDateInput.current) {
//       hiddenDateInput.current.showPicker();
//     }
//   };

//   const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (onChange) {
//       onChange(event); // Call the passed-in onChange function with the event
//     }
//     const { value } = event.target;
//     if (value) {
//       setDateSelected(value);
//     }
//   };

//   return (
//     <div className="flex justify-start items-center h-14 w-full max-w-[35rem] sm:max-w-[100%] md:max-w-md lg:max-w-2xl border rounded-md">
//       <button
//         type="button"
//         disabled={disabled ? disabled : false}
//         onClick={handleDateButtonClick}
//         className={`flex justify-between items-center h-full w-full px-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none`}
//         style={{ backgroundColor: backgroundColor || "white" }} // Set background color
//       >
//         {dateSelected || "Select Date"}
//         <Calender />
//       </button>
//       <input
//         disabled={disabled ? disabled : false}
//         defaultValue={userValue}
//         ref={hiddenDateInput}
//         type="date"
//         className="absolute opacity-0 -z-10"
//         onChange={onChangeHandler}
//       />
//     </div>
//   );
// };

// export default DatePicker;
import React, { useRef, useState } from "react";
import Calender from "./svgs/Calender";

type Props = {
  disabled?: boolean;
  onChange?: (event: any) => void;
  userValue?: string;
  backgroundColor?: string; // New background color prop
};

const DatePicker = ({
  onChange,
  userValue,
  backgroundColor,
  disabled,
}: Props) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const hiddenDateInput = useRef<HTMLInputElement>(null);
  const [dateSelected, setDateSelected] = useState<string | undefined>(
    userValue ? formatDate(userValue) : undefined
  );

  const handleDateButtonClick = () => {
    if (hiddenDateInput.current) {
      hiddenDateInput.current.showPicker();
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (onChange) {
      onChange(event); // Call the passed-in onChange function with the event
    }
    if (value) {
      const formattedDate = formatDate(value);
      setDateSelected(formattedDate);
    }
  };

  const getCurrentDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD for the input[type="date"]
  };

  return (
    <div className="flex justify-start items-center h-14 w-full max-w-[35rem] sm:max-w-[100%] md:max-w-md lg:max-w-2xl border rounded-md">
      <button
        type="button"
        disabled={disabled ? disabled : false}
        onClick={handleDateButtonClick}
        className={`flex justify-between items-center h-full w-full px-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none`}
        style={{ backgroundColor: backgroundColor || "white" }} // Set background color
      >
        {dateSelected || "Select Date"}
        <Calender />
      </button>
      <input
        disabled={disabled ? disabled : false}
        defaultValue={userValue}
        ref={hiddenDateInput}
        type="date"
        className="absolute opacity-0 -z-10"
        onChange={onChangeHandler}
        max={getCurrentDate()} // Set max date to today
      />
    </div>
  );
};

export default DatePicker;
