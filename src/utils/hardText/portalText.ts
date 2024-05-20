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

export const portalSideBarListRegulator = [
  {
    title: "Dashboard",
    url: "/rg/dashboard",
    rurl: "/rg/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/rg/my-task",
    rurl: "/rg/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/rg/usermanagment",
    rurl: "/rg/usermanagment",
    logo: entityMasterIcon,
    selectlogo: entityMasterWhiteIcon,
  },
];
export const portalSideBarListCompetent = [
  {
    title: "Dashboard",
    url: "/ca/dashboard",
    rurl: "/ca/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/ca/my-task",
    rurl: "/ca/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/ca/usermanagment",
    rurl: "/ca/usermanagment",
    logo: entityMasterIcon,
    selectlogo: entityMasterWhiteIcon,
  },
];
export const portalSideBarListDesignated = [
  {
    title: "Dashboard",
    url: "/dc/dashboard",
    rurl: "/dc/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/dc/my-task",
    rurl: "/dc/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/dc/usermanagment",
    rurl: "/dc/usermanagment",
    logo: entityMasterIcon,
    selectlogo: entityMasterWhiteIcon,
  },
];
export const profileSideBarList = [
  {
    title: "Entity Details",
    url: "entity",
    rurl: "/dt/profile?current=entity",
    percentage: 0,
  },
  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/dt/profile?current=nodal",
    percentage: 25,
  },
  {
    title: "Regulator Details",
    url: "regulator",
    rurl: "/dt/profile?current=regulator",
    percentage: 50,
  },

  {
    title: "Upload Documents",
    url: "documents",
    rurl: "/dt/profile?current=documents",
    percentage: 75,
  },

  {
    title: "Branches",
    url: "branches",
    rurl: "/dt/profile?current=branches",
    percentage: 100,
  },
];
export const profileSideBarListRegulator = [
  {
    title: "Regulator Details",
    url: "regulator",
    rurl: "/rg/profile?current=regulator",
    percentage: 0,
  },

  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/rg/profile?current=nodal",
    percentage: 25,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/rg/profile?current=document",
    percentage: 100,
  },
];
export const profileSideBarListCompetent = [
  {
    title: "Competent Details",
    url: "competent",
    rurl: "/ca/profile?current=competent",
    percentage: 0,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/ca/profile?current=document",
    percentage: 25,
  },
  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/ca/profile?current=nodal",
    percentage: 100,
  },
];
export const profileSideBarListDesignated = [
  {
    title: "Court Details",
    url: "court",
    rurl: "/dc/profile?current=court",
    percentage: 0,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/dc/profile?current=document",
    percentage: 25,
  },
  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/dc/profile?current=nodal",
    percentage: 100,
  },
];
