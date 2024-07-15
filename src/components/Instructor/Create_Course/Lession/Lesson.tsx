import React from 'react';
import CreateLessionButton from './CreateLession';
import DisplayLeesion from './DisplayLeesion';

const LessonComponent: React.FC = () => {
  return (
    <div>
    <CreateLessionButton />
    <DisplayLeesion />
    </div >
  );
};

export default LessonComponent;
