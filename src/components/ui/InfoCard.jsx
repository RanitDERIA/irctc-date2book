import React from 'react';

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 mb-2">
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
          {title}
        </h3>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default InfoCard;