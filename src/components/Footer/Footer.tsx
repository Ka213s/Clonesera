import React from 'react';
import footerLinksData from '../../models/FileJson/footerLinks.json';
import socialMediaLinksData from '../../models/FileJson/socialMediaLinks.json';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaYoutube } from 'react-icons/fa';

interface FooterLink {
  text: string;
  url: string;
}

interface SocialMediaLink {
  name: string;
  url: string;
  icon: string;
}

const socialMediaIcons = {
  FaFacebook: <FaFacebook />,
  FaTwitter: <FaTwitter />,
  FaGoogle: <FaGoogle />,
  FaInstagram: <FaInstagram />,
  FaYoutube: <FaYoutube />
};

const Footer: React.FC = () => {
  // Split links into three columns
  const columnCount = 3;
  const itemsPerColumn = Math.ceil(footerLinksData.links.length / columnCount);
  const columns = Array.from({ length: columnCount }, (_, index) =>
    footerLinksData.links.slice(index * itemsPerColumn, (index + 1) * itemsPerColumn)
  );

  return (
    <footer className="p-4 bg-gray-100 shadow-md">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-wrap justify-center w-3/4">
          {columns.map((column, colIndex) => (
            <ul key={colIndex} className="w-1/3">
              {column.map((link: FooterLink, index: number) => (
                <li key={index} className="py-1">
                  <a href={link.url} className="text-gray-600 hover:text-gray-900">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="w-1/4 flex flex-col items-end">
          <button className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Teach on Cursus
          </button>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center mt-4">
        <span className="text-gray-600">© 2024 Cursus. All Rights Reserved.</span>
        <ul className="flex justify-end">
          {socialMediaLinksData.socialMedia.map((link: SocialMediaLink, index: number) => (
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
