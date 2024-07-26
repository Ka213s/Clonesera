import { React, useEffect, useState, useCallback, useMemo, Table, message, Select, Button, Input, Pagination, getCourses, changeCourseStatus, SearchOutlined } from '../../../../utils/commonImports';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import EditButton from './EditCourse';
import DeleteButton from './DeleteCourse';
import { getStatusTag } from '../../../../utils/statusTagUtils'; 

const { Option } = Select;
const { Search } = Input;

interface Course {
  _id: number;
  name: string;
  category_name: string;
  status: string;
  price: number;
  discount: number;
  created_at: string;
}

interface CourseTableProps {
  setSelectedCourseIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const CourseTable: React.FC<CourseTableProps> = ({ setSelectedCourseIds }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchCourses = useCallback(
    async (keyword: string, page: number, pageSize: number) => {
      try {
        const searchCondition = {
          keyword: keyword,
          category: '',
          status: '',
          is_deleted: false,
        };
        const response = await getCourses(searchCondition, page, pageSize);
        setCourses(response.pageData);
        setTotalItems(response.pageInfo.totalItems); // Assuming response contains pageInfo with totalItems
        console.log('Fetched courses:', response.pageData);
      } catch (error) {
        message.error('Error fetching courses');
        console.error('Error fetching courses:', error);
      }
    },
    []
  );

  useEffect(() => {
    fetchCourses(searchKeyword, pageNum, pageSize);
  }, [searchKeyword, pageNum, pageSize, fetchCourses]);

  useEffect(() => {
    setSelectedCourseIds(selectedRowKeys);
    console.log('Selected Row Keys in CourseTable component:', selectedRowKeys);
  }, [selectedRowKeys, setSelectedCourseIds]);

  const handleChangeStatus = async (courseId: number, newStatus: string) => {
    try {
      await changeCourseStatus({ course_id: courseId.toString(), new_status: newStatus });
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === courseId ? { ...course, status: newStatus } : course
        )
      );
      console.log('Changed status of course ID:', courseId, 'to:', newStatus);
    } catch (error) {
      console.error('Error updating course status:', error);
    }
  };

  const renderActions = (record: Course) => {
    const isWaitingApprove = ['new', 'waiting_approve'].includes(record.status);

    return (
      <>
        <EditButton courseId={record._id} />
        <DeleteButton courseId={record._id} />
        {isWaitingApprove ? (
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => message.info('Nhấn vào đây Send to admin để gửi tới admin duyệt')}
          >
            Chờ admin duyệt để kích hoạt
          </Button>
        ) : (
          <Select
            defaultValue={record.status}
            style={{ width: 120, marginLeft: 10 }}
            onChange={(value) => handleChangeStatus(record._id, value)}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        )}
      </>
    );
  };

  const columns: ColumnsType<Course> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Category Name',
        dataIndex: 'category_name',
        key: 'category_name',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: getStatusTag,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price: number) => price.toLocaleString(),
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string) => moment(text).format('DD-MM-YYYY'),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => renderActions(record),
        align: 'center',
      },
    ],
    [renderActions]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys as number[]);
    },
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPageNum(1); // Reset to first page on search
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by course name"
          enterButton={<SearchOutlined />}
          allowClear
          size="large"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={courses}
        rowKey="_id"
        pagination={false}
      />
      <div className="flex justify-end mt-5">
        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={totalItems}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={(page, pageSize) => {
            setPageNum(page);
            setPageSize(pageSize);
            fetchCourses(searchKeyword, page, pageSize);
          }}
          showSizeChanger
        />
      </div>
    </>
  );
};

export default CourseTable;
