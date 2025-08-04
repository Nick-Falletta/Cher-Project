import React from 'react';
import { useNavigate } from 'react-router-dom';

const Complete = ({ title, data, coins, answers }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen text-gray-800">
      <div className="text-3xl font-bold mb-3">{title} <span className='text-gray-50 bg-gray-800 rounded px-1'>Completed</span></div>
      <div className="text-xl">You have received <b className='text-orange-600 border-b-2'>{coins}</b> coins!</div>
      <hr className="my-5 border-.5 border-gray-300 w-full" />
      <div className="text-2xl font-semibold mb-4">Lesson Review</div>

      <div className='mb-4 flex justify-center flex-col lg:flex-row'>
        {data.map((lesson, idx) => {
          const answer = answers[idx];
          const isCorrect = answer?.isCorrect;
          return (
            <div key={idx} className="mb-4 border border-gray-300 rounded-lg p-4 bg-white shadow-sm lg:w-80 lg:mr-2">
              <div className="text-lg font-bold mb-1">{lesson.title}</div>
              <div className="mb-2"><b>Q:</b> {lesson.question}</div>
              <div className={`mb-1`}>
                <b>Your Answer:</b>{' '}
                <span className={`${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {answer?.selected || 'No answer given'}
                </span>
                {isCorrect === false && (
                  <span className="text-gray-600 ml-2">(Correct: {lesson.answer})</span>
                )}
              </div>
              <div className="text-sm text-gray-500">Reason: {lesson.reason}</div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={goHome}
          className="text-gray-800 font-bold border-2 border-gray-800 hover:bg-gray-800 hover:text-gray-100 rounded-lg transition-colors duration-300 px-6 py-2"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Complete;


//Module Completed
//Coin Reward
//Question Results and Review
//Go Home Button
