import React, { useEffect, useState } from 'react';
import { Tag, Skeleton, Rate, Button, Input, Pagination } from 'antd';
import { LeftOutlined, RightOutlined, ReloadOutlined } from '@ant-design/icons';
import { NT_getPublicCourses, NT_getCategoriesClient } from '../../utils/commonImports';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

interface Course {
  _id: number;
  name: string;
  category_name: string;
  category_id: string;
  instructor_name: string;
  description: string;
  image_url: string;
  price_paid: number;
  lesson_count: number;
  session_count: number;
  full_time: number;
  average_rating: number;
}

interface Category {
  _id: string;
  name: string;
}

interface ApiResponse<T> {
  pageData: T[];
  pageInfo: {
    pageNum: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

const AllCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const [categoriesTotalPages, setCategoriesTotalPages] = useState(1);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const categoriesPerPage = 5;
  const navigate = useNavigate();

  const fetchCategories = async (pageNum: number) => {
    try {
      const data = {
        searchCondition: {
          keyword: '',
          is_delete: false,
        },
        pageInfo: {
          pageNum,
          pageSize: categoriesPerPage,
        },
      };
      const response: ApiResponse<Category> = await NT_getCategoriesClient(data);
      setCategories(response.pageData);
      setCategoriesTotalPages(response.pageInfo.totalPages);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCourses = async (keyword: string, categoryId: string | null, pageNum: number, pageSize: number) => {
    try {
      const data = {
        searchCondition: {
          keyword,
          category_id: categoryId || '',
          is_deleted: false,
        },
        pageInfo: {
          pageNum,
          pageSize,
        },
      };
      const response: ApiResponse<Course> = await NT_getPublicCourses(data);
      setCourses(response.pageData);
      setTotalItems(response.pageInfo.totalItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    fetchCategories(categoriesPage);
  }, [categoriesPage]);

  useEffect(() => {
    fetchCourses(searchKeyword, selectedCategory, currentPage, pageSize);
  }, [selectedCategory, searchKeyword, currentPage, pageSize]);

  const handleViewDetails = (courseId: number) => navigate(`/course-detail/${courseId}`);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSearchKeyword('');
    setCurrentPage(1);
    fetchCourses('', null, 1, pageSize);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleCategoriesPageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && categoriesPage > 1) {
      setCategoriesPage(categoriesPage - 1);
    } else if (direction === 'next' && categoriesPage < categoriesTotalPages) {
      setCategoriesPage(categoriesPage + 1);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-left mb-6">All Courses</h2>
      <div className="flex justify-start items-center mb-4 space-x-2">
        <Search
          placeholder="Search courses"
          enterButton
          onSearch={handleSearch}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ width: 300 }}
        />
        <Button icon={<ReloadOutlined />} onClick={resetFilters} />
        <Button
          icon={<LeftOutlined />}
          onClick={() => handleCategoriesPageChange('prev')}
          disabled={categoriesPage === 1}
        />
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category._id}
              type={selectedCategory === category._id ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(category._id)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <Button
          icon={<RightOutlined />}
          onClick={() => handleCategoriesPageChange('next')}
          disabled={categoriesPage === categoriesTotalPages}
        />
      </div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: pageSize }).map((_, index) => (
            <Skeleton key={index} active paragraph={{ rows: 5 }} />
          ))
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-2xl"
              style={{ height: '360px', width: '340px' }} // Updated dimensions
            >
              <img
                src={course.image_url}
                alt={course.name}
                className="w-full h-40 object-cover" // Adjusted height for image
              />
              <div className="flex items-center mt-2 space-x-2 ml-2">
                <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                  <span className="text-gray-500 text-sm">{course.session_count} Session</span>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                  <span className="text-gray-500 text-sm">{course.lesson_count} Lessons</span>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                  <span className="text-gray-500 text-sm">
                    {course.full_time > 0
                      ? `${Math.floor(course.full_time / 60)}h ${course.full_time % 60}m`
                      : '0h 0m'}
                  </span>
                </div>
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mt-1 h-10 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {course.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <Tag color="blue">
                    {course.category_name || 'Default Category'}
                  </Tag>
                </p>
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-700">
                    <strong>{course.instructor_name}</strong>
                  </p>
                </div>
                <Rate disabled defaultValue={course.average_rating} allowHalf style={{ fontSize: 16 }} />
                <div className="flex items-center justify-between mt-auto mb-2">
                  <div className="text-lg font-semibold text-green-600">
                    <span className="text-xl">
                      {course.price_paid === 0 ? 'Free' : `$${course.price_paid}`}
                    </span>
                    <span className="text-sm text-gray-500 ml-2"></span>
                  </div>
                  <button
                    onClick={() => handleViewDetails(course._id)}
                    className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end items-center mt-6">
      <div className="text-right ml-4">
          Total Courses: {totalItems}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
        />
      
      </div>
    </div>
  );
};

export default AllCourse;
