import React from 'react'
import InputFields from '../../components/userFlow/common/InputField'

type Props = {}

const ResetPassword = (props: Props) => {
    const innerHeight =  window.innerHeight
    const customclass = `flex flex-col w-full mt-4 justify-between h-[430px] w-full`;
    console.log({innerHeight});
    
    return (
        <div className={customclass}>
            <form
                className="flex flex-col justify-between h-full p-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label
                            htmlFor="oldPassword"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Old Password<span className="text-red-500">*</span>
                        </label>
                        <InputFields
                            type="password"
                            id="oldPassword"
                            placeholder="Type Old Password"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            New Password<span className="text-red-500">*</span>
                        </label>
                        <InputFields
                            type="password"
                            id="newPassword"
                            placeholder="Type Old Password"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Confirm Password<span className="text-red-500">*</span>
                        </label>
                        <InputFields
                            type="password"
                            id="confirmPassword"
                            placeholder="Type Old Password"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pb-3 mr-3">
                    <button style={{ color: "#52AE32" }} className="font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] mr-5">
                        Cancel
                    </button>
                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </form>
            <div className="border-[#E6E6E6] border-[1px] mt-2 w-full"></div>
            <p className="text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer py-3">
                © 2024 Protean BUDs, All Rights Reserved.
            </p>
        </div>
    )
}

export default ResetPassword