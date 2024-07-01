import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';
import BasicInformation from './BasicInformation';
import Curriculum from './Curriculum';
import Media from './Media';
import Price from './Price';
import Publish from './Publish';

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    content: '',
    price: 0,
    requirements: '',
    created_at: '',
    category_id: '',
    video_url: '',
    image_url: '',
    discount: 0,
  });

  const [courseId, setCourseId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<{ name: string; description: string }[]>([]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const publishCourse = async () => {
    try {
      const courseData = {
        name: formData.title,
        category_id: formData.category_id,
        description: formData.description,
        content: formData.content,
        video_url: formData.video_url,
        image_url: formData.image_url,
        price: Number(formData.price),
        discount: Number(formData.discount),
      };
      console.log('Course Data:', courseData);

      const courseResponse = await api.createCourse(courseData);
      
      setCourseId(courseResponse.data._id);

      const sessionResponses = await Promise.all(sessions.map(sessionData => {
        return api.createSession({ ...sessionData, course_id: courseResponse.data._id });
      }));
      
      const createdSessions = sessionResponses.map(response => response.data);
      console.log('Sessions created:', createdSessions);

      if (createdSessions.length > 0) {
        const lessonData = {
          name: 'Lesson One',
          course_id: courseResponse.data._id,
          session_id: createdSessions[0]._id,
          lesson_type: 'video',
          description: '',
          video_url: formData.video_url,
          image_url: formData.image_url,
          full_time: 100,
          position_order: 1,
        };
        console.log('Lesson Data:', lessonData);
        await api.createLesson(lessonData);
      }

      nextStep();
    } catch (error) {
      console.error('Error publishing course:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInformation formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <Curriculum nextStep={nextStep} prevStep={prevStep} courseId={courseId} api={api} setSessions={setSessions} />;
      case 3:
        return <Media formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Price formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Publish prevStep={prevStep} publishCourse={publishCourse} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Create New Course</h2>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex w-full items-center relative ml-20">
            {['BASIC', 'CURRICULUM', 'MEDIA', 'PRICE', 'PUBLISH'].map((label, index) => (
              <div key={index} className="flex items-center w-full">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${index < step ? 'bg-[#9997F5]' : 'bg-gray-300'}`}>
                    <span className="text-white font-semibold">{index + 1}</span>
                  </div>
                  <span className={`mt-2 text-sm font-medium ${index === step - 1 ? 'text-[#9997F5]' : ''}`}>{label}</span>
                </div>
                {index < 4 && (
                  <div className="flex-grow h-10 flex items-center relative mb-5 mx-4">
                    <div className={`h-1 w-full ${index < step - 1 ? 'bg-[#9997F5]' : 'bg-gray-300'}`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default CreateCourse;
