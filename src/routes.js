import React from "react";

const DeputiesDashboard = React.lazy(() =>
  import("./components/views/votings/dashboard")
);


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/DashboardLegislators",
    name: "Dashboard",
    component: DeputiesDashboard
  }
];

export default routes;
