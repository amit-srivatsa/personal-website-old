import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export default function NewsletterIsland() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setError('An unexpected error occurred.');
      setStatus('error');
    }
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-20" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-t from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -z-10 translate-y-1/3 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-black text-white rounded-2xl shadow-lg shadow-black/10">
              <Mail size={24} />
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Sunday Insights.
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed mb-8 font-medium">
              A weekly distillation of marketing strategy, AI trends, and career acceleration tips.
              No spam. Just signal.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-3 overflow-hidden p-1">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white shadow-md object-cover"
                    src={`https://picsum.photos/100/100?random=${i + 10}`}
                    alt="Subscriber"
                    loading="lazy"
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                Join the network today.
              </span>
            </div>
          </div>

          <div className="w-full max-w-md relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-[2rem] opacity-30 blur-lg" />

            <div className="relative bg-white/60 backdrop-blur-xl p-8 rounded-[1.75rem] shadow-2xl ring-1 ring-white/60">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all duration-200 shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-black rounded-2xl hover:bg-gray-800 transition-all duration-200 active:scale-95 shadow-lg shadow-gray-900/20 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                {status === 'success' && <p className="text-sm text-center text-green-600 mt-2 font-medium">Subscription successful! Welcome.</p>}
                {status === 'error' && <p className="text-sm text-center text-red-600 mt-2 font-medium">{error}</p>}
                <p className="text-xs text-center text-gray-400 mt-2 font-medium">
                  Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
