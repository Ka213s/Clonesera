import React, { Component } from "react";
import { FaDollarSign, FaChevronLeft as ChevronLeftIcon, FaChevronRight as ChevronRightIcon } from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout";


class Earning extends Component {
    render() {
        return (
            <MainLayout>
                <div className="bg-gray-100 p-8">

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                            <FaDollarSign className="h-6 w-6 text-gray-700" />
                            <h1 className="text-2xl font-bold">Earning</h1>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">

                    {/* Sales earnings this month (month), after edututs+ fees, & before taxes */}
                    <div className="bg-gray-800 p-10 text-center">
                        <p className="text-white text-2x font-bold">(April) sales earnings after edututs+fees, before taxes:</p>
                        <h2 className="leading-10 text-white text-2xl font-bold">$1146.78</h2>
                    </div>

                    {/* Your balance */}
                    <div className="bg-gray-800 p-10 text-center">
                        <p className="text-white text-2x font-bold">Your balance:</p>
                        <h2 className="leading-10 text-white text-2xl font-bold">$1146.77</h2>
                    </div>
                    
                    {/* Total value of your sales, before taxes */}
                    <div className="bg-gray-800 p-10 text-center">
                        <p className="text-white text-2x font-bold">Total value of your sales, before taxes:</p>
                        <h2 className="leading-10 text-white text-2xl font-bold">$95895.58</h2>
                    </div>
                </div>


                <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap-mx-3">

                            {/* Top Countries */}
                            <div className="w-full md:w-1/4 px-3 mb-6">
                                <div className="bg-white p-4 rounded shadow">
                                    <h2 className="text-xl font-bold mb-4">Your Top Countries</h2>
                                    <ul>
                                        {[
                                            { country: 'United States', earnings: '$48' },
                                            { country: 'Bulgaria', earnings: '$35' },
                                            { country: 'Dominica', earnings: '$25' },
                                            { country: 'Italy', earnings: '$18' },
                                            { country: 'Korea, Republic of', earnings: '$18' },
                                            { country: 'Malaysia', earnings: '$10' },
                                            { country: 'Netherlands', earnings: '$8' },
                                            { country: 'Thailand', earnings: '$5' }
                                        ].map((item, index) => (
                                            <li key={index} className="flex justify-between py-2 border-b border-gray-200 text-gray-400">
                                                <span>{item.country}</span>
                                                <span>{item.earnings}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Item Sales */}
                            <div className="w-full md:w-3/4 px-3">
                                <div className="bg-white p-4 rounded shadow ">

                                    <div className="flex items-center mb-4">
                                        
                                        <select className="border border-gray-300 rounded px-3 py-2 mr-4">
                                            <option>Item Sales</option>
                                            <option>Total Sales</option>
                                            <option>2020</option>
                                        </select>

                                        <nav className="flex items-center text-gray-600">
                                            <a href="#" className="hover:underline mr-2">All Time</a>
                                            <span className="mx-2">/</span>
                                            <a href="#" className="hover:underline mr-2">2020</a>
                                            <span className="mx-2">/</span>
                                            <a href="#" className="font-bold text-black">April</a>
                                        </nav>
                                    </div>

                                    <table className="min-w-full bg-white">

                                        <thead>
                                            <tr className="bg-purple-200 text-left">
                                                <th className="py-2 px-4 border-b border-gray-200 ">Date</th>
                                                <th className="py-2 px-4 border-b border-gray-200">Item Sales Count</th>
                                                <th className="py-2 px-4 border-b border-gray-200">Earnings</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {[
                                                { date: '1, Wednesday', count: 3, earnings: '$120.50' },
                                                { date: '2, Thursday', count: 2, earnings: '$84.00' },
                                                { date: '4, Saturday', count: 4, earnings: '$150.50' },
                                                { date: '5, Sunday', count: 3, earnings: '$102.24' },
                                                { date: '6, Monday', count: 2, earnings: '$80.50' },
                                                { date: '7, Tuesday', count: 3, earnings: '$70.50' },
                                                { date: '8, Wednesday', count: 5, earnings: '$130.00' },
                                                { date: '9, Thursday', count: 3, earnings: '$95.50' },
                                                { date: '10, Friday', count: 4, earnings: '$152.50' },
                                                { date: '11, Saturday', count: 3, earnings: '$100.40' },
                                                { date: '12, Sunday', count: 2, earnings: '$60.14' }
                                            ].map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-2 px-4 border-b border-gray-200">{item.date}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{item.count}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{item.earnings}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                        <tfoot>
                                            <tr className="bg-gray-800 text-white hover:text-gray-400">
                                                <td className="py-2 px-4 border-b border-gray-200 font-bold">Total</td>
                                                <td className="py-2 px-4 border-b border-gray-200 font-bold">34</td>
                                                <td className="py-2 px-4 border-b border-gray-200 font-bold">$1146.78</td>
                                            </tr>
                                        </tfoot>

                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </MainLayout>
        );
    }
}

export default Earning;

