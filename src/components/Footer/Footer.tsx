// Footer.tsx
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
  return (
    <footer className="p-4 bg-gray-100 shadow-md">
      <ul className="flex flex-wrap justify-center">
        {footerLinksData.links.map((link: FooterLink, index: number) => (
          <li key={index} className="mx-2">
            <a href={link.url} className="text-gray-600 hover:text-gray-900">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      <button>Teach on Cursus</button>
      <span>© 2024 Cursus. All Rights Reserved.</span>
      <ul className="flex justify-center mt-4">
        {socialMediaLinksData.socialMedia.map((link: SocialMediaLink, index: number) => (
          <li key={index} className="mx-2">
            <a href={link.url} className="text-gray-600 hover:text-gray-900">
              {socialMediaIcons[link.icon as keyof typeof socialMediaIcons]}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
