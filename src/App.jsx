import React, { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { theme } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const pages = {
    home: <HomePage navigate={setCurrentPage} />,
    result: <ResultPage navigate={setCurrentPage} />,
    about: <AboutPage navigate={setCurrentPage} />,
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'dark bg-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Navbar navigate={setCurrentPage} currentPage={currentPage} />
      <div className="animate-fadeIn">
        {pages[currentPage]}
      </div>
      <Footer navigate={setCurrentPage} />
    </div>
  );
}

export default App;