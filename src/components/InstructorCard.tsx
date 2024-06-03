// InstructorCard.tsx
import React from 'react';
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

interface InstructorCardProps {
  name: string;
  avatar: string;
  content: string;
  social: {
    youtube: string;
    twitter: string;
    instagram: string;
    facebook: string;
  };
  followers: number;
  courses: number;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ name, avatar, content, social, followers, courses }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4 flex items-center">
      <img src={avatar} alt={`${name}'s avatar`} className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p>{content}</p>
        <div className="flex space-x-4 mt-2">
          <a href={social.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube className="text-red-600" /></a>
          <a href={social.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter className="text-blue-400" /></a>
          <a href={social.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram className="text-pink-500" /></a>
          <a href={social.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook className="text-blue-700" /></a>
        </div>
        <p className="mt-2"><strong>Followers:</strong> {followers}</p>
        <p><strong>Courses:</strong> {courses}</p>
      </div>
    </div>
  );
};

export default InstructorCard;
