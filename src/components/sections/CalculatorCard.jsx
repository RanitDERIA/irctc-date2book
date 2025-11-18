import React, { useState } from 'react';
import { Calendar, ArrowRight, Clock, Bell } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { calculateBookingDate, calculateDaysUntil, isValidFutureDate } from '../../utils/dateCalculations';
import InfoCard from '../ui/InfoCard';

const CalculatorCard = ({ navigate }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const { setBookingData } = useStore();

  const handleCalculate = () => {
    setError('');

    if (!selectedDate) {
      setError('Please select a date of journey');
      return;
    }

    if (!isValidFutureDate(selectedDate)) {
      setError('Journey date cannot be in the past');
      return;
    }

    const bookingDate = calculateBookingDate(selectedDate);
    const daysUntil = calculateDaysUntil(bookingDate.toISOString().split('T')[0]);

    setBookingData({
      journeyDate: selectedDate,
      bookingDate: bookingDate.toISOString().split('T')[0],
      daysUntilBooking: daysUntil,
    });

    navigate('result');
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 animate-fadeIn">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Calculate Booking Window
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date of Journey (DOJ)
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setError('');
              }}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Select the date when your train starts from its originating station
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
          >
            <span>Calculate Booking Date</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <InfoCard
          icon={<Clock className="w-5 h-5" />}
          title="60 Days Advance"
          description="Book tickets 60 days before journey"
        />
        <InfoCard
          icon={<Bell className="w-5 h-5" />}
          title="Email Reminders"
          description="Get notified when booking opens"
        />
        <InfoCard
          icon={<Calendar className="w-5 h-5" />}
          title="Calendar Sync"
          description="Add to your favorite calendar"
        />
      </div>
    </div>
  );
};

export default CalculatorCard;