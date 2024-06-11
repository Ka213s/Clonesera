import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  items: string[];
}

const CertificationCenter: React.FC = () => {
  const categories: Category[] = [
    { name: 'Development', items: ['WordPress', 'HTML CSS', 'MotoCMS', 'Joomla', 'OpenCart', 'Joomla Pro', 'WordPress Pro', 'WordPress Elementor', 'WordPress Elementor Pro', 'PrestaShop'] },
    { name: 'Finance & Accounting', items: ['Accounting', 'Finance Fundamentals', 'Bookkeeping', 'Political Science', 'Finance', 'Cryptocurrency'] },
    { name: 'Design', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'Adobe InDesign', 'Unity', 'Drawing', 'Game Development Fundamentals', '3D Modeling', 'Motion Graphics', '2D Animation', 'T-Shirt Design'] },
    { name: 'Marketing', items: ['Google Ads (Adwords)', 'Google Ads (AdWords) Certification', 'Social Marketing', 'Email Marketing', 'Business Strategy', 'SEO', 'PPC Advertising', 'Blogging'] },
    { name: 'Teaching & Academics', items: ['Math', 'Humanities', 'Engineering', 'Science', 'Social Science', 'English Language', 'German Language', 'Sign Language', 'IELTS', 'French Language', 'Spanish Language', 'English Grammar'] }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-950 py-20 relative">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="px-4 py-2 text-white border border-white rounded-md hover:bg-white hover:text-gray-950 focus:outline-none mb-4"
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          Back To Clonesera
        </Link>
        <h2 className="text-3xl font-semibold text-center mb-12 text-white">Certification Center</h2>
        
        <div className="text-center mb-8 text-white">
          <p className="mb-4">For Students and Instructors</p>
          <Link to="/tests/certification-start">
            <button
              type="button"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 focus:outline-none"
            >
              Start Certification
            </button>
          </Link>
        </div>

        <div className="mb-8">
          <p className="text-2xl text-white text-center mb-8">Find Certificate</p>
          <form className="flex items-center justify-center">
            <input
              type="text"
              placeholder="# Number"
              className="px-4 py-2 mr-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-2 mr-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            />
            <select
              className="px-4 py-2 mr-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option>Select Category</option>
              {categories.map((category, index) => (
                <option key={index}>{category.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 focus:outline-none"
            >
              Find Certificate
            </button>
          </form>
        </div>

        <div className="text-center mb-8">
          <p className="text-2xl text-white mb-6">Our Certification</p>
          <p className="text-white mb-8">
            We prepared tests for the most popular categories and get certificate.
          </p>
        </div>

        <div className="text-center mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 focus:outline-none ${
                selectedCategory === category.name ? 'bg-red-800' : ''
              }`}
              onClick={() => handleCategoryToggle(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {categories.map((category, index) => (
            <div key={index} className={`bg-gray-950 rounded-lg shadow-md overflow-hidden ${selectedCategory === category.name ? 'block' : 'hidden'}`}>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {category.items.map((item, idx) => (
                    <button
                      key={idx}
                      className={`bg-gray-700 text-white p-4 rounded-md text-center hover:bg-gray-800 focus:outline-none`}
                      onClick={handleScrollToTop}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white text-center mb-6">Who Can Get Benefit From This?</h3>
          <div className="flex justify-center items-center gap-16 mb-8">
            <div className="text-center text-white">
              <FontAwesomeIcon icon={faUserGraduate} size="3x" className="mb-4" />
              <p>Students</p>
            </div>
            <div className="text-center text-white">
              <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" className="mb-4" />
              <p>Instructors</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white text-center mb-6">What Will You Get?</h3>
          <div className="text-white max-w-3xl mx-auto text-center">
            <p>Which confirms your skills and knowledge of Certification</p>
            <p className="mt-4">
              The disease needs to be treated with a variety of soft or lumpy foods. Until the ferry, the wise man needs a good vulputate, it was a trigger for some pain, not a free sauce or pain itself. But if the airline does not need it, there is no eleifend. Fusce is not sad, nor is mourning sad. Everyone has a problem with the real estate. Maecenas needs soft fans. To-morrow is the gate of protein; It is necessary to put the temperature in the urn at the time, to be drunk when the bed is warm. In Leo Leo, to drink at the quiver at, tincidunt in no. In either case there is no, but neither can the tincidunt. The boat but the pasta or salad trucks members are not in large. So that the time of shooting itself and not the course of Euismod. Lives mourn the element of the macro, as well as trucks and heavy vehicles. There are no vehicles to decorate the quiver lake. Viva soft ullamcorper dui who is pregnant. Aeneas pulls the pillow from the bow.
            </p>
          </div>
        </div>

        <div className="text-center mb-8 text-white">
          <button
            type="submit"
            className="px-10 py-6 bg-red-600 text-white rounded-md hover:bg-red-800 focus:outline-none"
            onClick={handleScrollToTop}
          >
            Knowledge Base
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationCenter;
