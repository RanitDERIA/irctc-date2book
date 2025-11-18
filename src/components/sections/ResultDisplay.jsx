import React from 'react';
import { Train, Calendar, CheckCircle } from 'lucide-react';
import { formatDate } from '../../utils/dateCalculations';

const ResultDisplay = ({ journeyDate, bookingDate, daysUntilBooking }) => {
  const journey = new Date(journeyDate);
  const booking = new Date(bookingDate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8 animate-slideDown">
      <div className="flex items-center space-x-3 mb-6">
        <CheckCircle className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Booking Window Calculated!
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Journey Date */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-3 mb-3">
            <Train className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Date of Journey
            </h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatDate(journey)}
          </p>
        </div>

        {/* Booking Date */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-3 mb-3">
            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Booking Opens On
            </h3>
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatDate(booking)}
          </p>
        </div>
      </div>

      {/* Days Countdown */}
      <div className="mt-6 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-8 py-4 shadow-lg">
          <p className="text-white text-sm font-medium mb-1">Days Until Booking Opens</p>
          <p className="text-5xl font-extrabold text-white">
            {daysUntilBooking > 0 ? daysUntilBooking : 'TODAY'}
          </p>
          {daysUntilBooking <= 0 && (
            <p className="text-white text-sm mt-2">🎉 Booking is now open!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;