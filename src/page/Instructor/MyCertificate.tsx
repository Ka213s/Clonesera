import React, { Component } from "react";
import { FaCertificate } from "react-icons/fa";

class MyCertificate extends Component {
    render() {
        return (
            <div className="bg-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <FaCertificate className="h-6 w-6 text-gray-700" />
                        <h1 className="text-2xl font-bold">My Certificate</h1>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaCertificate className="h-6 w-6 text-gray-700" />
                        <h2 className="text-xl">Jump Into New Certificate</h2>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        New Certificate
                    </button>
                </div>

            </div>
        );
    }
}

export default MyCertificate;

