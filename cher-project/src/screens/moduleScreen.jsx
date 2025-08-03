import React, { useState } from 'react';
// Arrow icons
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const Module = ({ title, progress, total, coins, onStart, lessons }) => {
  const [expandedLesson, setExpandedLesson] = useState(null);

  const toggleLesson = (index) => {
    setExpandedLesson(expandedLesson === index ? null : index);
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Module Title */}
      <div className="flex justify-between items-center mb-4">
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
          const isOpen = expandedLesson === index;
          return (
            <div key={index} className="bg-gray-100 rounded">

              {/* Visible content */}
              <div
                onClick={() => toggleLesson(index)}
                className="flex justify-between items-center p-3 cursor-pointer"
              >
                <span className="text-gray-800 font-medium">{lesson.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 italic">Uncompleted</span>
                  {isOpen ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                  )}
                </div>
              </div>

              {/* Dropdown content */}
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-700 space-y-2">
                  <p><strong>Description:</strong> {lesson.content}</p>
                  <p><strong>Questions answered:</strong> 0 correct / 0 incorrect</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Start button */}
      <div className="flex justify-end">
        <button
          onClick={onStart}
          className="text-gray-800 font-bold text-sm px-2 py-1 border-2 border-gray-800 hover:bg-gray-800 hover:text-gray-100 rounded-lg transition duration-300"
        >
          Start Module (Earn {coins} coins)
        </button>
      </div>
    </div>
  );
};

export default Module;
