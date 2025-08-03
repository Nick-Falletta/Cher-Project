import React, { useState } from 'react';

// For burger menu icon
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = ({coins}) => {
  // Variable for detecting if burger icon is opened or closed
  const [isOpen, setIsOpen] = useState(false);

  // List buttons easier (avoid repetitive code)
  const buttonClasses =
    'text-gray-100 font-bold text-sm px-2 py-1 border-2 border-gray-100 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300';
  // Sample buttons for logging in and registering (just for show)
    const buttons = (
    <>
      <button className={buttonClasses}>Log In</button> 
      <button className={buttonClasses}>Register</button>
    </>
  );

  return (
    // Creates the heading for the application
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-md">
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-xl font-bold">Nick Falletta</div>

        <div className='flex flex-row items-center space-x-4'>

          {/* Coin text and counter */}
          <div className='text-lg'>Coins: {coins}</div>
          {/* Lists buttons if screen is large enough */}
          <div className="hidden md:flex space-x-2">
              {buttons}
          </div>
          {/* If screen is smaller, burger menu icon will show */}
          <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-1 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300"
            aria-label="Toggle Menu"
          >
            {/* Open and close menu icon */}
            {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
            ) : (
                <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          </div>

        </div>
        </div>

      {/* Shows buttons when burger icon is clicked */}
      {isOpen && (
        <div className="md:hidden px-4 pb-2 flex justify-end">
            <div className="flex flex-col items-end space-y-2">
                {buttons}
            </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
