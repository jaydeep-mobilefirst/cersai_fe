import React, { FC, InputHTMLAttributes, forwardRef, useRef, useState } from 'react'
import { dateFormattor } from '../../../utils/commonFunction';
import Calender from './svgs/Calender';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { onChange, type } = props
    const hiddenDateInput = useRef<HTMLInputElement>(null);
    const [dateSelected, setDateSelected] = useState<any>(undefined)
    const handleDateButtonClick = () => {
        const element: any = document.getElementById('datePicker')
        if (element && 'showPicker' in element) {
            element?.showPicker();
        }
        if (hiddenDateInput.current) {
            hiddenDateInput.current.showPicker();
        }
    };

    const onChangeHandler = (event: any) => {
        if (onChange) {
            onChange(event); // Directly call the passed-in onChange function with the event
        }
        const { value } = event.target;
        if (value) {
            setDateSelected(dateFormattor(new Date(value)))
        }
    }
    return (
        <>
            {
                type === "date" ?
                <div className="flex justify-start items-center  h-[56px] w-[317px] border rounded-md">
                        <button
                            onClick={handleDateButtonClick}
                            className="flex justify-between h-[56px] w-[317px] px-[8px] py-[16px] rounded-lg text-gray-600 bg-white hover:bg-gray-100 focus:outline-none"
                        >
                            {dateSelected ? dateSelected : "Select Date"}
                            <div>
                                <Calender />
                            </div>
                        </button>
                        <input
                            ref={ref}
                            type="date"
                            id='datePicker'
                            className='absolute -z-10'
                            onChange={onChangeHandler}
                        />
                    </div>
                    
                    :
                    <input
                        type="text"
                        className={`form-input border h-[56px] w-[317px] px-[8px] py-[16px] flex border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 ${props.className} justify-between align-middle]`}
                        {...props}
                        ref={ref}
                    />
            }
        </>

    )
})

export default InputFields;