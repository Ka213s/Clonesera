import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getCourses, getCourseLogs } from "../../../utils/commonImports";
import { getStatusTag } from "../../../utils/statusTagUtils";
import SearchCourse from "../ViewAllCourse/SearchCourse";

interface Course {
  _id: string;
  name: string;
  category: string;
  status: string;
  is_deleted: boolean;
}

interface Log {
  _id: string;
  course_id: string;
  old_status: string;
  new_status: string;
  comment: string;
}

const LogCourse: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    fetchCoursesAndLogs();
  }, []);

  const fetchCoursesAndLogs = async () => {
    try {
      const coursesData = await getCourses(
        { keyword, category: "", status: "", is_deleted: false },
        1,
        10
      );

      if (coursesData && coursesData.pageData) {
        setCourses(coursesData.pageData);
        const courseIds: string[] = coursesData.pageData.map(
          (course: Course) => course._id
        );
        const logsDataPromises = courseIds.map((courseId: string) =>
          getCourseLogs({
            searchCondition: { course_id: courseId },
            pageInfo: { pageNum: 1, pageSize: 10 },
          })
        );

        const logsDataArray = await Promise.all(logsDataPromises);
        const allLogs = logsDataArray.flatMap((logData) => logData.pageData);
        setLogs(allLogs);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCourseName = (courseId: string) => {
    const course = courses.find((course) => course._id === courseId);
    return course ? course.name : "Unknown";
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_id",
      key: "course_id",
      render: (text: string) => getCourseName(text),
    },
    {
      title: "Old Status",
      dataIndex: "old_status",
      key: "old_status",
      render: (text: string) => getStatusTag(text),
    },
    {
      title: "New Status",
      dataIndex: "new_status",
      key: "new_status",
      render: (text: string) => getStatusTag(text),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
  ];

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  return (
    <div>
      <SearchCourse onSearch={handleSearch} />
      <Table columns={columns} dataSource={logs} rowKey="_id" />
    </div>
  );
};

export default LogCourse;
