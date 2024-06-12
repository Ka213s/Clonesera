import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface CourseCardProps {
  name: string;
  views: number;
  date: string;
  description: string;
  author: string;
  price: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, views, date, description, author, price }) => {
  const rating = 4.5; // Fix rating to a specific value

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };
  return (
    <body className='bg-gray-100 flex items-center justify-center gap-10'>
      <div className='card'>
        <img src={require('../assets/Course.png')} alt="Your Image" className="w-full h-full object-cover rounded-t-lg mb-4" />
        <div className="p-5 flex flex-col gap-3">
          {/* <div className='w-full p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0'> */}
          <h2 className="product-tille">{name}</h2>
          <div className="mt-4">
            <p className="text-xl font-bold"><strong>Price:</strong> ${price.toFixed(2)}</p>
            <div className='flex items-center gap-2 mt-1'>
              <span className='text-sm line-through opacity-50'>
                59.99$
              </span>
              <span className='discount-percent'>
                Save 20%
              </span>
            </div>
          </div>
          <span className='flex items-center mt-1'>
            {renderStars(rating)}
            <span className="text-xs ml-2 text-grap-500">{views}<strong> reviews</strong></span>
          </span>
          <span className="text-sm text-gray-600 mt-4 truncate">{date}</span>
          <div className="flex items-center mt-2">
            <strong className="mr-1">Author:</strong>
            <p className="text-sm text-gray-600 truncate">{author}</p>
          </div>
        </div>
      </div>
    </body>
  );
};

export default CourseCard;
