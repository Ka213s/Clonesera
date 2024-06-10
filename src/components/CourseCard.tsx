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
    <div className="bg-gray-100 w-full gap-6 flex-wrap justify-center items-center">
      <div className='w-full p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0'>
      <img src={require('../assets/Course.png')} alt="Your Image" className="w-full h-full object-cover rounded-t-lg mb-4" />
        <h2 className="text-xl font-bold text-gray-900 truncate">{name}</h2>
        <p className="text-sm text-gray-600 mt-2"><strong>Views:</strong> {views}</p>
        <p className="text-sm text-gray-600 mt-2"><strong>Author:</strong> {author}</p>
        <div className="mt-4">
        <p className="text-lg font-semibold text-gray-900"><strong>Price:</strong> ${price.toFixed(2)}</p>
      </div>
      </div>
    </div>
  );
};

export default CourseCard;
