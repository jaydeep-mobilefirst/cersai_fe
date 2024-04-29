import React from 'react'
import UploadButton from '../../../components/userFlow/form/UploadButton'
import ProfileUploadDocument from '../../../components/userFlow/form/ProfileUploadDocument'

type Props = {}

const ProfileUploadDocuments = (props: Props) => {
    return (
        <>
        <div className="bg-white w-full h-screen flex flex-col justify-between">

            <div className="p-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-5 space-y-0">
                <div>
                    <ProfileUploadDocument id="Dsc" type="button" deleteFile={() => {}}/>
                </div>
                <div>
                    <ProfileUploadDocument id="Dsc" type="button" deleteFile={() => {}}/>
                </div>
                <div>
                    <ProfileUploadDocument id="Dsc" type="button" deleteFile={() => {}}/>
                </div>
                <div>
                    <ProfileUploadDocument id="Dsc" type="button" deleteFile={() => {}}/>
                </div>
                <div>
                    <ProfileUploadDocument id="Dsc" type="button" deleteFile={() => {}}/>
                </div>
                <div>
                    <ProfileUploadDocument id="Dsc" type="button" deleteFile={() => {}}/>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pb-6 px-6">
        <div className="flex flex-row items-center mr-auto mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#1D1D1B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]">
                Back
              </button>
            </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs mt-3"
            >
              Save and Continue
            </button>
          </div>
        </div>
        </div>
       
        </>
    )
}

export default ProfileUploadDocuments