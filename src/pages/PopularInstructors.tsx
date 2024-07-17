import React from 'react';

interface Instructor {
  id: number;
  name: string;
  avatar: string;
  coursesTaught: number;
}

interface PopularInstructorsProps {
  instructors: Instructor[];
}

const PopularInstructors: React.FC<PopularInstructorsProps> = ({ instructors }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Popular Instructors</h2>
      <div className="flex space-x-4 overflow-x-scroll pb-4">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="bg-white rounded-lg shadow-lg overflow-hidden w-80 flex-shrink-0 flex flex-col">
            <img src={instructor.avatar} alt={instructor.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2">{instructor.name}</h2>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Courses Taught:</strong> {instructor.coursesTaught}
              </p>
              <button
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 mt-auto"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
