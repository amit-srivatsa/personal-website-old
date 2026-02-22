import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-2xl relative z-10">
              <img
                src="https://ik.imagekit.io/mws/main-site/amit-photo-2.jpeg"
                alt="Amit Srivatsa Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10" />
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-black"></span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">about me</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              I am a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">strategic partner</span> for clarity and growth.
            </h2>

            <div className="text-lg text-gray-600 leading-relaxed mb-8 space-y-4">
              <p>
                Most business decisions don’t fail because of lack of effort. They fail because the thinking underneath is fuzzy.
              </p>
              <p>
                I work with founders and small B2B teams who are overwhelmed by options. I help you slow down, choose wisely, and build systems that actually move the needle.
              </p>
              <p>
                I translate enterprise-level strategy into practical actions. Then I help you execute without burning out your team.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 mb-10 border-y border-gray-100 py-8">
              <div>
                <p className="text-4xl font-bold text-gray-900 mb-1">8+</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">years of experience</p>
                <p className="text-xs text-gray-400 mt-1">Across B2B, content, and digital strategy</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-900 mb-1">3</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">startups founded</p>
                <p className="text-xs text-gray-400 mt-1">Bootstrapped, learned the hard way, still standing</p>
              </div>
            </div>

            <Link
              to="/cv"
              className="inline-flex items-center text-base font-bold text-black hover:text-orange-600 transition-colors group"
            >
              Read my full story
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};