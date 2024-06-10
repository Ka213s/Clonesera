import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { FaSearch } from 'react-icons/fa';

const StarIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M12 2l3 6 6 .5-5 4.5 1 6-5-3.5-5 3.5 1-6-5-4.5 6-.5z" />
    </svg>
);

const ReviewCard: React.FC = () => {
    return (
        <div className="bg-gray-50 p-4 mb-4 rounded-md shadow-sm">
            <h4 className="text-md font-semibold mb-2">Course Title</h4>
            <hr className="mb-2" />
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                <div>
                    <h4 className="text-md font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">2 giờ trước</p>
                </div>
            </div>
            <div className="flex items-center mb-2">
                {[...Array(4)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
                <StarIcon className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-gray-700">
                This is a review content. It provides feedback on the service.
            </p>
        </div>
    );
};

const Reviews: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <MainLayout>
            <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">All Reviews</h1>
                <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white relative">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">My All Feedback</h3>
                    <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold mr-2 text-yellow-600">4.6</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[{ percent: 70, stars: 5 }, { percent: 40, stars: 4 }, { percent: 5, stars: 3 }, { percent: 1, stars: 2 }, { percent: 1, stars: 1 }].map(
                            (rating, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex w-1/2">
                                        {[...Array(rating.stars)].map((_, i) => (
                                            <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                                        ))}
                                    </div>
                                    <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden mx-4">
                                        <div
                                            className="h-full bg-green-400 rounded-full"
                                            style={{ width: `${rating.percent}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-gray-600">{rating.percent}%</span>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white relative">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">My All Reviews</h3>
                    <div className="relative flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            className="pl-10 pr-2 py-1 border border-gray-300 rounded-md w-64 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 text-gray-500" />
                    </div>

                    {[1, 2].map((_, index) => (
                        <ReviewCard key={index} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Reviews;
