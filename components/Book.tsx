import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Book: React.FC = () => {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden min-h-screen bg-white">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/40 to-yellow-100/40 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-black mb-8 transition-colors group">
                        <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                        Book a Consultation.
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed max-w-2xl font-medium">
                        Let's discuss your AI strategy, content marketing needs, or career growth.
                        Select a time that works for you below.
                    </p>
                </div>

                <div className="w-full bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden ring-1 ring-gray-100">
                    <iframe
                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0J-z0?gv=true"
                        style={{ border: 0 }}
                        width="100%"
                        height="800"
                        frameBorder="0"
                        title="Book a Consultation"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};
