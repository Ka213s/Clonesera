import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Tag, Modal, Form, Input, Select, message } from "antd";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import { CourseData, AccountData } from "../../services/ApiService";

const { Option } = Select;

interface MyCoursesProps {
  courses: CourseData[];
  accounts: AccountData[];
  showModal: (course?: CourseData) => void;
  softDeleteCourse: (id: string) => void;
  handleOk: () => void;
  handleCancel: () => void;
  formRef: React.RefObject<any>;
  isModalVisible: boolean;
  editingCourse: CourseData | null;
}

const MyCourses: React.FC<MyCoursesProps> = ({
  courses,
  accounts,
  showModal,
  softDeleteCourse,
  handleOk,
  handleCancel,
  formRef,
  isModalVisible,
  editingCourse,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>(courses);
  const courseCategories = [
    "Communications",
    "Software Engineering",
    "Finance",
    "Web Development",
    "Data Science",
  ];

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          prefix={<FaSearch className="text-gray-400"/>}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          style={{backgroundColor: '#9997F5'}}
          className="hover:bg-[#8886E5] text-white px-4 py-2 rounded"
          icon={<FaPlus />}
          onClick={() => showModal()}
        >
          Add Course
        </Button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Item No.</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Title</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Account</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Status</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr className="hover:bg-gray-50" key={course.id}>
              <td className="py-2 px-4 border-b border-gray-200">{course.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{course.title}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                {accounts.find((account) => account.id === course.Account_Id)?.fullName || "N/A"}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <Tag color={course.status ? "green" : "red"}>{course.status ? "Active" : "Inactive"}</Tag>
              </td>
              <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                <Button type="link" icon={<FaEdit />} onClick={() => showModal(course)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this course?"
                  onConfirm={() => softDeleteCourse(course.id)}
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
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form ref={formRef} layout="vertical" initialValues={editingCourse || {}}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the course title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Short Description"
            name="shortDescription"
            rules={[{ required: true, message: "Please input the short description!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Skill Course"
            name="skillCourse"
            rules={[{ required: true, message: "Please input the skill course!" }]}
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
            rules={[{ required: true, message: "Please input the requirements!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Course Category"
            name="courseCategory"
            rules={[{ required: true, message: "Please select the course category!" }]}
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
            rules={[{ required: true, message: "Please select the account!" }]}
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
    </>
  );
};

export default MyCourses;
