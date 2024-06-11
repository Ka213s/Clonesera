import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  category: string;
}

const CertificationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    category: ''
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: 'Development', items: ['WordPress', 'HTML CSS', 'Full Time', 'MotoCMS 3', 'Joomla', 'Full Time', 'OpenCart', 'Joomla Pro', 'WordPress Pro', 'WordPress Elementor', 'WordPress Elementor Pro', 'PrestaShop'] },
    { name: 'Finance & Accounting', items: ['Accounting', 'Finance Fundamentals', 'Bookkeeping', 'Political Science', 'Finance', 'Cryptocurrency'] },
    { name: 'Design', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'Adobe InDesign', 'Unity', 'Drawing', 'Game Development Fundamentals', '3D Modeling', 'Motion Graphics', '2D Animation', 'T-Shirt Design'] },
    { name: 'Marketing', items: ['Google Ads (Adwords)', 'Google Ads (AdWords) Certification', 'Social Marketing', 'Email Marketing', 'Business Strategy', 'SEO', 'PPC Advertising', 'Blogging'] },
    { name: 'Teaching & Academics', items: ['Math', 'Humanities', 'Engineering', 'Science', 'Social Science', 'English Language', 'German Language', 'Sign Language', 'French Language', 'Spanish Language', 'English Grammar', 'IELTS'] }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-4">
          <Link
            to="/tests/certification-center"
            className="px-4 py-2 inline-block text-white border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white"
          >
            Back To Certification Center
          </Link>
          <Link
            to="/home"
            className="px-4 py-2 inline-block text-white border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white"
          >
            Home
          </Link>
        </div>
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">Certification Fill Form</h2>
        <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Select Category</label>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index}>
                    <button
                      type="button"
                      className={`w-full px-4 py-2 border border-gray-600 rounded-md text-left ${selectedCategory === category.name ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'} focus:outline-none`}
                      onClick={() => handleCategoryToggle(category.name)}
                    >
                      {category.name} <span className="float-right">+</span>
                    </button>
                    {selectedCategory === category.name && (
                      <div className="mt-2 space-y-2">
                        {category.items.map((item, idx) => (
                          <div key={idx} className="pl-4">
                            <input
                              type={category.name === 'Teaching & Academics' ? 'text' : 'radio'}
                              id={`item-${idx}`}
                              name="categoryItem"
                              value={item}
                              onChange={handleChange}
                              className="mr-2"
                              required={category.name !== 'Teaching & Academics'}
                            />
                            <label htmlFor={`item-${idx}`} className="text-white">{item}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4 text-gray-400 text-center">
              <p>
                By signing up, you agree to our 
                <button type="button" className="text-blue-500 bg-transparent border-none cursor-pointer">Privacy Policy</button> 
                and 
                <button type="button" className="text-blue-500 bg-transparent border-none cursor-pointer">Terms and Conditions</button>.
              </p>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 focus:outline-none"
              >
                Let's Go
              </button>
            </div>
            <div className="text-center text-gray-400">
              <p>Please be ready to answer 20 questions within 1 hour.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CertificationForm;
