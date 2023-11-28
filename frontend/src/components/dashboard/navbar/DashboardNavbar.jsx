/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Link } from "react-router-dom";
import { PiHouseLineDuotone } from "react-icons/pi";
import { FaTasks } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { SiHomeassistantcommunitystore } from "react-icons/si";

const DashSideBar = () => {
  const sidebar = [
    {
      label: "Home",
      link: "/",
      icon: <SiHomeassistantcommunitystore />,
    },
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: <BiSolidDashboard />,
    },
    {
      label: "Tasks",
      link: "/dashboard/task",
      icon: <FaTasks />,
    },
    {
      label: "Users",
      link: "/dashboard/users",
      icon:<FaUsersGear />,
    },
  ];
  return (
    <div className="h-screen bg-black text-white">
      <div className="flex flex-col text-md pl-10 gap-10 font-bold pr-10 pt-40">
        {sidebar.map((item, index) => {
          return (
            <div key={index} className="flex items-center gap-4">
              <p>{item.icon}</p>
              <Link to={item.link} className=" font-light" >
                {item.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashSideBar;
