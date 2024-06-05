// InstructorCard.tsx
import React from 'react';
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
// import Avatar02 from '../assets/Avatar02.jpg'

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
    <div className="border p-4 rounded shadow-md mb-4 flex flex-col items-center bg-white">
      {/* <img src={Avatar02} alt={`${name}'s avatar`} className="w-16 h-16 rounded-full mb-2" /> */}
      <div className="text-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="mt-2">{content}</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-3xl"><FaYoutube className="text-red-600" /></a>
          <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-3xl"><FaTwitter className="text-blue-400" /></a>
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-3xl"><FaInstagram className="text-pink-500" /></a>
          <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-3xl"><FaFacebook className="text-blue-700" /></a>
        </div>
        <div className="flex mt-2 justify-center">
          <p className="mr-4"><strong>Followers:</strong> {followers}</p>
          <p><strong>Courses:</strong> {courses}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
