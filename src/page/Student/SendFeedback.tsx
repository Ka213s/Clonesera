// src/components/SendFeedback.tsx
import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const SendFeedback: React.FC = () => {
    return (
        <MainLayout>
            <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-8">Send Feedback</h1>
                <div className="mb-8">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-1/2 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-8">
                    <textarea
                        placeholder="Describe your issue or share your ideas"
                        className="w-1/2 p-2 border border-gray-300 rounded-md"
                        rows={5}
                    ></textarea>
                </div>
                <div className="mb-8">
                    <label className="block mb-2">Add Screenshots</label>
                    <input
                        type="file"
                        className="w-1/2 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button className="bg-[#9997F5] text-white py-2 px-4 rounded-md">
                    Send Feedback
                </button>
            </div>
        </MainLayout>
    );
};

export default SendFeedback;
