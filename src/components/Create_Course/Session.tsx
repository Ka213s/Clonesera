import React from 'react';

interface Lesson {
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
  lessons: Lesson[];
  _id?: string;
}

interface SessionProps {
  sessions: SessionData[];
  setSessions: React.Dispatch<React.SetStateAction<SessionData[]>>;
  api: any;
  courseId: string | null;
}

const SessionComponent: React.FC<SessionProps> = ({ sessions, setSessions, api, courseId }) => {
  const addSession = () => {
    setSessions([...sessions, { name: '', description: '', lessons: [] }]);
  };

  const saveSession = async (session: SessionData, index: number) => {
    if (!courseId) {
      console.error('Course ID is required to save session.');
      return;
    }

    try {
      const response = await api.createSession({ ...session, course_id: courseId });
      const newSessions = [...sessions];
      newSessions[index]._id = response.data._id;
      setSessions(newSessions);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  return (
    <div>
      <h2>Sessions</h2>
      <button onClick={addSession}>Add Session</button>
      {sessions.map((session, index) => (
        <div key={index}>
          <input type="text" placeholder="Session Name" value={session.name} onChange={(e) => {
            const newSessions = [...sessions];
            newSessions[index].name = e.target.value;
            setSessions(newSessions);
          }} />
          <textarea placeholder="Session Description" value={session.description} onChange={(e) => {
            const newSessions = [...sessions];
            newSessions[index].description = e.target.value;
            setSessions(newSessions);
          }}></textarea>
          <button onClick={() => saveSession(session, index)}>Save Session</button>
        </div>
      ))}
    </div>
  );
};

export default SessionComponent;
