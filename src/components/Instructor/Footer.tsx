import React from "react";
import socialMediaLinksData from '../../models/FileJson/socialMediaLinks.json';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaYoutube } from 'react-icons/fa';

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
  return (
    <footer className="bg-gray-800 text-white p-4">
      &copy; 2024 Cursus. All Rights Reserved.
      <ul className="flex">
          {socialMediaLinksData.socialMedia.map((link: SocialMediaLink, index: number) => (
            <li key={index} className="mx-2">
              <a href={link.url} className="text-gray-600 hover:text-gray-900 text-xl">
                {socialMediaIcons[link.icon as keyof typeof socialMediaIcons]}
              </a>
            </li>
          ))}
        </ul>


    </footer>
  );
};

export default Footer;
