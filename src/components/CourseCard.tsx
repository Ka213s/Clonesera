import React from 'react';

interface CourseCardProps {
  name: string;
  views: number;
  date: string;
  description: string;
  author: string;
  price: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, views, date, description, author, price }) => {
  return (
    <div className="border p-4 rounded shadow-md h-full flex flex-col justify-between">
      <div>
        <video controls className="w-full h-40 object-cover rounded-t-lg mb-4">
          <source src={require('../assets/30 Second Timer.mp4')} type="video/mp4" />
          {/* Your browser does not support the video tag. */}
        </video>
        <h2 className="text-xl font-bold text-gray-900 truncate">{name}</h2>
        <p className="text-sm text-gray-600 mt-2"><strong>Views:</strong> {views}</p>
        <p className="text-sm text-gray-600"><strong>Date:</strong> {date}</p>
        <p className="text-sm text-gray-600 mt-4 truncate"><strong>Description:</strong> {description}</p>
        <p className="text-sm text-gray-600 mt-2"><strong>Author:</strong> {author}</p>
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-900"><strong>Price:</strong> ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CourseCard;
