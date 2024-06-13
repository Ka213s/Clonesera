import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

const coursesData = [
  {
    id: 1,
    title: 'Master Your Personal Brand Like a Marketing',
    instructor: 'Darlene Robertson',
    rating: 5.0,
    students: 26,
    lessons: 12,
    startDate: '01-01-23',
    price: '$49.00',
    image: '/images/course-image-1.png',  // Update path
    description: 'Detailed description of the course goes here...',
    videoUrl: '/videos/water_cycle.mp4',  // Update path
    playlists: [
      { id: 1, title: 'Introduction', duration: '10:00', imageUrl: '/images/Artwork.jpg' },  // Update path
      { id: 2, title: 'Chapter 1', duration: '20:00', imageUrl: '/images/Artwork.jpg' },  // Update path
      // Add more playlists
    ],
    details: `Learning programming is hard. Especially in the beginning. Don't waste your time going at it alone. 
              As my mentee Chris put it. The sessions with Jascha have been more valuable than eight weeks of my professor's lectures. 
              It's money much better spent!`,
    certification: `Learning programming is hard. Especially in the beginning. Don't waste your time going at it alone. 
                    As my mentee Chris put it. The sessions with Jascha have been more valuable than eight weeks of my professor's lectures. 
                    It's money much better spent!`,
    learningOutcomes: [
      'You will be able to program in Python professionally',
      'Create a portfolio of 100 Python projects',
      'Be able to use Python for data science and machine learning',
      'Build GUIs and Desktop applications with Python',
      'Be able to build fully fledged websites and web apps with Python',
    ],
  },
  {
    id: 2,
    title: 'Master Your Personal Brand Like a Marketing',
    instructor: 'Darlene Robertson',
    rating: 5.0,
    students: 26,
    lessons: 12,
    startDate: '01-01-23',
    price: '$49.00',
    image: '/images/course-image-1.png',  // Update path
    description: 'Detailed description of the course goes here...',
    videoUrl: '/videos/water_cycle.mp4',  // Update path
    playlists: [
      { id: 1, title: 'Introduction', duration: '10:00', imageUrl: '/images/Artwork.jpg' },  // Update path
      { id: 2, title: 'Chapter 1', duration: '20:00', imageUrl: '/images/Artwork.jpg' },  // Update path
      // Add more playlists
    ],
    details: `Learning programming is hard. Especially in the beginning. Don't waste your time going at it alone. 
              As my mentee Chris put it. The sessions with Jascha have been more valuable than eight weeks of my professor's lectures. 
              It's money much better spent!`,
    certification: `Learning programming is hard. Especially in the beginning. Don't waste your time going at it alone. 
                    As my mentee Chris put it. The sessions with Jascha have been more valuable than eight weeks of my professor's lectures. 
                    It's money much better spent!`,
    learningOutcomes: [
      'You will be able to program in Python professionally',
      'Create a portfolio of 100 Python projects',
      'Be able to use Python for data science and machine learning',
      'Build GUIs and Desktop applications with Python',
      'Be able to build fully fledged websites and web apps with Python',
    ],
  },
  {
    id: 3,
    title: 'Master Your Personal Brand Like a Marketing',
    instructor: 'Darlene Robertson',
    rating: 5.0,
    students: 26,
    lessons: 12,
    startDate: '01-01-23',
    price: '$49.00',
    image: '/images/course-image-1.png',  // Update path
    description: 'Detailed description of the course goes here...',
    videoUrl: '/videos/water_cycle.mp4',  // Update path
    playlists: [
      { id: 1, title: 'Introduction', duration: '10:00', imageUrl: '/images/Artwork.jpg' },  // Update path
      { id: 2, title: 'Chapter 1', duration: '20:00', imageUrl: '/images/Artwork.jpg' },  // Update path
      // Add more playlists
    ],
    details: `Learning programming is hard. Especially in the beginning. Don't waste your time going at it alone. 
              As my mentee Chris put it. The sessions with Jascha have been more valuable than eight weeks of my professor's lectures. 
              It's money much better spent!`,
    certification: `Learning programming is hard. Especially in the beginning. Don't waste your time going at it alone. 
                    As my mentee Chris put it. The sessions with Jascha have been more valuable than eight weeks of my professor's lectures. 
                    It's money much better spent!`,
    learningOutcomes: [
      'You will be able to program in Python professionally',
      'Create a portfolio of 100 Python projects',
      'Be able to use Python for data science and machine learning',
      'Build GUIs and Desktop applications with Python',
      'Be able to build fully fledged websites and web apps with Python',
    ],
  },
  // Add more course data as needed
];

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Course not found</div>;
  }

  const course = coursesData.find((course) => course.id === parseInt(id, 10));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <MainLayout>
      <div className="pt-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative pb-9/16">
              {/* Simplified styles and added width/height */}
              <video src={course.videoUrl} width="100%" height="100%" controls>
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 className="mt-4 text-2xl font-semibold">{course.title}</h1>
            <p className="text-sm text-gray-600">by {course.instructor}</p>
          </div>
          <div>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md w-full">
              + Add New Course
            </button>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Course Playlists</h2>
              {course.playlists.map((playlist) => (
                <div key={playlist.id} className="flex items-center mb-2">
                  <img src={playlist.imageUrl} alt={playlist.title} className="w-16 h-16 object-cover rounded mr-2" />
                  <div>
                    <h3 className="text-sm font-semibold">{playlist.title}</h3>
                    <p className="text-xs text-gray-600">{playlist.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Course Details</h2>
            <p>{course.details}</p>
            <h2 className="text-xl font-semibold mt-6 mb-4">Certification</h2>
            <p>{course.certification}</p>
            <h2 className="text-xl font-semibold mt-6 mb-4">What you'll learn</h2>
            <ul className="list-disc list-inside">
              {course.learningOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price</span>
                <span className="text-xl font-semibold text-red-500">{course.price}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Ratings</span>
                <span className="text-lg font-semibold">{course.rating} (145)</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Durations</span>
                <span className="text-lg font-semibold">15 Days</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Lessons</span>
                <span className="text-lg font-semibold">45</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Certificate</span>
                <span className="text-lg font-semibold">Yes</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Language</span>
                <span className="text-lg font-semibold">English</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Access</span>
                <span className="text-lg font-semibold">Lifetime</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Instructor</span>
                <span className="text-lg font-semibold">{course.instructor}</span>
              </div>
              <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full shadow-md w-full">
                Edit Course Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetail;
