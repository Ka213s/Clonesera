import React, { Component } from "react";
import { FaDollarSign, FaChevronLeft as ChevronLeftIcon, FaChevronRight as ChevronRightIcon } from "react-icons/fa";

class Earning extends Component {
    render() {
        return (
            <div className="bg-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <FaDollarSign className="h-6 w-6 text-gray-700" />
                        <h1 className="text-2xl font-bold">Earning</h1>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* Sales earnings this month (month), after edututs+ fees, & before taxes: */}
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-2x font-bold">Sales earnings this month (April), after edututs+ fees, & before taxes:</p>
                        <h2 className="text-2xl font-bold">$1146.78</h2>
                    </div>
                    {/* Weekly Visitors */}
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-2x font-bold">Your balance:</p>
                        <h2 className="text-2xl font-bold">$1146.77</h2>
                    </div>
                    {/* Weekly Sales */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-2x font-bold">Total value of your sales, before taxes:</h2>
                        <p className="text-2xl font-bold">$95895.58</p>
                    </div>
                    
                </div>


                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Latest Courses Performance */}
                    <div className="bg-white p-4 rounded shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Latest Courses Performance</h2>
                            <div className="flex space-x-2">
                                <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                                </button>
                                <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                                    <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div>
                                <h3 className="text-gray-700 font-bold">
                                    Complete Python Bootcamp: Go from zero to hero in Python 3
                                </h3>
                                <p className="text-sm text-gray-500">First 2 days 22 hours</p>
                                <p className="text-sm text-gray-500">
                                    View: 1.5k | Purchased: 150 | Total Like: 1k
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="text-blue-500">
                                GO TO COURSE ANALYTICS
                            </button>
                            <br />
                            <button className="text-blue-500">
                                SEE COMMENTS (875)
                            </button>
                            <br />
                            <button className="text-blue-500">
                                SEE REVIEWS (105)
                            </button>
                        </div>
                    </div>

                    {/* News */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-bold mb-4">News</h2>
                        <div className="flex items-center space-x-4">
                            <img src="news-image.png" alt="News" className="h-16 w-16" />
                            <div>
                                <h3 className="text-gray-700 font-bold">
                                    COVID-19 Updates & Resources
                                </h3>
                                <p className="text-sm text-gray-500">
                                    See the latest updates to coronavirus-related content, including
                                    changes to monetization, and access new Creator support
                                    resources
                                </p>
                                <button className="text-blue-500">
                                    LEARN MORE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Profile Analytics */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-bold mb-4">Profile Analytics</h2>
                        <p className="text-xl font-bold">Current subscribers</p>
                        <p className="text-3xl font-bold mb-4">856</p>
                        <p className="text-sm text-gray-500">View: 17k ⬇ 75%</p>
                        <p className="text-sm text-gray-500">
                            Purchased (per hour): 1 ⬆ 100%
                        </p>
                        <p className="text-sm text-gray-500">Enroll (per hour): 50 ⬇ 70%</p>
                        <button className="text-blue-500">
                            GO TO PROFILE ANALYTICS
                        </button>
                    </div>

                    {/* Submit Courses */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-bold mb-4">Submit Courses</h2>
                        <p className="text-gray-700 font-bold">
                            The Complete JavaScript Course 2020: Build Real Projects!
                        </p>
                        <p className="text-sm text-red-500">Pending</p>
                        <p className="text-sm text-gray-500">Submitted 1 days ago</p>
                        <button className="text-red-500">Delete</button>
                    </div>
                </div>

                
            </div>
        );
    }
}

export default Earning;

