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
import profile from '../../assets/images/profile-circle.svg'
import uploadImage from '../../assets/images/export.svg'

export const signupSideBarCompetent = [
    {
      id: 1,
      path:"/competent/authority/competentdetails",
      imgSrc: profile,
      imgSrcHighlighted:profileCircleHighlighted,
      description: "Competent Details",
      tickImgSrc: tickCircleWhite,
      percentage: 0,
    },
    {
      id: 2,
      path:"/competent/authority/uploaddocuments",
      imgSrc: uploadImage,
      imgSrcHighlighted:uploadImage,
      description: "Upload documents",
      tickImgSrc: tickCircleWhite,
      percentage: 25,
    },
    {
      id: 3,
      path:"/competent/authority/nodaldetails",
      imgSrc: buildings,
      imgSrcHighlighted:buildingsHigh,
      description: "Nodal Details",
      tickImgSrc: tickCircleWhite,
      percentage: 50,
    },
    {
        id: 4,
        path:"/competent/authority/reviewdetails",
        imgSrc: documentTest,
        imgSrcHighlighted:documentTestHigh,
        description: "Review Details",
        tickImgSrc: tickCircleWhite,
        percentage: 100,
      },
    
    
  ];
  
  