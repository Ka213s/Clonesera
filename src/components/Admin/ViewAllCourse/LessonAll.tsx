import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { getLessons } from '../../../utils/commonImports';
import moment from 'moment';
interface Lesson {
  _id: string;
  name: string;
  course_id: string;
  video_url?: string;
  image_url?: string;
}

interface SearchCondition {
  keyword: string;
  course_id: string;
  session_id: string;
  lesson_type: string;
  is_position_order: boolean;
  is_deleted: boolean;
}

const DisplayLesson: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const fetchLessons = async () => {
    try {
      const searchCondition: SearchCondition = {
        keyword: '',
        course_id: '',
        session_id: '',
        lesson_type: '',
        is_position_order: false,
        is_deleted: false,
      };
      const pageNum = 1;
      const pageSize = 10;

      const data = await getLessons(searchCondition, pageNum, pageSize);
      setLessons(data.pageData); 
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };
  const formatFullTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };
  const renderMedia = (record: Lesson) => {
    if (record.video_url) {
      return (
        <div className="flex justify-center items-center ">
          <video width="200" controls className='rounded-md'>
            <source src={record.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (record.image_url) {
      return (
        <div className="flex justify-center items-center ">
          <img src={record.image_url} alt="lesson media" width="200" className='rounded-md'/>
        </div>
      );
    }
    return null;
  };
  useEffect(() => {
    fetchLessons();
  }, []);

  const columns: TableColumnsType<Lesson> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
     
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
   
    },
    {
      title: 'Type',
      dataIndex: 'lesson_type',
      key: 'lesson_type',
    
    },
    {
      title: 'Full Time',
      dataIndex: 'full_time',
      key: 'full_time',
      render: (value: number) => formatFullTime(value),
     
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => moment(text).format('DD-MM-YYYY'),
    
    },
    {
      title: 'Media',
      key: 'media',
      render: (_, record: Lesson) => renderMedia(record),
      align: 'center',
    },
  ];

  return (
    <Table
      dataSource={lessons}
      columns={columns}
      rowKey="_id"
    />
  );
};

export default DisplayLesson;
