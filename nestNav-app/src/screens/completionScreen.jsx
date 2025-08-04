import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import '../index.css';
import dataJSON from '../data/modules.json';

const Complete = ({ coins, setCoins, answers }) => {

  // Used to show the Module's coin rewards with a rapid counting animation
  const [tempCoins, setTempCoins] = useState(0);

  const [showConfetti, setShowConfetti] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const { width, height } = useWindowSize();

  const module1 = dataJSON.module1;
  const total = module1.lessons.length;
  const progress = answers.filter((a) => a != null).length;

  const navigate = useNavigate();

  // Brings user home (module screen)
  const goHome = () => {
    navigate('/');
  };

  // Increases the amount of coins earned rapidly for an enjoyable animation
  // Confetti flies in
  const congrats = () => {
    // Sets users coins on header
    setCoins(module1.coinReward);

    // Throws Confetti
    setShowConfetti(true);

    // Number of coins animation
    let current = 0;
    const target = module1.coinReward;
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setTempCoins(target);
        clearInterval(interval);
      } else {
        setTempCoins(current);
      }
    }, 50);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    // Does reward animation if it has not been done before
    // Checks locally
    const moduleKey = 'module1-rewardAnimation';
    if (progress === total && !localStorage.getItem(moduleKey)) {
      congrats();
      localStorage.setItem(moduleKey, 'true');
    } else {
      // Shows the coin amount you already received without the coin animation
      setTempCoins(module1.coinReward);
    }
  }, [progress, total]);

  // Confetti fades and lasts 5 seconds
  // Done through the fade animation in index.css
  useEffect(() => {
    if (showConfetti) {
      const fadeTimer = setTimeout(() => setIsFading(true), 3500);
      const hideTimer = setTimeout(() => {
        setShowConfetti(false);
        setIsFading(false);
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [showConfetti]);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen text-gray-800 pb-20 lg:pb-0">
      
      {/* Confetti */}
      <div className={`${isFading ? 'fade-out' : ''}`}>
        {showConfetti && <Confetti width={width} height={height} numberOfPieces={1000} />}
      </div>

      {/* Completion Title */}
      <div className="text-3xl font-bold mb-3">
        {module1.title} <span className='text-gray-50 bg-gray-800 rounded px-1'>Completed</span>
      </div>

      {/* Received Coins Text */}
      <div className='flex flex-row text-xl'>
        <div className="flex mr-1">You have received</div>
        <b className='text-orange-600 flex-row flex'>
          {tempCoins}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </b>
      </div>

      {/* Divider */}
      <hr className="my-5 lg:my-15 border-.5 border-gray-300 w-full" />
      <div className="text-2xl font-semibold mb-4 justify-center flex">Lesson Review</div>

      {/* Lesson Review */}
      <div className='mb-4 flex justify-center flex-col lg:flex-row'>

        {/* Maps out each lesson - the question, your answer, the correct answer, and reasoning*/}
        {module1.lessons.map((lesson, idx) => {
          const answer = answers[idx];
          const isCorrect = answer?.isCorrect;

          return (
            <div
              key={idx}
              className="mb-4 border border-gray-300 rounded-lg p-4 bg-white shadow-sm lg:w-100 lg:mr-6"
            >
              <div className="text-lg font-bold mb-1">{lesson.title}</div>
              <div className="mb-2"><b>Q:</b> {lesson.question}</div>
              <div className="mb-1">
                <b>Your Answer:</b>{' '}
                <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                  {answer?.selected || 'No answer given'}
                </span>

                {/* Correct answer appears only if you answered incorrectly */}
                {!isCorrect && (
                  <span className="text-gray-600 ml-2">
                    (Correct: {lesson.answer})
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">Reason: {lesson.reason}</div>
            </div>
          );
        })}
      </div>

      {/* Home Button */}
      <div className="flex justify-center w-full">
        <button
          onClick={goHome}
          className="w-100 cursor-pointer text-gray-800 font-bold border-2 border-gray-800 hover:bg-gray-800 hover:text-gray-100 rounded-lg transition-colors duration-300 px-6 py-2"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Complete;