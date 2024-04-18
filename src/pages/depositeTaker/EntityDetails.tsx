import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectButton from "../../components/userFlow/form/SelectButton";
import InputFields from "../../components/userFlow/form/InputField";
import TextArea from "../../components/userFlow/form/TextArea";
import Button from "../../components/userFlow/form/Button";
import ArrowIcon from "../../assets/images/Arrow.svg";
import { EntityDetailschema } from "../../formValidationSchema/deposit_taker/EntityValidation.schema";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { useDTStore } from "../../zust/deposit-taker-registration/verificationData";

const EntityDetails: React.FC = () => {
  const navigate = useNavigate();
  const {entityFormData, setEntityFormData} = useDTStore((state) => state)

  const [states, setStates] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const options1 = [
    { value: "Pvt Ltd", label: "Pvt Ltd" },
    { value: "LLP", label: "LLP" },
    { value: "Sole PArtnership", label: "Sole PArtnership" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors
  } = useForm({
    resolver: yupResolver(EntityDetailschema),
  });
  const onSubmit = (data: any) => {
    setEntityFormData(Object.keys(data).map((k) => ({name : k, value : data[k]})))
    navigate("/depositetaker/signup/regulatordetails")
  };

  const handleSelectState = (value: any) => {
    setDistrict([]);
    setSelectedDistrict("");
    setValue("district", "");
    setSelectedState(value.label);
    setValue("state", value.label);
    clearErrors("state");
    handleStateSelect(value.value);
  };
  const handleSelectDistrict = (value: any) => {
    setSelectedDistrict(value.label);
    setValue("district", value.label);
    clearErrors("district");
  };


  const handleStateSelect = (id: number) => {
    axiosInstance
      .get(`/cms/location/district/${id}/list?pagesize=50`)
      .then((res : any) => {
        if (res.data.status === "success") {
          setDistrict(
            res.data.data.map((state: { id: number; name: string }) => ({
              label: state.name,
              value: state.id,
            }))
          );
        }
      })
      .catch((e : any) => alert("Error fetching States"));
  };

  // ---------- Fetch States ------------------
  const fetchStates = () => {
    axiosInstance
      .get(`/cms/location/state/95/list?pagesize=50`)
      .then((res : any) => {
        if (res.data.status === "success") {
          setStates(
            res.data.data.map((state: { id: number; name: string }) => ({
              label: state.name,
              value: state.id,
            }))
          );
        }
      })
      .catch((e : any) => alert("Error fetching States"));
  };

  const handleSelectEntity = (data :any) => {
    setSelectedEntity(data.label)
    setValue("entityType", data.label)
    clearErrors("entityType")
  }
  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (entityFormData.length > 0) {
     const uniqueId = entityFormData.find((d) => d.name === "uniqueId").value
     const addressLine1 = entityFormData.find((d) => d.name === "addressLine1").value
     const addressLine2 = entityFormData.find((d) => d.name === "addressLine2").value
     const pinCode = entityFormData.find((d) => d.name === "pinCode").value
     const gstNumber = entityFormData.find((d) => d.name === "gstNumber").value
     const entityType = entityFormData.find((d) => d.name === "entityType").value
     const state = entityFormData.find((d) => d.name === "state").value
     const district = entityFormData.find((d) => d.name === "district").value
    
     setValue("uniqueId", uniqueId)
     setValue("addressLine1", addressLine1)
     setValue("addressLine2", addressLine2)
     setValue("pinCode", pinCode)
     setValue("gstNumber", gstNumber)
     setValue("entityType", entityType)
     setValue("state", state)
     setValue("district", district)
     setSelectedDistrict(district)
     setSelectedState(state)
     setSelectedEntity(entityType)
    }
  }, [entityFormData])

  useEffect(() => {
    if (states.length > 0) {
      let stateId : any = states?.find((s : any) => s.label === selectedState);      
      if (stateId) {
        stateId = stateId.value
        handleStateSelect(stateId)
      }
    }
  }, [states])
  return (
    <div className="flex flex-col p-6 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-2xl font-bold mb-6">Entity Details</h1>
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="Typeofentity" className="text-base font-normal">
                Type of Entity <span className="text-red-500">*</span>
              </label>

              <SelectButton
                setOption={handleSelectEntity}
                options={options1}
                selectedOption={selectedEntity}
                placeholder="Select"
                showSearchInput={false}
              />
              <span className="text-red-400">
                {errors.entityType?.message}
              </span>
            </div>
            <div>
              <label htmlFor="uniqueId" className="text-base font-normal">
                Unique Id <span className="text-red-500">*</span>
              </label>
              <InputFields
                placeholder="Enter Unique Id"
                {...register("uniqueId")}
              />
              {errors.uniqueId && (
                <p className="text-red-500">{errors.uniqueId.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="addressLine1" className="text-base font-normal">
                Address line <span className="text-red-500">*</span>1
              </label>
              <TextArea
                placeholder="Enter address"
                {...register("addressLine1")}
                width="315px"
              />
              {errors.addressLine1 && (
                <p className="text-red-500">{errors.addressLine1.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="addressLine2" className="text-base font-normal">
                Address line <span className="text-red-500">*</span>2
              </label>
              <TextArea
                placeholder="Enter address"
                {...register("addressLine2")}
                width="315px"
              />

              {errors.addressLine2 && (
                <p className="text-red-500">{errors.addressLine2.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="pinCode" className="text-base font-normal">
                Pine code <span className="text-red-500">*</span>
              </label>
              <InputFields placeholder="Type Here" {...register("pinCode")} />
              {errors?.pinCode && (
                <p className="text-red-500">{errors?.pinCode?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="text-base font-normal">
                State <span className="text-red-500">*</span>
              </label>
              <SelectButton
                setOption={handleSelectState}
                options={states}
                selectedOption={selectedState}
                placeholder="Select"
                showSearchInput={true}
              />
              <span className="text-red-400">
                {errors.state?.message}
              </span>
            </div>

            <div>
              <label htmlFor="district" className="text-base font-normal">
                District <span className="text-red-500">*</span>
              </label>
              <SelectButton
                setOption={handleSelectDistrict}
                options={districts}
                selectedOption={selectedDistrict}
                placeholder="Select"
                showSearchInput={true}
              />
              <span className="text-red-400">
                {errors.district?.message}
              </span>
            </div>
            <div>
              <label htmlFor="gstNumber" className="text-base font-normal">
                GST Number <span className="text-red-500">*</span>
              </label>
              <InputFields placeholder="Type here" {...register("gstNumber")} />
              {errors?.gstNumber && (
                <p className="text-red-500">{errors?.gstNumber?.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <div className="flex cursor-pointer" onClick={() => navigate("/depositetaker/signup/verification")}>
            <img src={ArrowIcon} alt="" />
            <h1 className="text-sm font-normal text-black">Back</h1>
          </div>
          <div>
            <Button type="submit" label="Save & Continue" />
          </div>
        </div>

      </form>
    </div>
  );
};

export default EntityDetails;
