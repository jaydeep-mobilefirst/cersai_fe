import Swal from "sweetalert2";
import { axiosTraceIdInstance } from "./axios";
import { useEffect, useState } from "react";

const dateFormattor = (date: Date) => {
  // Ensure the input is a Date object
  if (!(date instanceof Date)) date = new Date(date);

  let month = "" + (date.getMonth() + 1), // Months are zero-based
    day = "" + date.getDate(),
    year = date.getFullYear();

  // If day or month are less than 10, prepend with 0
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
};

async function getMimeTypeFromArrayBuffer(arrayBuffer: any) {
  const uint8arr = new Uint8Array(arrayBuffer);

  const len = 4;
  if (uint8arr.length >= len) {
    let signatureArr = new Array(len);
    for (let i = 0; i < len; i++)
      signatureArr[i] = new Uint8Array(arrayBuffer)[i].toString(16);
    const signature = signatureArr.join("").toUpperCase();
    // 25504446 - pdf
    // 3C737667 - svg
    console.log({ signature });

    switch (signature) {
      case "89504E47":
        return "image/png";
      case "47494638":
        return "image/gif";
      case "25504446":
        return "application/pdf";
      case "FFD8FFDB":
      case "FFD8FFE0":
        return "image/jpeg";
      case "504B0304":
        return "application/zip";
      case "3C737667":
        return "image/svg+xml";
      case "D0CF11E0":
        return "application/msword";
      default:
        return null;
    }
  }
  return null;
}

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isLinkExpired(data: any): boolean {
  // Getting the expiry date from the object
  const expiryDate = new Date(data?.expiryDate);

  // Getting the current date and time
  const currentDate = new Date();

  // Compare the current date and time with the expiry date
  if (currentDate > expiryDate) {
    return true; // The link is expired
  } else {
    return false; // The link is not expired
  }
}

const getFileDatafromBuffer = async (arrayBuffer: any) => {
  const buffer = new Uint8Array(arrayBuffer);
  const type = await getMimeTypeFromArrayBuffer(buffer);
  const blob = new Blob([buffer], { type: type ?? "" });
  const imageUrl = URL.createObjectURL(blob);
  window.open(imageUrl, "_blank", "noopener");
};
const handleViewOpenkmFileWithDocumentId = async (
  uploadFileId: string
): Promise<boolean> => {
  try {
    const response = await axiosTraceIdInstance.get(
      `/openkm/get/${uploadFileId}`
    );
    const data = await response.data;
    if (data?.status === "INTERNAL_SERVER_ERROR") {
      alert("File not exists");
      return false;
    } else {
      const arrayBuffer = data?.data?.data;
      await getFileDatafromBuffer(arrayBuffer);
      return true;
    }
  } catch (error) {
    alert("Something went wrong!");
    return false;
  }
};

const isUUID = (value: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
};
const formatDate = (dateStr: any) => {
  const date = new Date(dateStr);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
function useDebounce(value: any, delay: any) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
export {
  dateFormattor,
  panRegex,
  emailRegex,
  getMimeTypeFromArrayBuffer,
  isLinkExpired,
  handleViewOpenkmFileWithDocumentId,
  isUUID,
  formatDate,
  useDebounce,
};
