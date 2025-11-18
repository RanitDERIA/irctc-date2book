import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

// Define the backend URL from environment variables or fallback to the provided Render URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://irctc-email-backend.onrender.com';

const EmailReminder = ({ bookingDate, journeyDate }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Format date helper
  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // Calculate days until booking
  const getDaysUntil = (targetDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  };

  const handleEmailReminder = async () => {
    setError('');
    setEmailSent(false);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email format (e.g., user@example.com)');
      return;
    }

    const daysUntil = getDaysUntil(bookingDate);
    if (daysUntil < 0) {
      setError('Booking date has already passed. Please select a future date.');
      return;
    }

    setIsLoading(true);

    try {
      // Use the BACKEND_URL constant for the fetch request
      const response = await fetch(`${BACKEND_URL}/api/sendReminder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: email.split('@')[0],
          bookingDate: formatDate(bookingDate),
          journeyDate: formatDate(journeyDate),
          daysUntil,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
          setEmail('');
        }, 5000);
      } else {
        setError('Failed to send email. Please try again later.');
      }
    } catch (err) {
      console.error('Email sending failed:', err);
      setError('Unexpected error occurred while sending email.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) handleEmailReminder();
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl shadow-xl p-8 border border-orange-200 dark:border-orange-800">
      <div className="flex items-center space-x-3 mb-6">
        <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Email Reminder
        </h2>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Get a free email reminder one day before booking opens.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          placeholder="Enter your email address"
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleEmailReminder}
          disabled={isLoading}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              <span>Set Reminder</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-100 border border-red-300 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {emailSent && (
        <div className="mt-4 bg-green-100 border border-green-300 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-700 font-medium">
            ✅ Reminder set successfully! Check your inbox.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailReminder;