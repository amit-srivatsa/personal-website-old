import React, { useState } from 'react';
import { ArrowRight, X, Lock, Loader2 } from 'lucide-react';

// ── Theme map ────────────────────────────────────────────────────────────────

const themes = {
  sage: {
    bg: "bg-[#E5F0DB]",
    text: "text-[#3F6212]",
    tagBg: "bg-[#F2F7ED]",
    buttonBg: "bg-[#3F6212]",
    buttonColorHex: "#3F6212",
    buttonText: "text-white",
  },
  peach: {
    bg: "bg-[#F3E8D6]",
    text: "text-[#78350F]",
    tagBg: "bg-[#FAF5ED]",
    buttonBg: "bg-[#78350F]",
    buttonColorHex: "#78350F",
    buttonText: "text-white",
  },
  slate: {
    bg: "bg-[#DDE5E9]",
    text: "text-[#334155]",
    tagBg: "bg-[#F1F5F9]",
    buttonBg: "bg-[#334155]",
    buttonColorHex: "#334155",
    buttonText: "text-white",
  },
};

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
        className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unlock the Builder's Vault</h2>
          <p className="text-gray-500">
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
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white transition-all outline-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-sm text-center font-medium">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-500/20 ${status === 'success' ? 'bg-green-500' : 'bg-amber-600 hover:bg-amber-700'
              }`}
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" />
            ) : status === 'success' ? (
              'Unlocked! Redirecting...'
            ) : (
              <>
                Unlock Access <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          I respect your inbox. No spam, ever.
        </p>
      </div>
    </div>
  );
};

// ── DashboardCard ────────────────────────────────────────────────────────────

interface DashboardCardProps {
  emoji: string;
  category: string;
  title: string;
  description: string;
  details: string[];
  extraText?: string;
  tags: string[];
  buttonText: string;
  link?: string;
  onClick?: () => void;
  theme: 'sage' | 'peach' | 'slate';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  emoji,
  category,
  title,
  description,
  details,
  extraText,
  tags,
  buttonText,
  link,
  onClick,
  theme,
}) => {
  const t = themes[theme];

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full relative border border-gray-100">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`h-16 w-16 rounded-2xl ${t.bg} flex items-center justify-center text-3xl shadow-inner`}
        >
          {emoji}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-1">{title}</h3>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{category}</p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${t.bg} ${t.text} opacity-80`}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>

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

      <div className="mt-auto pt-6 border-t border-gray-100 flex justify-center w-full">
        {onClick ? (
          <button
            onClick={onClick}
            className="inline-flex items-center justify-center font-bold text-white rounded-full border border-transparent hover:brightness-110 transition-all duration-200 hover:scale-105 shadow-sm group px-6 py-3 text-sm"
            style={{ backgroundColor: t.buttonColorHex }}
          >
            {buttonText}
          </button>
        ) : link === '/book' ? (
          <a
            href="https://calendar.app.google/jcY3JgK9YACJ3SA5A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold text-white rounded-full border border-transparent hover:brightness-110 transition-all duration-200 hover:scale-105 shadow-sm group px-6 py-3 text-sm"
            style={{ backgroundColor: t.buttonColorHex }}
          >
            {buttonText}
          </a>
        ) : (
          <a
            href={link!}
            className="inline-flex items-center justify-center font-bold text-white rounded-full border border-transparent hover:brightness-110 transition-all duration-200 hover:scale-105 shadow-sm group px-6 py-3 text-sm"
            style={{ backgroundColor: t.buttonColorHex }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

// ── ServicesIsland (main export) ─────────────────────────────────────────────

export default function ServicesIsland() {
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);

  return (
    <>
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
              emoji="&#x1F4BC;"
              category="For Businesses"
              title="Strategic consulting"
              description="Best for founders and small B2B teams. Especially when decisions feel heavy or unclear. This is a short, focused engagement. We work through one real problem together."
              details={[
                "A clear point of view",
                "A written strategy outline",
                "Concrete next steps",
              ]}
              extraText="This is not ongoing execution. It's high-leverage thinking."
              tags={["Strategy", "Clarity"]}
              buttonText="Book Consultation"
              link="/book"
              theme="sage"
            />

            {/* Hustlers Card - Peach/Beige Theme */}
            <DashboardCard
              emoji="&#x1F4AA;"
              category="For Builders"
              title="Tools & community"
              description="Best for independents and early-stage builders. People who want leverage, not hustle. This is access, not hand-holding. Tools, templates, and shared learning."
              details={["No-code Tools", "Templates", "Shared Learning"]}
              extraText="Designed to compound over time. And save you months of trial and error."
              tags={["Leverage", "Tools"]}
              buttonText="View resources"
              onClick={() => setIsResourcesModalOpen(true)}
              theme="peach"
            />

            {/* Students Card - Slate/Blue Theme */}
            <DashboardCard
              emoji="&#x1F393;"
              category="For Students"
              title="Career guidance"
              description="Best for students and early-career marketers. Especially those worried about relevance. This is not CV polishing. It's career direction."
              details={[
                "Future-proof skills",
                "Reframing your profile",
                "Making smart career bets",
              ]}
              extraText="If you're unsure where you fit. Start with a conversation."
              tags={["Direction", "Mentorship"]}
              buttonText="Start conversation"
              link="/contact"
              theme="slate"
            />
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 font-medium">
              If you're unsure where you fit. Start with a conversation.
            </p>
          </div>
        </div>
      </div>

      <ResourcesModal
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
      />
    </>
  );
}
