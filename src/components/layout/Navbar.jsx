import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = ({ navigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 ${
      isScrolled ? 'h-14' : 'h-16'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('home')}
          >
            {/* Logo Image */}
            <img
              src="/brand.png"
              alt="Logo"
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-7' : 'h-10'
              }`}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            {/* Desktop Logo Text - Full when not scrolled, abbreviated when scrolled */}
            <div className="hidden md:block">
              <span className={`font-bold flex items-center transition-all duration-300 ${
                isScrolled ? 'text-base' : 'text-xl'
              }`}>
                {/* "IRCTC" - Deep Blue & Extra Bold with shadow */}
                <span className="text-[#000075] font-extrabold tracking-tight mr-2 drop-shadow-md">
                  IRCTC
                </span>

                {/* Conditional rendering based on scroll state */}
                {isScrolled ? (
                  // Abbreviated version: "D2B"
                  <>
                    <span className="text-black dark:text-white drop-shadow-md">D</span>
                    <span className="text-[#FEBF4F] drop-shadow-md">2</span>
                    <span className="text-black dark:text-white drop-shadow-md">B</span>
                  </>
                ) : (
                  // Full version: "Date2Book"
                  <>
                    <span className="text-black dark:text-white drop-shadow-md">Date</span>
                    <span className="text-[#FEBF4F] drop-shadow-md">2</span>
                    <span className="text-black dark:text-white drop-shadow-md">Book</span>
                  </>
                )}
              </span>
            </div>

            {/* Mobile Logo Text - Always abbreviated */}
            <div className="block md:hidden">
              <span className="text-base font-bold flex items-center">
                <span className="text-[#000075] font-extrabold tracking-tight mr-2 drop-shadow-md">
                  IRCTC
                </span>
                <span className="text-black dark:text-white drop-shadow-md">D</span>
                <span className="text-[#FEBF4F] drop-shadow-md">2</span>
                <span className="text-black dark:text-white drop-shadow-md">B</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate('home')}
              className={`text-sm font-medium transition-colors drop-shadow-sm ${
                currentPage === 'home'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('about')}
              className={`text-sm font-medium transition-colors drop-shadow-sm ${
                currentPage === 'about'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              About
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="px-4 py-3 space-y-3">
              <button
                onClick={() => {
                  navigate('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors drop-shadow-sm ${
                  currentPage === 'home'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors drop-shadow-sm ${
                  currentPage === 'about'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                About
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;