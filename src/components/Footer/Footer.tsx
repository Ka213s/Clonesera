import React from 'react';
import { useLocation } from 'react-router-dom';
import footerLinksData from '../../models/FileJson/footerLinks.json';
import socialMediaLinksData from '../../models/FileJson/socialMediaLinks.json';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaYoutube } from 'react-icons/fa';

const socialMediaIcons = {
  FaFacebook: <FaFacebook />,
  FaTwitter: <FaTwitter />,
  FaGoogle: <FaGoogle />,
  FaInstagram: <FaInstagram />,
  FaYoutube: <FaYoutube />
};

const Footer: React.FC = () => {
  const location = useLocation();
  
  // Check if the current path is '/student_enroll_course'
  if (location.pathname === '/student_enroll_course') {
    return null; // Do not render the footer
  }

  const columnCount = 3;
  const itemsPerColumn = Math.ceil(footerLinksData.links.length / columnCount);
  const columns = Array.from({ length: columnCount }, (_, index) =>
    footerLinksData.links.slice(index * itemsPerColumn, (index + 1) * itemsPerColumn)
  );

  return (
    <footer className="p-4 shadow-md bg-gray-900 bg-opacity-90">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-wrap justify-center w-3/4">
          {columns.map((column, colIndex) => (
            <ul key={colIndex} className="w-1/3">
              {column.map((link, index) => (
                <li key={index} className="py-1">
                  <a href={link.url} className="text-white hover:text-gray-400">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="w-1/4 flex flex-col items-baseline">
          <button className="px-4 py-2 mb-4 bg-[#9997F5] text-white rounded-md hover:bg-[#8886E5]">
            Teach on Cursus
          </button>
        </div>
      </div>
      <hr className="border-t-2 border-gray-300 my-4" />
      <div className="container mx-auto flex justify-between items-center mt-4">
        <span className="text-white text-sm font-medium">© 2024 Cursus. All Rights Reserved.</span>
        <ul className="flex">
          {socialMediaLinksData.socialMedia.map((link, index) => (
            <li key={index} className="mx-2">
              <a href={link.url} className="text-gray-600 hover:text-gray-900 text-xl">
                {socialMediaIcons[link.icon as keyof typeof socialMediaIcons]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
