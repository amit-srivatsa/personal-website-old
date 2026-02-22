import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsentIsland() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookieConsent', 'granted');
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookieConsent', 'denied');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-6 py-4 shadow-lg print:hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
          This site uses cookies for analytics (Google Analytics 4) to understand how visitors use it.
          No personal data is sold or shared.{' '}
          <a href="/privacy" className="underline text-gray-900 hover:text-orange-600 transition-colors">
            Privacy policy
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-semibold text-white bg-black border border-black rounded-full hover:bg-gray-800 transition-all"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
