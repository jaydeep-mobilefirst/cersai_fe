import { CheckBox } from "@mui/icons-material"
import infoIcon from "../../../assets/images/info-circle.svg"

import UploadButtonSimple from '../../../components/userFlow/form/UploadButtonSimple'
import ProfileBranchesForm from '../../../components/userFlow/mainPortal/ProfileBranchesForm'
import ProfileBranchForm from "./ProfileBranchForm"
import InputFields from "../../../components/userFlow/common/InputField"

type Props = {}

const ProfileBranches = (props: Props) => {

    
  return (
    <div className="bg-white p-7 w-full h-full">
        <h1 className='font-semibold text-2xl mb-3'>Upload Branches</h1>
        <div className="w-full flex flex-row max-[950px]:flex-col max-[950px]:items-start   align-middle items-center">
        <div className='flex flex-row  justify-start align-middle text-gray-400 w-full items-start max-[950px]:mb-3' >
            <img src={infoIcon} alt="" className='mr-2' height={25} width={25}/>
            <div>You can Upload branches in bulk. Please use this given Template</div>
        </div>
            <UploadButtonSimple/>
        </div>

        <div className='mt-4'>
            {
                [1,2].map((index : number) => {
                    return <div className="my-3"><ProfileBranchForm key={index} i={index}/></div>
                })
            }
        </div>
        <div>
         <span className="flex flex-row justify-start align-middle items-center">
             <input type="checkbox" className="h-4 w-4 mr-2 rounded-lg accent-green-900"/>   
             I declare all the Information provided is correct as per my knowledge.  
        </span>
        </div>    
    </div>

  )
}

export default ProfileBranches