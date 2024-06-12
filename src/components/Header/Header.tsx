import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaEnvelope, FaBell, FaUserCircle, FaBars, FaSearch } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogout } from '../../components/Logout';
import logo from '../../assets/Logo-2.png';
import notificationsData from '../../models/FileJson/notificationsData.json';
import userMenuItemsData from '../../models/FileJson/userMenuItems.json';

interface Notification {
  id: number;
  avatar: string;
  message: string;
  time: string;
}

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBellNotification, setShowBellNotification] = useState(false);
  const [showEmailNotifications, setShowEmailNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userName, setUserName] = useState<string>('');

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
    setNotifications(notificationsData);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserRole(parsedUserData.roleId);
      setIsLoggedIn(true);
      setUserName(parsedUserData.name);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showDropdown) {
        const target = e.target as HTMLElement;
        if (!target.closest('.relative')) {
          setShowDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleCreateCourse = () => {
    navigate('/create-course');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0 w-full z-30">
      <div className="flex items-center bg-[#9997F5] rounded-full p-2">
        <button className="focus:outline-none" onClick={toggleMenu}>
          <FaBars className="text-xl text-white" />
        </button>
      </div>

      <div className="relative flex items-center mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-2 py-1 border border-gray-300 rounded-md w-64"
        />
        <FaSearch className="absolute left-3 text-gray-500" />
      </div>

      <div className="flex items-center flex-grow justify-center">
        <Link to="/home">
          <img src={logo} alt="Logo" className="h-12 cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center ml-auto space-x-6">
        {userRole === 3 && (
          <button
            onClick={handleCreateCourse}
            className="px-4 py-2 text-white bg-[#9997F5] rounded-md hover:bg-[#8886E5]"
          >
            Create New Course
          </button>
        )}

        <div className="relative">
          <FaShoppingCart className="text-xl cursor-pointer" />
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            2
          </div>
        </div>

        <div className="relative" onClick={toggleEmailNotifications}>
          <FaEnvelope className="text-xl cursor-pointer" />
          {showEmailNotifications && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
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
          <FaBell className="text-xl cursor-pointer" />
          {showBellNotification && (
            <div className="absolute top-0 right-0 mt-10 py-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                {notifications.map(notification => (
                  <li key={notification.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <img src={notification.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                    <div>
                      <p>{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {notifications.length}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="relative" onClick={toggleDropdown}>
            <FaUserCircle className="text-2xl cursor-pointer" />
            {showDropdown && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul>
                  {userMenuItemsData.menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Link to={item.url}>{item.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="px-4 py-2 text-white bg-[#9997F5] rounded-md hover:bg-[#8886E5]">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
