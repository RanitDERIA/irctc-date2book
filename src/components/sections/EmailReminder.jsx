import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Info } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EmailReminder = ({ bookingDate, journeyDate }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // EmailJS Configuration - reads from environment variables
  const EMAILJS_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };

  const isConfigured =
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey;

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
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleEmailReminder = async () => {
    setError('');
    setEmailSent(false);

    if (!isConfigured) {
      setError(
        'Email service is not configured. Please check your environment variables.'
      );
      return;
    }

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
      // EmailJS expects "reply_to" or "user_email" instead of "to_email"
      const templateParams = {
        reply_to: email,
        user_email: email,
        user_name: email.split('@')[0],
        booking_date: formatDate(bookingDate),
        journey_date: formatDate(journeyDate),
        booking_date_short: bookingDate,
        journey_date_short: journeyDate,
        booking_time: '8:00 AM IST',
        days_until: daysUntil,
        irctc_url: 'https://www.irctc.co.in',
        app_name: 'IRCTC Date2Book',
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log('Email sent successfully:', response);
      setEmailSent(true);

      setTimeout(() => {
        setEmailSent(false);
        setEmail('');
      }, 5000);
    } catch (err) {
      console.error('Email sending failed:', err);
      if (err.text) {
        setError(`Failed to send email: ${err.text}`);
      } else if (err.status === 400) {
        setError('Invalid email configuration. Please check your EmailJS settings.');
      } else if (err.status === 401) {
        setError('EmailJS authentication failed. Please verify your public key.');
      } else if (err.status === 422) {
        setError('EmailJS rejected the request. Check template parameters.');
      } else {
        setError('Failed to send email. Please try again later.');
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow-md">
          Email Reminder
        </h2>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 drop-shadow-sm">
        Get a free email reminder one day before booking opens. We'll send you a
        notification so you never miss your booking window!
      </p>

      {!isConfigured && (
        <div className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 flex items-start space-x-3">
          <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-yellow-700 dark:text-yellow-400 text-sm">
            <p className="font-medium mb-1">Email service not configured</p>
            <p>
              Please set up your EmailJS credentials in the .env file to enable
              email reminders.
            </p>
          </div>
        </div>
      )}

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
          disabled={isLoading || !isConfigured}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all drop-shadow-sm"
        />
        <button
          onClick={handleEmailReminder}
          disabled={isLoading || !isConfigured}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed drop-shadow-md"
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
        <div className="mt-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 flex items-start space-x-3 animate-slideDown">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-400 text-sm drop-shadow-sm">
            {error}
          </p>
        </div>
      )}

      {emailSent && (
        <div className="mt-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4 flex items-center space-x-3 animate-slideDown">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-green-700 dark:text-green-400 font-medium drop-shadow-sm">
            ✅ Email reminder set successfully! Check your inbox for confirmation.
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 drop-shadow-sm">
        <p className="font-medium mb-1">📋 Note:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Reminder will be sent 24 hours before booking opens</li>
          <li>Check your spam folder if you don't receive the email</li>
          <li>Free service - no registration required</li>
          <li>Your email is not stored and used only for this reminder</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailReminder;
