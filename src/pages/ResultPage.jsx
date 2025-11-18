import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import ResultDisplay from '../components/sections/ResultDisplay';
import CalendarIntegration from '../components/sections/CalendarIntegration';
import EmailReminder from '../components/sections/EmailReminder';

const ResultPage = ({ navigate }) => {
  const { journeyDate, bookingDate, daysUntilBooking } = useStore();
  
  // Redirect to home if no data
  if (!journeyDate || !bookingDate) {
    navigate('home');
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('home')}
          className="mb-6 text-primary dark:text-secondary hover:underline flex items-center space-x-2 group" // Changed
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>Calculate Another Date</span>
        </button>
        
        {/* Result Display */}
        <ResultDisplay 
           journeyDate={journeyDate}
           bookingDate={bookingDate}
           daysUntilBooking={daysUntilBooking}
        />
        
        {/* Calendar Integration */}
        <CalendarIntegration 
           bookingDate={bookingDate}
           journeyDate={journeyDate}
        />
        
        {/* Email Reminder */}
        <EmailReminder 
          bookingDate={bookingDate}
          journeyDate={journeyDate}
        />
      </div>
    </div>
  );
};

export default ResultPage;