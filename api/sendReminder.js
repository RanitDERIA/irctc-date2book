import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Info } from 'lucide-react';

const EmailReminder = ({ bookingDate, journeyDate }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Format date helper
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
    if (!email || !email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email format (e.g., user@example.com)');
      return;
    }

    // Validate dates
    if (!bookingDate || !journeyDate) {
      setError('Please select both booking date and journey date first');
      return;
    }

    const daysUntil = getDaysUntil(bookingDate);
    if (daysUntil < 0) {
      setError('Booking date has already passed. Please select a future date.');
      return;
    }

    setIsLoading(true);

    try {
      // Use absolute URL in production, relative in development
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/sendReminder' 
        : '/api/sendReminder';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          name: email.split('@')[0] || 'User',
          bookingDate: formatDate(bookingDate),
          journeyDate: formatDate(journeyDate),
          daysUntil,
        }),
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setEmailSent(true);
        setEmail(''); // Clear email immediately
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setEmailSent(false);
        }, 5000);
      } else {
        throw new Error(data.message || 'Failed to send email');
      }
    } catch (err) {
      console.error('❌ Email sending failed:', err);
      
      // User-friendly error messages
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Network error. Please check your internet connection and try again.');
      } else if (err.message.includes('rate limit')) {
        setError('Too many requests. Please wait a moment and try again.');
      } else if (err.message.includes('API')) {
        setError('Email service is currently unavailable. Please try again later.');
      } else {
        setError(err.message || 'Failed to send email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleEmailReminder();
    }
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
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        />

        <button
          onClick={handleEmailReminder}
          disabled={isLoading || !email.trim()}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
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

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 flex items-start space-x-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {emailSent && (
        <div className="mt-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4 flex items-center space-x-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-green-700 dark:text-green-300 font-medium">
            ✅ Reminder set successfully! Check your inbox.
          </p>
        </div>
      )}

      {/* Info Message */}
      <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          You'll receive a reminder email 24 hours before your booking date. Make sure to check your spam folder if you don't see it in your inbox.
        </p>
      </div>
    </div>
  );
};

export default EmailReminder;