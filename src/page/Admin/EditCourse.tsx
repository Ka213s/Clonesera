import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, InputNumber, message } from 'antd';
import moment from 'moment';

const coursesData = [
    {
      id: 1,
      title: 'Master Your Personal Brand Like a Marketing',
      instructor: 'Darlene Robertson',
      rating: 5.0,
      students: 26,
      lessons: 12,
      startDate: '01-01-23',
      price: '$49.00',
      image: '/images/course-image-1.png',
      description: 'Detailed description of the course goes here...',
      videoUrl: '/videos/water_cycle.mp4',
      playlists: [
        { id: 1, title: 'Introduction', duration: '10:00', imageUrl: '/images/Artwork.jpg' },
        { id: 2, title: 'Chapter 1', duration: '20:00', imageUrl: '/images/Artwork.jpg' },
      ],
      details: `Learning programming is hard. Especially in the beginning. Don't waste your time going at it alone. 
                As my mentee Chris put it. The sessions with Jascha have been more valuable than eight weeks of my professor's lectures. 
                It's money much better spent!`,
      certification: `Learning programming is hard. Especially in the beginning. Don't waste your time going at it alone. 
                      As my mentee Chris put it. The sessions with Jascha have been more valuable than eight weeks of my professor's lectures. 
                      It's money much better spent!`,
      learningOutcomes: [
        'You will be able to program in Python professionally',
        'Create a portfolio of 100 Python projects',
        'Be able to use Python for data science and machine learning',
        'Build GUIs and Desktop applications with Python',
        'Be able to build fully fledged websites and web apps with Python',
      ],
    },
    // ... other courses
  ];

const EditCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
  
    const course = coursesData.find(course => course.id === Number(id));
  
    const [formData, setFormData] = useState(course || {
      title: '',
      instructor: '',
      rating: 0,
      students: 0,
      lessons: 0,
      startDate: '',
      price: '',
      description: '',
      videoUrl: '',
      playlists: [],
      details: '',
      certification: '',
      learningOutcomes: [],
    });
  
    if (!course) {
      return <div className="text-center text-red-500">Course not found</div>;
    }
  
    const handleInputChange = (changedValues: any) => {
      if (changedValues.learningOutcomes) {
        changedValues.learningOutcomes = changedValues.learningOutcomes.split('\n');
      }
      setFormData((prevData) => ({ ...prevData, ...changedValues }));
    };
  
    const handleSave = () => {
      // Save the updated course data
      console.log('Updated course data:', formData);
      message.success('Course details updated successfully!');
      navigate(`/course/${id}`); // Navigate back to course detail page after saving
    };
  
    return (
      <div className="pt-10 px-6 lg:px-32">
        <h1 className="text-2xl font-semibold mb-6">Edit Course Details</h1>
        <Form
          layout="vertical"
          initialValues={{
            ...formData,
            startDate: formData.startDate ? moment(formData.startDate, 'DD-MM-YY') : null,
            learningOutcomes: formData.learningOutcomes.join('\n')
          }}
          onValuesChange={(_, changedValues) => handleInputChange(changedValues)}
          onFinish={handleSave}
          className="space-y-6"
        >
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
            <Input className="w-full" />
          </Form.Item>
          <Form.Item label="Instructor" name="instructor" rules={[{ required: true, message: 'Please enter the instructor' }]}>
            <Input className="w-full" />
          </Form.Item>
          <Form.Item label="Rating" name="rating" rules={[{ required: true, message: 'Please enter the rating' }]}>
            <InputNumber min={0} max={5} className="w-full" />
          </Form.Item>
          <Form.Item label="Students" name="students" rules={[{ required: true, message: 'Please enter the number of students' }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="Lessons" name="lessons" rules={[{ required: true, message: 'Please enter the number of lessons' }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please select the start date' }]}>
            <DatePicker format="DD-MM-YY" className="w-full" />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
            <Input className="w-full" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} className="w-full" />
          </Form.Item>
          <Form.Item label="Video URL" name="videoUrl">
            <Input className="w-full" />
          </Form.Item>
          <Form.Item label="Details" name="details">
            <Input.TextArea rows={4} className="w-full" />
          </Form.Item>
          <Form.Item label="Certification" name="certification">
            <Input.TextArea rows={4} className="w-full" />
          </Form.Item>
          <Form.Item label="Learning Outcomes" name="learningOutcomes">
            <Input.TextArea rows={4} className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full md:w-auto">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
};

export default EditCourse;
