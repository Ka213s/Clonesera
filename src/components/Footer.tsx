import { Layout, Input, Button, Divider } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="p-8 bg-gray-800 text-gray-300 w-full">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <div className="flex justify-between items-center py-6">
          <h3 className="text-xl font-semibold text-white">
            Join our newsletter to keep up to date with us!
          </h3>
          <div className="flex items-center">
            <Input placeholder="Enter your email" className="mr-4" />
            <Button type="primary" className="custom-button">
              Subscribe
            </Button>
          </div>
        </div>
        <Divider className="border-gray-600" />
        {/* Main Content */}
        <div className="flex justify-between py-8">
          {/* Company Info */}
          <div className="w-1/4">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500 h-8 w-8 rounded-full mr-2"></div>
              <span className="text-2xl font-bold text-white">Clonesera</span>
            </div>
            <p className="text-gray-400">We growing up your business with personal AI manager.</p>
          </div>
          {/* Links */}
          <div className="w-3/4 flex justify-end space-x-12">
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Plans & Pricing
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Personal AI Manager
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    AI Business Writer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Blog
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Careers
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    News
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Documentation
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Papers
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Press Conferences
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Divider className="border-gray-600" />
        {/* Bottom Section */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">© 2024 Clonesera.</span>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
