import closeCircle from "../../assets/images/closeCircle.svg";
import add from "../../assets/images/add.svg";
import directboxSend from "../../assets/images/directboxSend.svg";
import trash from "../../assets/images/trash.svg";
import failedImg from "../../assets/images/failedImg.svg";
import circleForModal from "../../assets/images/circleForModal.svg";
import tickCircle from "../../assets/images/tickCircle.svg";
import shieldTick from "../../assets/images/shieldTick.svg";
import profieCircle from "../../assets/images/profileCircle.svg";
import buildings from "../../assets/images/buildings.svg";
import documentTest from "../../assets/images/documentText.svg";
import tickCircleWhite from "../../assets/images/tickCircleWhite.svg";
import clipboardText from "../../assets/images/clipboardText.svg";
import typeVerification from '../../assets/images/typeVerification.svg';
import profileCircleHighlighted from '../../assets/images/profileCircleHighlighted.svg';
import clickboardTextHigh from '../../assets/images/clickboardTextHigh.svg';
import buildingsHigh from '../../assets/images/buildingsHigh.svg';
import documentTestHigh from '../../assets/images/documentTestHigh.svg';

//RegisterModel Component
export const registrationFirstPage = [
  { heading: "Entity Type", removeBtn: closeCircle },
  { btn1: "Cacel", btn2: "Select" },
];
export const radioButtons = [
  { id: 1, text: "Deposit Taker" },
  { id: 2, text: "Regulator" },
  { id: 3, text: "Designated Court" },
  { id: 4, text: "Competent Authority" },
];
//UploadDocumentComp Component
export const uploadModal=[
  {heading:"Upload DSC"},
  {cancelImgSrc:add},
  {uploadImgSrc:directboxSend},
  {formats:"Supported formates: .cer, .txt"},
  {size:"File size : Less than 500kb"},
  {buttonText:"Browse files"}
]
//DocumentDeleteComp Component
export const documentDeleteModal = [
  { cancelImgSrc: add },
  { deleteImageSrc: trash },
  { deleteTxt: "Are you Sure to Delete" },
  { extension: "Document.pdf ?" },
  { cancelBtn: "Cancel", okayBtn: "Okay" },
];
//VerificationFailedComp Component
export const verificationFiledModal = [
  { cancelImgSrc: add },
  { failedImgSrc: failedImg },
  { heading: "Verification Failed" },
  { description: "We were unable to verify your DSC details." },
  { okayBtn: "Okay" },
  { circleImgSrc: circleForModal },
];
//VerificationSuccessComp Component
export const verificationSuccessModal = [
  { cancelImgSrc: add },
  { successImgSrc: tickCircle },
  { heading: "Verification Successful" },
  { description: "Your PAN Details have been successfully verified." },
  { okayBtn: "Okay" },
];
// RegistrationSuccessComp Component

export const registrationSuccessModal = [
  { cancelImgSrc: add },
  { tickImgSrc: tickCircle },
  {
    description:
      "Your registration request has been send successfully and approval/rejection of your registration will be informed to you via email.",
  },
  { regId: "Your registration acknowledgement ID is 'RG76545678'" },
  { okayBtn: "Okay" },
];
export const signupSideBar = [
  {
    id: 1,
    path:"/",
    imgSrc: typeVerification,
    imgSrcHighlighted:shieldTick,
    description: "Verification",
    tickImgSrc: tickCircleWhite,
    percentage: 0,
  },
  {
    id: 2,
    imgSrc: profieCircle,
    imgSrcHighlighted:profileCircleHighlighted,
    description: "Entity Details",
    tickImgSrc: tickCircleWhite,
    percentage: 25,
  },
  {
    id: 3,
    imgSrc: clipboardText,
    imgSrcHighlighted:clickboardTextHigh,
    description: "Regulators Details",
    tickImgSrc: tickCircleWhite,
    percentage: 50,
  },
  {
    id: 4,
    imgSrc: buildings,
    imgSrcHighlighted:buildingsHigh,
    description: "Nodal Details",
    tickImgSrc: tickCircleWhite,
    percentage: 75,
  },
  {
    id: 5,
    imgSrc: documentTest,
    imgSrcHighlighted:documentTestHigh,
    description: "Review Details",
    tickImgSrc: tickCircleWhite,
    percentage: 100,
  },
];
