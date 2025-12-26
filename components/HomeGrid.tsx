import React from 'react';
import { ArrowRight, MapPin, Mail, Linkedin, Zap, Coffee, Music, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomeGrid: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
        
        {/* 1. Bio Card - Large (Top Left) */}
        <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-1 bg-white rounded-[32px] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                     <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                            alt="Amit" 
                            className="w-full h-full object-cover"
                        />
                     </div>
                     <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available
                     </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    I'm <span className="text-orange-600">Amit</span>. A Strategist & <br/> AI Consultant.
                </h1>
                <p className="text-gray-500 mt-2 font-medium">
                    Helping businesses & students leverage AI for growth.
                </p>
            </div>
        </div>

        {/* 2. Map Card */}
        <div className="col-span-1 row-span-1 bg-blue-50 rounded-[32px] overflow-hidden relative group h-[280px] md:h-auto border-4 border-white shadow-sm">
            <img 
                src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/5.2322,52.3702,11,0/400x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGlubG54b3IwMTZ2M2Rxejkzcnl5Z2d6In0.MoTdGzFz-qjH1f8Q2qN1gA" 
                alt="Almere Map" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{ objectPosition: 'center' }} 
            />
            {/* Fallback pattern if Mapbox fails loading (no token) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-multiply pointer-events-none"></div>

            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                        <span className="text-2xl">🇳🇱</span>
                    </div>
                 </div>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
                Almere, NL
            </div>
        </div>

        {/* 3. Tall Service Card: For Businesses */}
        <Link to="/services" className="col-span-1 md:row-span-2 bg-black rounded-[32px] p-6 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
             {/* Background Gradient */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/30 transition-colors" />
             
             <div className="relative z-10 flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Zap size={20} />
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight size={16} />
                </div>
             </div>

             <div className="relative z-10 mt-auto">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Service</p>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                    Business <br/> Strategy
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Enterprise marketing strategy for SMEs using AI systems.
                </p>
             </div>
             
             {/* Hover Image Reveal */}
             <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-luminosity"
                alt="Business"
             />
        </Link>

        {/* 4. Spotify / Interest Card */}
        <div className="col-span-1 row-span-1 bg-white rounded-[32px] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Music size={20} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase">Listening To</span>
                    <span className="text-sm font-bold text-gray-900 truncate max-w-[120px]">Focus Flow</span>
                </div>
             </div>
             
             {/* Animated Bars */}
             <div className="flex items-end gap-1 h-12 mt-4 opacity-50">
                <div className="w-2 bg-green-500 rounded-t-sm animate-[pulse_1s_ease-in-out_infinite] h-8"></div>
                <div className="w-2 bg-green-500 rounded-t-sm animate-[pulse_1.5s_ease-in-out_infinite] h-12"></div>
                <div className="w-2 bg-green-500 rounded-t-sm animate-[pulse_1.2s_ease-in-out_infinite] h-6"></div>
                <div className="w-2 bg-green-500 rounded-t-sm animate-[pulse_0.8s_ease-in-out_infinite] h-10"></div>
             </div>
        </div>

        {/* 5. Social Links (Split Cell) */}
        <div className="col-span-1 row-span-1 grid grid-cols-2 gap-4">
             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-[#0077b5] rounded-[32px] flex items-center justify-center text-white hover:scale-105 transition-transform shadow-sm">
                <Linkedin size={32} />
             </a>
             <a href="mailto:hello@amit.com" className="bg-orange-500 rounded-[32px] flex items-center justify-center text-white hover:scale-105 transition-transform shadow-sm">
                <Mail size={32} />
             </a>
        </div>

        {/* 6. Newsletter Card - Wide */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-[32px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm border border-gray-100">
             <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sunday Insights</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                    Join 10k+ readers. Marketing strategy, AI trends, and career tips. No spam.
                </p>
             </div>
             
             <div className="w-full md:w-auto flex-1 max-w-sm">
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        className="flex-1 px-4 py-3 bg-gray-100 rounded-xl border-none text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                    />
                    <button className="px-5 py-3 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">
                        Join
                    </button>
                </form>
             </div>
        </div>

        {/* 7. Tall Service Card: For Hustlers */}
        <Link to="/services" className="col-span-1 md:row-span-2 bg-[#F3E8D6] rounded-[32px] p-6 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/40 rounded-full blur-3xl -mr-12 -mt-12" />
             
             <div className="relative z-10 flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-[#78350F]">
                    <Coffee size={20} />
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight size={16} />
                </div>
             </div>

             <div className="relative z-10 mt-auto">
                <p className="text-[#78350F]/70 text-sm font-medium uppercase tracking-wider mb-2">Community</p>
                <h3 className="text-2xl font-bold text-[#78350F] leading-tight mb-2">
                    The Hustlers <br/> Tribe
                </h3>
                <p className="text-[#78350F]/80 text-sm leading-relaxed">
                    Resources to 10x your freelance career.
                </p>
             </div>
        </Link>

        {/* 8. Blog / Latest Post */}
        <Link to="/blog" className="col-span-1 md:col-span-2 bg-white rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all group border border-gray-100 relative overflow-hidden">
             <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-50 to-transparent"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Latest Writing</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    The Death of SEO (Again?)
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 max-w-md">
                    Search Generative Experience is fully live. Here is how you optimize for answer engines instead of search engines.
                </p>
                <div className="mt-6 flex items-center text-sm font-bold text-gray-900">
                    Read Article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
             </div>
        </Link>

        {/* 9. CV Link */}
        <Link to="/cv" className="col-span-1 bg-gray-900 rounded-[32px] p-6 flex flex-col justify-center items-center text-center text-white shadow-sm hover:bg-black transition-colors group">
            <span className="text-4xl mb-2 group-hover:-translate-y-1 transition-transform">📄</span>
            <span className="font-bold text-lg">View CV</span>
            <span className="text-gray-400 text-xs mt-1">Experience & Education</span>
        </Link>

      </div>
      
      {/* Footer Text */}
      <div className="mt-16 text-center">
        <p className="text-gray-400 text-sm font-medium">Designed with <span className="text-red-400">♥</span> by Amit Srivatsa.</p>
      </div>
    </div>
  );
};