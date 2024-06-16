import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaChevronLeft } from 'react-icons/fa';

interface Lecture {
  id: number;
  title: string;
  type: 'video' | 'quiz';
  url?: string;
  description?: string;
  questions?: Question[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Section {
  id: number;
  title: string;
  lectures: Lecture[];
}

const sections: Section[] = [
  {
    id: 1,
    title: 'Section 1',
    lectures: [
      { id: 1, title: 'Lecture 1', type: 'video', url: 'https://example.com/video1.mp4', description: 'Description for Lecture 1' },
      {
        id: 2, title: 'Quiz 1', type: 'quiz', questions: [
          {
            id: 1,
            question: "What is the capital of France?",
            options: ["Paris", "London", "Rome", "Berlin"],
            correctAnswer: 0
          }
        ]
      },
    ],
  },
  {
    id: 2,
    title: 'Section 2',
    lectures: [
      { id: 3, title: 'Lecture 2', type: 'video', url: 'https://example.com/video2.mp4', description: 'Description for Lecture 2' },
      {
        id: 4, title: 'Quiz 2', type: 'quiz', questions: [
          {
            id: 3,
            question: "Which is the largest planet in the solar system?",
            options: ["Mars", "Venus", "Earth", "Jupiter"],
            correctAnswer: 3
          }
        ]
      },
    ],
  }
];

const EnrollCourse: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<{ [key: number]: number | null }>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  useEffect(() => {
    const initialSection = sections[0];
    const initialLecture = initialSection.lectures[0];
    setSelectedLecture(initialLecture);
    setExpandedSections([initialSection.id]);
    setSelectedSectionIndex(0);
    setSelectedLectureIndex(0);
  }, []);

  const toggleSection = (sectionId: number) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const handleQuizAnswerSelection = (questionId: number, optionIndex: number) => {
    setSelectedOptionIndex(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (selectedLecture && selectedLecture.questions) {
      let correctCount = 0;
      selectedLecture.questions.forEach((question) => {
        if (selectedOptionIndex[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });
      setQuizResult(`You got ${correctCount} out of ${selectedLecture.questions.length} correct.`);
    }
  };

  const handleNextLecture = () => {
    const currentSection = sections[selectedSectionIndex];
    const nextLectureIndex = selectedLectureIndex + 1;
    if (nextLectureIndex < currentSection.lectures.length) {
      const nextLecture = currentSection.lectures[nextLectureIndex];
      setSelectedLecture(nextLecture);
      setSelectedLectureIndex(nextLectureIndex);
      setQuizResult(null);
      setSelectedOptionIndex({});
    }
  };

  const handlePreviousLecture = () => {
    const currentSection = sections[selectedSectionIndex];
    const prevLectureIndex = selectedLectureIndex - 1;
    if (prevLectureIndex >= 0) {
      const prevLecture = currentSection.lectures[prevLectureIndex];
      setSelectedLecture(prevLecture);
      setSelectedLectureIndex(prevLectureIndex);
      setQuizResult(null);
      setSelectedOptionIndex({});
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/3 p-6 bg-white shadow-lg relative overflow-y-auto">
        {selectedLecture ? (
          <div className="w-full h-full flex flex-col items-center">
            <div className="absolute top-4 left-4 flex items-center">
              <button
                onClick={goBack}
                className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-400 focus:outline-none"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              <span className="ml-4 text-xl font-semibold text-gray-700">
                Course Title
              </span>
            </div>
            {selectedLecture.type === 'video' ? (
              <>
                <video src={selectedLecture.url} controls className="w-4/5 h-2/3 rounded-lg shadow-md mt-12">
                  Your browser does not support the video tag.
                </video>
                <div className="mt-4 text-left w-4/5">
                  <h3 className="text-2xl font-semibold">{selectedLecture.title}</h3>
                  <p className="mt-2 text-gray-600">{selectedLecture.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className="mt-20 text-left w-full px-4">
                  {selectedLecture.questions ? (
                    <>
                      {selectedLecture.questions.map((question) => (
                        <div key={question.id} className="mb-6">
                          <h3 className="text-1xl font-semibold">{question.question}</h3>
                          <div className="mt-4 space-y-2">
                            {question.options.map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center cursor-pointer p-3 bg-white"
                              >
                                <input
                                  type="radio"
                                  name={`quizOption-${question.id}`}
                                  value={index}
                                  checked={selectedOptionIndex[question.id] === index}
                                  onChange={() => handleQuizAnswerSelection(question.id, index)}
                                  className="mr-2"
                                />
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={handleSubmitQuiz}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400"
                      >
                        Submit
                      </button>
                      {quizResult && (
                        <div className="mt-4 text-green-600">
                          {quizResult}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <h2>No quiz available for this lecture.</h2>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <h2>Please select a lecture to watch the video or take a quiz.</h2>
          </div>
        )}
      </div>
      <div className="w-1/3 p-6 overflow-y-auto bg-gray-50 shadow-inner">
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full text-left bg-blue-500 text-white p-3 rounded-lg shadow-md">
              {section.title}
            </button>
            {expandedSections.includes(section.id) && (
              <div className="pl-4 mt-2 space-y-2">
                {section.lectures.map((lecture, lectureIndex) => (
                  <div
                    key={lecture.id}
                    onClick={() => {
                      setSelectedLecture(lecture);
                      setSelectedSectionIndex(sectionIndex);
                      setSelectedLectureIndex(lectureIndex);
                      setQuizResult(null);
                      setSelectedOptionIndex({});
                    }}
                    className="cursor-pointer p-3 bg-white hover:bg-gray-200 rounded-lg shadow-md flex items-center">
                    <FaPlayCircle className="mr-3 text-blue-500" />
                    {lecture.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full bg-gray-300 p-3 flex justify-center space-x-2 items-center">
        <button
          onClick={handlePreviousLecture}
          disabled={selectedLectureIndex === 0}
          className="bg-blue-500 text-white px-2 py-2 rounded-md shadow-md hover:bg-blue-400 disabled:opacity-50"
        >
          Previous Lesson
        </button>
        <button
          onClick={handleNextLecture}
          disabled={selectedLectureIndex === sections[selectedSectionIndex].lectures.length - 1}
          className="bg-blue-500 text-white px-2 py-2 rounded-md shadow-md hover:bg-blue-400 disabled:opacity-50"
        >
          Next Lesson
        </button>
      </div>
    </div>
  );
};

export default EnrollCourse;
