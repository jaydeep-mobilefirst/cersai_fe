import React, { FC, InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>   {}

const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <input
            type="text"
            className={`form-input border h-[56px] w-[317px] px-[8px] py-[16px] flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 ${props.className} justify-between align-middle]`}
            {...props}
            ref={ref}
        />
    )
})

export default InputFields;