import React from "react";
import { Sidebar } from "../../components/dashboard/Sidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    // Root: stack vertically on mobile, row on md+
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Sidebar controls its own width — don't constrain it */}
      <Sidebar />

      {/* Content: takes all remaining space, scrolls independently */}
      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;