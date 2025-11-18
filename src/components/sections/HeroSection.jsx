import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 dark:opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-slideDown">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Never Miss Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
              Train Booking Window
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Calculate exactly when IRCTC booking opens for your journey. Set reminders and book your tickets on time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;