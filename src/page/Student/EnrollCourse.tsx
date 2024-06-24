import React, { useState, useEffect, useRef } from 'react';
import { FaPlayCircle, FaChevronLeft, FaCheckCircle } from 'react-icons/fa';

interface Lecture {
  id: number;
  title: string;
  type: 'video' | 'quiz';
  url?: string;
  description?: string;
  questions?: Question[];
  isCompleted: boolean;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswers: number[];
  type: 'single' | 'multiple';
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
      { id: 1, title: 'Lecture 1', type: 'video', url: 'https://videos.pexels.com/video-files/9788794/9788794-hd_1366_720_25fps.mp4', description: 'Description for Lecture 1', isCompleted: false },
      {
        id: 2, title: 'Quiz 1', type: 'quiz', isCompleted: false, questions: [
          {
            id: 1,
            question: "What is the capital of France?",
            options: ["Paris", "London", "Rome", "Berlin"],
            correctAnswers: [0],
            type: 'single'
          }
        ]
      },
    ],
  },
  {
    id: 2,
    title: 'Section 2',
    lectures: [
      { id: 3, title: 'Lecture 2', type: 'video', url: 'https://videos.pexels.com/video-files/9788794/9788794-hd_1366_720_25fps.mp4', description: 'Description for Lecture 2', isCompleted: false },
      {
        id: 4, title: 'Quiz 2', type: 'quiz', isCompleted: false, questions: [
          {
            id: 3,
            question: "Which are the largest planets in the solar system?",
            options: ["Mars", "Venus", "Earth", "Jupiter"],
            correctAnswers: [2, 3],
            type: 'multiple'
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
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number[] }>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const completedLectures = JSON.parse(localStorage.getItem('completedLectures') || '{}');
    sections.forEach(section => {
      section.lectures.forEach(lecture => {
        if (completedLectures[lecture.id]) {
          lecture.isCompleted = true;
        }
      });
    });

    const initialSection = sections[0];
    const initialLecture = initialSection.lectures[0];
    setSelectedLecture(initialLecture);
    setExpandedSections([initialSection.id]);
    setSelectedSectionIndex(0);
    setSelectedLectureIndex(0);
  }, []);

  useEffect(() => {
    if (selectedLecture && selectedLecture.type === 'video' && videoRef.current) {
      const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video) {
          const watchedPercentage = (video.currentTime / video.duration) * 100;
          if (watchedPercentage >= 80 && !selectedLecture.isCompleted) {
            markLectureAsCompleted(selectedLecture.id);
          }
        }
      };

      const video = videoRef.current;
      video?.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [selectedLecture]);

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

  const handleQuizAnswerSelection = (questionId: number, optionIndex: number, isMultiple: boolean) => {
    setSelectedOptions(prev => {
      const currentSelections = prev[questionId] || [];
      if (isMultiple) {
        // Toggle option selection for multiple choice questions
        if (currentSelections.includes(optionIndex)) {
          return { ...prev, [questionId]: currentSelections.filter(index => index !== optionIndex) };
        } else {
          return { ...prev, [questionId]: [...currentSelections, optionIndex] };
        }
      } else {
        // Single choice questions
        return { ...prev, [questionId]: [optionIndex] };
      }
    });
  };

  const handleSubmitQuiz = () => {
    if (selectedLecture && selectedLecture.questions) {
      let correctCount = 0;
      selectedLecture.questions.forEach((question) => {
        const selectedAnswers = selectedOptions[question.id] || [];
        if (selectedAnswers.length === question.correctAnswers.length && selectedAnswers.every((answer, idx) => answer === question.correctAnswers[idx])) {
          correctCount++;
        }
      });
      setQuizResult(`You got ${correctCount} out of ${selectedLecture.questions.length} correct.`);
      markLectureAsCompleted(selectedLecture.id);
    }
  };

  const markLectureAsCompleted = (lectureId: number) => {
    const completedLectures = JSON.parse(localStorage.getItem('completedLectures') || '{}');
    completedLectures[lectureId] = true;
    localStorage.setItem('completedLectures', JSON.stringify(completedLectures));

    sections.forEach(section => {
      section.lectures.forEach(lecture => {
        if (lecture.id === lectureId) {
          lecture.isCompleted = true;
        }
      });
    });

    setSelectedLecture((prev) => prev ? { ...prev, isCompleted: true } : prev);
  };

  const handleNextLecture = () => {
    if (selectedLecture && selectedLecture.isCompleted) {
      const currentSection = sections[selectedSectionIndex];
      const nextLectureIndex = selectedLectureIndex + 1;

      // Check if we are at the last lecture of the current section
      if (nextLectureIndex < currentSection.lectures.length) {
        // Move to the next lecture within the same section
        const nextLecture = currentSection.lectures[nextLectureIndex];
        setSelectedLecture(nextLecture);
        setSelectedLectureIndex(nextLectureIndex);
      } else {
        // Check if there's another section to move to
        const nextSectionIndex = selectedSectionIndex + 1;
        if (nextSectionIndex < sections.length) {
          // Move to the first lecture of the next section
          const nextSection = sections[nextSectionIndex];
          const nextLecture = nextSection.lectures[0];
          setSelectedLecture(nextLecture);
          setSelectedSectionIndex(nextSectionIndex);
          setSelectedLectureIndex(0);
        }
      }
      setQuizResult(null);
      setSelectedOptions({});
    }
  };

  const handlePreviousLecture = () => {
    const prevLectureIndex = selectedLectureIndex - 1;

    if (prevLectureIndex >= 0) {
      // Move to the previous lecture within the same section
      const prevLecture = sections[selectedSectionIndex].lectures[prevLectureIndex];
      setSelectedLecture(prevLecture);
      setSelectedLectureIndex(prevLectureIndex);
    } else {
      // Check if there's a previous section to move to
      const prevSectionIndex = selectedSectionIndex - 1;
      if (prevSectionIndex >= 0) {
        const prevSection = sections[prevSectionIndex];
        const prevLecture = prevSection.lectures[prevSection.lectures.length - 1];
        setSelectedLecture(prevLecture);
        setSelectedSectionIndex(prevSectionIndex);
        setSelectedLectureIndex(prevSection.lectures.length - 1);
      }
    }
    setQuizResult(null);
    setSelectedOptions({});
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/3 p-6 bg-white shadow-lg relative overflow-y-auto">
        {selectedLecture ? (
          <div className="w-full h-full flex flex-col items-center">
            <div className="absolute top-4 left-4 flex items-center">
              <button
                onClick={goBack}
                className="p-2 bg-[#9997F5] hover:bg-[#8886E5] text-white rounded-full shadow-md focus:outline-none"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              <span className="ml-4 text-xl font-semibold text-gray-800">
                Course Title
              </span>
            </div>
            {selectedLecture.type === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  src={selectedLecture.url}
                  controls
                  className="w-full h-96 mt-20 rounded-lg shadow-md"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="mt-4 text-left w-4/5">
                  <h3 className="text-2xl font-semibold text-gray-800">{selectedLecture.title}</h3>
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
                          <h3 className="text-xl font-semibold text-gray-800">{question.question}</h3>
                          <div className="mt-4 space-y-2">
                            {question.options.map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center cursor-pointer p-3 bg-white rounded-lg shadow-md hover:bg-gray-100"
                              >
                                <input
                                  type={question.type === 'single' ? 'radio' : 'checkbox'}
                                  name={`quizOption-${question.id}`}
                                  value={index}
                                  checked={selectedOptions[question.id]?.includes(index) || false}
                                  onChange={() =>
                                    handleQuizAnswerSelection(
                                      question.id,
                                      index,
                                      question.type === 'multiple'
                                    )
                                  }
                                  className="mr-2"
                                />
                                <span className="text-gray-800">{option}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={handleSubmitQuiz}
                        className="bg-[#9997F5] hover:bg-[#8886E5] text-white px-4 py-2 rounded-md shadow-md"
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
              className="w-full text-left bg-[#9997F5] hover:bg-[#8886E5] text-white p-3 rounded-lg shadow-md"
            >
              {section.title}
            </button>
            {expandedSections.includes(section.id) && (
              <div className="pl-4 mt-2 space-y-2">
                {section.lectures.map((lecture, lectureIndex) => (
                  <div
                    key={lecture.id}
                    onClick={() => {
                      if (lecture.isCompleted) {
                        setSelectedLecture(lecture);
                        setSelectedSectionIndex(sectionIndex);
                        setSelectedLectureIndex(lectureIndex);
                        setQuizResult(null);
                        setSelectedOptions({});
                      }
                    }}
                    className={`cursor-pointer p-3 bg-white hover:bg-gray-100 rounded-lg shadow-md flex items-center ${!lecture.isCompleted ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    <FaPlayCircle className="mr-3 text-blue-600" />
                    <span className="text-gray-800">{lecture.title}</span>
                    {lecture.isCompleted && (
                      <FaCheckCircle className="ml-auto text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 w-full bg-gray-300 p-3 flex justify-center space-x-2 items-center shadow-md">
        <button
          onClick={handlePreviousLecture}
          disabled={selectedSectionIndex === 0 && selectedLectureIndex === 0}
          className="bg-[#9997F5] hover:bg-[#8886E5] text-white px-4 py-2 rounded-md shadow-md disabled:opacity-50"
        >
          Previous Lesson
        </button>
        <button
          onClick={handleNextLecture}
          disabled={!selectedLecture?.isCompleted}
          className="bg-[#9997F5] hover:bg-[#8886E5] text-white px-4 py-2 rounded-md shadow-md disabled:opacity-50"
        >
          Next Lesson
        </button>
      </div>
    </div>

  );
};

export default EnrollCourse;
