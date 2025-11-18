import React from 'react';
import { Calendar, Download } from 'lucide-react';
import CalendarButton from '../ui/CalendarButton';
import { getGoogleCalendarLink, getOutlookCalendarLink } from '../../utils/calendarLinks';
import { downloadICS } from '../../utils/icsGenerator';

const CalendarIntegration = ({ bookingDate, journeyDate }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
        <Calendar className="w-6 h-6 text-blue-600" />
        <span>Add to Calendar</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalendarButton
          icon={<img src="/google.png" alt="" style={{ width: '30px', height: '30px' }} />}
          name="Google Calendar"
          onClick={() => window.open(getGoogleCalendarLink(bookingDate, journeyDate), '_blank')}
        />
        <CalendarButton
          icon={<img src="/outlook.png" alt="" style={{ width: '30px', height: '30px' }} />}
          name="Outlook Calendar"
          onClick={() => window.open(getOutlookCalendarLink(bookingDate, journeyDate), '_blank')}
        />
        <CalendarButton
          icon={<img src="/apple.png" alt="" style={{ width: '30px', height: '30px' }} />}
          name="Apple Calendar"
          onClick={() => downloadICS(bookingDate, journeyDate)}
        />
        <CalendarButton
          icon={<Download className="w-5 h-5" />}
          name="Download ICS"
          onClick={() => downloadICS(bookingDate, journeyDate)}
        />
      </div>
    </div>
  );
};

export default CalendarIntegration;