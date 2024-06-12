import React from 'react';

interface Teacher {
  name: string;
  subject: string;
  qualification: string;
  fees: number;
  performance: string;
}

const teachers: Teacher[] = [
  { name: 'Haru', subject: 'Programming', qualification: 'B.Tech', fees: 2700, performance: 'Good' },
  { name: 'Hardy', subject: 'Basic Algorithm', qualification: 'B.E', fees: 1770, performance: 'Good' },
  { name: 'Harry', subject: 'English', qualification: 'B.Tech', fees: 2970, performance: 'Good' },
  // Add more teachers as needed
];

const TeacherDetails: React.FC = () => {
  return (
    <div className="flex-1 bg-white p-5 rounded shadow">
      <h3 className="text-lg font-medium">Teacher Details</h3>
      <table className="w-full mt-3 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Qualification</th>
            <th className="p-2 border">Fees</th>
            <th className="p-2 border">Performance</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="p-2 border">{teacher.name}</td>
              <td className="p-2 border">{teacher.subject}</td>
              <td className="p-2 border">{teacher.qualification}</td>
              <td className="p-2 border">${teacher.fees}</td>
              <td className="p-2 border">{teacher.performance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDetails;
