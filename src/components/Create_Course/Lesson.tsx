// Lesson.tsx
import React from 'react';

const LessonComponent: React.FC = () => {
  return (
    <div>
      <h2>Lesson Information</h2>
      <form>
        <label>
          Lesson Title:
          <input type="text" name="lessonTitle" />
        </label>
        <br />
        <label>
          Lesson Content:
          <textarea name="lessonContent"></textarea>
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default LessonComponent;
