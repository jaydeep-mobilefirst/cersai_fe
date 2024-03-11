import closeCircle from '../../assets/images/closeCircle.svg';
import add from '../../assets/images/add.svg';
import directboxSend from '../../assets/images/directboxSend.svg';
import trash from '../../assets/images/trash.svg';
import failedImg from '../../assets/images/failedImg.svg';
import circleForModal from '../../assets/images/circleForModal.svg';
import tickCircle from '../../assets/images/tickCircle.svg';

//RegisterModel Component
export const registrationFirstPage=[
    {heading:"Entity Type",removeBtn:closeCircle},
    {btn1:"Cacel",btn2:"Select"}
  ]
export const radioButtons=[
    {id:1,text:"Deposit Taker"},
    {id:2,text:"Regulator"},
    {id:3,text:"Designated Court"},
    {id:4,text:"Competent Authority"}
]
//UploadDocumentComp Component
export const uploadModal=[
  {heading:"Upload Document"},
  {cancelImgSrc:add},
  {uploadImgSrc:directboxSend},
  {formats:"Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT"},
  {size:"File size : Less than 500kb"},
  {buttonText:"Browse files"}
]
//DocumentDeleteComp Component
export const documentDeleteModal =[
  {cancelImgSrc:add},
  {deleteImageSrc:trash},
  {deleteTxt:"Are you Sure to Delete"},
  {extension:"Document.pdf ?"},
  {cancelBtn:"Cancel",okayBtn:"Okay"}

]
//VerificationFailedComp Component
export const verificationFiledModal=[
  {cancelImgSrc:add},
  {failedImgSrc:failedImg},
  {heading:"Verification Failed"},
  {description:"We were unable to verify your DSC details."},
  {okayBtn:"Okay"},
  {circleImgSrc:circleForModal}
]
// RegistrationSuccessComp Component

export const registrationSuccessModal=[
  {cancelImgSrc:add},
  {tickImgSrc:tickCircle},
  {description:"Your registration request has been send successfully and approval/rejection of your registration will be informed to you via email."},
  {regId:"Your registration acknowledgement ID is 'RG76545678'"},
  {okayBtn:"Okay"}
]
