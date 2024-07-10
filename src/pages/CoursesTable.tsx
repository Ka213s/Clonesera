import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getCourses } from '../services/Api';

interface Course {
  _id: string;
  name: string;
  status: string;
}

const CoursesTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = useCallback(
    async (page: number, pageSize: number) => {
      setIsLoading(true); // Start loading
      try {
        const searchCondition = { keyword: '', category: '', status: 'new', is_deleted: false };
        const data = await getCourses(searchCondition, page, pageSize);
        setCourses(data.pageData);
      } finally {
        setIsLoading(false); // End loading
      }
    },
    []
  );

  const debouncedFetchCourses = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (page: number, pageSize: number) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fetchCourses(page, pageSize), 300);
    };
  }, [fetchCourses]);

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
      {!isLoading && (
        <Table
          columns={columns}
          dataSource={courses.map(course => ({ ...course, key: course._id }))}
          pagination={false}
          locale={{ emptyText: 'No Data' }}
        />
      )}
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
