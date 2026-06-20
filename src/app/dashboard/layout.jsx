import React from "react";

import { Sidebar } from "../../components/dashboard/Sidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
const DashboardLayout = ({ children }) => {
  return (
    <div className=" flex h-screen gap-3">
      <div className="w-2/12">
        <Sidebar />
      </div>

      <div className="w-10/12 flex flex-col gap-5">
        <DashboardNavbar/>
        <div className="">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
