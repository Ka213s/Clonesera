import React from "react";
import { FaBookOpen, FaShoppingCart, FaUpload, FaTags, FaBullhorn } from "react-icons/fa";

const NavigationTabs: React.FC = () => {
  return (
    <div className="flex justify-between mb-4">
      <button className="bg-[#9997F5] text-white px-4 py-2 rounded flex items-center space-x-2">
        <FaBookOpen className="h-5 w-5" />
        <span>My Courses</span>
      </button>
      <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
        <FaShoppingCart className="h-5 w-5" />
        <span>My Purchases</span>
      </button>
      <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
        <FaUpload className="h-5 w-5" />
        <span>Upcoming Courses</span>
      </button>
      <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
        <FaTags className="h-5 w-5" />
        <span>Discounts</span>
      </button>
      <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
        <FaBullhorn className="h-5 w-5" />
        <span>Promotions</span>
      </button>
    </div>
  );
};

export default NavigationTabs;
