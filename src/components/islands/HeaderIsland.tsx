import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavLink {
  label: string;
  path: string;
}

const navLinks: NavLink[] = [
  { label: 'Overview', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'CV', path: '/cv' },
  { label: 'Writing', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

interface HeaderProps {
  currentPath: string;
}

export default function HeaderIsland({ currentPath }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check initial theme state
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    const shouldBeDark = saved === 'dark' || (saved === null && prefersDark);
    setIsDark(shouldBeDark);
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${isMobileMenuOpen
          ? 'bg-white dark:bg-gray-900 border-transparent'
          : isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200 dark:border-gray-700'
            : 'bg-transparent border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="/" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 z-50 relative" aria-label="Amit Srivatsa Home">
              Amit Srivatsa
            </a>

            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-medium transition-colors duration-200 ${isActive ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isMounted && (isDark ? <Sun size={20} /> : <Moon size={20} />)}
              </button>
              <a
                href="https://calendar.app.google/jcY3JgK9YACJ3SA5A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold text-white dark:text-black bg-black dark:bg-white rounded-full border border-transparent hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-sm px-6 py-3 text-sm"
              >
                Book Consultation
              </a>
            </div>

            <button
              className="md:hidden z-50 p-2 -mr-2 text-gray-900 dark:text-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-white dark:bg-gray-900 z-40 md:hidden flex flex-col pt-24 px-6 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                className={`text-3xl font-bold tracking-tight ${isActive ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-8">
            <div className="pt-8 flex justify-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isMounted && (isDark ? <Sun size={20} /> : <Moon size={20} />)}
              </button>
              <a
                href="https://calendar.app.google/jcY3JgK9YACJ3SA5A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold text-white dark:text-black bg-black dark:bg-white rounded-full border border-transparent hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-sm px-6 py-3 text-sm"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
