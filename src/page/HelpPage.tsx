import React, { useState, useEffect } from 'react';

import { AiOutlineDollarCircle, AiOutlineNotification, AiOutlineCheckCircle, AiOutlineLayout, AiOutlineUser, AiOutlineSafetyCertificate } from 'react-icons/ai';

const HelpPage: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<'Instructor' | 'Student' | ''>('Instructor'); // Chỉnh sửa giá trị mặc định ở đây

    const handleRoleClick = (role: 'Instructor' | 'Student') => {
        setSelectedRole(role === selectedRole ? '' : role);
        scrollToTop();
    };

    const instructorTopics = [
        {
            icon: <AiOutlineDollarCircle size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Payments',
            description: 'Understand the revenue share and how to receive payments.',
        },
        {
            icon: <AiOutlineNotification size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Selling & Promotion',
            description: 'Learn about the announcement and promotional tools.',
        },
        {
            icon: <AiOutlineCheckCircle size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Quality Standards',
            description: 'Learn what it takes to create a high quality course.',
        },
        {
            icon: <AiOutlineLayout size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Course Building',
            description: 'Build your course curriculum and landing page.',
        },
        {
            icon: <AiOutlineUser size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Course Management',
            description: 'Maintain your course and engage with students.',
        },
        {
            icon: <AiOutlineSafetyCertificate size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Trust & Safety',
            description: 'Policy and copyright questions and guidance.',
        },
    ];

    const studentTopics = [
        {
            icon: <AiOutlineLayout size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Getting Started',
            description: 'Learn how Cursus works and how to start learning.',
        },
        {
            icon: <AiOutlineUser size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Account/Profile',
            description: 'Manage your account settings.',
        },
        {
            icon: <AiOutlineNotification size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Troubleshooting',
            description: 'Experiencing a bug? Check here.',
        },
        {
            icon: <AiOutlineDollarCircle size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Course Taking',
            description: 'Everything about taking a course on Udemy.',
        },
        {
            icon: <AiOutlineSafetyCertificate size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Purchase/Refunds',
            description: 'Learn about coupons, how to send gifts, and refunds.',
        },
        {
            icon: <AiOutlineNotification size={24} className="text-blue-500 text-center mb-2" />,
            title: 'Mobile',
            description: 'On the go? Learn about our mobile app.',
        },
    ];

    const faqs = {
        Instructor: [
            { description: 'Promote Your Course With Coupons and Referral Links' },
            { description: 'Cursus Course Quality Checklist' },
            { description: 'Instructor Revenue Share' },
            { description: 'Instructor Promotional Agreements and Cursus Deals' },
            { description: 'How to Become an Instructor: FAQ' },
            { description: 'How to Select Your Payout Method And Become a Premium Instructor' },
        ],
        Student: [
            { description: 'Lifetime Access' },
            { description: 'Cursus FAQ' },
            { description: 'Downloading Courses' },
            { description: 'Certificate of Completion' },
            { description: 'Refund a Course' },
            { description: 'How to Solve Payment Issues' },
        ],
    };

    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const handleFAQClick = (index: number) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToTop(); // Scroll to top when component mounts
    }, []);

    return (
      
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-gray-900 text-white py-6">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl text-center font-bold">How may we help you?</h2>
                        <div className="mt-4 max-w-md mx-auto">
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-800 text-white rounded-md outline-none placeholder-gray-400"
                                placeholder="Search for solutions"
                            />
                        </div>
                    </div>
                </header>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center mb-6">
                        <div
                            className={`cursor-pointer text-blue-500 font-semibold py-2 px-4 rounded-md mr-2 border border-gray-300 ${selectedRole === 'Instructor' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleRoleClick('Instructor')}
                        >
                            Instructor
                        </div>
                        <div
                            className={`cursor-pointer text-blue-500 font-semibold py-2 px-4 rounded-md ml-2 border border-gray-300 ${selectedRole === 'Student' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleRoleClick('Student')}
                        >
                            Student
                        </div>
                    </div>
                    {(selectedRole === 'Instructor' || selectedRole === 'Student') && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {selectedRole === 'Instructor' ? (
                                instructorTopics.map((topic, index) => (
                                    <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                                        <div className="mb-4">
                                            <div className="text-blue-500 text-center mx-auto mb-2">
                                                {topic.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold">{topic.title}</h3>
                                            <p className="text-gray-700">{topic.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                studentTopics.map((topic, index) => (
                                    <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                                        <div className="mb-4">
                                            <div className="text-blue-500 text-center mx-auto mb-2">
                                                {topic.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold">{topic.title}</h3>
                                            <p className="text-gray-700">{topic.description}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    {(selectedRole === 'Instructor' || selectedRole === 'Student') && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {faqs[selectedRole as 'Instructor' | 'Student'].map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                                        onClick={() => handleFAQClick(index)}
                                    >
                                        <div className="text-center mb-4">
                                            <span className="text-lg font-semibold">{faq.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
       
    );
};

export default HelpPage;
