import React from 'react';
import DashNavbar from './sidebar/DashboardNavbar';
import DashSideBar from './navbar/DashboardNavbar';

const Dashboard = ({children}) => {
  return (
    <div className='flex '>
      <DashSideBar />
      <div>
        <DashNavbar />
       {children}
      </div>
    </div>
  )
}

export default Dashboard