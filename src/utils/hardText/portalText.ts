import dashboardLogo from "../../assets/images/dashboard.svg";
import dashboardWhiteLogo from "../../assets/images/dashboardWhiteLogo.svg";
import myTaskIcon from "../../assets/images/myTaskIcon.svg";
import myTaskWhiteIcon from "../../assets/images/myTaskWhiteIcon.svg";
import entityMasterIcon from "../../assets/images/entitymaster.svg";
import entityMasterWhiteIcon from "../../assets/images/entitymasterwhite.svg";

export const portalSideBarList = [
  {
    title: "Dashboard",
    url: "/dt/dashboard",
    rurl: "/dt/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "Scheme Management",
    url: "/dt/mytask",
    rurl: "/dt/mytask",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/dt/usermanagement",
    rurl: "/dt/usermanagement",
    logo: entityMasterIcon,
    selectlogo: entityMasterWhiteIcon,
  },
];
export const profileSideBarList = [
  {
    title: "Entity Details",
    url: "entity",
    rurl: "/dt/dashboard/profile?current=entity",
    percentage: 0,
  },
  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/dt/dashboard/profile?current=nodal",
    percentage: 25,
  },
  {
    title: "Regulator Details",
    url: "regulator",
    rurl: "/dt/dashboard/profile?current=regulator",
    percentage: 50,
  },

  {
    title: "Upload Documents",
    url: "documents",
    rurl: "/dt/dashboard/profile?current=documents",
    percentage: 75,
  },

  {
    title: "Branches",
    url: "branches",
    rurl: "/dt/dashboard/profile?current=branches",
    percentage: 100,
  },
];
