import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { FaTwitterSquare, FaLinkedin, FaYoutubeSquare, FaFacebookSquare, FaCog } from 'react-icons/fa';
import CourseCard from '../../components/CourseCard';
import { FaBell } from 'react-icons/fa';
import subscriptionsData from '../../models/FileJson/subscriptions.json';

const SubscriptionCard: React.FC<{ subscription: typeof subscriptionsData[0] }> = ({ subscription }) => {
    const truncateTitle = (title: string, maxLength: number) => {
        if (title.length <= maxLength) {
            return title;
        }
        return title.substring(0, maxLength) + '...';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <img src={subscription.avatar} alt={subscription.name} className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-lg font-bold">{subscription.name} <span className="text-blue-500">✔</span></h3>
            <p className="text-gray-600 mt-1 truncate" title={subscription.title}>
                {truncateTitle(subscription.title, 25)}
            </p>
            <div className="flex justify-center items-center mt-4 space-x-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-sm">Subscribed</button>
                <button className="bg-gray-200 text-gray-800 p-3 rounded-sm"><FaBell /></button>
            </div>
            <p className="text-gray-600 mt-2 text-sm">{subscription.students} · {subscription.courses}</p>
        </div>
    );
};

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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque nibh sed ligula blandit, quis faucibus lorem pellentesque. Suspendisse pulvinar dictum pellentesque. Vestibulum at sagittis lectus, sit amet aliquam turpis. In quis elit tempus, semper justo vitae, lacinia massa. Etiam sagittis quam quis fermentum lacinia. Curabitur blandit sapien et risus congue viverra. Mauris auctor risus sit amet cursus sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat sodales massa, in viverra dolor condimentum ut. In imperdiet, justo nec volutpat blandit, tellus justo tempor quam, sed pretium nibh nunc nec mauris. Mauris vel malesuada magna. Quisque iaculis molestie purus, non luctus mauris porta id. Maecenas imperdiet tincidunt mauris vestibulum vulputate. Aenean sollicitudin pretium nibh, et sagittis risus tincidunt ac. Phasellus scelerisque rhoncus massa, ac euismod massa pharetra non. Phasellus dignissim, urna in iaculis varius, turpis libero mollis velit, sit amet euismod arcu mi ac nibh. Praesent tincidunt eros at ligula pellentesque elementum. Fusce condimentum enim a tellus egestas, sit amet rutrum elit gravida. Pellentesque in porta sapien. Fusce tristique maximus ipsum et mollis. Sed at massa ac est dapibus vulputate at eu nibh.                        </p>
                    </div>
                );
            case 'Course':
                return (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
                        {coursesData.map((course) => (
                            <CourseCard
                                key={course.id}
                                name={course.name}
                                views={course.views}
                                date={course.date}
                                description={course.description}
                                author={course.author}
                                price={course.price}
                            />
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
            case 'Discussion':
                return (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-start space-x-4 mb-4">
                            <img src="path/to/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <textarea
                                    placeholder="Add a public comment"
                                    className="w-full p-2 border border-gray-300 rounded-sm resize-none"
                                    rows={1}
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-sm">Comment</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Comment
                                author="John Doe"
                                timeAgo="2 hours ago"
                                content="Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis."
                                likes={10}
                                dislikes={1}
                            />
                            <Comment
                                author="Rock Doe"
                                timeAgo="1 hour ago"
                                content="Fusce lacinia, nunc sit amet tincidunt venenatis."
                                likes={4}
                                dislikes={2}
                            />
                        </div>
                    </div>
                );
            case 'Subscription':
                return (
                    <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {subscriptionsData.map((subscription) => (
                            <SubscriptionCard key={subscription.id} subscription={subscription} />
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            <div className="p-4">
                <div className="bg-gray-800 text-white p-6 flex flex-col md:flex-row justify-between items-start">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                                {/* Placeholder for the profile image */}
                                <span className="text-6xl">👨‍🏫</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Joginder Singh</h2>
                                <p className="text-lg">UI / UX Designer and Web Developer</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 mt-4">
                            <div className="bg-transparent p-2 border border-gray-400">
                                <h3 className="text-lg font-semibold">Enroll Students</h3>
                                <p className="text-xl">612K</p>
                            </div>
                            <div className="bg-transparent p-2 border border-gray-400">
                                <h3 className="text-lg font-semibold">Courses</h3>
                                <p className="text-xl">8</p>
                            </div>
                            <div className="bg-transparent p-2 border border-gray-400">
                                <h3 className="text-lg font-semibold">Reviews</h3>
                                <p className="text-xl">11K</p>
                            </div>
                            <div className="bg-transparent p-2 border border-gray-400">
                                <h3 className="text-lg font-semibold">Subscriptions</h3>
                                <p className="text-xl">452K</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 items-start md:items-end mt-6 md:mt-0">
                        <div className="flex items-center space-x-2">
                            <FaCog className="text-xl" />
                            <span>Setting</span>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-blue-700">
                                <FaFacebookSquare className="text-3xl" />
                            </a>
                            <a href="#" className="text-blue-300">
                                <FaTwitterSquare className="text-3xl" />
                            </a>
                            <a href="#" className="text-purple-500">
                                <FaLinkedin className="text-3xl" />
                            </a>
                            <a href="#" className="text-red-600">
                                <FaYoutubeSquare className="text-3xl" />
                            </a>
                        </div>
                        <div className="flex space-x-4">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-sm">Cursus Studio</button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-sm">Edit</button>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="border-b border-gray-200">
                        <ul className="flex -mb-px">
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'About' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('About')}
                                >
                                    About
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'Course' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('Course')}
                                >
                                    Course
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'Purchase' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('Purchase')}
                                >
                                    Purchase
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'Discussion' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('Discussion')}
                                >
                                    Discussion
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'Subscription' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                                    onClick={() => setActiveTab('Subscription')}
                                >
                                    Subscription
                                </button>
                            </li>
                        </ul>
                    </div>
                    {renderTabContent()}
                </div>
            </div>
        </MainLayout>
    );
};

export default ViewProfile;
