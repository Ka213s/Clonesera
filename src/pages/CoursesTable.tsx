import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getCourses } from '../services/Api';
import { setGlobalLoadingHandler } from '../services/axiosInstance';

interface Course {
  _id: string;
  name: string;
  status: string;
}

const CoursesTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchCourses = useCallback(
    async (page: number, pageSize: number) => {
      setLoading(true);
      try {
        const searchCondition = { keyword: '', category: '', status: 'new', is_deleted: false };
        const data = await getCourses(searchCondition, page, pageSize);
        setCourses(data.pageData);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Debounce logic implementation
  const debouncedFetchCourses = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (page: number, pageSize: number) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fetchCourses(page, pageSize), 300); // Adjust debounce delay as necessary
    };
  }, [fetchCourses]);

  useEffect(() => {
    setGlobalLoadingHandler(setLoading);
  }, []);

  useEffect(() => {
    debouncedFetchCourses(page, pageSize);
  }, [page, pageSize, debouncedFetchCourses]);

  const columns: ColumnsType<Course> = useMemo(
    () => [
      {
        title: 'Course Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }
    ],
    []
  );

  return (
    <div>
      <Table
        columns={columns}
        dataSource={courses.map(course => ({ ...course, key: course._id }))}
        loading={loading}
        pagination={false}
      />
      <Pagination
        current={page}
        pageSize={pageSize}
        onChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        showSizeChanger
      />
    </div>
  );
};

export default CoursesTable;
