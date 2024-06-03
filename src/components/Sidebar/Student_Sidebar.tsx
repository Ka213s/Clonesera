import React from 'react';
import studentSidebarItemData from '../../models/FileJson/studentSidebarItem.json';
import { FaHome, FaBook, FaComments, FaBell, FaCertificate, FaStar, FaCreditCard, FaFile, FaCogs, FaPaperPlane } from 'react-icons/fa';

interface MenuItem {
  text: string;
  icon: string;
  url: string;
}

const iconComponents = {
  FaHome: <FaHome />,
  FaBook: <FaBook />,
  FaComments: <FaComments />,
  FaBell: <FaBell />,
  FaCertificate: <FaCertificate />,
  FaStar: <FaStar />,
  FaCreditCard: <FaCreditCard />,
  FaFile: <FaFile />,
  FaCogs: <FaCogs />,
  FaPaperPlane: <FaPaperPlane />
};

const StudentSidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full bg-gray-100 shadow-md fixed top-0 left-0">
      <ul className="mt-8">
        {studentSidebarItemData.studentSidebarItem.map((item: MenuItem, index: number) => (
          <li key={index} className="flex items-center p-4 hover:bg-gray-200">
            <a href={item.url} className="flex items-center space-x-3 text-gray-700">
              {iconComponents[item.icon as keyof typeof iconComponents]}
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default StudentSidebar;
