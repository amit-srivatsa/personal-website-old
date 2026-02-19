import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, MapPin, ExternalLink, Download, ArrowUpRight, Share2, Briefcase, Rocket, GraduationCap, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TabItem {
  id: string;
  label: string;
  role: string;
  summary: string;
  icon: string;
  period: string;
  company: string;
  content: (string | React.ReactNode)[];
  link?: string;
}

export const CV: React.FC = () => {
  const [greeting, setGreeting] = useState('About Me 👋');
  
  const [activeExp, setActiveExp] = useState('solid');
  const [activeEnt, setActiveEnt] = useState('magic');
  const [activeEdu, setActiveEdu] = useState('tias');

  useEffect(() => {
    const hour = new Date().getHours();
    let text = 'About Me 👋';
    if (hour < 12) text = 'Good Morning! 👋';
    else if (hour < 18) text = 'Good Afternoon! 👋';
    else text = 'Good Evening! 👋';
    setGreeting(text);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Amit Srivatsa - CV',
          text: 'Check out this CV.',
          url: url,
        });
      } catch {
        // User cancelled share dialog
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    window.print();
  };

  const cardBaseStyle = 'bg-white border-black/5 shadow-sm text-gray-700 dark:bg-[#1c1c1e] dark:border-white/10 dark:shadow-black/40 dark:text-gray-200';

  /* --- DATA: EXPERIENCE --- */
  const experiences: Record<string, TabItem> = {
    solid: {
      id: 'solid',
      label: 'Solid Optics EU NV',
      company: 'Solid Optics EU NV',
      role: 'Marketing Coordinator',
      summary: 'expert in custom fiber optic solutions for data centers.',
      icon: '🇳🇱',
      period: '2025 ← 2024',
      content: [
        <>Introduced <strong>AI-assisted workflows</strong> that <strong>cut content production time by ~50%</strong>.</>,
        <>Created <strong>training videos and quizzes</strong> for optics testers, making <strong>onboarding</strong> easier and consistent.</>,
        <>Turned old HR/ISO policies into <strong>12+ short animated videos</strong>, supporting <strong>ISO audits</strong>.</>,
        <>Planned marketing support for industry events, <strong>improving post-event sales follow-ups</strong>.</>
      ]
    },
    adobe: {
      id: 'adobe',
      label: 'Adobe Inc',
      company: 'Adobe Inc',
      role: 'Sr Content Strategist',
      summary: 'global leader in digital media and marketing solutions.',
      icon: '🇮🇳',
      period: '2023 ← 2022',
      content: [
        <>Blended <strong>creative storytelling</strong> with <strong>data-driven insights</strong> to drive brand awareness.</>,
        <>Boosted <strong>user acquisition by 11%</strong> through strategic content and SEO initiatives.</>,
        <>Increased <strong>trial-to-paid conversions by 6%</strong> with targeted self-service content paths.</>,
        <>Collaborated globally to build <strong>scalable content strategies</strong> across regions.</>
      ]
    },
    netapp: {
      id: 'netapp',
      label: 'NetApp Inc',
      company: 'NetApp Inc',
      role: 'Content Strategist',
      summary: 'cloud-led, data-centric software company.',
      icon: '🇮🇳',
      period: '2022 ← 2019',
      content: [
        <>Optimized knowledge base to <strong>reduce bounce rates by 20%</strong> and boost <strong>CTR by 10%</strong>.</>,
        <>Enhanced <strong>AI-driven chatbots</strong>, resulting in a <strong>30% increase in user engagement</strong>.</>,
        <>Leveraged <strong>automation via Copilot</strong> to significantly improve project execution speed.</>,
        <>Collaborated with engineering and product teams to <strong>align technical messaging</strong>.</>
      ]
    },
    fullcircus: {
      id: 'fullcircus',
      label: 'Full Circus Media',
      company: 'Full Circus Media',
      role: 'Content Writer & Designer',
      summary: 'boutique agency specialized in high-conversion content.',
      icon: '🇮🇳',
      period: '2018 ← 2015',
      content: [
        <>Executed high-quality <strong>copy-driven content creation</strong> for diverse B2B and B2C clients.</>,
        <>Designed entire <strong>Corporate Identity sets</strong> including brochures and high-conversion flyers.</>,
        <>Managed <strong>performance marketing campaigns</strong> on Google Ads & LinkedIn with measurable ROI.</>,
        <>Led <strong>creative direction</strong> for multiple startup brand launches and rebrands.</>
      ]
    }
  };

  /* --- DATA: ENTREPRENEURSHIP --- */
  const entrepreneurship: Record<string, TabItem> = {
    magic: {
      id: 'magic',
      label: 'Magic Wand',
      company: 'Magic Wand Solutions',
      role: 'Founder & AI Strategist',
      summary: 'Specializing in custom AI integration and fractional CMO services.',
      icon: '🪄',
      period: '2023 - 2025',
      content: [
        "Building a strategic consultancy focused on integrating AI systems for SMEs.",
        "Developing proprietary frameworks for automated content engines.",
        "Providing fractional CMO services to international clients."
      ]
    },
    meraki: {
      id: 'meraki',
      label: 'Meraki Works',
      company: 'Meraki Works',
      role: 'Managing Partner',
      summary: 'Creative collective focused on brand identity for early-stage startups.',
      icon: '🎨',
      period: '2020 - 2021',
      content: [
        "Led a creative collective focusing on brand identity for early-stage startups.",
        "Bridged the gap between aesthetics and business goals for niche markets.",
        "Managed a remote team of designers and copywriters."
      ]
    },
    brandone: {
      id: 'brandone',
      label: 'BrandOne',
      company: 'BrandOne Apparels',
      role: 'Founder',
      summary: 'Profitable streetwear brand built on lean supply chain.',
      icon: '👕',
      period: '2018 - 2019',
      content: [
        "Founded and scaled a Shopify-based clothing brand generating early profitability.",
        "Generated Rs 180,000 in revenue through organic social marketing.",
        "Grew organic Instagram following to over 1,000 in three months."
      ]
    }
  };

  /* --- DATA: EDUCATION --- */
  const education: Record<string, TabItem> = {
    tias: {
      id: 'tias',
      label: 'MBA',
      company: 'TIAS School for Business',
      role: 'Full-time MBA',
      summary: 'Awarded Scholarship for Future Leaders.',
      icon: '🇳🇱',
      period: '2023 - 2024',
      content: ['Awarded Scholarship for Future Leaders.']
    },
    tse: {
      id: 'tse',
      label: 'Masters (1) Econ',
      company: 'Toulouse School of Econ',
      role: 'Masters in Economics',
      summary: 'Founding member of the TSEconomist Student Magazine.',
      icon: '🇫🇷',
      period: '2013 - 2015',
      content: ['Founding member of the TSEconomist Student Magazine.']
    },
    sssihl: {
      id: 'sssihl',
      label: 'BSc (Hons) Econ',
      company: 'SSSIHL',
      role: 'BSc (Hons) Economics',
      summary: 'Graduated with Distinction and Honors.',
      icon: '🇮🇳',
      period: '2008 - 2011',
      content: ['Graduated with Distinction and Honors.']
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 transition-colors duration-300 bg-[#f5f5f7] text-[#1d1d1f] dark:bg-black dark:text-gray-100">
      
      <div className="max-w-5xl mx-auto">

        <div className="px-5 py-8 md:py-12 flex flex-col items-center text-center relative">
          <div className="absolute right-0 top-2 flex gap-2">
             <button 
               onClick={handleShare}
               className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
               title="Share"
             >
               <Share2 size={14} />
            </button>
             <button 
                onClick={handleDownload}
               className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
               title="Download CV"
             >
              <Download size={14} />
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 leading-tight">Amit Srivatsa Gorti</h1>
          <div className="text-lg md:text-xl text-gray-500 font-normal mb-6">Strategist. Creator. AI Enthusiast.</div>
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-2 rounded-2xl border shadow-sm bg-white border-black/5 dark:bg-[#1c1c1e] dark:border-white/10">
            <div className="flex items-center gap-2 text-sm font-medium"><MapPin size={14} className="text-purple-600" /> Almere, NL</div>
            <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
            <a href="mailto:amitsrivatsa@outlook.com" className="flex items-center gap-2 text-sm font-medium hover:text-purple-600 transition-colors"><Mail size={14} className="text-purple-600" /> Email</a>
            <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
            <a href="https://www.linkedin.com/in/amit-srivatsa/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-purple-600 transition-colors"><Linkedin size={14} className="text-purple-600" /> LinkedIn</a>
          </div>
        </div>

        <div className="px-5 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            <div className={`col-span-1 md:col-span-8 p-6 md:p-8 rounded-[32px] border ${cardBaseStyle}`}>
              <h2 className="text-xl font-bold mb-3">{greeting}</h2>
              <p className="text-base mb-3 leading-relaxed">
                I work at the <span className="font-bold">intersection of AI, marketing, and decision-making</span>.
                My focus is on <span className="font-bold">using AI responsibly</span> to <span className="font-bold">improve real workflows</span>, not chase tools.
                I care about work that <span className="font-bold">solves real problems</span> and compounds over time.
              </p>
              <p className="text-base mb-4 leading-relaxed">
                As a founder and consultant, I bring <span className="font-bold">entrepreneurial judgment</span> to every engagement. I partner closely with teams to <span className="font-bold">design systems</span> that hold up beyond the strategy deck.
              </p>
              <div className="inline-flex px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#0071e3] to-[#4facfe] text-white shadow-sm">Focus: GenAI Strategy</div>
            </div>

            <div className="col-span-1 md:col-span-4 p-6 md:p-8 rounded-[32px] bg-gradient-to-br from-[#0071e3] to-[#4facfe] text-white flex flex-col">
              <h2 className="text-xl font-bold mb-6 pb-6 border-b border-white/20">Quick Specs ⚡️</h2>
              <div className="flex flex-col justify-between flex-grow">
                <div className="mb-6">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-3xl font-bold tracking-tighter">8+ Years FTE</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Entrepreneurship</p>
                  <p className="text-3xl font-bold tracking-tighter">3 Ventures</p>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-12 mt-14">
              <h2 className="text-3xl font-bold tracking-tight mb-5 px-1 flex items-center gap-3">Experience <Briefcase size={28} className="text-blue-600" /></h2>
              <div className={`rounded-[32px] border p-6 md:p-8 ${cardBaseStyle}`}>
                
                <div className="relative mb-8 pt-2">
                   <div className="hidden md:block absolute bottom-3 left-0 w-full h-px bg-gray-200 dark:bg-white/10 z-0"></div>

                   <div className="flex justify-between items-end w-full overflow-x-auto md:overflow-visible gap-4 no-scrollbar relative z-10">
                      {Object.values(experiences).map(exp => (
                        <button 
                           key={exp.id}
                           onClick={() => setActiveExp(exp.id)}
                           className="flex flex-col items-center group min-w-[140px] md:min-w-0 flex-1"
                        >
                           <div className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border shadow-sm mb-4 whitespace-nowrap ${
                              activeExp === exp.id 
                                ? 'bg-black text-white dark:bg-white dark:text-black border-transparent scale-105'
                                : 'bg-white dark:bg-[#2c2c2e] text-gray-500 border-gray-200 dark:border-white/10 hover:border-gray-400'
                           }`}>
                              {exp.label}
                           </div>
                           
                           <div className={`flex items-center gap-2 px-2 py-1 bg-white dark:bg-[#1c1c1e] rounded-md transition-opacity border border-gray-100 dark:border-white/5 ${activeExp === exp.id ? 'opacity-100 ring-2 ring-blue-100 dark:ring-blue-900' : 'opacity-60 grayscale'}`}>
                              <span className="text-base">{exp.icon}</span>
                              <span className="text-xs font-semibold text-gray-500">{exp.period}</span>
                           </div>
                        </button>
                      ))}
                   </div>
                </div>
                
                <div className="animate-in fade-in duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                        {experiences[activeExp].role}
                    </h3>
                    
                    <div className="text-lg mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                      <span className="font-bold text-[#0071e3]">{experiences[activeExp].company}</span> is a {experiences[activeExp].summary}
                    </div>

                    <ul className="space-y-4">
                      {experiences[activeExp].content.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-base leading-relaxed group">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3] flex-shrink-0" />
                          <div className="text-gray-700 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis w-full font-medium">
                            {bullet}
                          </div>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-12 mt-14">
               <div className="flex justify-between items-end mb-5 px-1">
                  <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">Entrepreneurship <Rocket size={28} className="text-purple-600" /></h2>
               </div>
               
               <div className={`rounded-[32px] border overflow-hidden ${cardBaseStyle}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 h-full">

                    <div className={`lg:col-span-4 p-6 md:p-8 border-r flex flex-col bg-purple-50/20 border-gray-100 dark:bg-black/20 dark:border-white/5`}>
                      <div className="flex flex-col gap-3">
                        {Object.values(entrepreneurship).map((ent) => (
                          <button
                            key={ent.id}
                            onClick={() => setActiveEnt(ent.id)}
                            className={`flex items-center gap-4 p-4 rounded-[20px] transition-all text-left ${
                              activeEnt === ent.id
                                ? 'bg-white dark:bg-[#2c2c2e] shadow-md border border-purple-100 dark:border-purple-500/20 translate-x-1'
                                : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-60'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                              activeEnt === ent.id ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-white/10'
                            }`}>
                              {ent.icon}
                            </div>
                            <div>
                              <div className={`font-bold text-base leading-tight ${activeEnt === ent.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'}`}>
                                {ent.label}
                              </div>
                              <div className="text-[10px] font-semibold text-gray-500 mt-0.5">
                                {ent.period}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-purple-100 dark:border-white/5">
                           <Link to="/contact" className="flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 group transition-colors px-4">
                             Partner with me <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                           </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-8 p-6 md:p-10 flex flex-col justify-center">
                      <div className="mb-6">
                         <h3 className="text-3xl font-bold mb-3 tracking-tight">{entrepreneurship[activeEnt].company}</h3>
                         <div className="h-1.5 w-16 bg-purple-600 rounded-full mb-4"></div>
                         <p className="text-lg text-gray-600 font-medium italic">"{entrepreneurship[activeEnt].summary}"</p>
                      </div>
                      <ul className="space-y-4 flex-grow">
                          {entrepreneurship[activeEnt].content.map((item, i) => (
                             <li key={i} className="flex items-start gap-3">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 font-medium">{item}</p>
                             </li>
                          ))}
                      </ul>
                    </div>
                  </div>
               </div>
            </div>

            <div className="col-span-1 md:col-span-8 mt-14">
              <h2 className="text-3xl font-bold tracking-tight mb-5 px-1 flex items-center gap-3">Education <GraduationCap size={28} className="text-purple-600" /></h2>
              <div className={`p-6 md:p-8 rounded-[32px] border ${cardBaseStyle}`}>
                
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 mb-6 border-b border-gray-100 dark:border-white/5 items-start -mx-2 px-2">
                   {Object.values(education).map(edu => (
                     <div key={edu.id} className="flex flex-col items-center flex-shrink-0 group">
                        <button 
                          onClick={() => setActiveEdu(edu.id)}
                          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all border shadow-sm whitespace-nowrap ${
                            activeEdu === edu.id 
                            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-md scale-105' 
                            : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {edu.label}
                        </button>
                        <div className={`mt-3 flex items-center gap-2 transition-all duration-300 ${activeEdu === edu.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                           <span className="text-lg leading-none">{edu.icon}</span>
                           <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{edu.period}</span>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="animate-in fade-in duration-300">
                   <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-1 tracking-tight">{education[activeEdu].company}</h3>
                      <p className="text-purple-600 font-bold text-base">{education[activeEdu].role}</p>
                   </div>
                   <ul className="space-y-4">
                      {education[activeEdu].content.map((item, i) => (
                        <li key={i} className="text-gray-600 dark:text-gray-300 text-base flex gap-3 font-medium">
                           <span className="text-purple-600 font-bold text-lg leading-none">•</span> {item}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4 flex flex-col mt-14">
              <div className="h-[60px] hidden md:block" /> 
              <div className={`p-6 md:p-8 rounded-[32px] border flex-grow ${cardBaseStyle}`}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">Certifications <ScrollText size={20} className="text-orange-500" /></h2>
                <ul className="space-y-5">
                  {[
                    { name: "Google AI Essentials", url: "https://grow.google/ai-essentials/" },
                    { name: "Project Management", url: null },
                    { name: "Digital Marketing", url: null },
                    { name: "KCSv6 Practices", url: null }
                  ].map((cert, idx) => (
                    <li key={idx} className="flex items-center justify-between group cursor-default">
                      <span className="text-gray-600 font-semibold text-sm group-hover:text-black dark:group-hover:text-white transition-colors">• {cert.name}</span>
                      {cert.url && <ExternalLink size={12} className="text-purple-600 opacity-40 group-hover:opacity-100 transition-opacity" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`col-span-1 md:col-span-12 p-6 md:p-8 rounded-[32px] border mb-4 mt-4 ${cardBaseStyle}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-2">Languages 🗣️</h3>
                  <div className="flex flex-wrap gap-2">
                    <Chip text="English (C2)" />
                    <Chip text="Hindi (Native)" />
                    <Chip text="Telugu (Fluent)" />
                    <Chip text="Dutch (Learning)" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-2">Interests 🧘‍♂️</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Card Magic ♠️", "Chess ♟️", "Chai ☕", "Cricket 🏏"].map((interest, i) => (
                      <Chip key={i} text={interest} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const Chip: React.FC<{ text: string; }> = ({ text }) => (
  <span className="px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm border bg-[#e8e8ed] text-[#1d1d1f] border-black/5 hover:bg-[#d8d8dd] dark:bg-[#2c2c2e] dark:text-gray-200 dark:border-white/5">
    {text}
  </span>
);