import React, { ButtonHTMLAttributes, FC, forwardRef } from 'react';
import './custom_css/upload_button.css'; // This will be your custom CSS file
import UploadButtonFolderSvg from './svgs/UploadButtonFolderSvg';
import UploadButtonSvg1 from './svgs/UploadButtonSvg1';
import { UploadButtonTexts } from "../../../utils/hardText/formComponents"
import UploadDocumentComp from '../common/UploadDocumenetComp';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }


const UploadButton: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return (
        <button
            {...props}
            ref={ref}
            className="upload-button w-[317px] h-[56px] gap-14 flex items-center justify-center px-[8px] py-[16px] rounded-md font-medium focus:outline-none transition duration-150 ease-in-out border"
        >
            <div className='flex items-center justify-center gap-2'>
                <UploadButtonFolderSvg />
                <div className='text-left'>
                    <span style={{ fontSize: "14px" }}>
                        {UploadButtonTexts.uploadDocument}
                    </span>
                    <p style={{ fontSize: "14px" }} className='text-gray-400'>
                        {UploadButtonTexts.noDocumentsAdded}
                    </p>
                </div>
            </div>
            <UploadButtonSvg1 />
            <UploadDocumentComp />
        </button>
    );
})

export default UploadButton;
