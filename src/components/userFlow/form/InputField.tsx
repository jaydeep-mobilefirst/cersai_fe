// import React, { FC, InputHTMLAttributes, forwardRef, useRef, useState } from 'react'
// import { dateFormattor } from '../../../utils/commonFunction';
// import Calender from './svgs/Calender';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

// const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
//     const { onChange, type } = props
//     const hiddenDateInput = useRef<HTMLInputElement>(null);
//     const [dateSelected, setDateSelected] = useState<any>(undefined)
//     const handleDateButtonClick = (event : any) => {
//         const element: any = document.getElementById('datePicker')
//         if (element && 'showPicker' in element) {
//             element?.showPicker();
//         }
//         if (hiddenDateInput.current) {
//             hiddenDateInput.current.showPicker();
//         }
//         event.preventDefault();
//     };

//     const onChangeHandler = (event: any) => {
//         if (onChange) {
//             onChange(event); // Directly call the passed-in onChange function with the event
//         }
//         const { value } = event.target;
//         if (value) {
//             setDateSelected(dateFormattor(new Date(value)))
//         }
//     }
//     return (
//         <>
//             {
//                 type === "date" ?
//                 <div className="flex justify-start items-center  h-[56px] w-[250px] border rounded-md">
//                         <button
//                             onClick={handleDateButtonClick}
//                             className="flex justify-between h-[56px] w-full px-[8px] py-[16px] rounded-lg text-gray-600 bg-white hover:bg-gray-100 focus:outline-none"
//                         >
//                             {dateSelected ? dateSelected : "Select Date"}
//                             <div>
//                                 <Calender />
//                             </div>
//                         </button>
//                         <input
//                             ref={ref}
//                             type="date"
//                             id='datePicker'
//                             className='absolute -z-10'
//                             onChange={onChangeHandler}
//                             placeholder='date'
//                         />
//                     </div>

//                     :
//                     <input
//                         type="text"
//                         className={`form-input border h-[56px] w-[250px] px-[8px] py-[16px] flex border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 ${props.className} justify-between align-middle]`}
//                         {...props}
//                         ref={ref}
//                     />
//             }
//         </>

//     )
// })

// export default InputFields;

import React, {
  FC,
  InputHTMLAttributes,
  forwardRef,
  useRef,
  useState,
} from "react";
import { dateFormattor } from "../../../utils/commonFunction";
import Calender from "./svgs/Calender";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  bgColor ?: string
}

const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { onChange, type, className } = props;
    const hiddenDateInput = useRef<HTMLInputElement>(null);
    const [dateSelected, setDateSelected] = useState<string | undefined>(
      undefined
    );
    const handleDateButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      if (hiddenDateInput.current) {
        hiddenDateInput.current.showPicker();
      }
      event.preventDefault();
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event); // Directly call the passed-in onChange function with the event
      }
      const { value } = event.target;
      if (value) {
        setDateSelected(dateFormattor(new Date(value)));
      }
    };

    return (
      <>
        {type === "date" ? (
          <div className="flex justify-start items-center border rounded-md overflow-hidden w-full max-w-xs sm:max-w-md md:max-w-lg">
            <button
              onClick={handleDateButtonClick}
              className="flex justify-between items-center h-[56px] w-full px-2 py-2 rounded-lg text-gray-600 bg-white hover:bg-gray-100 focus:outline-none"
            >
              {dateSelected ? dateSelected : "Select Date"}
              <Calender />
            </button>
            <input
              ref={ref}
              type="date"
              id="datePicker"
              className="absolute opacity-0 -z-10"
              onChange={onChangeHandler}
            />
          </div>
        ) : (
          <input
            type="text"
            className={`form-input border h-[56px] w-full sm:w-full md:max-w-full px-2 py-2 flex items-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 ${props?.bgColor}`}
            {...props}
            ref={ref}
          />
        )}
      </>
    );
  }
);

export default InputFields;
