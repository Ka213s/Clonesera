import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  name: string;
  views: number;
  date: string;
  description: string;
  author: string;
  price: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, views, date, description, author, price }) => {
  const [isDetailPage, setIsDetailPage] = useState(false);

  const handleCourseClick = () => {
    setIsDetailPage(true);
  };

  return (
    <div className="bg-gray-100 w-full gap-6 flex-wrap justify-center items-center">
      <div className='w-full p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0'>
        {/* Kiểm tra nếu đang ở trang chi tiết thì sử dụng Link */}
        {isDetailPage ? (
          <Link to={`/course/${name}`} className="w-full">
            <video controls className="w-full h-40 object-cover rounded-t-lg mb-4">
              <source src={require('../assets/30 Second Timer.mp4')} type="video/mp4" />
              {/* Your browser does not support the video tag. */}
            </video>
          </Link>
        ) : (
          <video controls className="w-full h-40 object-cover rounded-t-lg mb-4" onClick={handleCourseClick}>
            <source src={require('../assets/30 Second Timer.mp4')} type="video/mp4" />
            {/* Your browser does not support the video tag. */}
          </video>
        )}
        <h2 className="text-xl font-bold text-gray-900 truncate">{name}</h2>
        <p className="text-sm text-gray-600 mt-2"><strong>Views:</strong> {views}</p>
        <p className="text-sm text-gray-600"><strong>Date:</strong> {date}</p>
        <p className="text-sm text-gray-600 mt-4 truncate"><strong>Description:</strong> {description}</p>
        <p className="text-sm text-gray-600 mt-2"><strong>Author:</strong> {author}</p>
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-900"><strong>Price:</strong> ${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
