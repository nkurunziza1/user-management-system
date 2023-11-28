import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getUserInfo from "../../utils/getUserInfo";

const Navbar = () => {
  const [isToken, setIsToken] = useState(!!localStorage.getItem("token"));
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // Set initial state to false
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsToken(false);
    navigate("/");
  };

  const getInfo = async () => {
    try {
      const user = await getUserInfo();
      return user;
    } catch (error) {
      console.error("Error getting user info:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const user = await getInfo();
      if (user && user.email === "super@task.rw") {
        setIsSuperAdmin(true);
      }
    };

    fetchData();
    const hasToken = localStorage.getItem("token");
    setIsToken(!!hasToken);
  }, [])

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <span className="text-white text-xl font-bold">
            Task Management System
          </span>
        </Link>
        <div className="flex gap-4">
          <Link to="/">
            <button className="hover:blue-600 text-white font-bold py-2 px-4 rounded">
              Home
            </button>
          </Link>
          {isToken ? (
            <>
              {isSuperAdmin && ( // Show the Dashboard link only for superAdmin
                <Link to="/dashboard">
                  <button className="hover:blue-600 text-white font-bold py-2 px-4 rounded">
                    Dashboard
                  </button>
                </Link>
              )}
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
