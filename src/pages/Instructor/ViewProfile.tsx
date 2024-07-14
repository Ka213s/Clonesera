import React, { useState } from 'react';
import { TwitterOutlined, LinkedinOutlined, YoutubeOutlined, FacebookOutlined, SettingOutlined } from '@ant-design/icons';

const coursesData = [
    {
        id: "python-course",
        name: "Learn Python",
        views: 1500,
        date: "2024-01-01",
        description: "An introductory course to Python programming.",
        author: "John Doe",
        price: 29.99,
        vid: "path/to/video1.jpg"
    },
    {
        id: "javascript-course",
        name: "Master JavaScript",
        views: 2000,
        date: "2024-01-15",
        description: "Advanced JavaScript course for web development.",
        author: "Jane Smith",
        price: 39.99,
        vid: "path/to/video2.jpg"
    },
    {
        id: "react-course",
        name: "React for Beginners",
        views: 1800,
        date: "2024-02-01",
        description: "A complete guide to React for new developers.",
        author: "Alice Johnson",
        price: 24.99,
        vid: "path/to/video3.jpg"
    },
    {
        id: "data-structures-algorithms",
        name: "Data Structures and Algorithms",
        views: 2200,
        date: "2024-03-01",
        description: "In-depth course on data structures and algorithms.",
        author: "Bob Brown",
        price: 49.99,
        vid: "path/to/video4.jpg"
    }
];

interface CommentProps {
    author: string;
    timeAgo: string;
    content: string;
    likes: number;
    dislikes: number;
}

const Comment: React.FC<CommentProps> = ({ author, timeAgo, content, likes, dislikes }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4 flex">
            <img src="path/to/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
            <div className="flex-1 relative">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-bold">{author}</h4>
                        <span className="block text-sm text-gray-600">{timeAgo}</span>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="flex items-center"
                        >
                            <span className="mr-1">⋮</span>
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg">
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Edit</button>
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Delete</button>
                            </div>
                        )}
                    </div>
                </div>
                <p className="mt-2 text-gray-800">{content}</p>
                <div className="flex items-center mt-2 space-x-4 text-gray-600">
                    <button className="flex items-center">
                        <span className="mr-1">👍</span> {likes}
                    </button>
                    <button className="flex items-center">
                        <span className="mr-1">👎</span> {dislikes}
                    </button>
                    <button className="flex items-center">
                        <span className="mr-1">❤️</span> 
                    </button>
                </div>
            </div>
        </div>
    );
};

const ViewProfile = () => {
    const [activeTab, setActiveTab] = useState('About');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'About':
                return (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">About Me</h3>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque nibh sed ligula blandit, quis faucibus lorem pellentesque. Suspendisse pulvinar dictum pellentesque. Vestibulum at sagittis lectus, sit amet aliquam turpis. In quis elit tempus, semper justo vitae, lacinia massa. Etiam sagittis quam quis fermentum lacinia. Curabitur blandit sapien et risus congue viverra. Mauris auctor risus sit amet cursus sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat sodales massa, in viverra dolor condimentum ut. In imperdiet, justo nec volutpat blandit, tellus justo tempor quam, sed pretium nibh nunc nec mauris. Mauris vel malesuada magna. Quisque iaculis molestie purus, non luctus mauris porta id. Maecenas imperdiet tincidunt mauris vestibulum vulputate. Aenean sollicitudin pretium nibh, et sagittis risus tincidunt ac. Phasellus scelerisque rhoncus massa, ac euismod massa pharetra non. Phasellus dignissim, urna in iaculis varius, turpis libero mollis velit, sit amet euismod arcu mi ac nibh. Praesent tincidunt eros at ligula pellentesque elementum. Fusce condimentum enim a tellus egestas, sit amet rutrum elit gravida. Pellentesque in porta sapien. Fusce tristique maximus ipsum et mollis. Sed at massa ac est dapibus vulputate at eu nibh.
                        </p>
                    </div>
                );
            case 'Course':
                return (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
                        {coursesData.map((course) => (
                            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-bold">{course.name}</h2>
                                <p className="text-gray-600">{course.description}</p>
                                <p className="text-gray-600">Views: {course.views}</p>
                                <p className="text-gray-600">Date: {course.date}</p>
                                <p className="text-gray-600">Author: {course.author}</p>
                                <p className="text-gray-600">Price: ${course.price}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'Purchase':
                return (
                    <div className="overflow-y-scroll h-[60vh] mt-8">
                        {coursesData.map((course) => (
                            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg border mb-4 flex">
                                <video controls className="w-1/3 h-48 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg">
                                    <source src={require('../../assets/30 Second Timer.mp4')} type="video/mp4" />
                                </video>
                                <div className="w-2/3 ml-4">
                                    <h2 className="text-xl font-bold text-gray-900 truncate">{course.name}</h2>
                                    <p className="text-sm text-gray-600 mt-2"><strong>Views:</strong> {course.views}</p>
                                    <p className="text-sm text-gray-600"><strong>Date:</strong> {course.date}</p>
                                    <p className="text-sm text-gray-600 mt-4 truncate"><strong>Description:</strong> {course.description}</p>
                                    <p className="text-sm text-gray-600 mt-2"><strong>Author:</strong> {course.author}</p>
                                    <div className="mt-4">
                                        <p className="text-lg font-semibold text-gray-900"><strong>Price:</strong> ${course.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Community':
                const comments = [
                    { author: 'John Doe', timeAgo: '2 hours ago', content: 'This is a sample comment.', likes: 5, dislikes: 2 },
                    { author: 'Jane Smith', timeAgo: '1 day ago', content: 'This is another sample comment.', likes: 8, dislikes: 1 },
                ];
                return (
                    <div className="mt-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold mb-4">Community Posts</h3>
                            {comments.map((comment, index) => (
                                <Comment
                                    key={index}
                                    author={comment.author}
                                    timeAgo={comment.timeAgo}
                                    content={comment.content}
                                    likes={comment.likes}
                                    dislikes={comment.dislikes}
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'Subscription':
                return (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Subscriptions</h3>
                        <p className="text-gray-700">Subscription content goes here...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src="path/to/avatar.jpg"
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-white -mt-16 shadow-lg"
                        />
                        <div className="ml-8">
                            <h1 className="text-3xl font-bold">Your Name</h1>
                            <p className="text-gray-600">@username</p>
                            <p className="text-gray-600 mt-2">Location</p>
                            <div className="flex space-x-4 mt-4">
                                <TwitterOutlined className="text-2xl text-blue-500" />
                                <LinkedinOutlined className="text-2xl text-blue-700" />
                                <YoutubeOutlined className="text-2xl text-red-600" />
                                <FacebookOutlined className="text-2xl text-blue-800" />
                                <SettingOutlined className="text-2xl text-gray-600" />
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="bg-[#9997F5] text-white px-4 py-2 rounded-full">Edit Profile</button>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex space-x-6 border-b border-gray-200 pb-3">
                    {['About', 'Course', 'Purchase', 'Community', 'Subscription'].map((tab) => (
                        <button
                            key={tab}
                            className={`text-gray-600 pb-2 ${activeTab === tab ? 'border-b-2 border-[#9997F5] font-semibold text-[#9997F5]' : ''
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ViewProfile;
