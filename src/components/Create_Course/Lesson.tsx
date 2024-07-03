import React from 'react';

interface LessonData {
  name: string;
  description: string;
  lesson_type: string;
  full_time: number;
  position_order: number;
  video_url?: string;
  image_url?: string;
  _id?: string;
}

interface SessionData {
  name: string;
  description: string;
  lessons: LessonData[];
  _id?: string;
}

interface LessonProps {
  sessions: SessionData[];
  setSessions: React.Dispatch<React.SetStateAction<SessionData[]>>;
  api: any;
  courseId: string | null;
}

const LessonComponent: React.FC<LessonProps> = ({ sessions, setSessions, api, courseId }) => {
  const addLesson = (sessionIndex: number) => {
    const newSessions = [...sessions];
    newSessions[sessionIndex].lessons.push({ name: '', description: '', lesson_type: '', full_time: 0, position_order: 0 });
    setSessions(newSessions);
  };

  const saveLesson = async (lesson: LessonData, sessionIndex: number, lessonIndex: number) => {
    if (!courseId || !sessions[sessionIndex]._id) {
      console.error('Course ID and Session ID are required to save lesson.');
      return;
    }

    try {
      const response = await api.createLesson({ ...lesson, course_id: courseId, session_id: sessions[sessionIndex]._id });
      const newSessions = [...sessions];
      newSessions[sessionIndex].lessons[lessonIndex]._id = response.data._id;
      setSessions(newSessions);
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  return (
    <div>
      <h2>Lessons</h2>
      {sessions.map((session, sessionIndex) => (
        <div key={sessionIndex}>
          <h3>{session.name}</h3>
          <button onClick={() => addLesson(sessionIndex)}>Add Lesson</button>
          {session.lessons.map((lesson, lessonIndex) => (
            <div key={lessonIndex}>
              <input type="text" placeholder="Lesson Name" value={lesson.name} onChange={(e) => {
                const newSessions = [...sessions];
                newSessions[sessionIndex].lessons[lessonIndex].name = e.target.value;
                setSessions(newSessions);
              }} />
              <textarea placeholder="Lesson Description" value={lesson.description} onChange={(e) => {
                const newSessions = [...sessions];
                newSessions[sessionIndex].lessons[lessonIndex].description = e.target.value;
                setSessions(newSessions);
              }}></textarea>
              <input type="text" placeholder="Lesson Type" value={lesson.lesson_type} onChange={(e) => {
                const newSessions = [...sessions];
                newSessions[sessionIndex].lessons[lessonIndex].lesson_type = e.target.value;
                setSessions(newSessions);
              }} />
              <input type="number" placeholder="Full Time" value={lesson.full_time} onChange={(e) => {
                const newSessions = [...sessions];
                newSessions[sessionIndex].lessons[lessonIndex].full_time = parseInt(e.target.value);
                setSessions(newSessions);
              }} />
              <input type="number" placeholder="Position Order" value={lesson.position_order} onChange={(e) => {
                const newSessions = [...sessions];
                newSessions[sessionIndex].lessons[lessonIndex].position_order = parseInt(e.target.value);
                setSessions(newSessions);
              }} />
              <button onClick={() => saveLesson(lesson, sessionIndex, lessonIndex)}>Save Lesson</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LessonComponent;
