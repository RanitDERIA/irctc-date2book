import { formatDate } from './dateCalculations';

/**
 * Generate Google Calendar event link
 * @param {string} bookingDate - Booking date
 * @param {string} journeyDate - Journey date
 * @returns {string} - Google Calendar URL
 */
export const getGoogleCalendarLink = (bookingDate, journeyDate) => {
  const booking = new Date(bookingDate);
  const journey = new Date(journeyDate);
  
  const formatGoogleDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const title = encodeURIComponent('🚂 IRCTC Ticket Booking Opens');
  const details = encodeURIComponent(
    `Booking opens today for train journey on ${formatDate(journey)}. ` +
    `Book your tickets now on IRCTC!\n\nImportant: Booking opens at 8:00 AM IST.`
  );
  const startDate = formatGoogleDate(booking);
  const endDate = formatGoogleDate(new Date(booking.getTime() + 60 * 60 * 1000));

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=IRCTC+Website`;
};

/**
 * Generate Outlook Calendar event link
 * @param {string} bookingDate - Booking date
 * @param {string} journeyDate - Journey date
 * @returns {string} - Outlook Calendar URL
 */
export const getOutlookCalendarLink = (bookingDate, journeyDate) => {
  const booking = new Date(bookingDate);
  const journey = new Date(journeyDate);
  
  const title = encodeURIComponent('🚂 IRCTC Ticket Booking Opens');
  const body = encodeURIComponent(
    `Booking opens today for train journey on ${formatDate(journey)}. ` +
    `Book your tickets now!\n\nBooking Time: 8:00 AM IST`
  );
  const startDate = booking.toISOString();
  const endDate = new Date(booking.getTime() + 60 * 60 * 1000).toISOString();

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${body}&startdt=${startDate}&enddt=${endDate}&location=IRCTC+Website`;
};

/**
 * Generate Apple Calendar event link (uses ICS download)
 * @param {string} bookingDate - Booking date
 * @param {string} journeyDate - Journey date
 * @returns {string} - Data URL for ICS file
 */
export const getAppleCalendarLink = (bookingDate, journeyDate) => {
  // Apple Calendar uses ICS file format
  // This will trigger a download that Apple Calendar can open
  return null; // Handled by downloadICS function
};