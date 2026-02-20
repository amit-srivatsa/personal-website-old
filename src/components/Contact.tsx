import React from 'react';
import { Mail, Linkedin, MapPin } from 'lucide-react';
import { BookButton } from './BookButton';

export const Contact: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f7] pt-24 pb-12 px-6 flex items-center justify-center">

            <div className="max-w-md w-full bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-white">

                <div className="text-center mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">
                        Contact
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                        Let’s think together.
                    </h1>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        A 30-min session to clarify your strategy. No pitch. Just value.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Booking Button Container */}
                    <div className="flex justify-center w-full">
                        <BookButton label="Book Consultation" />
                    </div>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-300 text-[10px] uppercase font-bold tracking-widest">Or connect via</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <a href="mailto:amitsrivatsa@outlook.com" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200">
                            <Mail size={20} className="text-gray-400 group-hover:text-black mb-2 transition-colors" />
                            <span className="text-xs font-bold text-gray-900">Email</span>
                        </a>
                        <a href="https://www.linkedin.com/in/amit-srivatsa/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200">
                            <Linkedin size={20} className="text-gray-400 group-hover:text-[#0077b5] mb-2 transition-colors" />
                            <span className="text-xs font-bold text-gray-900">LinkedIn</span>
                        </a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <div className="inline-flex items-center gap-2 text-gray-400 text-xs font-medium">
                            <MapPin size={12} />
                            <span>Based in Almere, Netherlands</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};
