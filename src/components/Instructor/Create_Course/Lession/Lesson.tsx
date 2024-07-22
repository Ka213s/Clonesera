import React from 'react';
import CreateLessionButton from './CreateLession';
import DisplayLeesion from './DisplayLeesion';

const LessonComponent: React.FC = () => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <CreateLessionButton />
      </div>
      <DisplayLeesion />
    </div >
  );
};

export default LessonComponent;
