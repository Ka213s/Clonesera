import React, { Component } from "react";
import { FaBell } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import logoavatar from "../assets/Avatar01.jpg";
class Notifications extends Component {
    render() {
        return (
            <MainLayout>
                <div className="bg-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                            <FaBell className="h-6 w-6 text-gray-700" />
                            <h1 className="text-2xl font-bold">Notifications</h1>
                        </div>
                    </div>

                    <div className="p-4 rounded mb-6">
                        <button className="bg-[#9997F5] text-white px-4 py-2 rounded">
                            Notification Setting
                        </button>
                    </div>

                    {/* List of notifications */}
                    <div className="bg-white p-4 rounded shadow">
                        <div className="mb-4 flex items-center space-x-4">
                            <img src={logoavatar} alt="Notification 1" className="h-12 w-12 rounded-full" />
                            <div>
                                <h2 className="text-lg font-bold">Rock William</h2>
                                <p className="text-gray-700">Like Your Comment On Video How to create sidebar menu.</p>
                                <p className="text-gray-500">2 min ago</p>
                            </div>
                        </div>
                        <div className="mb-4 flex items-center space-x-4">
                            <img src={logoavatar} alt="Notification 2" className="h-12 w-12 rounded-full" />
                            <div>
                                <h2 className="text-lg font-bold">Jassica Smith</h2>
                                <p className="text-gray-700">Added New Review In Video Full Stack PHP Developer.</p>
                                <p className="text-gray-500">12 min ago</p>
                            </div>
                        </div>
                        <div className="mb-4 flex items-center space-x-4">
                            <img src={logoavatar} alt="Notification 3" className="h-12 w-12 rounded-full" />
                            <div>
                                <h2 className="text-lg font-bold">Your Membership Activated</h2>
                                <p className="text-gray-500">20 min ago</p>
                            </div>
                        </div>
                        <div className="mb-4 flex items-center space-x-4">
                            <img src={logoavatar}   alt="Notification 4" className="h-12 w-12 rounded-full" />
                            <div>
                                <h2 className="text-lg font-bold">Your Course Approved Now. How to create sidebar menu.</h2>
                                <p className="text-gray-500">20 min ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
}

export default Notifications;
