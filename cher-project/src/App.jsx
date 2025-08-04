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
    content: 'Learn what a home inspection is and why it’s important before buying or selling a property.',
    lesson: 'A home inspection is a detailed evaluation of a property’s condition, typically performed before a sale. Inspectors check structural elements, major systems (like HVAC and plumbing), and potential safety hazards. This helps buyers understand the true condition of the home and anticipate any needed repairs.',
    question: 'What does a home inspection evaluate?',
    options: ['Finances', 'Property condition', 'Neighborhood'],
    answer: 'Property condition',
    reason: 'A home inspection is all about checking the condition of the property—its structure, systems, and safety—not financials or the area around it.'
  },
  {
    title: 'Types of Inspections',
    content: 'Explore the different specialized inspections that can be done on a home.',
    lesson: 'Beyond a general home inspection, specialized inspections may focus on specific systems or areas of concern. Common types include electrical inspections (checking wiring and panels), plumbing inspections (checking pipes and water systems), and roofing inspections (assessing the roof’s condition). These help uncover issues that may not be visible during a general inspection.',
    question: 'Which is NOT a type of inspection?',
    options: ['Plumbing', 'Furnishing', 'Roofing'],
    answer: 'Furnishing',
    reason: 'Furnishing is related to decor, not structural or safety inspections. Inspections typically focus on systems like plumbing, electrical, and roofing.'
  },
  {
    title: 'Red Flags to Watch For',
    content: 'Discover common warning signs inspectors look for when evaluating a home.',
    lesson: 'Red flags during an inspection are issues that could point to serious or costly problems. These include foundation cracks, mold, water damage, poor wiring, or roof leaks. Identifying these can help buyers avoid future headaches and negotiate repairs with the seller.',
    question: 'Which is a red flag?',
    options: ['Fresh paint', 'Cracks in foundation', 'New furniture'],
    answer: 'Cracks in foundation',
    reason: 'Foundation cracks can indicate structural issues, which are a major concern in inspections. Paint or furniture might distract, but cracks are a serious red flag.'
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
                answers={answers}
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
            element={
              <CompletionScreen
                title="Understanding Home Inspections"
                data={homeInspectData}
                coins={coins} 
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