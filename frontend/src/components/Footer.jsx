import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-900">Job Hunt</h2>
            <p className="text-sm text-gray-500">
              © 2024 Job Hunt. All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-blue-600"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.3 3h-1.9v7A10 10 0 0022 12z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-sky-500"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.59 8.59 0 01-2.72 1.04 4.26 4.26 0 00-7.26 3.88A12.1 12.1 0 013 4.79a4.26 4.26 0 001.32 5.68 4.2 4.2 0 01-1.93-.53v.05a4.27 4.27 0 003.42 4.18 4.3 4.3 0 01-1.92.07 4.27 4.27 0 003.98 2.96A8.55 8.55 0 012 19.54 12.07 12.07 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-blue-700"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zM8 19H5V9h3v10zM6.5 7.7a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM20 19h-3v-5.3c0-1.3 0-3-1.9-3s-2.1 1.5-2.1 2.9V19h-3V9h2.9v1.4h.1c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8V19z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
