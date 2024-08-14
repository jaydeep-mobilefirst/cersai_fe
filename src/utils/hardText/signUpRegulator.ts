import buildings from "../../assets/images/buildings.svg";
import documentTest from "../../assets/images/documentText.svg";
import tickCircleWhite from "../../assets/images/tickCircleWhite.svg";
import profileCircleHighlighted from '../../assets/images/profileCircleHighlighted.svg';
import buildingsHigh from '../../assets/images/buildingsHigh.svg';
import documentTestHigh from '../../assets/images/documentTestHigh.svg';
import profile from '../../assets/images/profile-circle.svg'
import uploadImage from '../../assets/images/export.svg'
import exportTestHigh from '../../assets/images/exportTestHigh.svg'


export const signupSideBarRegulator = [
    {
      id: 1,
      path:"/regulator/court/regulatordetails",
      imgSrc: profile,
      imgSrcHighlighted:profileCircleHighlighted,
      description: "Regulators Details",
      tickImgSrc: tickCircleWhite,
      percentage: 0,
    },
    {
      id: 2,
      path:"/regulator/court/uploaddocuments",
      imgSrc: uploadImage,
      imgSrcHighlighted:exportTestHigh,
      description: "Upload Documents",
      tickImgSrc: tickCircleWhite,
      percentage: 25,
    },
    {
      id: 3,
      path:"/regulator/court/nodaldetails",
      imgSrc: buildings,
      imgSrcHighlighted:buildingsHigh,
      description: "Nodal Officer Details",
      tickImgSrc: tickCircleWhite,
      percentage: 50,
    },
    {
        id: 4,
        path:"/regulator/court/reviewdetails",
        imgSrc: documentTest,
        imgSrcHighlighted:documentTestHigh,
        description: "Review Details",
        tickImgSrc: tickCircleWhite,
        percentage: 100,
      },
    
    
  ];
  
  