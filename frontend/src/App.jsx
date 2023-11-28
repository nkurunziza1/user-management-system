
import "./index.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { Outlet, useLocation } from "react-router-dom";
import DashNavbar from "./components/dashboard/sidebar/DashboardNavbar";
import DashSideBar from "./components/dashboard/navbar/DashboardNavbar";

function App() {
  const location   = useLocation()
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      <div>{isDashboard ? (
      <div className="flex">
      <DashSideBar />
      <DashNavbar />
      </div>
       ) : <Navbar />}</div>
      <Outlet />
      <div>{isDashboard ? "" : <Footer /> }</div>
    </>
  );
}

export default App;



