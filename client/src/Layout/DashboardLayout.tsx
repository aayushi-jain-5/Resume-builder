import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/resume-icon.jpg";
import { Button } from "@/components/ui/button";
import { Moon, Sun, X, Menu, House, Users, LogOut, LogIn } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { signOut } from "firebase/auth";
import { auth } from "@/integration/firebase";
import { Footer } from "@/pages/Footer";
import { ForgotPassword } from "@/pages/ForgotPassword";

export const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const buttonStyle = "h-4 pl-2 dark:text-white";

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    const element = document.getElementById("toggle");
    if (element) {
      element.classList.toggle("dark");
    }
    setDarkMode(!darkMode);
  };
  const handleLogout = async () => {
    try {
     
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/");
      alert("You have been logged out successfully.");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  return (
    <div id="toggle" className=" dark:bg-gray-900 max-w-full max-h-full">
      <div
        className={`flex justify-between items-center h-14 bg-gray-100 dark:bg-black px-6 py-2.5 fixed z-50 left-0 top-0 w-screen text-black`}
      >
        <img src={logo} className="h-9 cursor-pointer" />
        <div className="hidden md:flex md:gap-4 md:items-center md:text-sm mr-4 cursor-pointer text-black dark:text-white">
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
          <Link to="about" className="hover:text-blue-700">
            About
          </Link>
          {!token && (
            <Button className="bg-teal-600">
              <Link to="login" className="hover:bg-teal-700">
                Login
              </Link>
            </Button>
          )}
          {token && (
            <p className="hover:underline" onClick={handleLogout}>
              Logout
            </p>
          )}

          {!darkMode ? (
            <Moon onClick={toggleDarkMode} className={`${buttonStyle}`} />
          ) : (
            <Sun onClick={toggleDarkMode} className={`${buttonStyle}`} />
          )}
        </div>
        <div className="md:hidden flex items-center gap-4">
          {!darkMode ? (
            <Moon onClick={toggleDarkMode} className={`${buttonStyle}`} />
          ) : (
            <Sun onClick={toggleDarkMode} className={`${buttonStyle}`} />
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" onClick={toggleHamburger} className="dark:text-white">
                {!isOpen ? <Menu /> : <X />}
              </Button>
            </PopoverTrigger>
            {isOpen && (
              <PopoverContent className="md:hidden w-28 py-2 px-1 bg-gray-100 dark:bg-gray-900 dark:text-white">
                <div className="flex flex-col dark:bg-gray-900 dark:text-white">
                  <Link to="home" className="hover:text-blue-700 py-2 flex items-center gap-3">
                    <House className="h-4" />
                    Home
                  </Link>
                  <Link to="about" className="hover:text-blue-700 py-2 flex items-center gap-3">
                    <Users className="h-4" /> About
                  </Link>
                  {!token && (
                    <Link to="login" className="hover:text-blue-700 py-2 flex items-center gap-3">
                       <LogIn  className="h-4"/>Login
                    </Link>
                  )}
                  {token && (
                    <p className="hover:text-blue-700 py-2 flex items-center gap-3" onClick={handleLogout}>
                      <LogOut  className="h-4"/>Logout
                    </p>
                  )}
                </div>
              </PopoverContent>
            )}
          </Popover>
        </div>
      </div>
      <div className="mt-14 2xl:mx-64">
        <Outlet />
        {/* <ForgotPassword/> */}
      </div>
      <Footer />
    </div>
  );
};
