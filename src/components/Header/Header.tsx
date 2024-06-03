import React from 'react';
import { FaShoppingCart, FaEnvelope, FaBell, FaUserCircle, FaBars, FaSearch } from 'react-icons/fa';

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md fixed w-full z-10">
      <div className="flex items-center">
        <FaBars className="text-2xl cursor-pointer mr-4" onClick={toggleMenu} />
        <img src="path_to_logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="relative flex items-center mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-2 py-1 border border-gray-300 rounded-md w-64"
        />
        <FaSearch className="absolute left-3 text-gray-500" />
      </div>
      <div className="flex items-center ml-auto space-x-6">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Create New Course
        </button>
        <div className="relative">
          <FaShoppingCart className="text-xl cursor-pointer" />
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            2
          </div>
        </div>
        <div className="relative">
          <FaEnvelope className="text-xl cursor-pointer" />
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            3
          </div>
        </div>
        <div className="relative">
          <FaBell className="text-xl cursor-pointer" />
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            3
          </div>
        </div>
        <FaUserCircle className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
