import React from 'react';
import { FaClock, FaUserTie, FaVideo, FaBookOpen } from 'react-icons/fa';

const FeatureButtons: React.FC = () => {
  const features = [
    { text: "Go at your own pace\nEnjoy lifetime access to courses on Edututs+'s website", icon: FaClock },
    { text: "Learn from industry experts\nSelect from top instructors around the world", icon: FaUserTie },
    { text: "Find video courses on almost any topic\nBuild your library for your career and personal growth", icon: FaVideo },
    { text: "100,000 online courses\nExplore a variety of fresh topics", icon: FaBookOpen }
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <button 
            key={index} 
            className="p-4 bg-white text-black rounded shadow hover:bg-blue-100 focus:outline-none flex flex-col items-center"
          >
            <Icon className="text-3xl mb-2 text-[#9997F5]" />
            {feature.text.split('\n').map((line, i) => (
              <span key={i} className="block text-center">
                {line}
              </span>
            ))}
          </button>
        );
      })}
    </div>
  );
};

export default FeatureButtons;
