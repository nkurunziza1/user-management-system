/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Link } from "react-router-dom";
import { PiHouseLineDuotone } from "react-icons/pi";
import { TbBrandBooking } from "react-icons/tb";
import { SiHomeassistantcommunitystore } from "react-icons/si";

const DashSideBar = () => {
  const sidebar = [
    {
      label: "Home",
      link: "/",
      icon: <SiHomeassistantcommunitystore />,
    },
    {
      label: "Room",
      link: "/dashboard",
      icon: <PiHouseLineDuotone />,
    },
    {
      label: "Booking",
      link: "/dashboard/booking",
      icon: <TbBrandBooking />,
    },
  ];
  return (
    <div className="h-screen bg-dark-blue text-white">
      <div className="flex flex-col pl-10 pr-10 pt-40">
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
