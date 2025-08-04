import React, { useState } from 'react';
import dataJSON from '../data/modules.json'

const Module = ({ progress, onStart, answers }) => {
  const [expandedLessons, setExpandedLessons] = useState(new Set());
  const module1 = dataJSON.module1;
  const title = module1.title;
  const total = module1.lessons.length;
  const coins = module1.coinReward;
  const lessons = module1.lessons;

  const toggleLesson = (index) => {
    const newSet = new Set(expandedLessons);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedLessons(newSet);
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Module Title */}
      <div className="mb-4 w-full">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {/* Counts lessons completed */}
          <p className="text-sm text-gray-600">
            Progress: {progress}/{total} lessons completed
          </p>
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-3 mb-6">
        {lessons.map((lesson, index) => {
          const answer = answers[index];
          const isCorrect = answer?.isCorrect;
          const isOpen = expandedLessons.has(index);
          return (
            <div key={index} className="bg-gray-100 rounded hover:bg-gray-200 active:bg-gray-200 transition duration-300">

              {/* Visible content */}
              <div
                onClick={() => toggleLesson(index)}
                className="flex justify-between items-center p-3 cursor-pointer"
              >
                <span className="text-gray-800 font-medium">{lesson.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 italic whitespace-nowrap">{index >= progress ? (<span>Not Started</span>) : (<span>Finished</span>)}</span>
                  {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-5 w-5 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-5 w-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                  )}
                </div>
              </div>

              {/* Dropdown content with a smooth transition */}
              <div
                className={`px-4 pb-2 overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
                `}
              >
                <div className="text-sm text-gray-800 space-y-2 py-2">
                  <p className="text-left"><strong>Description:</strong> {lesson.content}</p>
                  <p className="text-left flex flex-row">
                    <strong className='mr-1 whitespace-nowrap'>Questions answered:</strong>{' '}
                    <span>{isCorrect === true ? '1 correct / 0 incorrect' :
                    isCorrect === false ? '0 correct / 1 incorrect' :
                    '0 correct / 0 incorrect'}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start button */}
      <div className="flex justify-end">
        <div className='flex justify-between flex row w-full'>
          {/* Coin Reward */}
          <div className='text-orange-600 text-2xl font-bold border-b-2 flex flex-row'>
            {coins}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
          </div>
          <button
            onClick={onStart}
            className="text-gray-800 font-bold text-sm px-2 py-1 border-2 border-gray-800 active:bg-gray-800 active:text-gray-100 hover:bg-gray-800 hover:text-gray-100 rounded-lg transition duration-300"
          >
            {progress === total ? 'Review Module' : 'Start Module'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module;
