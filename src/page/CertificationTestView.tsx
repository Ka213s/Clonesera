import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface Question {
  id: number;
  content: string;
  type: 'single_choice' | 'text';
  options?: string[];
  selectedOption?: number;
  answer?: string;
}

const CertificationTestView: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [duration, setDuration] = useState<number>(3600);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedQuestions: Question[] = [
      { id: 1, content: 'Question 1 content', type: 'single_choice', options: ['Option 1', 'Option 2', 'Option 3'] },
      { id: 2, content: 'Question 2 content', type: 'single_choice', options: ['Option 1', 'Option 2', 'Option 3'] },
      { id: 3, content: 'Question 3 content', type: 'text' },
    ];
    setQuestions(fetchedQuestions);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prevDuration) => {
        if (prevDuration > 0) {
          return prevDuration - 1;
        } else {
          clearInterval(timer);
          return prevDuration;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    console.log('Form submitted!');
    navigate('/certification-result');
  };

  return (
 
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-4">
          <Link
            to="/home"
            className="px-4 py-2 inline-block text-white border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white"
          >
            Home
          </Link>
        </div>
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">WordPress Test View</h2>
        <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded-full bg-gray-700 p-4">
              <div className="text-center text-gray-400">
                <p className="text-lg font-bold">Questions</p>
                <p className="text-4xl text-white">{questions.length}</p>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-full bg-gray-700 p-4">
              <div className="text-center text-gray-400">
                <p className="text-lg font-bold">Time Left</p>
                <p className="text-4xl text-white">{formatTime(duration)}</p>
                <p className="text-lg text-white">Minutes</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="bg-gray-700 p-4 rounded-md">
                <h3 className="text-white mb-4">{question.content}</h3>
                {question.type === 'single_choice' && (
                  <div>
                    {question.options?.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name={`question-${question.id}`}
                          value={option}
                          checked={question.selectedOption === index}
                          onChange={() =>
                            setQuestions((prevQuestions) =>
                              prevQuestions.map((q) =>
                                q.id === question.id
                                  ? { ...q, selectedOption: index }
                                  : q
                              )
                            )
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`option-${index}`} className="text-white">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                {question.type === 'text' && (
                  <input
                    type="text"
                    id={`text-${question.id}`}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                      setQuestions((prevQuestions) =>
                        prevQuestions.map((q) =>
                          q.id === question.id ? { ...q, answer: e.target.value } : q
                        )
                      )
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default CertificationTestView;

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
