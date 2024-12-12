import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="w-full flex">
      <div className="w-2/12">
        <Header />
      </div>
      <div className="w-10/12">
        <Outlet />
      </div>
    </div>
  )
}