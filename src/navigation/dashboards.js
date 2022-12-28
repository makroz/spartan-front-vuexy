/* eslint-disable semi */
/* eslint-disable array-bracket-newline */
/* eslint-disable comma-dangle */
// ** Icons Import
import { Home, Circle, Users, Truck } from "react-feather";

export default [
  {
    id: "dashboards",
    title: "Dashboard",
    icon: <Home size={20} />,
    action: "read",
    resource: "ACL",
    navLink: "/dashboard/ecommerce",
  },
  {
    id: "companies",
    title: "Companies",
    icon: <Truck size={20} />,
    children: [
      {
        id: "listCompanies",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/user/list",
      },
      {
        id: "viewCompanies",
        title: "View",
        icon: <Circle size={12} />,
        navLink: "/apps/user/view",
      },
    ],
  },
  {
    id: "users",
    title: "Users",
    icon: <Users size={20} />,
    children: [
      {
        id: "listUsers",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/user/list",
      },
      {
        id: "viewUsers",
        title: "View",
        icon: <Circle size={12} />,
        navLink: "/apps/user/view",
      },
    ],
  },
];
