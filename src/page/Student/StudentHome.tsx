// StudentHome.tsx
import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho sinh viên
interface Student {
  id: number;
  name: string;
  age: number;
  major: string;
}

// Dữ liệu mẫu
const studentData: Student[] = [
  { id: 1, name: 'Nguyen Van A', age: 20, major: 'Computer Science' },
  { id: 2, name: 'Tran Thi B', age: 21, major: 'Mathematics' },
  { id: 3, name: 'Le Van C', age: 22, major: 'Physics' },
];

// Trang chi tiết sinh viên
const StudentDetail: React.FC<{ student: Student; onBack: () => void }> = ({ student, onBack }) => {
  return (
    <div>
      <h2>Chi Tiết Sinh Viên</h2>
      <p>ID: {student.id}</p>
      <p>Tên: {student.name}</p>
      <p>Tuổi: {student.age}</p>
      <p>Ngành học: {student.major}</p>
      <button onClick={onBack}>Quay lại</button>
    </div>
  );
};

// Trang chủ sinh viên
const StudentHome: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleBackClick = () => {
    setSelectedStudent(null);
  };

  return (
    <div>
      <h1>Trang Chủ Sinh Viên</h1>
      {selectedStudent ? (
        <StudentDetail student={selectedStudent} onBack={handleBackClick} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Tuổi</th>
              <th>Ngành học</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.id} onClick={() => handleStudentClick(student)}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.major}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentHome;
