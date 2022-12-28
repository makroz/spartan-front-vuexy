/* eslint-disable implicit-arrow-linebreak */
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const DashboardAnalytics = lazy(() =>
  import("../../views/dashboard/analytics")
);
const DashboardEcommerce = lazy(() =>
  import("../../views/dashboard/ecommerce")
);

const UserList = lazy(() => import("../../views/apps/user/list"));
const UserView = lazy(() => import("../../views/apps/user/view"));

const Roles = lazy(() => import("../../views/apps/roles-permissions/roles"));
const Permissions = lazy(() =>
  import("../../views/apps/roles-permissions/permissions")
);
const AccessControl = lazy(() =>
  import("../../views/extensions/access-control")
);

const DashboardRoutes = [
  {
    path: "/dashboard",
    element: <DashboardEcommerce />,
  },
  {
    element: <UserList />,
    path: "/apps/user/list",
  },
  {
    path: "/apps/user/view",
    element: <Navigate to="/apps/user/view/1" />,
  },
  {
    element: <UserView />,
    path: "/apps/user/view/:id",
  },
  {
    element: <Roles />,
    path: "/apps/roles",
  },
  {
    element: <Permissions />,
    path: "/apps/permissions",
  },
  {
    path: "/access-control",
    element: <AccessControl />,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
];

export default DashboardRoutes;
