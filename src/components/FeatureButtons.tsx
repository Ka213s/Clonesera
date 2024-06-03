// FeatureButtons.tsx
import React from 'react';

const FeatureButtons: React.FC = () => {
  const features = [
    "Go at your own pace\nEnjoy lifetime access to courses on Edututs+'s website",
    "Learn from industry experts\nSelect from top instructors around the world",
    "Find video courses on almost any topic\nBuild your library for your career and personal growth",
    "100,000 online courses\nExplore a variety of fresh topics"
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <button 
          key={index} 
          className="p-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none"
        >
          {feature.split('\n').map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </button>
      ))}
    </div>
  );
};

export default FeatureButtons;
