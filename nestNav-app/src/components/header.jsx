import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ coins }) => {
  // Variable for detecting if burger icon is opened or closed
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Brings user to home (module) screen
  const goHome = () => {
    setIsOpen(false);
    navigate('/');
  };

  // Burger menu buttons CSS
  // Includes a smooth hover animation
  const buttonClasses = `
    relative text-gray-100 font-bold text-lg px-2 py-1
    transition duration-300 ease-in-out
    after:content-[''] after:absolute after:left-0 after:bottom-0
    after:w-full after:h-[2px] after:bg-gray-100 after:scale-x-0
    after:transition-transform after:duration-300 after:origin-left
    hover:after:scale-x-100
    cursor-pointer
  `;

  // Burger menu buttons
  // Account and Rewards is for show, but the Home button brings you to the module page
  const buttons = (
    <>
      <button className={buttonClasses}>Account</button>
      <button className={buttonClasses}>Rewards</button>
      <button onClick={goHome} className={buttonClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
      </button>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-md">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">

        <div className="text-xl font-bold">Nick Falletta</div>

        <div className="flex flex-row items-center space-x-4">

          {/* User's Coins */}
          <div className="text-lg text-orange-600 flex flex-row items-center">
            {coins}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
          </div>

          {/* Lists burger menu buttons visibly for larger screens */}
          <div className="hidden md:flex space-x-2">
            {buttons}
          </div>

          {/* Burger menu for smaller screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white cursor-pointer focus:outline-none p-1 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300"
              aria-label="Toggle Menu"
            >
              {/* Open and close burger menu */}
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Header extends down if burger menu is pressed */}
      <div
        className={`md:hidden px-4 pb-2 flex justify-end transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
        `}
      >
        <div className="flex flex-col items-end space-y-2 w-full">
          {buttons}
        </div>
      </div>
    </nav>
  );
};

export default Header;
