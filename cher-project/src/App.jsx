import React, { useState } from 'react';
import './index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import ModuleOverview from './screens/moduleScreen';
import Lesson from './screens/lessonScreen';
import CompletionScreen from './screens/completionScreen';
import Header from './components/header';

const homeInspectData = [
  {
    title: 'What is a Home Inspection?',
    content: 'A home inspection is a thorough assessment of a property...',
    question: 'What does a home inspection evaluate?',
    options: ['Finances', 'Property condition', 'Neighborhood'],
    answer: 'Property condition'
  },
  {
    title: 'Types of Inspections',
    content: 'Different types include electrical, plumbing, roofing...',
    question: 'Which is NOT a type of inspection?',
    options: ['Plumbing', 'Furnishing', 'Roofing'],
    answer: 'Furnishing'
  },
  {
    title: 'Red Flags to Watch For',
    content: 'Be aware of mold, foundation cracks, and leaks...',
    question: 'Which is a red flag?',
    options: ['Fresh paint', 'Cracks in foundation', 'New furniture'],
    answer: 'Cracks in foundation'
  },
];

function App() {
  const [completed, setCompleted] = useState(0);
  const [coins, setCoins] = useState(0);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(homeInspectData.length).fill({
    selected: '',
    submitted: false,
    isCorrect: null
  }));


  const startModule = () => {
    // Goes to first lesson
    navigate('/lesson/1');
  };

  const completeLesson = (lessonIndex) => {
    if (lessonIndex < homeInspectData.length) {
      navigate(`/lesson/${lessonIndex + 1}`);
    } else {
      setCoins(50);
      navigate('/complete');
    }
  };

  return (
    <>
      <Header coins={coins} />
      <div className="pt-24 pl-5 pr-5 min-h-screen w-full bg-gray-50 text-gray-800">
        <Routes>
          <Route
            path="/"
            element={
              <ModuleOverview
                title="Understanding Home Inspections"
                progress={completed}
                total={homeInspectData.length}
                coins={50}
                onStart={startModule}
                lessons={homeInspectData}
              />
            }
          />
          <Route
            path="/lesson/:id"
            element={
              <Lesson
                data={homeInspectData}
                onComplete={completeLesson}
                onAnswer={setCompleted}
                progress={completed}
                answers={answers}
                setAnswers={setAnswers}
              />
            }
          />
          <Route
            path="/complete"
            element={<CompletionScreen coins={coins} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;