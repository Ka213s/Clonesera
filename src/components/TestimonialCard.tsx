import React from 'react';
import Avatar01 from "../assets/Avatar01.jpg";

interface TestimonialCardProps {
  name: string;
  avatar: string;
  description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, avatar, description }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4 flex flex-col bg-white" style={{ height: '180px' }}>
      <div className="flex-1 mb-4">
        <p className="italic line-clamp-3">{description}</p>
      </div>
      <div className="flex items-center mt-auto">
        <img src={Avatar01} alt={`${name}'s avatar`} className="w-16 h-16 rounded-full mr-4" />
        <p className="font-bold">{name}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
