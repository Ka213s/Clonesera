import React from "react";
import {
  BellIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Cursus</div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded"
        />
        <div className="flex space-x-4">
          <BellIcon className="h-6 w-6 text-gray-700" />
          <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
          <UserCircleIcon className="h-6 w-6 text-gray-700" />
        </div>
      </div>
    </header>
  );
};

export default Header;
