import React, { Component } from "react";
import { FaBell, FaChevronLeft as ChevronLeftIcon, FaChevronRight as ChevronRightIcon } from "react-icons/fa";

class Notifications extends Component {
    render() {
        return (
            <div className="bg-gray-100 p-10">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center space-x-2">
                        <FaBell className="h-6 w-6 text-gray-700" />
                        <h1 className="text-2xl font-bold">Notifications</h1>
                    </div>
                </div>

                <div className="p-18 mb-6 flex justify-between items-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Nofitication Setting
                    </button>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">What's new in Cursus</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Improved performance on Studio Dashboard</li>
                        <li>See more Dashboard updates</li>
                        <li>See issues-at-glance for Live</li>
                    </ul>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">What's new in Cursus</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Improved performance on Studio Dashboard</li>
                        <li>See more Dashboard updates</li>
                        <li>See issues-at-glance for Live</li>
                    </ul>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">What's new in Cursus</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Improved performance on Studio Dashboard</li>
                        <li>See more Dashboard updates</li>
                        <li>See issues-at-glance for Live</li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default Notifications;

