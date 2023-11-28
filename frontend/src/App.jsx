
import "./index.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { Outlet, useLocation } from "react-router-dom";
import DashNavbar from "./components/dashboard/sidebar/DashboardNavbar";
import DashSideBar from "./components/dashboard/navbar/DashboardNavbar";
function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {isDashboard ? (
        <div className="flex">
          <DashSideBar />
          <div className="flex flex-col w-full">
            <DashNavbar />
            <Outlet />
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;



