import React, { useEffect, useState } from 'react'
import InputFields from '../../components/userFlow/form/InputField'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RegulatorsDetailsSchema from '../../formValidationSchema/deposit_taker/RegulatorsDetails.schema';
import { useNavigate } from 'react-router-dom';
import SelectButton from "../../components/userFlow/form/SelectButton";
import { useDTStore } from '../../zust/deposit-taker-registration/verificationData';

type Props = {}

const RegularDetailsForm = (props: Props) => {
    const {regulatorFormData, setRegulatorFormData } = useDTStore((state) => state)

    const { register, handleSubmit, formState: { errors }, reset, setValue, setError, clearErrors} = useForm({
        resolver: yupResolver(RegulatorsDetailsSchema)
    });
    const [selectedRg, setSelectedRg] = useState();
    const [selectedDate, setSelectedDate] = useState<string | undefined>("");

    const indianRegulators = [
        { value: "RBI", label: "Reserve Bank of India" },
        { value: "SEBI", label: "Securities and Exchange Board of India" },
        { value: "IRDAI", label: "Insurance Authority of India" },
        { value: "PFRDA", label: "Pension Fund Regulatory and Development Authority" }
      ];

    const navigate = useNavigate()
    const handleDateChange = (event : any) => {
        const {value} = event.target;
        const today = new Date();
        const selected = new Date(value)
        today.setHours(0, 0, 0, 0);

        // if(!(selected <= today)){
        //     setError("registrationDate", {message : "Date should not be in future"})
        // }
        // else{
        // }
        clearErrors("registrationDate")
        setValue('registrationDate', value)
        setSelectedDate(value)
    }

    const onSubmitClick = (data: any) => {
        setRegulatorFormData(Object.keys(data).map((k) => ({name : k, value : data[k]})))
        navigate("/depositetaker/signup/nodaldetails")
    }

    const handleSelectRegulator = (data: any) => {
        setValue("regulatorName", data.label)
        setSelectedRg(data.label)
        clearErrors("regulatorName")
    }

    useEffect(() => {
        if (regulatorFormData.length > 0) {
            const registrationDate = regulatorFormData.find((d) => d.name === "registrationDate").value
            const registrationNo = regulatorFormData.find((d) => d.name === "registrationNo").value
            const regulatorName = regulatorFormData.find((d) => d.name === "regulatorName").value

            console.log({registrationDate});
            
            setValue("registrationDate", registrationDate)
            setValue("registrationNo", registrationNo)
            setValue("regulatorName", regulatorName)
            setSelectedRg(regulatorName)
            setSelectedDate(registrationDate)
        }
    }, [regulatorFormData])

    console.log({selectedDate});
    

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitClick)} className="p-4 flex flex-col w-full max-w-[80%] justify-between">
                <div className="bg-white p-6 w-full">
                    <h1 className="text-2xl font-bold mb-6">Regulator Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="regulatorName" className="block text-gray-700 text-sm font-bold mb-2">
                                Regulator <span className='text-red-500'>*</span>
                            </label>
                            <SelectButton
                                setOption={handleSelectRegulator}
                                options={indianRegulators}
                                selectedOption={selectedRg}
                                placeholder="Select"
                                showSearchInput={false}
                            />
                            <span className="text-red-500">{errors.regulatorName?.message}</span>
                        </div>
                        <div>
                            <label htmlFor="registrationNo" className="block text-gray-700 text-sm font-bold mb-2">
                                Registration No. <span style={{ fontSize: "10px" }}>(Provided by Regulator)</span><span className='text-red-500'>*</span>
                            </label>
                            <InputFields
                                type="text"
                                id="registrationNo"
                                placeholder="Type here"
                                {...register('registrationNo')}
                            //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <span className="text-red-500">{errors.registrationNo?.message}</span>
                        </div>
                        <div>
                            <label htmlFor="registrationDate" className="block text-gray-700 text-sm font-bold mb-2">
                                Registration approval Date<span className='text-red-500'>*</span>
                            </label>
                            <InputFields
                                date={selectedDate}
                                type="date"
                                id="registrationDate"
                                {...register('registrationDate')}
                                onChange={handleDateChange}
                            />
                            <span className="text-red-500">{errors.registrationDate?.message}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className='flex flex-row'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 6L9 12L15 18" stroke="#1D1D1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <button className="text-black transition duration-300" type='button' onClick={() => navigate("/depositetaker/signup/entitydetials")}>
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
        </>

    )
}

export default RegularDetailsForm