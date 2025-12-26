import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { label: 'Overview', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'CV', path: '/cv' },
  { label: 'Writing', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${
          isMobileMenuOpen
            ? 'bg-white border-transparent' // Solid white when menu is open to hide content behind
            : isScrolled
              ? 'bg-white/80 backdrop-blur-xl border-gray-200'
              : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-xl font-semibold tracking-tight text-gray-900 z-50 relative"
              aria-label="Amit Srivatsa Home"
            >
              Amit Srivatsa
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-black' : 'text-gray-500 hover:text-black'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="px-5 py-2 text-xs font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-transform transform hover:scale-105 active:scale-95"
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden z-50 p-2 -mr-2 text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden flex flex-col pt-24 px-6 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-3xl font-bold tracking-tight ${
                  isActive ? 'text-black' : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-8">
            <Link
              to="/contact"
              className="inline-block w-full py-4 text-center text-sm font-bold text-white bg-black rounded-xl"
            >
              Book Consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};