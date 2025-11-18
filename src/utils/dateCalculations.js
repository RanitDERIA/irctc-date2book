/**
 * Calculate booking open date (60 days before DOJ, excluding DOJ)
 * @param {string} journeyDate - Date in YYYY-MM-DD format
 * @returns {Date} - Booking open date
 */
export const calculateBookingDate = (journeyDate) => {
  const doj = new Date(journeyDate);
  const bookingOpen = new Date(doj);
  bookingOpen.setDate(doj.getDate() - 60);
  return bookingOpen;
};

/**
 * Calculate days until booking opens
 * @param {string} bookingDate - Date in YYYY-MM-DD format
 * @returns {number} - Number of days
 */
export const calculateDaysUntil = (bookingDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const booking = new Date(bookingDate);
  booking.setHours(0, 0, 0, 0);
  const diffTime = booking - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or string
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Validate if date is not in the past
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean} - True if valid
 */
export const isValidFutureDate = (dateString) => {
  if (!dateString) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(dateString);
  selected.setHours(0, 0, 0, 0);
  
  return selected >= today;
};