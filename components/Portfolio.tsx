import React from 'react';
import { ArrowRight, Layers, PenTool, Zap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
              Selected work (thematic)
            </h1>
            <p className="text-lg text-gray-500 font-medium mb-2">
              This portfolio is organised by theme. Because patterns matter more than timelines.
            </p>
            <p className="text-base text-gray-500">
              Each theme represents a way I think. And a class of problems I work on.
            </p>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <ThemeCard 
            icon={<Layers size={24} />}
            title="AI strategy & adoption"
            description="Projects focused on: making AI usable inside real teams, designing AI-first workflows, deciding what not to automate."
            includes={["AI adoption roadmaps", "Internal AI agents", "Experimentation frameworks"]}
            color="bg-blue-50 text-blue-700"
          />

          <ThemeCard 
            icon={<PenTool size={24} />}
            title="Content systems & internal tooling"
            description="Projects focused on: turning content into systems, reducing manual marketing work, building repeatable processes."
            includes={["Content operating models", "Internal dashboards", "Playbooks and templates"]}
            color="bg-purple-50 text-purple-700"
          />

          <ThemeCard 
            icon={<Zap size={24} />}
            title="No-code automation & experiments"
            description="Projects focused on: speed over perfection, learning by building, testing ideas cheaply."
            includes={["No-code tools", "Workflow automations", "Quick prototypes"]}
            color="bg-orange-50 text-orange-700"
          />

          <ThemeCard 
            icon={<BookOpen size={24} />}
            title="Research & strategic frameworks"
            description="Projects focused on: sense-making, structuring messy problems, decision support."
            includes={["Research reports", "Strategic models", "Internal decision frameworks"]}
            color="bg-green-50 text-green-700"
          />

        </div>
        
        <div className="mt-16 bg-white rounded-[32px] p-8 md:p-12 text-center border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why this section exists</h3>
            <p className="text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
                I don’t believe in generic case studies. I believe in showing how I think.
                If you’re considering working together. This section will help you decide faster.
            </p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                You’re not looking for polish. You’re looking for judgment.
            </p>
        </div>

      </div>
    </div>
  );
};

interface ThemeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  includes: string[];
  color: string;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ icon, title, description, includes, color }) => {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color}`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      
      <p className="text-gray-500 leading-relaxed mb-8">
        {description}
      </p>

      <div className="mt-auto bg-gray-50 rounded-2xl p-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Includes</p>
        <ul className="space-y-2">
            {includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-medium text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    {item}
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};