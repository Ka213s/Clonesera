import React from 'react';

interface TestimonialCardProps {
  name: string;
  avatar: string;
  description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, avatar, description }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4 flex flex-col items-center sm:flex-row sm:items-start">
      <div className="mb-4 sm:mb-0 sm:mr-4">
        <p className="italic">{description}</p>
        <p className="font-bold">{name}</p>
      </div>
      <img src={avatar} alt={`${name}'s avatar`} className="w-16 h-16 rounded-full sm:ml-4" />
    </div>
  );
};

export default TestimonialCard;
