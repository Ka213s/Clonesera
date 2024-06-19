import React, { Component } from 'react';
import { FaBook } from 'react-icons/fa';
import { Button, message, Tag } from 'antd';
import { Link } from 'react-router-dom';
import ApiService, { CourseData, AccountData } from '../../services/ApiService';

interface MyLessonState {
  courses: CourseData[];
  accounts: AccountData[];
}

class MyLesson extends Component<{}, MyLessonState> {
  state: MyLessonState = {
    courses: [],
    accounts: [],
  };

  componentDidMount() {
    this.fetchCourses();
    this.fetchAccounts();
  }

  fetchCourses = async () => {
    try {
      const courses = await ApiService.getCourses();
      this.setState({ courses });
    } catch (error) {
      message.error('Failed to fetch courses.');
    }
  };

  fetchAccounts = async () => {
    try {
      const accounts = await ApiService.getAccounts('2');
      this.setState({ accounts });
    } catch (error) {
      message.error('Failed to fetch accounts.');
    }
  };

  render() {
    const { courses, accounts } = this.state;

    return (
      <div className="bg-white p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <FaBook className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-bold">My Lessons</h1>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Item No.</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Title</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Short Description</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Description</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Skill Course</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Price</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Requirements</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Account</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Status</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr className="hover:bg-gray-50" key={course.id}>
                <td className="py-2 px-4 border-b border-gray-200">{course.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.shortDescription}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.description}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.skillCourse}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.price}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.requirements}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {accounts.find((account) => account.id === course.Account_Id)?.fullName || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Tag color={course.status ? 'green' : 'red'}>
                    {course.status ? 'Active' : 'Inactive'}
                  </Tag>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                  <Link to={`/course-details/${course.id}`}>
                    <Button type="link">View Details</Button>
                  </Link>
                  <Button type="link" onClick={() => window.open(course.certificateUrl, '_blank')}>
                    View Certificate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyLesson;
