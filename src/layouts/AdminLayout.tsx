import React from "react";
import RedirectToLoginIfNoUserData from "../components/RedirectToLoginIfNoUserData";
import ManageAccount from "../components/Admin/ManageAccount";
import Sidebar from "../components/Sidebar/Admin_Sidebar";

const Home = () => {
  return (
    <div>
      <RedirectToLoginIfNoUserData />
      <div className="grid grid-cols-12">
        <div className="col-span-2 h-[100vh]">
          <Sidebar />
        </div>
        <div className="col-span-10">
          <ManageAccount />
        </div>
      </div>
    </div>
  );
};

export default Home;
