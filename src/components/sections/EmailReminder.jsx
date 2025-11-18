import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Info } from 'lucide-react';

const EmailReminder = ({ bookingDate, journeyDate }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Web3Forms API key from env
  const WEB3FORMS_API_KEY = import.meta.env.VITE_WEB3FORMS_API_KEY;
  const isConfigured = !!WEB3FORMS_API_KEY;

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

  // Sends to Web3Forms
  const sendEmailWeb3Forms = async (params) => {
    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_API_KEY);
    // Standard fields
    formData.append('email', params.user_email);
    formData.append('name', params.user_name);
    formData.append('subject', `IRCTC Reminder — ${params.booking_date_short}`);
    // Put the main body in message (you can also use custom keys)
    formData.append(
      'message',
      `Hi ${params.user_name},

Your IRCTC booking reminder has been scheduled.

Booking Date: ${params.booking_date}
Journey Date: ${params.journey_date}
Booking Time: ${params.booking_time}
Days until booking opens: ${params.days_until}

IRCTC Link: ${params.irctc_url}
App: ${params.app_name}

Thanks,
${params.app_name}`
    );

    // Additional custom fields (Web3Forms will forward these too)
    formData.append('booking_date_short', params.booking_date_short);
    formData.append('journey_date_short', params.journey_date_short);
    formData.append('booking_time', params.booking_time);
    formData.append('days_until', String(params.days_until));
    formData.append('irctc_url', params.irctc_url);
    formData.append('app_name', params.app_name);

    const resp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    // parse JSON safely
    const json = await resp.json().catch(() => null);
    return { ok: resp.ok, status: resp.status, json };
  };

  const handleEmailReminder = async () => {
    setError('');
    setEmailSent(false);

    if (!isConfigured) {
      setError(
        'Email service is not configured. Please set VITE_WEB3FORMS_API_KEY in your .env'
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
      const templateParams = {
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

      console.log('Sending via Web3Forms:', templateParams);

      const { ok, status, json } = await sendEmailWeb3Forms(templateParams);

      if (ok && json && json.success) {
        console.log('Web3Forms success response:', json);
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
          setEmail('');
        }, 5000);
      } else {
        console.error('Web3Forms error:', status, json);
        // Helpful error messages
        if (status === 401) {
          setError('Unauthorized: check your Web3Forms API key.');
        } else if (json && json.error) {
          setError(`Failed to send email: ${json.error}`);
        } else {
          setError('Failed to send email. Please try again later.');
        }
      }
    } catch (err) {
      console.error('Sending failed:', err);
      setError('An unexpected error occurred while sending the email.');
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
            <p>Please set up your Web3Forms API key in the .env file.</p>
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
          <li>We only use your email to send this reminder</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailReminder;
