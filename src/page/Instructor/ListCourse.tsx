import React, { Component } from "react";
import { FaBook, FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
} from "antd";
import MainLayout from "../../layouts/MainLayout";
import NavigationTabs from "../../components/Instructor/NavigationTabs";
import { useNavigate } from 'react-router-dom';
import ApiService, { CourseData, AccountData } from "../../services/ApiService";


const { Option } = Select;

interface ListCourseState {
  isModalVisible: boolean;
  editingCourse: CourseData | null;
  courses: CourseData[];
  accounts: AccountData[];
}

class ListCourse extends Component<{}, ListCourseState> {
  formRef = React.createRef<any>();

  state: ListCourseState = {
    isModalVisible: false,
    editingCourse: null,
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
      message.error("Failed to fetch courses.");
    }
  };

  fetchAccounts = async () => {
    try {
      const accounts = await ApiService.getAccounts("2");
      this.setState({ accounts });
    } catch (error) {
      message.error("Failed to fetch accounts.");
    }
  };

  showModal = (course?: CourseData) => {
    if (course) {
      this.setState({
        isModalVisible: true,
        editingCourse: course,
      });
      this.formRef.current?.setFieldsValue(course);
    } else {
      this.setState({
        isModalVisible: true,
        editingCourse: null,
      });
      this.formRef.current?.resetFields();
    }
  };

  handleOk = async () => {
    try {
      const values = await this.formRef.current.validateFields();
      const updatedValues = {
        ...values,
        update_at: new Date().toISOString(),
      };
      if (this.state.editingCourse) {
        await ApiService.updateCourseById(
          this.state.editingCourse.id,
          updatedValues
        );
        message.success("Course updated successfully.");
      } else {
        const newCourse = {
          ...updatedValues,
          id: (this.state.courses.length + 1).toString(),
        };
        this.setState((prevState) => ({
          courses: [...prevState.courses, newCourse],
        }));
        message.success("Course added successfully.");
      }
      this.fetchCourses();
      this.setState({ isModalVisible: false, editingCourse: null });
    } catch (error) {
      message.error("Failed to save course.");
    }
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      editingCourse: null,
    });
  };

  softDeleteCourse = async (id: string) => {
    try {
      await ApiService.softDeleteCourse(id);
      message.success("Course deleted successfully.");
      this.fetchCourses();
    } catch (error) {
      message.error("Failed to delete course.");
    }
  };
  

  render() {
    const { isModalVisible, editingCourse, courses, accounts } = this.state;
    const courseCategories = [
      "Communications",
      "Software Engineering",
      "Finance",
      "Web Development",
      "Data Science",
    ];

    return (
      <MainLayout>
        <div className="bg-white p-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <FaBook className="h-6 w-6 text-gray-700" />
              <h1 className="text-2xl font-bold">Courses</h1>
            </div>
          </div>
          <div className="bg-white p-4 shadow mb-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaBook className="h-6 w-6 text-gray-700" />
              <h2 className="text-xl">Jump Into Course Creation</h2>
            </div>
        
          </div>
          <NavigationTabs />
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Item No.
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Title
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Short Description
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Description
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Skill Course
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Price
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Requirements
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Account
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Status
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr className="hover:bg-gray-50" key={course.id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.shortDescription}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.description}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.skillCourse}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.price}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.requirements}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {accounts.find(
                      (account) => account.id === course.Account_Id
                    )?.fullName || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <Tag color={course.status ? "green" : "red"}>
                      {course.status ? "Active" : "Inactive"}
                    </Tag>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                    <Button
                      type="link"
                      icon={<FaEdit />}
                      onClick={() => this.showModal(course)}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this course?"
                      onConfirm={() => this.softDeleteCourse(course.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" danger icon={<FaTrashAlt />}>
                        Delete
                      </Button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title={editingCourse ? "Edit Course" : "Add Course"}
            visible={isModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="Save"
            cancelText="Cancel"
          >
            <Form
              ref={this.formRef}
              layout="vertical"
              initialValues={editingCourse || {}}
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input the course title!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Short Description"
                name="shortDescription"
                rules={[
                  {
                    required: true,
                    message: "Please input the short description!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label="Skill Course"
                name="skillCourse"
                rules={[
                  { required: true, message: "Please input the skill course!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input the price!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Requirements"
                name="requirements"
                rules={[
                  { required: true, message: "Please input the requirements!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Course Category"
                name="courseCategory"
                rules={[
                  {
                    required: true,
                    message: "Please select the course category!",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Select categories">
                  {courseCategories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Account"
                name="Account_Id"
                rules={[
                  { required: true, message: "Please select the account!" },
                ]}
              >
                <Select placeholder="Select account">
                  {accounts.map((account) => (
                    <Option key={account.id} value={account.id}>
                      {account.fullName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </MainLayout>
    );
  }
}

export default ListCourse;
