import React from "react";
import DashNavbar from "./sidebar/DashboardNavbar";
import DashSideBar from "./navbar/DashboardNavbar";
import { Outlet } from "react-router-dom";

const Dashboard = ({ children }) => {
  return (
    <div className="flex ">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
