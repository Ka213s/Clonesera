import React, { useState } from 'react';
import { Modal, Button, Input, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

interface Lesson {
  name: string;
  description: string;
  video_url?: string;
  image_url?: string;
  lesson_type: string;
  full_time: number;
  position_order: number;
}

interface Session {
  name: string;
  description: string;
  lessons: Lesson[];
}

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  courseId: string | null;
  api: any;
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

const Curriculum: React.FC<Props> = ({ nextStep, prevStep, courseId, api, setSessions }) => {
  const [sessionName, setSessionName] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [sessionsToAdd, setSessionsToAdd] = useState<Session[]>([]);
  const [currentSessionIndex, setCurrentSessionIndex] = useState<number | null>(null);

  const [lessonName, setLessonName] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonType, setLessonType] = useState('video');
  const [fullTime, setFullTime] = useState(100);
  const [positionOrder, setPositionOrder] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const [uploadVideoFileList, setUploadVideoFileList] = useState<any[]>([]);
  const [uploadImageFileList, setUploadImageFileList] = useState<any[]>([]);

  const handleUpload = async (info: any, type: 'video' | 'image') => {
    const file = info.fileList[0]?.originFileObj;
    console.log(`Uploading ${type}:`, file);
    if (file) {
      try {
        const storageRef = ref(storage, `${type}s/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        if (type === 'video') {
          setVideoUrl(downloadURL);
          console.log('Video URL:', downloadURL);
        } else {
          setImageUrl(downloadURL);
          console.log('Image URL:', downloadURL);
        }
        message.success(`${file.name} uploaded successfully.`);
      } catch (error) {
        console.error(`Error uploading ${type}:`, error);
        message.error(`Error uploading ${type}.`);
      }
    }
  };

  const addSessionToList = () => {
    console.log('Adding session to list:', { sessionName, sessionDescription, lessons });
    const newSession: Session = { name: sessionName, description: sessionDescription, lessons };
    setSessionsToAdd([...sessionsToAdd, newSession]);
    setLessons([]);
    setSessionName('');
    setSessionDescription('');
    setCurrentSessionIndex(sessionsToAdd.length);
  };

  const addLessonToSession = (sessionIndex: number) => {
    const updatedSessions = [...sessionsToAdd];
    const newLesson: Lesson = { 
      name: lessonName, 
      description: lessonDescription,
      lesson_type: lessonType,
      full_time: fullTime,
      position_order: positionOrder,
      video_url: videoUrl || '',
      image_url: imageUrl || ''
    };
    updatedSessions[sessionIndex].lessons.push(newLesson);
    console.log('Updated sessions after adding lesson:', updatedSessions);
    setSessionsToAdd(updatedSessions);
    setLessonName('');
    setLessonDescription('');
    setLessonType('video');
    setFullTime(100);
    setPositionOrder(1);
    setVideoUrl(undefined);  // Reset video URL
    setImageUrl(undefined);  // Reset image URL
    setUploadVideoFileList([]);
    setUploadImageFileList([]);
    setIsModalVisible(false);
  };

  const saveSessions = () => {
    console.log('Saving sessions:', sessionsToAdd);
    setSessions((prevSessions) => [...prevSessions, ...sessionsToAdd]);
    setSessionsToAdd([]);
    nextStep();
  };

  const showModal = (sessionIndex: number) => {
    console.log('Showing modal for session index:', sessionIndex);
    setLessonName('');
    setLessonDescription('');
    setLessonType('video');
    setFullTime(100);
    setPositionOrder(1);
    setVideoUrl(undefined);  // Reset video URL
    setImageUrl(undefined);  // Reset image URL
    setUploadVideoFileList([]);
    setUploadImageFileList([]);
    setCurrentSessionIndex(sessionIndex);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log('Handling OK, current session index:', currentSessionIndex);
    if (currentSessionIndex !== null) {
      addLessonToSession(currentSessionIndex);
    }
  };

  const handleCancel = () => {
    console.log('Cancelling modal');
    setIsModalVisible(false);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Curriculum</h3>
      <div className="mb-4">
        <p>Here you can add and manage the curriculum of your course.</p>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Session Name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <Input.TextArea
          placeholder="Session Description"
          value={sessionDescription}
          onChange={(e) => setSessionDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <Button type="primary" onClick={addSessionToList} className="mt-2">
          Add Session
        </Button>
      </div>
      <div className="mb-4">
        {sessionsToAdd.map((session, index) => (
          <div key={index} className="mb-2 p-2 border">
            <h4 className="font-semibold">{session.name}</h4>
            <p>{session.description}</p>
            <h5 className="font-semibold mt-2">Lessons</h5>
            {session.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="ml-4 mb-2 p-2 border">
                <h6 className="font-semibold">{lesson.name}</h6>
                <p>{lesson.description}</p>
                {lesson.video_url && <video src={lesson.video_url} controls className="w-full mt-2" />}
                {lesson.image_url && <img src={lesson.image_url} alt="Lesson" className="w-full mt-2" />}
                <p>Type: {lesson.lesson_type}</p>
                <p>Full Time: {lesson.full_time} minutes</p>
                <p>Position Order: {lesson.position_order}</p>
              </div>
            ))}
            <Button type="link" onClick={() => showModal(index)}>
              Add Lesson
            </Button>
          </div>
        ))}
      </div>

      <Modal title="Add Lesson" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Lesson Name">
            <Input
              placeholder="Lesson Name"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Lesson Description">
            <Input.TextArea
              placeholder="Lesson Description"
              value={lessonDescription}
              onChange={(e) => setLessonDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Lesson Type">
            <Input
              placeholder="Lesson Type"
              value={lessonType}
              onChange={(e) => setLessonType(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Full Time (in minutes)">
            <Input
              type="number"
              placeholder="Full Time"
              value={fullTime}
              onChange={(e) => setFullTime(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Position Order">
            <Input
              type="number"
              placeholder="Position Order"
              value={positionOrder}
              onChange={(e) => setPositionOrder(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Upload Video">
            <Upload
              fileList={uploadVideoFileList}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => {
                handleUpload(info, 'video');
                setUploadVideoFileList(info.fileList);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Video</Button>
            </Upload>
            {videoUrl && <video src={videoUrl} controls className="w-full mt-2" />}
          </Form.Item>
          <Form.Item label="Upload Image">
            <Upload
              fileList={uploadImageFileList}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => {
                handleUpload(info, 'image');
                setUploadImageFileList(info.fileList);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imageUrl && <img src={imageUrl} alt="Lesson" className="w-full mt-2" />}
          </Form.Item>
        </Form>
      </Modal>

      <Button type="default" onClick={prevStep} className="mr-2">
        Back
      </Button>
      <Button type="primary" onClick={saveSessions}>
        Next
      </Button>
    </div>
  );
};

export default Curriculum;
