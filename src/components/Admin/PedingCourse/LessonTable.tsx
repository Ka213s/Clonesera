import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

interface Lesson {
  _id: string;
  name: string;
  course_name: string;
  lesson_type: string;
  full_time: number;
  created_at: string;
  video_url?: string;
  image_url?: string;
}

interface LessonTableProps {
  lessons: Lesson[];
}

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

const LessonTable: React.FC<LessonTableProps> = ({ lessons }) => {
  const lessonColumns: ColumnsType<Lesson> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' },
    { title: 'Type', dataIndex: 'lesson_type', key: 'lesson_type' },
    { title: 'Full Time', dataIndex: 'full_time', key: 'full_time', render: (value: number) => formatFullTime(value) },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text: string) => moment(text).format('DD-MM-YYYY') },
    {
      title: 'Media',
      key: 'media',
      render: (_, record: Lesson) => renderMedia(record),
      align: 'center',
    },
  ];

  return (
    <Table
      columns={lessonColumns}
      dataSource={lessons}
      rowKey="_id"
    />
  );
};

export default LessonTable;
