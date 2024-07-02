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
  const [sessions, setSessions] = useState<{ name: string; description: string; lessons: { name: string; description: string; lesson_type: string; full_time: number; position_order: number; video_url?: string; image_url?: string }[] }[]>([]);

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
      console.log('Sending course data:', courseData);

      const courseResponse = await api.createCourse(courseData);
      console.log('Course creation response:', courseResponse);
      setCourseId(courseResponse.data._id);

      if (sessions.length > 0) {
        const sessionResponses = await Promise.all(sessions.map(sessionData => {
          console.log('Sending session data:', sessionData);
          return api.createSession({ name: sessionData.name, description: sessionData.description, course_id: courseResponse.data._id });
        }));

        const createdSessions = await Promise.all(sessionResponses.map(async (response, index) => {
          const session = response.data;
          const lessons = sessions[index].lessons;
          const lessonResponses = await Promise.all(lessons.map(lessonData => {
            const lesson = {
              ...lessonData,
              course_id: courseResponse.data._id,
              session_id: session._id,
              video_url: lessonData.video_url || '',
              image_url: lessonData.image_url || '',
            };
            console.log('Sending lesson data:', lesson);
            return api.createLesson(lesson);
          }));
          return { ...session, lessons: lessonResponses.map(res => res.data) };
        }));
        console.log('Sessions created with lessons:', createdSessions);
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
