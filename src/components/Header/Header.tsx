// Header.tsx
import React, { useState } from 'react';
import { FaShoppingCart, FaEnvelope, FaBell, FaUserCircle, FaBars } from 'react-icons/fa';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <img src="path_to_logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        Tạo Khóa Học Mới
      </button>
      <div className="flex items-center ml-4 space-x-4">
        <FaShoppingCart className="text-xl cursor-pointer" />
        <FaEnvelope className="text-xl cursor-pointer" />
        <FaBell className="text-xl cursor-pointer" />
        <FaUserCircle className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
