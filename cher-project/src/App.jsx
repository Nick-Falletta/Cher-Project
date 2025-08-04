import React, { useState } from 'react';
import './index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import ModuleOverview from './screens/moduleScreen';
import Lesson from './screens/lessonScreen';
import CompletionScreen from './screens/completionScreen';
import Header from './components/header';
import dataJSON from './data/modules.json';

function App() {
  const [completed, setCompleted] = useState(0);
  const [coins, setCoins] = useState(0);
  const navigate = useNavigate();
  const module1 = dataJSON.module1;

  // Keeps track of questions answered in modules
  const [answers, setAnswers] = useState(
    Array.from({ length: module1.lessons.length }, () => ({
      selected: '',
      submitted: false,
      isCorrect: null
    }))
  );

  const startModule = () => {
    // Goes to first lesson
    navigate('/lesson/1');
  };

  const completeLesson = (lessonIndex) => {
    if (lessonIndex < module1.lessons.length) {
      navigate(`/lesson/${lessonIndex + 1}`);
    } else {
      setCoins(module1.coinReward);
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
                progress={completed}
                onStart={startModule}
                answers={answers}
              />
            }
          />
          <Route
            path="/lesson/:id"
            element={
              <Lesson
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
            element={
              <CompletionScreen
                coins={coins}
                setCoins={setCoins}
                answers={answers}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;