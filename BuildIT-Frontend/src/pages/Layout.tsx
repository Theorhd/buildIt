import { Link, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { useState } from "react";
import logo from "/buildit-logo.png";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ProjectProvider } from "../context/ProjectContext";

export default function Layout() {

  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(true);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (

    <div className="h-screen w-screen overflow-hidden flex text-primary relative">
      <div
        className={`${
          isNavbarOpen ? "w-2/12" : "w-0"
        } whitespace-nowrap transition-all duration-300 ease-in-out`}
        id="header"
      >
        <Header isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
      </div>
      <div
        className={`${
          isNavbarOpen ? "w-10/12" : "w-full"
        } bg-bgSecondary transition-all duration-300 ease-in-out`}
        id="content"
      >
        <ProjectProvider>
          <Outlet />
        </ProjectProvider>
      </div>
      <div
        className={`w-full absolute transition-all duration-300 ease-in-out select-none ${
          isNavbarOpen ? "invisible" : "visible"
        }`}
      >
        <div
          className={`w-2/12 flex items-center gap-4 p-4 transition-opacity duration-300 ease-in-out ${
            isNavbarOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-8" alt="BuildIT logo" />
            <h1 className="text-2xl text-primary ml-2 font-bold font-montserrat">
              BUILD<span className="text-secondary">IT</span>
            </h1>
          </Link>
          <ChevronRightIcon
            onClick={toggleNavbar}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
