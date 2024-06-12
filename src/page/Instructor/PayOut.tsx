import React, { Component } from "react";
import { FaWallet, FaChevronLeft as ChevronLeftIcon, FaChevronRight as ChevronRightIcon } from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout";
class PayOut extends Component {
    render() {
        return (
            <MainLayout>
                <div className="bg-gray-100 p-8">

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                            <FaWallet className="h-6 w-6 text-gray-700" />
                            <h1 className="text-2xl font-bold">Pay Out</h1>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-6 min-h-screen">
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                            {/* Next Payout Section */}
                            <div className="bg-white p-6 shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Next payout</h2>
                                <p className="text-gray-400 text-3xl font-bold mb-2">$4568.50</p>
                                <p className="text-gray-600">via Payoneer</p>
                                <p className="text-gray-500 mt-4">Your payout will be processed on <span className="font-semibold text-gray-700">April 15, 2020</span></p>
                            </div>

                            {/* Payout History Section */}
                            <div className="bg-white p-6 shadow-md md:col-span-2">
                                <h2 className="text-xl font-semibold mb-4">Payout History</h2>
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-purple-200 text-gray-700">
                                            <th className="p-4 text-left">Amount</th>
                                            <th className="p-4 text-left">Payout Method</th>
                                            <th className="p-4 text-left">Date Processed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="p-4">$2550.54</td>
                                            <td className="p-4">Payoneer</td>
                                            <td className="p-4">15 Mar 2020</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">$1950.14</td>
                                            <td className="p-4">Payoneer</td>
                                            <td className="p-4">15 Feb 2020</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Payout Account Section */}
                            <div className="bg-white p-6 shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Payout account</h2>
                                <div className="flex items-center mb-4">
                                    <div>
                                        <p className="text-gray-700 font-semibold">Payoneer</p>
                                        <p className="text-gray-500">Added: 01 Mar 2020</p>
                                    </div>
                                </div>
                                <button className="bg-[#9997F5] text-white px-4 py-2 rounded">
                                    Set Account
                                </button>
                            </div>
                        </div>
                    </div>







                </div>
            </MainLayout>
        );
    }
}

export default PayOut;

