import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Amit Srivatsa
            </span>
            <p className="mt-4 text-base text-gray-500 max-w-sm leading-relaxed">
              <b>Enterprise-level thinking. <br></br>Built for small, focused teams.</b><br></br>
              <br></br>
              I help founders and B2B teams replace noise with clarity. Using AI, strategy, and systems that scale without bloat.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Directory
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-base text-gray-500 hover:text-black transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-base text-gray-500 hover:text-black transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-base text-gray-500 hover:text-black transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/cv" className="text-base text-gray-500 hover:text-black transition-colors">
                  CV
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-500 hover:text-black transition-colors">
                  Writing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-black transition-colors">
                  Book a consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="https://www.linkedin.com/in/amit-srivatsa/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
              {/* TODO: Add real Twitter/GitHub URLs when available */}
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Amit Srivatsa. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Designed with <span className="text-black">Precision</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};