import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
              My services
            </h1>
            <p className="text-lg text-gray-500 font-medium mb-2">
              My services are designed to create clarity. Not dependency. Not long-term lock-in.
            </p>
            <p className="text-base text-gray-500">
              Each service exists for a specific stage. And a specific kind of problem.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-600 shadow-sm border border-gray-100">
              {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <button className="bg-[#1A1A1A] text-white p-2 rounded-full hover:bg-black transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Business Card - Sage Green Theme */}
          <DashboardCard 
            emoji="💼"
            category="For Businesses"
            title="Strategic consulting"
            description="Best for founders and small B2B teams. Especially when decisions feel heavy or unclear. This is a short, focused engagement. We work through one real problem together."
            details={[
              "A clear point of view",
              "A written strategy outline",
              "Concrete next steps"
            ]}
            extraText="This is not ongoing execution. It’s high-leverage thinking."
            tags={["Strategy", "Clarity"]}
            buttonText="Book Consultation"
            link="/contact"
            theme="sage"
          />

          {/* Hustlers Card - Peach/Beige Theme */}
          <DashboardCard 
            emoji="💪"
            category="For Builders"
            title="Tools & community"
            description="Best for independents and early-stage builders. People who want leverage, not hustle. This is access, not hand-holding. Tools, templates, and shared learning."
            details={[
              "No-code Tools",
              "Templates",
              "Shared Learning"
            ]}
            extraText="Designed to compound over time. And save you months of trial and error."
            tags={["Leverage", "Tools"]}
            buttonText="View resources"
            link="#" 
            theme="peach"
          />

          {/* Students Card - Slate/Blue Theme */}
          <DashboardCard 
            emoji="🎓"
            category="For Students"
            title="Career guidance"
            description="Best for students and early-career marketers. Especially those worried about relevance. This is not CV polishing. It’s career direction."
            details={[
              "Future-proof skills",
              "Reframing your profile",
              "Making smart career bets"
            ]}
            extraText="If you’re unsure where you fit. Start with a conversation."
            tags={["Direction", "Mentorship"]}
            buttonText="Start conversation"
            link="/contact"
            theme="slate"
          />

        </div>
        
        <div className="mt-16 text-center">
            <p className="text-gray-500 font-medium">If you’re unsure where you fit. Start with a conversation.</p>
        </div>

      </div>
    </div>
  );
};

interface DashboardCardProps {
  emoji: string;
  category: string;
  title: string;
  description: string;
  details: string[];
  extraText?: string;
  tags: string[];
  buttonText: string;
  link: string;
  theme: 'sage' | 'peach' | 'slate';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  emoji, category, title, description, details, extraText, tags, buttonText, link, theme 
}) => {
  
  // Theme map
  const themes = {
    sage: {
      bg: "bg-[#E5F0DB]", // Light Green
      text: "text-[#3F6212]", // Dark Green
      tagBg: "bg-[#F2F7ED]",
      buttonBg: "bg-[#3F6212]",
      buttonText: "text-white"
    },
    peach: {
      bg: "bg-[#F3E8D6]", // Light Beige/Peach
      text: "text-[#78350F]", // Dark Brown/Orange
      tagBg: "bg-[#FAF5ED]",
      buttonBg: "bg-[#78350F]",
      buttonText: "text-white"
    },
    slate: {
      bg: "bg-[#DDE5E9]", // Light Blue/Grey
      text: "text-[#334155]", // Dark Slate
      tagBg: "bg-[#F1F5F9]",
      buttonBg: "bg-[#334155]",
      buttonText: "text-white"
    }
  };

  const t = themes[theme];

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full relative border border-gray-100">
      
      <div className="flex justify-between items-start mb-6">
        {/* Emoji Container */}
        <div className={`h-16 w-16 rounded-2xl ${t.bg} flex items-center justify-center text-3xl shadow-inner`}>
          {emoji}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-1">{title}</h3>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{category}</p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {tags.map(tag => (
          <span key={tag} className={`px-3 py-1 rounded-lg text-xs font-bold ${t.bg} ${t.text} opacity-80`}>
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-500 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* Bullet points area */}
      <ul className="mb-6 space-y-2">
         {details.map((detail, i) => (
             <li key={i} className="text-sm font-bold text-gray-800 flex items-center gap-2">
                 <span className={`w-1.5 h-1.5 rounded-full ${t.buttonBg}`}></span> {detail}
             </li>
         ))}
      </ul>
      
      {extraText && (
          <p className="text-xs text-gray-400 italic mb-8 flex-grow">{extraText}</p>
      )}

      {/* Footer with Button only */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <Link 
          to={link}
          className={`block w-full text-center py-4 rounded-xl font-bold transition-all hover:brightness-110 active:scale-95 shadow-sm ${t.buttonBg} ${t.buttonText}`}
        >
          {buttonText}
        </Link>
      </div>

    </div>
  );
};