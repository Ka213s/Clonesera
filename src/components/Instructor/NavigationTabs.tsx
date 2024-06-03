import React from "react";
import {
  BookOpenIcon,
  ShoppingCartIcon,
  UploadIcon,
  TagIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/solid";

const NavigationTabs: React.FC = () => {
  return (
    <div className="flex justify-between mb-4">
      <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2">
        <BookOpenIcon className="h-5 w-5" />
        <span>My Courses</span>
      </button>
      <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
        <ShoppingCartIcon className="h-5 w-5" />
        <span>My Purchases</span>
      </button>
      <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
        <UploadIcon className="h-5 w-5" />
        <span>Upcoming Courses</span>
      </button>
      <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
        <TagIcon className="h-5 w-5" />
        <span>Discounts</span>
      </button>
      <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
        <SpeakerphoneIcon className="h-5 w-5" />
        <span>Promotions</span>
      </button>
    </div>
  );
};

export default NavigationTabs;
