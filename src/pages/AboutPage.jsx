import React from 'react';
import { Info, ArrowRight } from 'lucide-react';

const AboutPage = ({ navigate }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 animate-fadeIn">
          <div className="flex items-center space-x-3 mb-6">
            <Info className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              About IRCTC Booking Rules
            </h1>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                How Does IRCTC Advance Booking Work?
              </h2>
              <p className="leading-relaxed">
                Indian Railways allows passengers to book train tickets in advance through IRCTC. The advance reservation period helps passengers plan their journeys well ahead of time.
              </p>
            </section>

            <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                📋 General Quota Booking Rules
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Advance booking opens <strong>60 days before the date of journey</strong>, excluding the date of journey itself</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Booking opens at <strong>8:00 AM IST</strong> every day</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>You can book tickets online through IRCTC website or mobile app</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Maximum 6 passengers can be booked in one ticket</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                🎯 Example Calculation
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <p className="mb-2">If your <strong>Date of Journey (DOJ)</strong> is:</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  January 20, 2026
                </p>
                <p className="mb-2">Then booking opens on:</p>
                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  November 21, 2025
                </p>
                <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                  (60 days before January 20, excluding the journey date)
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                ⚡ Tatkal Booking
              </h3>
              <p className="leading-relaxed mb-3">
                For last-minute bookings, IRCTC also offers Tatkal quota tickets:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start space-x-3">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                  <span>Opens <strong>1 day before</strong> the date of journey</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                  <span>AC classes: 10:00 AM IST</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                  <span>Non-AC classes: 11:00 AM IST</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                  <span>Higher charges apply for Tatkal tickets</span>
                </li>
              </ul>
            </section>

            <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                💡 Pro Tips for Booking
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Set calendar reminders and email alerts to never miss booking windows</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Keep your IRCTC login credentials ready before booking opens</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Have passenger details saved in your IRCTC account for faster booking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Book early during festival seasons as trains fill up quickly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Use flexible date options to check availability on nearby dates</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                🎓 About This Project
              </h3>
              <p className="leading-relaxed">
                This IRCTC Booking Window Calculator is a personal B.Tech project designed to help travelers never miss their train booking windows. The calculator automatically computes when booking opens based on IRCTC's advance booking rules and provides convenient calendar integration and email reminder services.
              </p>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Disclaimer:</strong> This is an educational project and is not affiliated with IRCTC or Indian Railways. Always verify booking dates on the official IRCTC website.
                </p>
              </div>
            </section>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('home')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center space-x-2"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>Calculate Your Booking Date</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;