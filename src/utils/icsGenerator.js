import { formatDate } from './dateCalculations';

/**
 * Generate ICS file content for calendar event
 * @param {string} bookingDate - Booking date in YYYY-MM-DD format
 * @param {string} journeyDate - Journey date in YYYY-MM-DD format
 * @returns {string} - ICS file content
 */
export const generateICS = (bookingDate, journeyDate) => {
  const booking = new Date(bookingDate);
  const journey = new Date(journeyDate);
  
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//IRCTC Booking Calculator//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@irctc-calculator.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(booking)}
DTEND:${formatICSDate(new Date(booking.getTime() + 60 * 60 * 1000))}
SUMMARY:🚂 IRCTC Ticket Booking Opens
DESCRIPTION:Booking opens today for train journey on ${formatDate(journey)}. Book your tickets now on IRCTC!
LOCATION:IRCTC Website
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Booking opens in 1 hour!
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
};

/**
 * Download ICS file to user's device
 * @param {string} bookingDate - Booking date
 * @param {string} journeyDate - Journey date
 */
export const downloadICS = (bookingDate, journeyDate) => {
  const icsContent = generateICS(bookingDate, journeyDate);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `irctc-booking-reminder-${bookingDate}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};