import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, Select } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { getCourses, getCourseDetail, changeCourseStatus } from '../../../utils/commonImports';

const { Option } = Select;

interface Course {
  _id: string;
  name: string;
  sessions?: Session[];
}

interface Session {
  _id: string;
  name: string;
  lesson_list?: Lesson[];
}

interface Lesson {
  _id: string;
  name: string;
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses({ keyword: '', category: '', status: '', is_deleted: false }, 1, 10);
    const coursesWithDetails = await Promise.all(data.pageData.map(async (course: Course) => {
      const courseDetail = await fetchCourseDetail(course._id);
      return { ...course, sessions: courseDetail.session_list };
    }));
    setCourses(coursesWithDetails);
  };

  const fetchCourseDetail = async (courseId: string) => {
    const data = await getCourseDetail(courseId);
    return data;
  };

  const showChangeStatusModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    await changeCourseStatus({ course_id: selectedCourseId!, new_status: values.new_status, comment: values.comment });
    setIsModalVisible(false);
    form.resetFields();
    fetchCourses(); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const courseColumns: ColumnsType<Course> = [
    { title: 'Course Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => showChangeStatusModal(record._id)}>
          Change Status
        </Button>
      ),
    },
  ];

  const sessionColumns: ColumnsType<Session> = [
    { title: 'Session Name', dataIndex: 'name', key: 'name' },
  ];

  const lessonColumns: ColumnsType<Lesson> = [
    { title: 'Lesson Name', dataIndex: 'name', key: 'name' },
  ];

  const expandedRowRender = (course: Course) => (
    <Table
      columns={sessionColumns}
      dataSource={course.sessions}
      rowKey="_id"
      expandable={{
        expandedRowRender: session => (
          <Table
            columns={lessonColumns}
            dataSource={session.lesson_list}
            rowKey="_id"
            pagination={false}
          />
        ),
      }}
      pagination={false}
    />
  );

  return (
    <>
      <Table
        columns={courseColumns}
        dataSource={courses}
        rowKey="_id"
        expandable={{ expandedRowRender }}
      />
      <Modal
        title="Change Course Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="new_status"
            label="New Status"
            rules={[{ required: true, message: 'Please select the new status!' }]}
          >
            <Select>
              <Option value="approve">Approve</Option>
              <Option value="reject">Reject</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: 'Please input a comment!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CourseTable;
