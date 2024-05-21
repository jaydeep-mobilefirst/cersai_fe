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
    url: "/regulator/dashboard",
    rurl: "/egulator/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/regulator/my-task",
    rurl: "/regulator/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/regulator/usermanagment",
    rurl: "/regulator/usermanagment",
    logo: entityMasterIcon,
    selectlogo: entityMasterWhiteIcon,
  },
];
export const portalSideBarListCompetent = [
  {
    title: "Dashboard",
    url: "/competent/dashboard",
    rurl: "/competent/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/competent/my-task",
    rurl: "/competent/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/competent/usermanagment",
    rurl: "/competent/usermanagment",
    logo: entityMasterIcon,
    selectlogo: entityMasterWhiteIcon,
  },
];
export const portalSideBarListDesignated = [
  {
    title: "Dashboard",
    url: "/designated/dashboard",
    rurl: "/designated/dashboard",
    logo: dashboardLogo,
    selectlogo: dashboardWhiteLogo,
  },
  {
    title: "My Task",
    url: "/designated/my-task",
    rurl: "/designated/my-task",
    logo: myTaskIcon,
    selectlogo: myTaskWhiteIcon,
  },
  {
    title: "User Management",
    url: "/designated/usermanagment",
    rurl: "/designated/usermanagment",
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
    rurl: "/regulator/profile?current=regulator",
    percentage: 0,
  },

  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/regulator/profile?current=nodal",
    percentage: 25,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/regulator/profile?current=document",
    percentage: 100,
  },
];
export const profileSideBarListCompetent = [
  {
    title: "Competent Details",
    url: "competent",
    rurl: "/competent/profile?current=competent",
    percentage: 0,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/competent/profile?current=document",
    percentage: 25,
  },
  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/competent/profile?current=nodal",
    percentage: 100,
  },
];
export const profileSideBarListDesignated = [
  {
    title: "Court Details",
    url: "court",
    rurl: "/designated/profile?current=court",
    percentage: 0,
  },

  {
    title: "Upload Documents",
    url: "document",
    rurl: "/designated/profile?current=document",
    percentage: 25,
  },
  {
    title: "Nodal Details",
    url: "nodal",
    rurl: "/designated/profile?current=nodal",
    percentage: 100,
  },
];
