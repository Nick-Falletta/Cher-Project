import { useState } from 'react';
import './index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import ModuleOverview from './screens/moduleScreen';
import Lesson from './screens/lessonScreen';
import CompletionScreen from './screens/completionScreen';
import Header from './components/header';
import dataJSON from './data/modules.json';

function NestNavApp() {
  const [completed, setCompleted] = useState(0);
  const [coins, setCoins] = useState(0);
  const navigate = useNavigate();

  // Module Data from JSON file
  const module1 = dataJSON.module1;

  // Keeps track of questions answered in modules
  const [answers, setAnswers] = useState(
    Array.from({ length: module1.lessons.length }, () => ({
      selected: '',
      submitted: false,
      isCorrect: null
    }))
  );

  // Goes to first lesson
  const startModule = () => {
    navigate('/lesson/1');
  };

  // Navigates user to the next lesson
  // Navigates to completion screen if there are no more lessons
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
      {/* Sets up the header (Name, User's Coins, Burger menu) */}
      <Header coins={coins} />
      <div className="pt-24 pl-5 pr-5 min-h-screen w-full bg-gray-50 text-gray-800">
        <Routes>
          
          {/* Sets up the module (Module's Title, Lessons, Coin Rewards, Progress) */}
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

          {/* Sets up the lessons (Multiple Choice Questions, Progress Bar) */}
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

          {/* Sets up the completion screen (Reward, Quiz Information) */}
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

export default NestNavApp;
