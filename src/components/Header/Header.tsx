import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaEnvelope, FaBell, FaUserCircle, FaBars, FaSearch } from 'react-icons/fa';
import { useNavigate, NavigateFunction, Link } from 'react-router-dom'; // Import NavigateFunction type
import { handleLogout } from '../../components/Logout';

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const navigate: NavigateFunction = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBellNotification, setShowBellNotification] = useState(false);
  const [showEmailNotifications, setShowEmailNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const toggleEmailNotifications = () => {
    setShowEmailNotifications(!showEmailNotifications);
  };
  const toggleBellNotification = () => {
    setShowBellNotification(!showBellNotification);
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0 w-full z-30">
      <div className="flex items-center">
        <button className="mr-4" onClick={toggleMenu}>
          <FaBars className="text-xl" />
        </button>
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
        <button className="px-4 py-2 text-white bg-[#9997F5] rounded-md hover:bg-[#8886E5]">
          Create New Course
        </button>
        <div className="relative">
          <FaShoppingCart className="text-xl cursor-pointer" />
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            2
          </div>
        </div>
        <div className="relative" onClick={toggleEmailNotifications}>
          <FaEnvelope className="text-xl cursor-pointer" onClick={() => setShowEmailNotifications(true)} /> {/* Thêm sự kiện onClick */}
          {showEmailNotifications && (
            <div className="absolute top-0 right-0 mt-10 py-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Notification 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Notification 2</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Notification 3</li>
              </ul>
            </div>
          )}
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            3
          </div>
        </div>
        <div className="relative" onClick={toggleBellNotification}>
          <FaBell className="text-xl cursor-pointer" onClick={() => setShowBellNotification(true)} />
          {showBellNotification && (
            <div className="absolute top-0 right-0 mt-10 py-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Notification 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Notification 2</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Notification 3</li>
              </ul>
            </div>
          )}
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            3
          </div>
        </div>
        {isLoggedIn ? (
          <div className="relative" onClick={toggleDropdown}>
            <FaUserCircle className="text-2xl cursor-pointer" />
            {showDropdown && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Instructor Profile</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Litemode</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Crusus Dashboard</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Paid Memberships</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Setting</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Send Feedback</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleLogout(navigate)}>Sign Out</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;