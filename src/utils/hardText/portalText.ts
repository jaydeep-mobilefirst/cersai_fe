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
    url: "/dt-regulator/dashboard",
    rurl: "/dt-regulator/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/dt-regulator/my-task",
    rurl: "/dt-regulator/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/dt-regulator/usermanagment",
    rurl: "/dt-regulator/usermanagment",
    logo: entityMasterIcon,
    selectlogo: entityMasterWhiteIcon,
  },
];
export const portalSideBarListCompetent = [
  {
    title: "Dashboard",
    url: "/dt-competent/dashboard",
    rurl: "/dt-competent/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/dt-competent/my-task",
    rurl: "/dt-competent/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/dt-competent/usermanagment",
    rurl: "/dt-competent/usermanagment",
    logo: entityMasterIcon,
    selectlogo: entityMasterWhiteIcon,
  },
];
export const portalSideBarListDesignated = [
  {
    title: "Dashboard",
    url: "/dt-designated/dashboard",
    rurl: "/dt-designated/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/dt-designated/my-task",
    rurl: "/dt-designated/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/dt-designated/usermanagment",
    rurl: "/dt-designated/usermanagment",
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
    rurl: "/dt-regulator/profile?current=regulator",
    percentage: 0,
  },

  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/dt-regulator/profile?current=nodal",
    percentage: 25,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/dt-regulator/profile?current=document",
    percentage: 100,
  },
];
export const profileSideBarListCompetent = [
  {
    title: "Competent Details",
    url: "competent",
    rurl: "/dt-competent/profile?current=competent",
    percentage: 0,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/dt-competent/profile?current=document",
    percentage: 25,
  },
  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/dt-competent/profile?current=nodal",
    percentage: 100,
  },
];
export const profileSideBarListDesignated = [
  {
    title: "Court Details",
    url: "court",
    rurl: "/dt-designated/profile?current=court",
    percentage: 0,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/dt-designated/profile?current=document",
    percentage: 25,
  },
  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/dt-designated/profile?current=nodal",
    percentage: 100,
  },
];
