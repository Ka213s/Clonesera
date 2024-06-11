import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { FaTwitterSquare, FaLinkedin, FaYoutubeSquare, FaFacebookSquare, FaCog } from 'react-icons/fa';

const ViewProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState('About');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'About':
                return (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">About Me</h3>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque nibh sed ligula blandit, quis faucibus lorem pellentesque...
                        </p>
                    </div>
                );
            case 'Course':
                return (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Courses</h3>
                        <p className="text-gray-700">
                            List of courses created by Joginder Singh...
                        </p>
                    </div>
                );
            case 'Purchase':
                return (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Purchase History</h3>
                        <p className="text-gray-700">
                            Details of purchased courses...
                        </p>
                    </div>
                );
            case 'Discussion':
                return (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Discussion</h3>
                        <p className="text-gray-700">
                            Discussion threads and comments...
                        </p>
                    </div>
                );
            case 'Subscription':
                return (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Subscription</h3>
                        <p className="text-gray-700">
                            Subscription details and settings...
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            <div className="p-4">
                <div className="bg-gray-800 text-white p-6 flex flex-col md:flex-row justify-between items-start">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                                {/* Placeholder for the profile image */}
                                <span className="text-6xl">👨‍🏫</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Joginder Singh</h2>
                                <p className="text-lg">UI / UX Designer and Web Developer</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 mt-4">
                            <div className="bg-transparent p-2 border border-gray-400">
                                <h3 className="text-lg font-semibold">Enroll Students</h3>
                                <p className="text-xl">612K</p>
                            </div>
                            <div className="bg-transparent p-2 border border-gray-400">
                                <h3 className="text-lg font-semibold">Courses</h3>
                                <p className="text-xl">8</p>
                            </div>
                            <div className="bg-transparent p-2 border border-gray-400">
                                <h3 className="text-lg font-semibold">Reviews</h3>
                                <p className="text-xl">11K</p>
                            </div>
                            <div className="bg-transparent p-2 border border-gray-400">
                                <h3 className="text-lg font-semibold">Subscriptions</h3>
                                <p className="text-xl">452K</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 items-start md:items-end mt-6 md:mt-0">
                        <div className="flex items-center space-x-2">
                            <FaCog className="text-xl" />
                            <span>Setting</span>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-blue-700">
                                <FaFacebookSquare className="text-3xl" />
                            </a>
                            <a href="#" className="text-blue-300">
                                <FaTwitterSquare className="text-3xl" />
                            </a>
                            <a href="#" className="text-purple-500">
                                <FaLinkedin className="text-3xl" />
                            </a>
                            <a href="#" className="text-red-600">
                                <FaYoutubeSquare className="text-3xl" />
                            </a>
                        </div>
                        <div className="flex space-x-4">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-sm">Cursus Studio</button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-sm">Edit</button>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="border-b border-gray-200">
                        <ul className="flex -mb-px">
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'About' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('About')}
                                >
                                    About
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'Course' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('Course')}
                                >
                                    Course
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'Purchase' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('Purchase')}
                                >
                                    Purchase
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'Discussion' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('Discussion')}
                                >
                                    Discussion
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'Subscription' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('Subscription')}
                                >
                                    Subscription
                                </button>
                            </li>
                        </ul>
                    </div>
                    {renderTabContent()}
                </div>
            </div>
        </MainLayout>
    );
};

export default ViewProfile;
