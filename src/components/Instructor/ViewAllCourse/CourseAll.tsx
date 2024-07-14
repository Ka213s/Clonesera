import React, { useState, useEffect } from "react";
import { Table, Button, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
  getCourses,
  getSessions,
  changeCourseStatus,
} from "../../../utils/commonImports";
import SessionAll from "./SessionAll";

const { Option } = Select;

interface Course {
  _id: string;
  name: string;
  status: string;
}

interface Session {
  _id: string;
  name: string;
  course_id: string;
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [view, setView] = useState<"courses" | "sessions">("courses");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses(
      { keyword: "", category: "", status: "", is_deleted: false },
      1,
      10
    );
    setCourses(data.pageData);
  };

  const fetchSessions = async (courseId: string) => {
    const data = await getSessions(
      {
        keyword: "",
        course_id: courseId,
        is_position_order: false,
        is_deleted: false,
      },
      1,
      10
    );
    setSessions(data.pageData);
  };

  const handleChangeStatus = async (courseId: string, newStatus: string) => {
    await changeCourseStatus({ course_id: courseId, new_status: newStatus });
    fetchCourses();
  };

  const courseColumns: ColumnsType<Course> = [
    { title: "Course Name", dataIndex: "name", key: "name" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newStatus) => handleChangeStatus(record._id, newStatus)}
        >
          <Option value="approve">Approve</Option>
          <Option value="reject">Reject</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleViewSessions(record._id)}>
          View Sessions
        </Button>
      ),
    },
  ];

  const handleViewSessions = (courseId: string) => {
    fetchSessions(courseId);
    setView("sessions");
  };

  const handleBackToCourses = () => {
    setView("courses");
  };

  return (
    <div>
      {view === "courses" && (
        <Table columns={courseColumns} dataSource={courses} rowKey="_id" />
      )}
      {view === "sessions" && (
        <SessionAll sessions={sessions} onBack={handleBackToCourses} />
      )}
    </div>
  );
};

export default CourseTable;
