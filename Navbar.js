import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg ring-gray-500 ring-2">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left part of the Navbar */}
        <div className="flex items-center">
          <a
            href="/"
            className="text-pink-500 text-2xl lg:text-4xl font-semibold mr-4"
          >
            Dribbble
          </a>
          <input
            type="text"
            placeholder="Search"
            className="rounded-l-md py-1 px-2 bg-gray-700 focus:outline-none focus:bg-gray-600 text-pink-500 hidden lg:block"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-pink-500 py-1 px-4 rounded-r-none space-x-3 hidden lg:block">
            <Link to="/search" className="text-white">
              Search
            </Link>
          </button>
        </div>
        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          {/* Mobile menu button */}
          {!isMobileMenuOpen && (
            <button
              onClick={toggleMobileMenu}
              className="text-pink-500 focus:outline-none focus:bg-gray-600 p-2 rounded-lg"
              aria-label="Open Mobile Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
          {/* Close button for mobile menu */}
          {isMobileMenuOpen && (
            <button
              onClick={closeMobileMenu}
              className="text-pink-500 focus:outline-none focus:bg-gray-600 p-2 rounded-lg absolute top-0 right-0 mt-2 mr-2"
              aria-label="Close Mobile Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Right part of the Navbar */}
        <div
          className={`lg:flex items-center space-x-3 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col mb-3 space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row lg:ml-auto">
            <li>
              <a
                href="/"
                className="text-pink-500 hover:text-black hover:bg-white p-1.5 hover:rounded-xl hover:transition ease-in-out"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-pink-500 hover:text-black hover:bg-white p-1.5 hover:rounded-xl hover:transition ease-in-out"
              >
                Find designers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-pink-500 hover:text-black hover:bg-white p-1.5 hover:rounded-xl hover:transition ease-in-out"
              >
                Inspiration
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-pink-500 hover:text-black hover:bg-white p-1.5 hover:rounded-xl hover:transition ease-in-out"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-pink-500 hover:text-black hover:bg-white p-1.5 hover:rounded-xl hover:transition ease-in-out"
              >
                Jobs
              </a>
            </li>
          </ul>
          <div className="">
            <button className="bg-gray-700 mb-2 hover:bg-gray-500 text-pink-500 py-1 px-4 rounded">
              <Link to="/login" className="text-white">
                Log In
              </Link>
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-pink-500 py-1 px-4 ml-2 rounded">
              <Link to="/" className="text-white">
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;