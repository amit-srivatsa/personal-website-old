import React from 'react';
import { ExternalLink, Award, Share2 } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  description: string;
  skills: string[];
  credentialUrl: string;
  date: string;
  badge: string;
  accentColor: string;
  accentBg: string;
}

const certifications: Certification[] = [
  {
    id: 'google-ai',
    title: 'Google AI Essentials',
    issuer: 'Google',
    issuerLogo: 'https://ik.imagekit.io/mws/main-site/google-logo.png',
    description:
      'A professional certificate covering practical AI skills for the modern workplace — including using generative AI tools, writing effective prompts, and applying AI responsibly across real workflows.',
    skills: ['Generative AI', 'Prompt Engineering', 'AI Ethics', 'Workflow Automation', 'Google AI Tools'],
    credentialUrl: 'YOUR_GOOGLE_DRIVE_LINK_FOR_AI_CERTIFICATE',
    date: '2024',
    badge: '🤖',
    accentColor: 'text-blue-600',
    accentBg: 'bg-blue-600',
  },
  {
    id: 'google-digital-marketing',
    title: 'Google Digital Marketing & E-commerce',
    issuer: 'Google',
    issuerLogo: 'https://ik.imagekit.io/mws/main-site/google-logo.png',
    description:
      'A professional certificate in digital marketing and e-commerce fundamentals — covering SEO, SEM, email marketing, social media, analytics, and building customer loyalty through data-driven strategies.',
    skills: ['SEO & SEM', 'Email Marketing', 'Social Media', 'Google Analytics', 'E-commerce Strategy', 'Customer Retention'],
    credentialUrl: 'YOUR_GOOGLE_DRIVE_LINK_FOR_DIGITAL_MARKETING_CERTIFICATE',
    date: '2024',
    badge: '📈',
    accentColor: 'text-green-600',
    accentBg: 'bg-green-600',
  },
];

export const Certifications: React.FC = () => {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Amit Srivatsa — Certifications',
          text: 'Check out these certifications.',
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 transition-colors duration-300 bg-[#f5f5f7] text-[#1d1d1f] dark:bg-black dark:text-gray-100">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="px-5 py-8 md:py-12 flex flex-col items-center text-center relative">
          <div className="absolute right-5 top-8 flex gap-2">
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              title="Share"
            >
              <Share2 size={14} />
            </button>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-5 shadow-md">
            <Award size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight">
            Certifications
          </h1>
          <p className="text-lg text-gray-500 font-normal max-w-xl">
            Professional credentials earned through structured learning and assessment.
          </p>
        </div>

        {/* Certificates grid */}
        <div className="px-5 mt-4">
          <div className="grid grid-cols-1 gap-6">
            {certifications.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              Credentials verified by Google. Click "View Certificate" on each card to open the original document.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

const CertCard: React.FC<{ cert: Certification }> = ({ cert }) => {
  return (
    <div className="bg-white border border-black/5 shadow-sm rounded-[32px] overflow-hidden dark:bg-[#1c1c1e] dark:border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12">

        {/* Left accent panel */}
        <div className={`lg:col-span-4 p-6 md:p-8 flex flex-col justify-between ${cert.id === 'google-ai' ? 'bg-blue-50/60 dark:bg-blue-950/20' : 'bg-green-50/60 dark:bg-green-950/20'}`}>
          <div>
            <div className="text-4xl mb-4">{cert.badge}</div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 leading-snug">
              {cert.title}
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white ${cert.accentBg}`}>
                {cert.issuer}
              </span>
              <span className="text-xs font-semibold text-gray-500">{cert.date}</span>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all hover:scale-105 shadow-sm"
            >
              View Certificate <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Right content panel */}
        <div className="lg:col-span-8 p-6 md:p-10 flex flex-col justify-center">
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 font-medium mb-7">
            {cert.description}
          </p>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Skills Covered</p>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-sm font-semibold bg-[#e8e8ed] text-[#1d1d1f] border border-black/5 hover:bg-[#d8d8dd] transition-all dark:bg-[#2c2c2e] dark:text-gray-200 dark:border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
