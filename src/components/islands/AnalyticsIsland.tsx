import React, { useState } from 'react';
import { Lock, BarChart3, Users, Eye } from 'lucide-react';

interface Analytics {
  totalVisits: number;
  uniqueVisitors: number;
  visitsByPath: Record<string, number>;
  period: string;
}

export default function AnalyticsIsland() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminKey = import.meta.env.PUBLIC_ADMIN_KEY;
    if (!adminKey) {
      setError('Admin key not configured. Set PUBLIC_ADMIN_KEY in your .env file.');
      return;
    }
    if (password === adminKey) {
      setIsAuthenticated(true);
      fetchAnalytics();
    } else {
      setError('Invalid password');
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const adminKey = import.meta.env.PUBLIC_ADMIN_KEY;
      const response = await fetch(
        'https://us-central1-amit-srivatsa---strategic-consultant.cloudfunctions.net/getVisitorAnalytics',
        {
          method: 'GET',
          headers: {
            'x-admin-key': adminKey,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError('Failed to load analytics. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-black text-white rounded-full">
              <Lock size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-500 text-center mb-8">Enter password to view analytics.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Visitor Analytics</h1>
          <p className="text-gray-500 mt-1">Last 30 days</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading analytics...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">{error}</div>
        ) : analytics ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Visits</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalVisits}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <Eye size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Unique Visitors</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.uniqueVisitors}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                    <Users size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <BarChart3 size={20} className="text-gray-600 mr-3" />
                  <h2 className="text-lg font-bold text-gray-900">Visits by Page</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {Object.entries(analytics.visitsByPath)
                  .sort(([, a], [, b]) => b - a)
                  .map(([path, count]) => (
                    <div key={path} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <span className="text-gray-900 font-medium">{path || '/'}</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={fetchAnalytics}
            className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
          >
            Load Analytics
          </button>
        )}
      </div>
    </div>
  );
}
