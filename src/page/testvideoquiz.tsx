import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Lesson {
  id: number;
  title: string;
  videoId: string;
  quiz: Quiz;
  unlocked: boolean;
}

interface Quiz {
  id: number;
  questions: Question[];
  unlocked: boolean;
}

interface Question {
  type: 'single' | 'multiple';
  question: string;
  options: string[];
  answer: string | string[];
}

const initialLessons: Lesson[] = [
  {
    id: 1,
    title: 'Lesson 1',
    videoId: 'wirc5PFn2KU',
    quiz: {
      id: 1,
      questions: [
        {
          type: 'single',
          question: 'Question 1?',
          options: ['Option 1', 'Option 2', 'Option 3'],
          answer: 'Option 1',
        },
      ],
      unlocked: false,
    },
    unlocked: true, // Lesson 1 is unlocked by default
  },
  {
    id: 2,
    title: 'Lesson 2',
    videoId: 'H_bB0sAqLNg',
    quiz: {
      id: 2,
      questions: [
        {
          type: 'multiple',
          question: 'Question 2?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          answer: ['Option 1', 'Option 3'],
        },
      ],
      unlocked: false,
    },
    unlocked: false,
  },
  // Add other lessons similarly
];

const TestVideoQuiz: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const storedLessons = localStorage.getItem('lessons');
    return storedLessons ? JSON.parse(storedLessons) : initialLessons;
  });
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0); // Start with Lesson 1
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('player', {
        videoId: lessons[currentLessonIndex].videoId,
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentLessonIndex]);

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      const duration = event.target.getDuration();
      intervalRef.current = setInterval(() => {
        const currentTime = event.target.getCurrentTime();
        const progress = (currentTime / duration) * 100;
        setVideoProgress(progress);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (videoProgress >= 80) {
      const updatedLessons = lessons.map((lesson, index) => {
        if (index === currentLessonIndex) {
          return {
            ...lesson,
            quiz: {
              ...lesson.quiz,
              unlocked: true,
            },
            unlocked: true, // Unlock the lesson itself
          };
        }
        if (index === currentLessonIndex + 1) {
          return {
            ...lesson,
            unlocked: true, // Unlock the next lesson
          };
        }
        return lesson;
      });
      setLessons(updatedLessons);
      localStorage.setItem('lessons', JSON.stringify(updatedLessons));
    }
  }, [videoProgress, currentLessonIndex, lessons]);

  const handleLessonClick = (index: number, unlocked: boolean) => {
    if (unlocked) {
      setCurrentLessonIndex(index);
      setVideoProgress(0); // reset progress for the new lesson
      setSelectedQuizId(null); // reset the selected quiz
    }
  };

  const handleQuizClick = (quizId: number, unlocked: boolean) => {
    if (unlocked) {
      setSelectedQuizId(quizId);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%', borderRight: '1px solid #ccc' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {lessons.map((lesson, index) => (
            <li key={lesson.id} style={{ marginBottom: '10px' }}>
              <div
                onClick={() => handleLessonClick(index, lesson.unlocked)}
                style={{
                  color: lesson.unlocked ? 'black' : 'grey',
                  cursor: lesson.unlocked ? 'pointer' : 'not-allowed',
                }}
              >
                {lesson.title}
              </div>
              <ul style={{ listStyleType: 'none', padding: '5px 0 0 20px' }}>
                <li>
                  <span
                    onClick={() => handleQuizClick(lesson.quiz.id, lesson.quiz.unlocked)}
                    style={{
                      color: lesson.quiz.unlocked ? 'black' : 'grey',
                      cursor: lesson.quiz.unlocked ? 'pointer' : 'not-allowed',
                      textDecoration: lesson.quiz.unlocked ? 'underline' : 'none',
                    }}
                  >
                    Quiz {lesson.quiz.id} - {lesson.quiz.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: '80%', padding: '20px' }}>
        <h2>{lessons[currentLessonIndex].title}</h2>
        <div id="player"></div>
        {selectedQuizId !== null && (
          <div>
            <h3>Quiz</h3>
            {lessons.find(lesson => lesson.quiz.id === selectedQuizId)?.quiz.questions.map((question, index) => (
              <div key={index}>
                <p>{question.question}</p>
                {question.options.map((option, idx) => (
                  <div key={idx}>
                    <input
                      type={question.type === 'single' ? 'radio' : 'checkbox'}
                      name={`question-${index}`}
                      value={option}
                      disabled={!lessons.find(lesson => lesson.quiz.id === selectedQuizId)?.quiz.unlocked}
                    />
                    {option}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {selectedQuizId === null && (
          <div>
            <p>Click on a quiz to view the questions.</p>
          </div>
        )}
        {lessons[currentLessonIndex].quiz.unlocked && currentLessonIndex < lessons.length - 1 && (
          <button onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)}>Next Lesson</button>
        )}
      </div>
    </div>
  );
};

export default TestVideoQuiz;
