import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import {Outlet} from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="flex w-full bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>
      <Outlet/>
    </div>
  );
};

export default Dashboard;
