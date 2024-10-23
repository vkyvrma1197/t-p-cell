import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import { MdNotificationAdd } from 'react-icons/md';
import Header from './Header';
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotificationModal = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <> 
      <nav className="fixed top-0 left-0 right-0 bg-blue-100    shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
           

          {/* Main Links */}
          <ul className="hidden md:flex gap-6">
            <li className="hover:text-blue-900 transition">
              <Link to="/" className="font-medium text-gray-600">Home</Link>
            </li>
            <li className="hover:text-blue-900 transition">
              <Link to="/jobboard" className="font-medium text-gray-600">Opportunities</Link>
            </li>
            <li className="hover:text-blue-900 transition">
              <Link to="/For-Recruiters" className="font-medium text-gray-600">For Recruiters</Link>
            </li>
           
            <li className="hover:text-blue-900 transition">
              <Link to="/Placement-Statistics" className="font-medium text-gray-600">Placement Statistics</Link>
            </li>
            <li className="hover:text-blue-900 transition">
              <Link to="/Training-Resources" className="font-medium text-gray-600"> Training & Resources</Link>
            </li>
            <li className="hover:text-blue-900 transition">
              <Link to="/about-us" className="font-medium text-gray-600">About</Link>
            </li>
            
            
          </ul>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {token === null ? (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 border border-blue-900 text-blue-900 rounded-md hover:bg-blue-100 transition">
                    Sign in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition">
                    Create Account
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs text-gray-500">Placement Year</span>
                  <div className="px-2 py-1 bg-gray-100 text-blue-900 font-medium rounded-md border border-blue-900">
                    2024-25
                  </div>
                </div>

                {/* Notification Icon */}
                <button onClick={toggleNotificationModal}>
                  <MdNotificationAdd className="text-3xl text-blue-900 hover:text-blue-700" />
                </button>

                <ProfileDropdown />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-blue-900 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden bg-white bg-opacity-95 border-t border-gray-200 shadow-md p-4 space-y-4">
            <li className="hover:text-blue-900 transition">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-blue-900 transition">
              <Link to="/jobboard">Opportunities</Link>
            </li>
            <li className="hover:text-blue-900 transition">
              <Link to="/events">Events</Link>
            </li>
            <li className="hover:text-blue-900 transition">
              <Link to="/about-us">About</Link>
            </li>
            {token === null ? (
              <>
                <li className="hover:text-white bg-blue-900 text-center text-white font-semibold py-2 rounded-md">
                  <Link to="/login">Login</Link>
                </li>
                <li className="hover:text-white bg-blue-900 text-center text-white font-semibold py-2 rounded-md">
                  <Link to="/signup">Create Account</Link>
                </li>
              </>
            ) : (
              <li className="hover:text-blue-900 transition">
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        )}
      </nav>

      {/* Notification Modal */}
      {isNotificationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-3/4 md:w-1/2 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
              <span className="font-semibold">Notifications</span>
              <button onClick={toggleNotificationModal} className="underline text-white hover:text-gray-200">
                Close
              </button>
            </div>
            <ul>
              {[
                { title: 'VISA Interview Schedule', date: '20-10-2024 23:14 IST' },
                { title: 'EricssonEdge Academia Program', date: '20-10-2024 17:27 IST' },
              ].map((notification, idx) => (
                <li key={idx} className={`p-4 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                  <a href="#" className="text-blue-500 hover:underline">
                    {notification.title}
                  </a>
                  <p className="text-xs text-gray-500">{notification.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Add padding to main content to prevent overlap with the fixed Navbar */}
      <div className="pt-24">
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default Navbar;
