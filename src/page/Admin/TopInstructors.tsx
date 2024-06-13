import React from 'react';

const TopInstructors: React.FC = () => {
  const instructors = [
    {
      name: 'Esther Howard',
      role: 'UX/UI Designer',
      image: '/path/to/image1.png',
      hours: 'Daily 2 hours',
    },
    {
      name: 'Brooklyn Simmons',
      role: 'Web Designer',
      image: '/path/to/image2.png',
      hours: 'Daily 3 hours',
    },
    {
      name: 'Savannah Nguyen',
      role: 'Digital Marker',
      image: '/path/to/image3.png',
      hours: 'Daily 4 hours',
    },
    {
      name: 'Bessie Cooper',
      role: 'Webflow Developer',
      image: '/path/to/image4.png',
      hours: 'Daily 6 hours',
    },
    {
      name: 'Dianne Russell',
      role: 'Data Science',
      image: '/path/to/image5.png',
      hours: 'Daily 12 hours',
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Top Instructors</h2>
      <ul>
        {instructors.map((instructor, index) => (
          <li key={index} className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-bold text-gray-800">{instructor.name}</div>
                <div className="text-gray-600">{instructor.role}</div>
              </div>
            </div>
            <div className="text-gray-500">{instructor.hours}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopInstructors;
