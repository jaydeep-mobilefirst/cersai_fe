import React, { useEffect, useState } from "react";
import InputFields from "../../components/userFlow/common/InputField";
import Footer from "../../components/userFlow/userProfile/Footer";
import { useScreenWidth } from "../../utils/screenSize";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { bffUrl } from "../../utils/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DscKeyLogin from "../../components/userFlow/form/DscKeyLogin";

const UploadDSC3Competent = () => {
  const [isDscSelected, setDscSelected] = useState<boolean>(false);
  const [dscCertificate, setDscCertificate] = useState<any>();
  const [isError, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const screenWidth = useScreenWidth();
  const customClass = "flex flex-col w-full mt-4 justify-between w-full";

  const navigate = useNavigate();

  useEffect(() => {
    console.log(isError);
    if (isDscSelected) {
      setError(false);
    }
  }, [isDscSelected]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isDscSelected) {
      setError(true);
      return;
    }
    console.log(dscCertificate, "clicked dsc3 submit");

    const userId = sessionStorage.getItem("userId");

    try {
      setLoader(true);
      const response = await axios.put(`${bffUrl}/user/updatedsc`, {
        id: Number(userId),
        dscCertificate: dscCertificate,
        // dscCertificate: btoa(dscCertificate?.Cert),
      });
      console.log(response?.data);
      setLoader(false);
    } catch (error) {
      console.error("Error updating DSC:", error);
      setLoader(false);
    }
  };

  return (
    <>
      <div className="mt-6 mx-6">
        <TaskTabs />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between p-6"
        style={{
          height: `${screenWidth > 1024 ? "calc(100vh - 170px)" : "100%"}`,
        }}
      >
        <div className="w-[100%] md:w-[35%]">
          <DscKeyLogin
            isDscSelected={isDscSelected}
            setDscSelected={setDscSelected}
            setDscCertificate={setDscCertificate}
          />
          {isError && <p className="text-red-500">select DSC3 certificate</p>}
        </div>
        <div>
          <Footer loader={loader} />
        </div>
      </form>
    </>
  );
};

export default UploadDSC3Competent;
