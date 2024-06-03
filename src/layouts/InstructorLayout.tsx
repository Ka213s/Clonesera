import React from "react";
import Sidebar from "../components/Instructor/Sidebar";
import Header from "../components/Instructor/Header";
import Footer from "../components/Instructor/Footer";

const InstructorLayout = ({ children }: any) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default InstructorLayout;
