import React from 'react';
import { Layout,Divider } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  GoogleOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="p-4 shadow-md bg-gray-900 bg-opacity-90">
      <div className="container mx-auto flex justify-between">
        {/* Columns */}
        <ul className="w-1/3">
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 1
            </a>
          </li>
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 2
            </a>
          </li>
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 3
            </a>
          </li>
        </ul>
        <ul className="w-1/3">
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 4
            </a>
          </li>
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 5
            </a>
          </li>
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 6
            </a>
          </li>
        </ul>
        <ul className="w-1/3">
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 7
            </a>
          </li>
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 8
            </a>
          </li>
          <li className="py-1">
            <a href="#" className="text-white hover:text-gray-400">
              Link 9
            </a>
          </li>
        </ul>
      </div>
      {/* Divider */}
      <Divider className="border-t-2 border-gray-300 my-4" />
      {/* Bottom Section */}
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-sm font-medium">© 2024 Cursus. All Rights Reserved.</span>
        {/* Social Icons */}
        <ul className="flex">
          <li className="mx-2">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl">
              <FacebookOutlined />
            </a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl">
              <TwitterOutlined />
            </a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl">
              <GoogleOutlined />
            </a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl">
              <InstagramOutlined />
            </a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl">
              <YoutubeOutlined />
            </a>
          </li>
        </ul>
      </div>
    </AntFooter>
  );
};

export default Footer;
