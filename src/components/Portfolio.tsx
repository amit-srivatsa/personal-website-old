import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Layers, PenTool, Zap, BookOpen, Clock, Tag } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'All' | 'AI & Strategy' | 'Content Systems' | 'No-code & Automation' | 'Research';

interface Project {
  id: string;
  title: string;
  category: Category;
  year: string;
  status: 'Case Study' | 'Coming Soon' | 'In Progress';
  description: string;
  tags: string[];
  outcomes: string[];
  icon: React.ReactNode;
  accent: string;       // Tailwind bg class for icon bg
  accentText: string;   // Tailwind text class for icon colour
  link?: string;        // Optional link to case study / contact
}

// ─── Data ────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 'ai-workflow-solidoptics',
    title: 'AI content workflow at Solid Optics',
    category: 'AI & Strategy',
    year: '2024',
    status: 'Case Study',
    description:
      'Introduced AI-assisted content pipelines that cut production time by ~50% across marketing, onboarding, and ISO compliance video assets.',
    tags: ['AI workflows', 'Content ops', 'Video'],
    outcomes: ['~50% faster production', '12+ ISO videos', 'Onboarding redesigned'],
    icon: <Layers size={20} />,
    accent: 'bg-blue-50',
    accentText: 'text-blue-600',
    link: '/contact',
  },
  {
    id: 'content-strategy-adobe',
    title: 'Content strategy at Adobe',
    category: 'Content Systems',
    year: '2022',
    status: 'Case Study',
    description:
      'Built data-driven content strategy blending creative storytelling with SEO — driving user acquisition and trial-to-paid conversion.',
    tags: ['SEO', 'Content strategy', 'B2B'],
    outcomes: ['+11% user acquisition', '+6% trial-to-paid', 'Global alignment'],
    icon: <PenTool size={20} />,
    accent: 'bg-purple-50',
    accentText: 'text-purple-600',
    link: '/contact',
  },
  {
    id: 'ai-chatbot-netapp',
    title: 'AI chatbot enhancement at NetApp',
    category: 'AI & Strategy',
    year: '2021',
    status: 'Case Study',
    description:
      'Leveraged AI-driven chatbot refinements and knowledge base optimisation, improving engagement and reducing bounce on self-service content.',
    tags: ['AI chatbots', 'Knowledge base', 'SEO'],
    outcomes: ['-20% bounce rate', '+10% CTR', '+30% engagement'],
    icon: <Layers size={20} />,
    accent: 'bg-blue-50',
    accentText: 'text-blue-600',
    link: '/contact',
  },
  {
    id: 'brandone-ecommerce',
    title: 'BrandOne — lean e-commerce brand',
    category: 'No-code & Automation',
    year: '2019',
    status: 'Case Study',
    description:
      'Built and scaled a Shopify streetwear brand from zero — using organic social, performance marketing, and lean supply chain.',
    tags: ['No-code', 'Shopify', 'Organic growth'],
    outcomes: ['₹180,000 revenue', '1,000+ Instagram followers', '3 months to profitability'],
    icon: <Zap size={20} />,
    accent: 'bg-orange-50',
    accentText: 'text-orange-600',
    link: '/contact',
  },
  {
    id: 'fractional-cmo-framework',
    title: 'Fractional CMO operating framework',
    category: 'Research',
    year: '2023',
    status: 'Coming Soon',
    description:
      'A proprietary decision-making framework for small B2B teams — covering when to hire fractional vs. full-time, and how to measure it.',
    tags: ['Strategy', 'Frameworks', 'Decision-making'],
    outcomes: [],
    icon: <BookOpen size={20} />,
    accent: 'bg-green-50',
    accentText: 'text-green-700',
  },
  {
    id: 'content-operating-model',
    title: 'Content operating model for SMEs',
    category: 'Content Systems',
    year: '2023',
    status: 'Coming Soon',
    description:
      'Playbook for turning ad-hoc content creation into a repeatable system. Includes templates, editorial calendars, and AI integration points.',
    tags: ['Content ops', 'Templates', 'Playbooks'],
    outcomes: [],
    icon: <PenTool size={20} />,
    accent: 'bg-purple-50',
    accentText: 'text-purple-600',
  },
  {
    id: 'ai-adoption-roadmap',
    title: 'AI adoption roadmap template',
    category: 'AI & Strategy',
    year: '2024',
    status: 'In Progress',
    description:
      'A structured 90-day roadmap for B2B teams starting their AI journey — built from real consulting engagements.',
    tags: ['AI adoption', 'Roadmap', 'Consulting'],
    outcomes: [],
    icon: <Layers size={20} />,
    accent: 'bg-blue-50',
    accentText: 'text-blue-600',
  },
  {
    id: 'tseeconomist-research',
    title: 'TSEconomist student magazine',
    category: 'Research',
    year: '2014',
    status: 'Case Study',
    description:
      'Founding member of the student economics magazine at Toulouse School of Economics. Covered research dissemination and editorial design.',
    tags: ['Research', 'Editorial', 'Economics'],
    outcomes: ['Founded from scratch', 'Multi-contributor editorial'],
    icon: <BookOpen size={20} />,
    accent: 'bg-green-50',
    accentText: 'text-green-700',
    link: '/contact',
  },
];

