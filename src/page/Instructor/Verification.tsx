import React, { useState } from "react";
import { FaCheck, FaUserCheck, FaClock } from "react-icons/fa";


const Verification: React.FC = () => {
    const [courseTitle, setCourseTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic
        console.log('Course Title:', courseTitle);
        console.log('File:', file);
    };


    return (
      
            <div className="bg-gray-100 p-6 min-h-screen">
                <div className="bg-gray-100 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                            <FaCheck className="h-6 w-6 text-gray-700" />
                            <h1 className="text-2xl font-bold">Verification</h1>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-4">

                        <div className="mb-4">
                            <button className="bg-purple-300 hover:bg-purple-600 text-blue-400 font-bold py-8 px-2 rounded-full">
                                <FaUserCheck size="3x" />
                            </button>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Verification with Edututs+</h2>
                        <p className="text-gray-600">
                            Praesent sed sapien gravida, tempus nunc nec, euismod turpis. Mauris quis scelerisque arcu. Quisque et aliquet nisl, id placerat est. Morbi quis imperdiet nulla.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center p-10 items-center">
                    <div className="grid grid-cols-2 w-full max-w-3xl">
                        <div className="flex items-center p-4 bg-white shadow-md ">
                            <div className="text-[#9997F5] text-4xl mr-4">
                                <FaClock />
                            </div>
                            <div>
                                <div className="font-bold">14 subscribers</div>
                                <div className="text-gray-600">500 required</div>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-white shadow-md">
                            <div className="text-[#9997F5] text-4xl mr-4">
                                <FaClock />
                            </div>
                            <div>
                                <div className="font-bold">10 public watch hours</div>
                                <div className="text-gray-600">1,500 required</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex text-center space-x-2">
                        <FaCheck className="h-6 text-gray-700" />
                        <h1 className="text-gray-600 mb-16">We'll send you an email when you're eligible to apply</h1>
                    </div>
                </div>

                {/* Verify ID */}
                <div className="bg-gray-100 flex justify-center items-center">
                    <div className="bg-white p-10 rounded shadow-md w-2/3 min-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your ID</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseTitle">
                                    Course Title*
                                </label>
                                <input
                                    type="text"
                                    id="courseTitle"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Full Name"
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uploadDocument">
                                    Upload Document*
                                </label>
                                <input
                                    type="file"
                                    id="uploadDocument"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    required
                                />
                                <label
                                    htmlFor="uploadDocument"
                                    className="cursor-pointer inline-block bg-[#9997F5] hover:bg-[#8886E5] text-white py-2 px-4 rounded"
                                >
                                    {file ? file.name : 'Choose File'}
                                </label>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#9997F5] hover:bg-[#8886E5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       
    );
}

export default Verification;

