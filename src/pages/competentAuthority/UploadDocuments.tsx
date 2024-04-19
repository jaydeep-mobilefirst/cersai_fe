import React from 'react'
import UploadButton from '../../components/userFlow/form/UploadButton';
import Button from '../../components/userFlow/form/Button';
import document from '../../assets/images/documentTestHigh.svg'
import upload from '../../assets/images/export.svg'
type Props = {}

const UploadDocuments = (props: Props) => {
   
    
    return (
        <form className="p-4 flex flex-col w-full max-w-[80%] justify-between">
            
                
            <div>
                    <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px] text-gilroy-bold mb-4">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap">
                        Upload Documents
                      </p>
                    </div>
                    <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between items-center h-16 text-gilroy-bold mb-4">
                      <div className="flex p-7 space-x-2 ">
                        <div className="mt-2">
                          <img
                            src={document}
                            alt={document}
                            className="w-6"
                          />
                        </div>
                        <div className="">
                          <h1 className="text-sm font-normal text-gilroy-medium text-[#1D1D1B]">
                          Office Order / Any other supporting document for appointment of Nodal Officer<span className='text-[#E43625;]'></span>
                          </h1>
                          <p className="text-base font-normal text-gilroy-medium text-gray-400">
                          No Document uploaded
                          </p>
                        </div>
                      </div>
                      <div className="mr-3">
                      <img
                            src={upload}
                            alt={upload}
                            className="bg-[#385723] rounded p-3 text-white"
                          />
                      
                      </div>
                    </div>
                  </div>
                <div className="flex justify-between items-center">
                    <div className='flex flex-row'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 6L9 12L15 18" stroke="#1D1D1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <button className="text-black transition duration-300">
                            Back
                        </button>
                    </div>
                    <button
                        type={'submit'}
                        className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm  w-[224px]"
                    >
                        Save and Continue
                    </button>
                </div>
           
        </form>

    )
}

export default UploadDocuments;