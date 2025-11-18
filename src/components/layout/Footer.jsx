import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer = ({ navigate }) => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/brand.png"
                alt="Logo"
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-lg font-bold flex items-center">
                {/* "IRCTC" - Deep Blue & Extra Bold with shadow */}
                <span className="text-[#000075] font-extrabold tracking-tight mr-2 drop-shadow-md">
                  IRCTC
                </span>
                {/* "Date2Book" - Full version with shadows */}
                <span className="text-black dark:text-white drop-shadow-md">Date</span>
                <span className="text-[#FEBF4F] drop-shadow-md">2</span>
                <span className="text-black dark:text-white drop-shadow-md">Book</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm drop-shadow-sm">
              Never miss your train booking window. Calculate, set reminders, and book with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 drop-shadow-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('home')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors drop-shadow-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors drop-shadow-sm"
                >
                  About IRCTC Rules
                </button>
              </li>
              <li>
                <a
                  href="https://www.irctc.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors flex items-center space-x-1 drop-shadow-sm"
                >
                  <span>Official IRCTC Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 drop-shadow-sm">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/RanitDERIA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors flex items-center space-x-1 drop-shadow-sm"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ranit-deria-916864257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors flex items-center space-x-1 drop-shadow-sm"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:bytebardderia@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors drop-shadow-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left drop-shadow-sm">
              © {currentYear} <span className="font-semibold">IRCTC Date2Book</span>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-right drop-shadow-sm">
              Not affiliated with <i>IRCTC</i> or <i>Indian Railways</i>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm drop-shadow-sm">
              Made with <span className="text-red-500">❤️</span> by <b><a href='https://profession-folio.vercel.app/' target="_blank"
                  rel="noopener noreferrer">RanitDERIA</a></b>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;