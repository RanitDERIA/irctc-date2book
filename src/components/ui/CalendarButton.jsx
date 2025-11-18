import React from 'react';

const CalendarButton = ({ icon, name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all group"
    >
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
        {typeof icon === 'string' ? (
          icon
        ) : (
          <div className="text-blue-600 dark:text-blue-400 flex justify-center">
            {icon}
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
    </button>
  );
};

export default CalendarButton;