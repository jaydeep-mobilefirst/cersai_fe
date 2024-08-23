import dashboardLogo from "../../assets/images/dashboard.svg";
import dashboardWhiteLogo from "../../assets/images/dashboardWhiteLogo.svg";
import myTaskIcon from "../../assets/images/myTaskIcon.svg";
import myTaskWhiteIcon from "../../assets/images/myTaskWhiteIcon.svg";
import entityMasterIcon from "../../assets/images/entitymaster.svg";
import entityMasterWhiteIcon from "../../assets/images/entitymasterwhite.svg";

import TaskIcon from "../../assets/images/task.svg";
import TaskIconWhite from "../../assets/images/task-2.svg";

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
    url: "/dt/scheme",
    rurl: "/dt/scheme",
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
    title: "My Tasks",
    url: "/rg/mytask",
    rurl: "/rg/mytask",
    logo: TaskIcon,
    selectlogo: TaskIconWhite,
  },
  {
    title: "Scheme Management",
    url: "/rg/deposit-taker",
    rurl: "/rg/deposit-taker",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/rg/usermanagement",
    rurl: "/rg/usermanagement",
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
    title: "Scheme Management",
    url: "/ca/deposit-taker",
    rurl: "/ca/deposit-taker",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/ca/usermanagement",
    rurl: "/ca/usermanagement",
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
    title: "Scheme Management",
    url: "/dc/deposit-taker",
    rurl: "/dc/deposit-taker",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/dc/usermanagement",
    rurl: "/dc/usermanagement",
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
    title: "Nodal Officer Details",
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
    title: "Nodal Officer Details",
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
    title: "Nodal Officer Details",
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
    title: "Nodal Officer Details",
    url: "nodal",
    rurl: "/dc/profile?current=nodal",
    percentage: 100,
  },
];
