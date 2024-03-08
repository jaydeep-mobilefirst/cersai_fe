import React from "react";
import { useNavigate } from "react-router-dom";

const ReviewMain = () => {
  const Navigate = useNavigate();

  const navigeToLandingPage = () => {
    Navigate("/landingpage");
  };

  const navigeTomodel = () => {
    Navigate("/modeldiv");
  };

  return (
    <div className="container mx-auto">
      <div className="mb-[16px]">
        <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px;] text-gilroy-bold">
          <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
            Verification Status
          </p>
          <button
            onClick={navigeTomodel}
            className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal "
          >
            Success
          </button>
        </div>

        <div className="ml-[16px] mt-[24px] mr-[16px] mb-[24px] ">
          <div className="flex flex-col justify-between w-full sm:flex-row">
            <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid gap-y-[16px]">
              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">
                  Name<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>
            </div>

            <div className="w-full grid gap-y-[16px]">
              <div className="sm:ml-[48px] flex justify-between">
                <div className="opacity-60">
                  PAN Details<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[16px]">
        <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px;] text-gilroy-bold">
          <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
            Entity Details
          </p>
          <button
            onClick={navigeToLandingPage}
            className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal "
          >
            Edit
          </button>
        </div>

        <div className="ml-[16px] mt-[24px] mr-[16px] mb-[24px]">
          <div className="flex flex-col justify-between w-full sm:flex-row">
            <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid gap-y-[16px]">
              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">
                  Name of Deposit Taker<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">
                  Type of Entity<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">
                  Address Line 1<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">Address Line 2</div>
                <div>Lorem ipsum</div>
              </div>
            </div>

            <div className="w-full grid gap-y-[16px]">
              <div className="sm:ml-[48px] flex justify-between">
                <div className="opacity-60">
                  Unique Registration ID
                  <span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:ml-[48px] flex justify-between">
                <div className="opacity-60">
                  PIN code<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:ml-[48px] flex justify-between">
                <div className="opacity-60">
                  State<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:ml-[48px] flex justify-between">
                <div className="opacity-60">
                  District<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[16px]">
        <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px;] text-gilroy-bold">
          <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
            Regulator Details
          </p>
          <button
            onClick={navigeToLandingPage}
            className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal "
          >
            Edit
          </button>
        </div>

        <div className="ml-[16px] mt-[24px] mr-[16px] mb-[24px]">
          <div className="flex flex-col justify-between w-full sm:flex-row">
            <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid gap-y-[16px]">
              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">
                  Regulator Name<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">
                  Registration Approval Date
                  <span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>
            </div>

            <div className="w-full grid gap-y-[16px]">
              <div className="sm:ml-[48px] flex justify-between">
                <div className="opacity-60">
                  Regulator Registered Number
                  <span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[16px]">
        <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px;] text-gilroy-bold">
          <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
            Verification Status
          </p>
          <button
            onClick={navigeToLandingPage}
            className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal "
          >
            Edit
          </button>
        </div>

        <div className="ml-[16px] mt-[24px] mr-[16px] mb-[24px]">
          <div className="flex flex-col justify-between w-full sm:flex-row">
            <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid gap-y-[16px]">
              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">
                  Nodal Officer Name<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:mr-[48px] flex justify-between ">
                <div className="opacity-60">
                  Nodal Officer Email<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>
            </div>

            <div className="w-full grid gap-y-[16px]">
              <div className="sm:ml-[48px] flex justify-between">
                <div className="opacity-60">
                  Nodal Officer Name<span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>

              <div className="sm:ml-[48px] flex justify-between">
                <div className="opacity-60">
                  Nodal Officer Designation
                  <span className="text-[#ff0000]">*</span>
                </div>
                <div>Lorem ipsum</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewMain;
