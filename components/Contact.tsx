import React from 'react';
import { Mail, Calendar, Linkedin, MapPin, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-24 md:pt-32 pb-24">
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-black"></span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">let’s connect</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Let’s talk. Not a sales pitch. <br /> A thinking session.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            This call is for founders and small B2B teams who want clarity. Not more tools. Not more tactics. Clear thinking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* What this call is */}
                <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <h3 className="text-xl font-bold text-gray-900">What this call is</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        A 30–45 minute working conversation. We look at where you are stuck. We pressure-test your assumptions. We identify the one or two things that actually matter next.
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-6">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">You will leave with:</p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-gray-800 font-medium"><span className="text-green-600 font-bold">•</span> Sharper priorities</li>
                            <li className="flex items-center gap-2 text-gray-800 font-medium"><span className="text-green-600 font-bold">•</span> Fewer options</li>
                            <li className="flex items-center gap-2 text-gray-800 font-medium"><span className="text-green-600 font-bold">•</span> A clearer path forward</li>
                        </ul>
                    </div>
                </div>

                {/* What this call is NOT */}
                <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <h3 className="text-xl font-bold text-gray-900">What this call is not</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        It’s not a demo. It’s not a pitch deck walkthrough. It’s not free consulting theatre.
                    </p>
                    <p className="text-gray-800 font-medium">
                        If we’re a fit, we’ll know. If we’re not, you’ll still get value.
                    </p>
                </div>

                {/* Practical Details */}
                 <div className="bg-transparent p-4 md:p-0">
                    <div className="flex items-start gap-4 text-gray-500">
                        <Info size={24} className="flex-shrink-0 text-gray-400" />
                        <p className="text-sm leading-relaxed">
                            <strong className="text-gray-900 block mb-1">Practical details</strong>
                            Response time: within 24 hours. No obligation. No pressure. Just a useful conversation.
                        </p>
                    </div>
                 </div>

            </div>

            {/* Right Sticky Column */}
            <div className="lg:col-span-5 space-y-6">
                
                {/* Booking Card */}
                <div className="bg-black text-white rounded-[32px] p-8 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                    
                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 text-3xl">
                            👋
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Ready to think clearly?</h3>
                        <p className="text-gray-400 mb-8">Schedule your 30-min strategy session.</p>
                        
                        <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mb-4">
                            <Calendar size={18} />
                            Book consultation
                        </button>
                        
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                            <a href="mailto:hello@amit.com" className="hover:text-white transition-colors flex items-center gap-1">
                                <Mail size={14} /> Email me
                            </a>
                            <span>|</span>
                            <a href="https://linkedin.com" className="hover:text-white transition-colors flex items-center gap-1">
                                <Linkedin size={14} /> Connect on LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Location</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Based in Almere, Netherlands. Working with teams across NL and the EU. Remote-first. In-person when it makes sense.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </div>
  );
};
