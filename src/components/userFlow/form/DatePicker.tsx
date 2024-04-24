// import React, { useRef, useState } from 'react'
// import Calender from './svgs/Calender'
// import { dateFormattor } from '../../../utils/commonFunction'
// type Props = {
//     onChange ?: (event : any) => void
// }

// const DatePicker = ({onChange}: Props) => {
//     const hiddenDateInput = useRef<HTMLInputElement>(null);
//     const [dateSelected, setDateSelected] = useState<any>(undefined)
//     const handleDateButtonClick = () => {
//         if (hiddenDateInput.current) {
//             hiddenDateInput.current.showPicker();
//         }
//     };

//     const onChangeHandler = (event : any) => {
//         if(onChange) {
//             onChange(event); // Directly call the passed-in onChange function with the event
//         }
//         const {value} = event.target;
//         if (value) {
//             setDateSelected(dateFormattor(new Date(value)))
//         }
//     }
//     return (
//         <div className="flex justify-start items-center  h-[56px] w-[317px] border rounded-md">
//             <button
//                 onClick={handleDateButtonClick}
//                 className="flex justify-between h-[56px] w-[317px] px-[8px] py-[16px] rounded-lg text-gray-600 bg-white hover:bg-gray-100 focus:outline-none"
//             >
//                 {dateSelected ? dateSelected : "Select Date"}
//                 <div>
//                     <Calender />
//                 </div>
//             </button>
//             <input
//                 ref={hiddenDateInput}
//                 type="date"
//                 className='absolute -z-10'
//                 onChange={onChangeHandler}
//             />
//         </div>
//     )
// }

// export default DatePicker
import React, { useRef, useState } from "react";
import Calender from "./svgs/Calender";
import { dateFormattor } from "../../../utils/commonFunction";

type Props = {
  onChange?: (event: any) => void;
};

const DatePicker = ({ onChange }: Props) => {
  const hiddenDateInput = useRef<HTMLInputElement>(null);
  const [dateSelected, setDateSelected] = useState<string | undefined>(
    undefined
  );

  const handleDateButtonClick = () => {
    if (hiddenDateInput.current) {
      hiddenDateInput.current.showPicker();
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event); // Call the passed-in onChange function with the event
    }
    const { value } = event.target;
    if (value) {
      setDateSelected(dateFormattor(new Date(value)));
    }
  };

  return (
    <div className="flex justify-start items-center h-14 w-full max-w-[35rem] sm:max-w-sm md:max-w-md lg:max-w-2xl border rounded-md">
      <button
        type="button"
        onClick={handleDateButtonClick}
        className="flex justify-between items-center h-full w-full px-2 py-2 rounded-lg text-gray-600 bg-white hover:bg-gray-100 focus:outline-none"
      >
        {dateSelected || "Select Date"}
        <Calender />
      </button>
      <input
        ref={hiddenDateInput}
        type="date"
        className="absolute opacity-0 -z-10"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default DatePicker;
