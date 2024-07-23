import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { getCourses } from "../../../utils/commonImports";
import moment from "moment";
import { getStatusTag } from "../../../utils/statusTagUtils";
import SearchCourse from "./SearchCourse";

interface Course {
  _id: number;
  name: string;
  category_name: string;
  status: string;
  price: number;
  discount: number;
  created_at: string;
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async (searchKeyword: string = "") => {
    try {
      const searchCondition = {
        keyword: searchKeyword,
        category: "",
        status: "",
        is_deleted: false,
      };
      const pageNum = 1;
      const pageSize = 10;
      const response = await getCourses(searchCondition, pageNum, pageSize);
      setCourses(response.pageData);
    } catch (error) {
      message.error("Error fetching courses");
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (value: string) => {
    fetchCourses(value);
  };

  const columns: ColumnsType<Course> = [
    {
      title: <div className="center-header">Name</div>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <div className="center-header">Category Name</div>,
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: <div className="center-header">Status</div>,
      dataIndex: "status",
      key: "status",
      render: getStatusTag,
    },
    {
      title: <div className="center-header">Price</div>,
      dataIndex: "price",
      key: "price",
    },
    {
      title: <div className="center-header">Discount</div>,
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: <div className="center-header">Created At</div>,
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => moment(text).format("DD-MM-YYYY"),
    },
  ];

  return (
    <div>
      <SearchCourse onSearch={handleSearch} />
      <Table columns={columns} dataSource={courses} rowKey="_id" />
    </div>
  );
};

export default CourseTable;
