import React from "react";
import { HomeIcon, ClipboardListIcon, UserIcon } from "@heroicons/react/solid";

const Sidebar = () => {
  return (
    <aside className="w-full h-full p-4 bg-white shadow-md">
      <div className="p-4 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">LOGO</h2>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="flex items-center p-2 transition-colors duration-200 transform hover:bg-gray-200">
            <HomeIcon className="h-6 w-6 text-gray-600" />
            <a href="#" className="ml-4 text-gray-700">
              Dashboard
            </a>
          </li>
          <li className="flex items-center p-2 transition-colors duration-200 transform hover:bg-gray-200">
            <ClipboardListIcon className="h-6 w-6 text-gray-600" />
            <a href="#" className="ml-4 text-gray-700">
              UI Components
            </a>
          </li>
          <li className="flex items-center p-2 transition-colors duration-200 transform hover:bg-gray-200">
            <UserIcon className="h-6 w-6 text-gray-600" />
            <a href="#" className="ml-4 text-gray-700">
              Account Management
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
