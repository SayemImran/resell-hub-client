import React from "react";

import { Sidebar } from "../../components/dashboard/Sidebar";
const DashboardLayout = ({ children }) => {
  return (
    <div className=" flex h-screen gap-3">
      <div className="w-2/12">
        <Sidebar />
      </div>

      <div className="w-10/12 flex flex-col gap-5 bg-blue-200">
        <div className="bg-blue-400">dashboar navbar</div>
        <div className="bg-blue-700">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
