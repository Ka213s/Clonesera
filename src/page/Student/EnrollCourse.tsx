import React, { useState } from 'react';

const EnrollCourse: React.FC = () => {
    const videoSrc = 'path/to/your/video.mp4';
    const initialLessons = [
        {
            id: 1,
            title: 'Introduction',
            duration: '5:00',
            topics: [
                {
                    id: 1,
                    title: 'Topic 1.1',
                    description: 'Description 1.1',
                },
                {
                    id: 2,
                    title: 'Quiz',
                    description: '',
                    isQuizEnabled: true,
                    quizQuestions: [
                        {
                            id: 1,
                            question: 'What is the capital of France?',
                            options: ['Paris', 'London', 'Berlin', 'Madrid'],
                            answer: 'Paris'
                        },
                        {
                            id: 2,
                            question: 'What is the square root of 9?',
                            options: ['1', '2', '3', '4'],
                            answer: '3'
                        }
                    ]
                },
            ],
            isExpanded: false, // State to manage the expanded state of topics for each lesson
        },
        {
            id: 2,
            title: 'Lesson 1',
            duration: '10:00',
            topics: [
                { id: 1, title: 'Topic 2.1', description: 'Description 2.1' },
                { id: 2, title: 'Topic 2.2', description: 'Description 2.2' },
            ],
            isExpanded: false,
        },
        {
            id: 3,
            title: 'Lesson 2',
            duration: '15:00',
            topics: [
                { id: 1, title: 'Topic 3.1', description: 'Description 3.1' },
                { id: 2, title: 'Topic 3.2', description: 'Description 3.2' },
                { id: 3, title: 'Topic 3.3', description: 'Description 3.3' },
            ],
            isExpanded: false,
        },
    ];
    const [lessons, setLessons] = useState(initialLessons);
    const [activeLesson, setActiveLesson] = useState<number | null>(null);
    const [activeTopic, setActiveTopic] = useState<number | null>(null);
    const [topicDetails, setTopicDetails] = useState<{ title: string, description: string } | null>(null);
    const [quizAnswers, setQuizAnswers] = useState<{ [questionId: number]: string | null }>({});

    const toggleLesson = (lessonId: number) => {
        // Toggle the selected lesson's isExpanded state
        const updatedLessons = lessons.map((lesson) =>
            lesson.id === lessonId
                ? { ...lesson, isExpanded: !lesson.isExpanded }
                : lesson
        );

        setActiveLesson(activeLesson === lessonId ? null : lessonId);
        setLessons(updatedLessons);
    };

    const toggleTopic = (topicId: number, lessonId: number) => {
        const lesson = lessons.find((lesson) => lesson.id === lessonId);
        const topic = lesson?.topics.find((topic) => topic.id === topicId);

        if (topic) {
            setTopicDetails({ title: topic.title, description: topic.description });
            if (topic.isQuizEnabled && topic.quizQuestions.length > 0) {
                setActiveTopic(topicId);
            } else {
                setActiveTopic(null);
            }
        }
    };

    const handleQuizAnswerChange = (questionId: number, answer: string) => {
        setQuizAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const submitQuiz = () => {
        if (!topicDetails) return;

        const lesson = lessons.find((lesson) => lesson.id === activeLesson);
        const topic = lesson?.topics.find((topic) => topic.id === activeTopic);

        if (topic && topic.isQuizEnabled) {
            const questions = topic.quizQuestions;
            let score = 0;

            questions.forEach((question) => {
                if (quizAnswers[question.id] === question.answer) {
                    score++;
                }
            });

            alert(`Your score is: ${score}/${questions.length}`);
            // Reset quiz answers after submission
            setQuizAnswers({});
            setActiveTopic(null);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-blue-500 p-5 flex justify-between items-center">
                <button onClick={() => window.history.back()} className="text-white">
                    Return
                </button>
            </div>
            <div className="flex flex-col md:flex-row md:h-full p-4">
                <div className="md:w-3/4 p-2 relative">
                    <div className="w-full h-64 md:h-96 bg-black">
                        <video className="w-full h-full" controls>
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="mt-4">
                        {topicDetails && (
                            <div>
                                <h3 className="font-bold text-2xl mb-4">{topicDetails.title}</h3>
                                <p>{topicDetails.description}</p>
                            </div>
                        )}
                        {activeTopic !== null && (
                            <div className="mt-4">
                                {lessons.map((lesson) => (
                                    lesson.topics.map((topic) => (
                                        topic.isQuizEnabled && topic.id === activeTopic && topic.quizQuestions.map((question) => (
                                            <div key={question.id} className="mb-2">
                                                <p className="font-bold">{question.question}</p>
                                                {question.options.map((option, index) => (
                                                    <div key={index} className="mb-1">
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.id}`}
                                                            value={option}
                                                            onChange={(e) => handleQuizAnswerChange(question.id, e.target.value)}
                                                        />
                                                        <label className="ml-2">{option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    ))
                                ))}
                                <button
                                    onClick={submitQuiz}
                                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full"
                                >
                                    Submit Quiz
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:w-1/4 p-2 relative">
                    <h2 className="text-xl font-bold mb-4">Course Title</h2>
                    <div className="w-full h-96 overflow-y-auto">
                        {lessons.map((lesson) => (
                            <div key={lesson.id} className="mb-2">
                                <div
                                    onClick={() => toggleLesson(lesson.id)}
                                    className="cursor-pointer p-4 bg-gray-200 rounded-md flex justify-between items-center"
                                >
                                    <strong>{lesson.title}</strong>
                                    <button className="ml-2">
                                        {lesson.isExpanded ? '▲' : '▼'}
                                    </button>
                                </div>
                                {activeLesson === lesson.id && lesson.isExpanded && (
                                    <div className="mt-2">
                                        {lesson.topics.map((topic) => (
                                            <div
                                                key={topic.id}
                                                onClick={() => toggleTopic(topic.id, lesson.id)}
                                                className={`cursor-pointer p-2 pl-8 bg-gray-100 rounded-md mb-1 ${activeTopic === topic.id ? 'bg-red-100' : ''
                                                    }`}
                                            >
                                                {topic.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollCourse;
