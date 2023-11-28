import React from "react";
import DashNavbar from "./sidebar/DashboardNavbar";
import DashSideBar from "./navbar/DashboardNavbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex flex-col w-full">
        <div className="flex justify-center w-[80%]  items-center flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

