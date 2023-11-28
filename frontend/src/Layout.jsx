// Layout.jsx
import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
const Layout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
