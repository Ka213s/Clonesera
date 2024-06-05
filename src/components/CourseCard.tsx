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
    <div className="border p-4 rounded shadow-md mb-4">
      <video controls className="w-full h-35 object-cover rounded mt-2">
        <source src={require('../assets/30 Second Timer.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2 className="text-xl font-bold">{name}</h2>
      <p><strong>Views:</strong> {views}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>Price:</strong> ${price.toFixed(2)}</p>
      
    </div>
  );
};

export default CourseCard;
