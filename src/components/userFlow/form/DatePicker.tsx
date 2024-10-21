import React, { useEffect, useRef, useState } from "react";
import Calender from "./svgs/Calender";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";

type Props = {
  disabled?: boolean;
  onChange?: (event: any) => void;
  userValue?: string;
  backgroundColor?: string;
  maxDate?: string;
};

const DatePicker = ({
  onChange,
  userValue,
  backgroundColor,
  disabled,
  maxDate,
}: Props) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  console.log({ maxDate }, "max date");

  const hiddenDateInput = useRef<HTMLInputElement>(null);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const [dateSelected, setDateSelected] = useState<string | undefined>(
    userValue ? formatDate(userValue) : undefined
  );
  const startDate = allFormData?.formFields?.form_fields?.find(
    (item: any) =>
      item?.key === "startDateByCARG" || item?.key === "startDateByDT"
  )?.userInput;
  const lastDate = allFormData?.formFields?.form_fields?.find(
    (item: any) => item?.key === "lastDate" ||  item?.key ==="lastDateDT" ||  item?.key==="lastDateCARG"
  )?.userInput;
  console.log({ startDate, lastDate });
  useEffect(() => {
    if (userValue) {
      setDateSelected(formatDate(userValue));
    } else {
      setDateSelected(undefined); // If no userValue is provided, default to "Select Date"
    }
  }, [userValue]);

  const handleDateButtonClick = () => {
    if (hiddenDateInput.current) {
      hiddenDateInput.current.showPicker();
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event?.target;
    if (onChange) {
      onChange(event); // Call the passed-in onChange function with the event
    }
    if (value) {
      const formattedDate = formatDate(value);
      setDateSelected(formattedDate);
    }
  };

  const getCurrentDate = (): string => {
    const today = new Date();
    const day = String(today?.getDate())?.padStart(2, "0");
    const month = String(today?.getMonth() + 1)?.padStart(2, "0");
    const year = today?.getFullYear();
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD for the input[type="date"]
  };

  const determineMaxDate = (): string | undefined => {
    if (
      maxDate === "dateOfIncorporation" ||
      maxDate === "Regulator approval Date" ||
      maxDate === "startDate" ||
      maxDate === "startDateByCARG" ||
      maxDate === "startDateByDT" ||
      maxDate === "RG-A-DATE-DT"
    ) {
      return getCurrentDate(); // Restrict to today's date if conditions are met
    }
    return undefined; // No restriction if no condition is met
  };
  console.log("startDATE", startDate);

  return (
    <div className=" flex justify-start items-center h-14 w-full max-w-[35rem] sm:max-w-[100%] md:max-w-md lg:max-w-2xl border rounded-md">
      <button
        type="button"
        disabled={!startDate && (maxDate === "lastDate" || maxDate === "lastDateDT" || maxDate === "lastDateCARG") || disabled}
        onClick={handleDateButtonClick}
        className={`flex justify-between items-center h-full w-full px-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none`}
        style={{
          backgroundColor: !startDate && (maxDate === "lastDate" || maxDate === "lastDateDT" || maxDate === "lastDateCARG") ||disabled ? "#E5E4E2" : backgroundColor || "white",
        }}
      >
        {dateSelected || "Select Date"}
        <div className="">
          <Calender />
        </div>
      </button>
      <input
        disabled={ disabled}
        ref={hiddenDateInput}
        type="date"
        className="absolute opacity-0 -z-10 mt-10"
        onChange={onChangeHandler}
        max={
          lastDate
            ? new Date(lastDate)?.toISOString()?.split("T")[0]
            : determineMaxDate()
        }
        
        min={
          (maxDate === "lastDate" || maxDate === "lastDateDT" || maxDate === "lastDateCARG") && startDate
            ? new Date(startDate)?.toISOString()?.split("T")[0]
            : undefined
        }
      />
    </div>
  );
};

export default DatePicker;
