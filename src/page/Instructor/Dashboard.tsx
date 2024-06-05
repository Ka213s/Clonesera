import React from "react";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="h-6 w-6 text-gray-700" />
          <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 text-lg font-bold">Total Sales</h2>
          <p className="text-2xl font-bold">$350</p>
          <p className="text-sm text-green-500">New $50</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 text-lg font-bold">Total Enroll</h2>
          <p className="text-2xl font-bold">1500</p>
          <p className="text-sm text-purple-500">New 125</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 text-lg font-bold">Total Courses</h2>
          <p className="text-2xl font-bold">130</p>
          <p className="text-sm text-orange-500">New 5</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 text-lg font-bold">Total Students</h2>
          <p className="text-2xl font-bold">2650</p>
          <p className="text-sm text-purple-500">New 245</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="h-6 w-6 text-gray-700" />
          <h2 className="text-xl">Jump Into Course Creation</h2>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Create Your Course
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Latest Courses Performance</h2>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-gray-700 font-bold">
                Complete Python Bootcamp: Go from zero to hero in Python 3
              </h3>
              <p className="text-sm text-gray-500">First 2 days 22 hours</p>
              <p className="text-sm text-gray-500">
                View: 1.5k | Purchased: 150 | Total Like: 1k
              </p>
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-blue-500">
              GO TO COURSE ANALYTICS
            </a>
            <br />
            <a href="#" className="text-blue-500">
              SEE COMMENTS (875)
            </a>
            <br />
            <a href="#" className="text-blue-500">
              SEE REVIEWS (105)
            </a>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">News</h2>
          <div className="flex items-center space-x-4">
            <img src="news-image.png" alt="News" className="h-16 w-16" />
            <div>
              <h3 className="text-gray-700 font-bold">
                COVID-19 Updates & Resources
              </h3>
              <p className="text-sm text-gray-500">
                See the latest updates to coronavirus-related content, including
                changes to monetization, and access new Creator support
                resources
              </p>
              <a href="#" className="text-blue-500">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Profile Analytics</h2>
          <p className="text-xl font-bold">Current subscribers</p>
          <p className="text-3xl font-bold mb-4">856</p>
          <p className="text-sm text-gray-500">View: 17k ⬇ 75%</p>
          <p className="text-sm text-gray-500">
            Purchased (per hour): 1 ⬆ 100%
          </p>
          <p className="text-sm text-gray-500">Enroll (per hour): 50 ⬇ 70%</p>
          <a href="#" className="text-blue-500">
            GO TO PROFILE ANALYTICS
          </a>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Submit Courses</h2>
          <p className="text-gray-700 font-bold">
            The Complete JavaScript Course 2020: Build Real Projects!
          </p>
          <p className="text-sm text-red-500">Pending</p>
          <p className="text-sm text-gray-500">Submitted 1 days ago</p>
          <button className="text-red-500">Delete</button>
        </div>
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
};

export default Dashboard;
