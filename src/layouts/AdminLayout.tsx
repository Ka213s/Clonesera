import React from "react";
import RedirectToLoginIfNoUserData from "../components/RedirectToLoginIfNoUserData";
import ManageAccount from "../page/Admin/ManageAccount";
import Sidebar from "../components/Sidebar/SidebarAdmin";

const Home = () => {
  return (
    <div>
      <RedirectToLoginIfNoUserData />
      <div className="grid grid-cols-12">
        <div className="col-span-2 h-[100vh]">
          
          <ManageAccount />
        </div>
      </div>
    </div>
  );
};

export default Home;
