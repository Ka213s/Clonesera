import React, { useState } from 'react';

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  courseId: string | null;
  api: any;
}

const Curriculum: React.FC<Props> = ({ nextStep, prevStep, courseId, api }) => {
  const [sessionName, setSessionName] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [sessionsToAdd, setSessionsToAdd] = useState<{ name: string; description: string }[]>([]);
  const [sessions, setSessions] = useState<{ _id: string; name: string; course_id: string; description: string }[]>([]);

  const addSessionToList = () => {
    setSessionsToAdd([...sessionsToAdd, { name: sessionName, description: sessionDescription }]);
    setSessionName('');
    setSessionDescription('');
  };

  const addSessions = async () => {
    if (!courseId) {
      console.error('Course ID is required to create sessions.');
      return;
    }

    try {
      const sessionResponses = await Promise.all(sessionsToAdd.map(sessionData => {
        return api.createSession({ ...sessionData, course_id: courseId });
      }));

      const createdSessions = sessionResponses.map(response => response.data);
      setSessions([...sessions, ...createdSessions]);
      setSessionsToAdd([]);
      console.log('Sessions created:', createdSessions);
    } catch (error) {
      console.error('Error creating sessions:', error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Curriculum</h3>
      <div className="mb-4">
        <p>Here you can add and manage the curriculum of your course.</p>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Session Name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Session Description"
          value={sessionDescription}
          onChange={(e) => setSessionDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="button" onClick={addSessionToList} className="bg-green-500 text-white py-2 px-4 rounded mt-2">
          Add Session
        </button>
      </div>
      <div className="mb-4">
        {sessionsToAdd.map((session, index) => (
          <div key={index} className="mb-2 p-2 border">
            <h4 className="font-semibold">{session.name}</h4>
            <p>{session.description}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        {sessions.map((session, index) => (
          <div key={index} className="mb-2 p-2 border">
            <h4 className="font-semibold">{session.name}</h4>
            <p>{session.description}</p>
          </div>
        ))}
      </div>
      <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
        Back
      </button>
      <button type="button" onClick={addSessions} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
        Add All Sessions
      </button>
      <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded">
        Next
      </button>
    </div>
  );
};

export default Curriculum;