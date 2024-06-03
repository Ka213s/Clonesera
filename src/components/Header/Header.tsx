import React from 'react';
import { FaShoppingCart, FaEnvelope, FaBell, FaUserCircle, FaBars, FaSearch } from 'react-icons/fa';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="relative flex items-center justify-between p-4 bg-white shadow-md">
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
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        Tạo Khóa Học Mới
      </button>
      <div className="flex items-center ml-4 space-x-4">
        <FaShoppingCart className="text-xl cursor-pointer" />
        <FaEnvelope className="text-xl cursor-pointer" />
        <FaBell className="text-xl cursor-pointer" />
        <div className="relative">
          <FaUserCircle
            className="text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Instructor Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Litemode</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Crusus Dashboard</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Paid Memberships</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Setting</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Send Feedback</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
