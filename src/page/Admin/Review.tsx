import React from 'react';
const reviewsData = [
  {
    id: 1,
    courseTitle: 'Web Development with PHP & Laravel',
    instructor: 'Dewey Stephens',
    rating: 5.0,
    reviewDate: '13.04.2023',
    reviewText: 'I would not trade in my experiences with UX Academy for anything. I met so many different people all around the world and was able to pick up concepts so quickly and easily.',
  },
  {
    id: 2,
    courseTitle: 'AWS Solutions Architect Associate Program',
    instructor: 'Dewey Stephens',
    rating: 5.0,
    reviewDate: '13.04.2023',
    reviewText: 'I would not trade in my experiences with UX Academy for anything. I met so many different people all around the world and was able to pick up concepts so quickly and easily.',
  },
  // Add more review data as needed
];

const Review: React.FC = () => {
  return (
  
      <div className="pt-10 px-6">
        <h1 className="text-2xl font-semibold mb-6">Review</h1>
        <div className="space-y-6">
          {reviewsData.map((review) => (
            <div key={review.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{review.courseTitle}</h2>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span>{review.instructor}</span>
                <span className="mx-2">•</span>
                <span className="text-yellow-500">⭐ {review.rating}</span>
                <span className="mx-2">•</span>
                <span>Date: {review.reviewDate}</span>
              </div>
              <p className="text-gray-700 mb-4">{review.reviewText}</p>
              <button className="bg-[#9997F5] text-white px-4 py-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#9997F5] focus:ring-opacity-50">
                Reply Review
              </button>
            </div>
          ))}
        </div>
      </div>
  
  );
};

export default Review;
