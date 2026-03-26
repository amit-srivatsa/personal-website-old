import React, { useState } from 'react';
import { X, Lock, Loader2, Zap, Compass } from 'lucide-react';

// ── ResourcesModal ───────────────────────────────────────────────────────────

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'resources_gate' }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          window.location.href = '/resources';
        }, 1500);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to unlock. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-gray-900 rounded-[2rem] w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-violet-600 dark:text-violet-400">
            <Lock size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Unlock the Builder's Vault</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Get instant access to my curated library of tools, templates, and frameworks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resource-email" className="sr-only">Email address</label>
            <input
              id="resource-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your best email..."
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-700 transition-all outline-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 dark:text-red-400 text-sm text-center font-medium">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 ${
              status === 'success' ? 'bg-green-500' : 'bg-violet-600 hover:bg-violet-700'
            }`}
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" size={20} />
            ) : status === 'success' ? (
              'Unlocked! Redirecting...'
            ) : (
              'Unlock Access'
            )}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-6">
          I respect your inbox. No spam, ever.
        </p>
      </div>
    </div>
  );
};

// ── Animated card visuals ────────────────────────────────────────────────────

const ConsultingVisual = () => {
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  return (
  <div
    className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 relative flex items-center justify-center"
    style={{ background: isDark ? 'linear-gradient(145deg, #1f1535, #2d1b4e)' : 'linear-gradient(145deg, #F5F3FF, #EDE9FE)' }}
  >
    <div className="relative w-[80%]" style={{ height: '72%' }}>
      {/* Card 3 – back, sky blue */}
      <div
        className="absolute svc-card-3 rounded-2xl px-4 py-3 shadow-sm"
        style={{ top: '54%', left: '12%', width: '74%', opacity: 0.6, zIndex: 1, background: isDark ? '#1e3a4c' : '#F0F9FF', border: isDark ? '1px solid #0a3a52' : '1px solid #BAE6FD' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: isDark ? '#22d3ee' : '#0EA5E9' }} />
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: isDark ? '#22d3ee' : '#0EA5E9' }}>AI Tools</span>
        </div>
        <div className="h-1.5 rounded-full w-3/4 mb-1" style={{ background: isDark ? '#0a3a52' : '#BAE6FD' }} />
        <div className="h-1.5 rounded-full w-1/2" style={{ background: isDark ? '#164e63' : '#E0F2FE' }} />
      </div>
      {/* Card 2 – mid, indigo */}
      <div
        className="absolute svc-card-2 rounded-2xl px-4 py-3 shadow-sm"
        style={{ top: '27%', right: 0, width: '74%', zIndex: 2, background: isDark ? '#1f2464' : '#EEF2FF', border: isDark ? '1px solid #3730a3' : '1px solid #C7D2FE' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: isDark ? '#818cf8' : '#6366F1' }} />
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: isDark ? '#818cf8' : '#6366F1' }}>Content plan</span>
        </div>
        <div className="h-1.5 rounded-full w-full mb-1" style={{ background: isDark ? '#3730a3' : '#C7D2FE' }} />
        <div className="h-1.5 rounded-full w-2/3" style={{ background: isDark ? '#312e81' : '#E0E7FF' }} />
      </div>
      {/* Card 1 – front, violet/priority */}
      <div
        className="absolute svc-card-1 rounded-2xl px-4 py-3 shadow-lg"
        style={{ top: 0, left: 0, width: '74%', zIndex: 3, background: isDark ? '#22133d' : '#F5F3FF', border: isDark ? '1px solid #4c1d95' : '1px solid #C4B5FD' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: isDark ? '#c084fc' : '#7C3AED' }} />
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: isDark ? '#c084fc' : '#7C3AED' }}>Positioning</span>
        </div>
        <div className="h-1.5 rounded-full w-4/5 mb-1" style={{ background: isDark ? '#4c1d95' : '#C4B5FD' }} />
        <div className="h-1.5 rounded-full w-3/5" style={{ background: isDark ? '#552d94' : '#DDD6FE' }} />
      </div>
    </div>
  </div>
);
};


const SystemsVisual = () => {
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  return (
  <div
    className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 relative flex items-center justify-center"
    style={{ background: isDark ? 'linear-gradient(145deg, #1e2460, #2d3a8a)' : 'linear-gradient(145deg, #EFF6FF, #DBEAFE)' }}
  >
    <div className="w-[82%]">
      {/* Layer 1 - indigo */}
      <div className="svc-layer-1 bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3" style={{ border: '1px solid #C7D2FE' }}>
        <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: '#EEF2FF' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="#4F46E5"/>
            <rect x="8" y="1" width="5" height="5" rx="1" fill="#4F46E5" opacity="0.5"/>
            <rect x="1" y="8" width="5" height="5" rx="1" fill="#4F46E5" opacity="0.5"/>
            <rect x="8" y="8" width="5" height="5" rx="1" fill="#4F46E5" opacity="0.2"/>
          </svg>
        </div>
        <div className="flex-grow">
          <div className="text-[11px] font-bold text-gray-800 mb-1">Decision framework</div>
          <div className="h-1 rounded-full w-3/4" style={{ background: '#C7D2FE' }} />
        </div>
        <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: '#4F46E5' }}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="svc-connector" style={{ width: 2, height: 10, background: '#BFDBFE' }} />
      </div>
      {/* Layer 2 - sky blue */}
      <div className="svc-layer-2 bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3" style={{ border: '1px solid #BAE6FD' }}>
        <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: '#F0F9FF' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="#0EA5E9" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
          </svg>
        </div>
        <div className="flex-grow">
          <div className="text-[11px] font-bold text-gray-800 mb-1">Execution system</div>
          <div className="svc-exec-bar h-1 rounded-full" style={{ width: '50%', background: '#7DD3FC' }} />
        </div>
        <div className="w-5 h-5 rounded-full border-2 flex-shrink-0" style={{ borderColor: '#7DD3FC' }} />
      </div>
      <div className="flex justify-center">
        <div className="svc-connector" style={{ width: 2, height: 10, background: '#BFDBFE' }} />
      </div>
      {/* Layer 3 - pink/rose */}
      <div className="svc-layer-3 bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3" style={{ opacity: 0.6, border: '1px solid #FBCFE8' }}>
        <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: '#FDF2F8' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2C7 2 3 5 3 8C3 10.2 4.8 12 7 12C9.2 12 11 10.2 11 8C11 5 7 2 7 2Z" stroke="#EC4899" strokeWidth="1.2" fill="none"/>
          </svg>
        </div>
        <div className="flex-grow">
          <div className="text-[11px] font-bold mb-1" style={{ color: '#9CA3AF' }}>Focus protocol</div>
          <div className="h-1 rounded-full w-2/5" style={{ background: '#FBCFE8' }} />
        </div>
        <div className="w-5 h-5 rounded-full border-2 flex-shrink-0" style={{ borderColor: '#FBCFE8' }} />
      </div>
    </div>
  </div>
);
};

const CareerVisual = () => {
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  return (
  <div
    className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 relative flex items-center justify-center"
    style={{ background: isDark ? 'linear-gradient(145deg, #3d2817, #5c4033)' : 'linear-gradient(145deg, #FFF7ED, #FED7AA)' }}
  >
    <div className="w-[80%]">
      {/* Compass / direction visual */}
      <div className="flex items-center justify-center mb-5">
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full" style={{ border: '2px solid #FED7AA', background: '#FFF7ED' }} />
          <div className="absolute inset-2 rounded-full" style={{ border: '1px dashed #FDBA74' }} />
          {/* Compass needle */}
          <div className="absolute inset-0 flex items-center justify-center svc-compass">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4 L19 16 L16 14 L13 16 Z" fill="#EA580C"/>
              <path d="M16 28 L19 16 L16 18 L13 16 Z" fill="#D1D5DB"/>
              <circle cx="16" cy="16" r="2.5" fill="#1F2937"/>
            </svg>
          </div>
          {/* N/S/E/W labels */}
          <span className="absolute text-[8px] font-bold" style={{ top: 3, left: '50%', transform: 'translateX(-50%)', color: '#EA580C' }}>N</span>
          <span className="absolute text-[8px] font-bold" style={{ bottom: 3, left: '50%', transform: 'translateX(-50%)', color: '#9CA3AF' }}>S</span>
          <span className="absolute text-[8px] font-bold" style={{ left: 3, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>W</span>
          <span className="absolute text-[8px] font-bold" style={{ right: 3, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>E</span>
        </div>
      </div>
      {/* Direction cards */}
      <div className="space-y-2">
        <div className="rounded-xl px-3 py-2 flex items-center gap-2.5" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
          <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#EA580C' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="h-1.5 rounded-full flex-grow" style={{ background: '#FED7AA' }} />
        </div>
        <div className="rounded-xl px-3 py-2 flex items-center gap-2.5" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', opacity: 0.65 }}>
          <div className="w-5 h-5 rounded-lg flex-shrink-0" style={{ background: '#FDBA74' }} />
          <div className="h-1.5 rounded-full w-3/4" style={{ background: '#FED7AA' }} />
        </div>
      </div>
    </div>
  </div>
);
};

// ── ServiceCard ───────────────────────────────────────────────────────────────

interface ServiceCardProps {
  visual: React.ReactNode;
  icon: React.ReactNode;
  iconBg: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  details: string[];
  detailColor: string;
  extraText?: string;
  tags: string[];
  tagBg: string;
  tagColor: string;
  buttonText: string;
  buttonBg: string;
  link?: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  visual, icon, iconBg, category, categoryColor, title, description,
  details, detailColor, extraText, tags, tagBg, tagColor,
  buttonText, buttonBg, link, onClick,
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-4 pb-8 shadow-sm dark:shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl dark:hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
    {visual}

    <div className="px-3 flex-grow flex flex-col">
      {/* Icon + category */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: categoryColor }}>{category}</span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">{title}</h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors" style={{ background: tagBg, color: tagColor }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{description}</p>

      {/* Bullets */}
      <ul className="mb-4 space-y-2">
        {details.map((d, i) => (
          <li key={i} className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: detailColor }} />
            {d}
          </li>
        ))}
      </ul>

      {extraText && <p className="text-xs text-gray-400 dark:text-gray-500 italic mb-4 flex-grow">{extraText}</p>}

      {/* CTA */}
      <div className="mt-auto pt-5 border-t border-gray-100 dark:border-gray-800 flex justify-center">
        {onClick ? (
          <button
            onClick={onClick}
            className="inline-flex items-center justify-center font-bold text-white rounded-full px-6 py-3 text-sm hover:brightness-110 transition-all hover:scale-105"
            style={{ background: buttonBg }}
          >
            {buttonText}
          </button>
        ) : link === '/book' ? (
          <a
            href="https://calendar.app.google/jcY3JgK9YACJ3SA5A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold text-white rounded-full px-6 py-3 text-sm hover:brightness-110 transition-all hover:scale-105"
            style={{ background: buttonBg }}
          >
            {buttonText}
          </a>
        ) : (
          <a
            href={link!}
            className="inline-flex items-center justify-center font-bold text-white rounded-full px-6 py-3 text-sm hover:brightness-110 transition-all hover:scale-105"
            style={{ background: buttonBg }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  </div>
);

// ── ServicesIsland (main export) ─────────────────────────────────────────────

export default function ServicesIsland() {
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 text-violet-600 dark:text-violet-400">
              services
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight leading-tight">
              Here's how I work<br />with you.
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-2">
              My services are designed to create clarity. Not dependency.
            </p>
            <p className="text-base text-gray-400 dark:text-gray-500">
              Each service exists for a specific stage and a specific kind of problem.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <ServiceCard
              visual={<ConsultingVisual />}
              icon={<Zap size={16} strokeWidth={2.5} color="#7C3AED" />}
              iconBg="#F5F3FF"
              category="For Businesses"
              categoryColor="#7C3AED"
              title="Strategic consulting"
              description="Best for founders and small B2B teams. When decisions feel heavy or unclear. We work through one real problem together."
              details={["A clear point of view", "A written strategy outline", "Concrete next steps"]}
              detailColor="#7C3AED"
              extraText="Not ongoing execution. High-leverage thinking."
              tags={["Strategy", "Clarity"]}
              tagBg="#F5F3FF"
              tagColor="#7C3AED"
              buttonText="Book Consultation"
              buttonBg="#7C3AED"
              link="/book"
            />

            <ServiceCard
              visual={<SystemsVisual />}
              icon={<Zap size={16} strokeWidth={2.5} color="#4F46E5" />}
              iconBg="#EEF2FF"
              category="For Builders"
              categoryColor="#4F46E5"
              title="Tools & systems"
              description="Best for independents and early-stage builders. People who want leverage, not hustle. Access to tools, templates, and shared learning."
              details={["No-code Tools", "Templates", "Shared Learning"]}
              detailColor="#4F46E5"
              extraText="Designed to compound over time. Save you months of trial and error."
              tags={["Leverage", "Tools"]}
              tagBg="#EEF2FF"
              tagColor="#4F46E5"
              buttonText="View Resources"
              buttonBg="#4F46E5"
              onClick={() => setIsResourcesModalOpen(true)}
            />

            <ServiceCard
              visual={<CareerVisual />}
              icon={<Compass size={16} strokeWidth={2.5} color="#EA580C" />}
              iconBg="#FFF7ED"
              category="For Students"
              categoryColor="#EA580C"
              title="Career guidance"
              description="Best for students and early-career marketers worried about relevance. This is not CV polishing. It's career direction."
              details={["Future-proof skills", "Reframing your profile", "Smart career bets"]}
              detailColor="#EA580C"
              extraText="If you're unsure where you fit. Start with a conversation."
              tags={["Direction", "Mentorship"]}
              tagBg="#FFF7ED"
              tagColor="#EA580C"
              buttonText="Start a conversation"
              buttonBg="#1A1A1A"
              link="/contact"
            />

          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 font-medium">
              Not sure which fits you? <a href="/contact" className="text-gray-900 font-bold hover:underline">Let's figure it out together.</a>
            </p>
          </div>
        </div>
      </div>

      {/* Services page animations */}
      <style>{`
        @keyframes svc-card-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-11px) scale(1.02); }
        }
        @keyframes svc-card-float-mid {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes svc-card-float-back {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-5px); }
        }
        .svc-card-1 { animation: svc-card-float     3s cubic-bezier(0.45,0,0.55,1) infinite; }
        .svc-card-2 { animation: svc-card-float-mid  4s cubic-bezier(0.45,0,0.55,1) infinite 0.7s; }
        .svc-card-3 { animation: svc-card-float-back 5s cubic-bezier(0.45,0,0.55,1) infinite 1.4s; }

        @keyframes svc-roadmap-fill {
          0%   { width: 0%; }
          35%  { width: 42%; }
          65%  { width: 42%; }
          100% { width: 0%; }
        }
        .svc-roadmap-progress { animation: svc-roadmap-fill 2.8s cubic-bezier(0.25,0.46,0.45,0.94) infinite; }

        @keyframes svc-rn2-fade {
          0%,25%  { background: #A7F3D0; }
          40%,70% { background: #059669; }
          85%,100%{ background: #A7F3D0; }
        }
        .svc-rn-2 { animation: svc-rn2-fade 2.8s cubic-bezier(0.25,0.46,0.45,0.94) infinite; }

        @keyframes svc-rn3-fade {
          0%,50%  { background: #A7F3D0; }
          65%,85% { background: #059669; }
          100%    { background: #A7F3D0; }
        }
        .svc-rn-3 { animation: svc-rn3-fade 2.8s cubic-bezier(0.25,0.46,0.45,0.94) infinite; }

        @keyframes svc-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(5,150,105,0.5); }
          60%  { box-shadow: 0 0 0 8px rgba(5,150,105,0); }
          100% { box-shadow: 0 0 0 0 rgba(5,150,105,0); }
        }
        .svc-rp-pulse { animation: svc-pulse-ring 1.6s cubic-bezier(0.25,0.46,0.45,0.94) infinite; }

        @keyframes svc-layer-indigo {
          0%,100% { box-shadow: 0 1px 3px rgba(0,0,0,0.06); transform: translateX(0); }
          50%     { box-shadow: 0 6px 20px rgba(79,70,229,0.22); transform: translateX(2px); }
        }
        @keyframes svc-layer-blue {
          0%,100% { box-shadow: 0 1px 3px rgba(0,0,0,0.06); transform: translateX(0); }
          50%     { box-shadow: 0 6px 20px rgba(14,165,233,0.22); transform: translateX(2px); }
        }
        @keyframes svc-layer-pink {
          0%,100% { box-shadow: 0 1px 3px rgba(0,0,0,0.06); transform: translateX(0); }
          50%     { box-shadow: 0 6px 20px rgba(236,72,153,0.18); transform: translateX(2px); }
        }
        .svc-layer-1 { animation: svc-layer-indigo 2s cubic-bezier(0.45,0,0.55,1) infinite; }
        .svc-layer-2 { animation: svc-layer-blue   2s cubic-bezier(0.45,0,0.55,1) infinite 0.65s; }
        .svc-layer-3 { animation: svc-layer-pink   2s cubic-bezier(0.45,0,0.55,1) infinite 1.3s; }

        @keyframes svc-connector-pulse {
          0%,100% { opacity: 0.3; transform: scaleY(1); }
          50%     { opacity: 1;   transform: scaleY(1.4); }
        }
        .svc-connector { transform-origin: top; animation: svc-connector-pulse 2s cubic-bezier(0.45,0,0.55,1) infinite; }

        @keyframes svc-exec-bar-grow {
          0%,15%  { width: 20%; }
          55%,75% { width: 78%; }
          100%    { width: 20%; }
        }
        .svc-exec-bar { animation: svc-exec-bar-grow 2.8s cubic-bezier(0.25,0.46,0.45,0.94) infinite; }

        @keyframes svc-compass-spin {
          0%   { transform: rotate(-20deg); }
          40%  { transform: rotate(15deg); }
          70%  { transform: rotate(-10deg); }
          100% { transform: rotate(-20deg); }
        }
        .svc-compass { animation: svc-compass-spin 4s cubic-bezier(0.45,0,0.55,1) infinite; }
      `}</style>

      <ResourcesModal
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
      />
    </>
  );
}
