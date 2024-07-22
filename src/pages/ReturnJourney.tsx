import React, { useEffect } from 'react'
import LoaderSpin from '../components/LoaderSpin'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { bffUrl } from '../utils/api';
import { useDepositTakerRegistrationStore } from '../zust/deposit-taker-registration/registrationStore';

type Props = {}
export const paths: any = {
  DT: "/depositetaker/signup/reviewdetails",
  RG: "/regulator/court/reviewdetails",
  DC: "/designated/court/reviewdetails",
  CA: "/competent/authority/reviewdetails",
};
const ReturnJourney = (props: Props) => {
  const Navigate = useNavigate();
  const { setAllFormData, setAllDocumentData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const [searchParams, setSearchParams] = useSearchParams();
  let identityToken = searchParams.get("identity")
  const otpVerified = sessionStorage.getItem("otp-verified");

  if (!otpVerified || otpVerified === "false") {
    sessionStorage.setItem("otp-sent", "false");
    sessionStorage.setItem("timerSec", "120");
    sessionStorage.setItem("link", "/return-journey?identity=" + identityToken);
    setTimeout(() => {
      Navigate("/otp-verification?token=" + identityToken);
    }, 3000);
  }
  let decodedToken: any = jwtDecode(identityToken ?? "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoibnVsbCJ9.O-b2MQ9bKh0MxkRqdx4l0VROhzWq6Bi1IXW2VXN_9I0")
  const fetchFormFields = () => {
    axios
      .get(`${bffUrl}/registration/field-data/${decodedToken?.entityType === 'CA' ? 3 :
          decodedToken?.entityType === 'RG' ? 2 :
            decodedToken?.entityType === 'DC' ? 4 : 1
        }?status=addToProfile`)
      .then(async (response) => {

        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let resData = await axios.get(
              `${bffUrl}/${decodedToken?.entityType === 'CA' ? 'competent-authority' :
                decodedToken?.entityType === 'RG' ? 'regulator' :
                  decodedToken?.entityType === 'DC' && 'designated-court'
              }/${decodedToken?.entityId}`
            );

            dtData = decodedToken?.entityType === 'CA' ? resData?.data?.data?.competentAuthority?.competentAuthorityData :
              decodedToken?.entityType === 'RG' ? resData?.data?.data?.regulator?.regulatorFormData :
                decodedToken?.entityType === 'DC' ? resData?.data?.data?.designatedCourt?.designatedCourtFormData : null

          } catch (error) {
            console.log("Error");
          }
          // console.log(dtData, "respnse--------------");
          let modifiedFormFields = response.data.data?.formFields?.map(
            (o: any) => ({
              ...o,
              userInput: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
            })
          );

          let modifiedFileFields =
            response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
              ...o,
              file: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
              fileName: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              uploadFileId: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
            }))?.sort((a: any, b: any) => a.sortOrder - b.sortOrder)


          let obj = {
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
            currentEntity: decodedToken,
            returnJourney: true,
            uniqueId: identityToken
          };
          setAllFormData(obj);
          setAllDocumentData(modifiedFileFields);
          Navigate(paths[decodedToken?.entityType]);
        } else {
          throw new Error("Error getting data, Please try later!");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (decodedToken?.data !== 'null' && otpVerified && (otpVerified === "true" || otpVerified)) {
      fetchFormFields()
    }
  }, [decodedToken])

  return (
    <div className='h-[100vh] flex align-middle justify-center items-center'>

      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>


  )
}

export default ReturnJourney