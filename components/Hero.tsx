import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#F5F5F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-32 pb-16 lg:pt-48 lg:pb-24">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wide text-gray-600">
                Available for new projects
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6">
              Hi, I'm Amit! <br />
            </h1>
            
            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-xl mb-6">
              I build practical AI, content, and marketing systems for B2B teams who want results, not buzzwords. Enterprise-grade thinking. SME-friendly execution. 🏢 → 🚀
            </p>

            <p className="text-base text-gray-500 leading-relaxed max-w-xl mb-10">
              I work with founders and small teams to design simple, repeatable systems using AI, content, and strategy. Systems that compound over time and don’t collapse when the ads stop.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              >
                Book a free consultation
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-sm group">
                See how this works
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
             {/* Abstract Background Shape */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-200/40 via-pink-200/40 to-blue-200/40 rounded-full blur-3xl opacity-70" />
             
             {/* Main Image */}
             <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-out bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop" 
                  alt="Amit Srivatsa" 
                  className="w-full h-auto object-cover scale-105"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 max-w-[240px]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Focus</p>
                  <p className="text-sm font-bold text-gray-900">AI strategy, content systems, and smart automation</p>
                </div>
             </div>
          </div>

        </div>

        {/* Trusted By Section */}
        <div className="mt-24 pt-12 border-t border-gray-200/60">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
            I've built Content Strategy pipelines for Fortune 100 companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 transition-all duration-500">
             {/* Logos */}
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Adobe_Corporate_Logo.png/800px-Adobe_Corporate_Logo.png" alt="Adobe" className="h-10 w-auto object-contain hover:scale-105 transition-transform" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/NetApp_logo.svg" alt="NetApp" className="h-10 w-auto object-contain hover:scale-105 transition-transform" />
          </div>
        </div>

      </div>
    </section>
  );
};