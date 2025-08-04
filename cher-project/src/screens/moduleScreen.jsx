import React, { useState } from 'react';

const Module = ({ title, progress, total, coins, onStart, lessons, answers }) => {
  const [expandedLessons, setExpandedLessons] = useState(new Set());

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
            <div key={index} className="bg-gray-100 rounded">

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
                    <strong className='mr-1'>Questions answered:</strong>{' '}
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
          <h2 className="text-orange-600 text-2xl font-bold border-b-2">{coins} coins</h2>
          <button
            onClick={onStart}
            className="text-gray-800 font-bold text-sm px-2 py-1 border-2 border-gray-800 hover:bg-gray-800 hover:text-gray-100 rounded-lg transition duration-300"
          >
            {progress === total ? 'Review Module' : 'Start Module'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module;
