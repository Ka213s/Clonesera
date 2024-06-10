import React, { Component } from "react";
import { FaChartLine, FaChevronLeft as ChevronLeftIcon, FaChevronRight as ChevronRightIcon } from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout";

class Analyics extends Component {
    render() {
        return (

            <div className="bg-gray-100 p-10">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center space-x-2">
                        <FaChartLine className="h-6 w-6 text-gray-700" />
                        <h1 className="text-2xl font-bold">Analyics</h1>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-9">
                    {/* Subscribers */}
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-2xl font-bold">5556</p>
                        <h2 className="text-gray-700 text-lg font-bold">Subscribers</h2>
                    </div>
                    {/* Weekly Visitors */}
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-2xl font-bold">342</p>
                        <h2 className="text-gray-700 text-lg font-bold">Weekly Visitors</h2>
                    </div>
                    {/* Weekly Sales */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-2xl font-bold">768</h2>
                        <p className="text-gray-700 text-lg font-bold">Weekly Sales</p>
                    </div>

                </div>

                <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold">Sales of the year</h2>
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

                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="text-left">
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Item No.
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Thumbnail
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Title
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Purchases
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Comments
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Views
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-001</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                Course Title Here
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                Course Title Here
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">70</td>
                            <td className="py-2 px-4 border-b border-gray-200">86</td>
                            <td className="py-2 px-4 border-b border-gray-200">100</td>

                        </tr>


                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-002</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                Course Title Here
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                Course Title Here
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">60</td>
                            <td className="py-2 px-4 border-b border-gray-200">70</td>
                            <td className="py-2 px-4 border-b border-gray-200">201</td>

                        </tr>


                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-003</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                Course Title Here
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                Course Title Here
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">75</td>
                            <td className="py-2 px-4 border-b border-gray-200">50</td>
                            <td className="py-2 px-4 border-b border-gray-200">125</td>

                        </tr>


                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-004</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                Course Title Here
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                Course Title Here
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">90</td>
                            <td className="py-2 px-4 border-b border-gray-200">70</td>
                            <td className="py-2 px-4 border-b border-gray-200">111</td>

                        </tr>


                    </tbody>
                </table>
            </div>

        );

    }
}

export default Analyics;

