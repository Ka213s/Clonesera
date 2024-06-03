// TestimonialCard.tsx
import React from 'react';

interface TestimonialCardProps {
  name: string;
  avatar: string;
  description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, avatar, description }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4 flex items-center">
      <img src={avatar} alt={`${name}'s avatar`} className="w-16 h-16 rounded-full mr-4" />
      <div>
        <p className="italic">"{description}"</p>
        <p className="mt-2 font-bold">{name}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
