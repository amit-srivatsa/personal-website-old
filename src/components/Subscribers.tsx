import React, { useState } from 'react';
import { Lock, User, Calendar, ShieldCheck } from 'lucide-react';

interface Subscriber {
    id: string;
    email: string;
    source: string;
    subscribedAt: {
        _seconds: number;
        _nanoseconds: number;
    } | string;
}

export const Subscribers: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sends the password directly to the server in an Authorization header.
    // The server fetches the real secret from Secret Manager and compares.
    // The key is never stored in or compared within client-side code.
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/subscribers', {
                headers: { 'x-admin-key': password },
            });

            if (response.status === 401) {
                setError('Invalid password');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch subscribers');
            }

            const data = await response.json();
            setSubscribers(data);
            setIsAuthenticated(true);
        } catch (err) {
            setError('Failed to authenticate. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: any) => {
        if (!date) return 'Unknown';
        if (typeof date === 'string') return new Date(date).toLocaleDateString();
        if (date._seconds) return new Date(date._seconds * 1000).toLocaleDateString();
        return new Date(date).toLocaleDateString();
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
                    <p className="text-gray-500 text-center mb-8">Enter password to view subscribers.</p>

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
                            disabled={loading}
                            className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Access Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Subscribers</h1>
                        <p className="text-gray-500 mt-1">Manage newsletter audience</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-mono text-sm border border-gray-100">
                        Total: {subscribers.length}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading data...</div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Source</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {subscribers.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-3 text-blue-600">
                                                        <User size={14} />
                                                    </div>
                                                    <span className="font-medium text-gray-900">{sub.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                <div className="flex items-center">
                                                    <Calendar size={14} className="mr-2 text-gray-400" />
                                                    {formatDate(sub.subscribedAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                <span className="capitalize">{sub.source || 'newsletter'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <ShieldCheck size={12} className="mr-1" />
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {subscribers.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                                No subscribers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