// ─── Filter config ────────────────────────────────────────────────────────────

const categories: Category[] = [
  'All',
  'AI & Strategy',
  'Content Systems',
  'No-code & Automation',
  'Research',
];

const categoryColors: Record<Category, string> = {
  'All': 'bg-gray-900 text-white',
  'AI & Strategy': 'bg-blue-600 text-white',
  'Content Systems': 'bg-purple-600 text-white',
  'No-code & Automation': 'bg-orange-500 text-white',
  'Research': 'bg-green-600 text-white',
};

const categoryPill: Record<Category, string> = {
  'All': 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  'AI & Strategy': 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  'Content Systems': 'bg-purple-50 text-purple-700 hover:bg-purple-100',
  'No-code & Automation': 'bg-orange-50 text-orange-700 hover:bg-orange-100',
  'Research': 'bg-green-50 text-green-700 hover:bg-green-100',
};

const statusConfig = {
  'Case Study': { dot: 'bg-green-500', label: 'text-green-700 bg-green-50' },
  'Coming Soon': { dot: 'bg-gray-400', label: 'text-gray-500 bg-gray-100' },
  'In Progress': { dot: 'bg-amber-400', label: 'text-amber-700 bg-amber-50' },
};

// ─── Component ───────────────────────────────────────────────────────────────

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wide text-gray-600">
              Selected work
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
            Projects &amp; case studies
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-xl">
            Organised by theme — because patterns matter more than timelines.
          </p>
        </div>

        {/* ── Filter bar ─────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeFilter === cat
                  ? `${categoryColors[cat]} border-transparent scale-105 shadow-sm`
                  : `${categoryPill[cat]} border-transparent`
                }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto flex items-center text-sm text-gray-400 font-medium">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {/* ── Project grid ───────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[32px] p-16 text-center border border-gray-100 shadow-sm">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-gray-500 font-medium">No projects in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* ── Bottom note ────────────────────────────────────────── */}
        <div className="mt-14 bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Want to see more?</h3>
            <p className="text-gray-500 leading-relaxed max-w-lg">
              Most work is confidential by nature. If you're considering working together,
              I'm happy to walk you through relevant projects in a conversation.
            </p>
          </div>
          <a
            href="https://calendar.app.google/jcY3JgK9YACJ3SA5A"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-sm text-sm whitespace-nowrap"
          >
            Book a conversation
            <ArrowUpRight size={16} />
          </a>
        </div>

      </div>
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const status = statusConfig[project.status];

  return (
    <div className="group bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">

      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${project.accent} ${project.accentText}`}>
          {project.icon}
        </div>
        <div className="flex items-center gap-2">
          {/* Year */}
          <span className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
            <Clock size={11} />
            {project.year}
          </span>
          {/* Status badge */}
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.label}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {project.status}
          </span>
        </div>
      </div>

      {/* Category pill */}
      <span className={`self-start mb-3 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${categoryPill[project.category]} border border-transparent`}>
        {project.category}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug tracking-tight">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow">
        {project.description}
      </p>

      {/* Outcomes (only for case studies with data) */}
      {project.outcomes.length > 0 && (
        <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
            <Tag size={10} /> Key outcomes
          </p>
          <ul className="space-y-1">
            {project.outcomes.map((o, i) => (
              <li key={i} className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      {project.link ? (
        <a
          href={project.link}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-black hover:text-gray-600 transition-colors group-hover:gap-2.5"
        >
          {project.status === 'Case Study' ? 'Discuss this work' : 'Get in touch'}
          <ExternalLink size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      ) : (
        <p className="mt-auto text-xs text-gray-400 italic">Full write-up coming soon</p>
      )}

    </div>
  );
};