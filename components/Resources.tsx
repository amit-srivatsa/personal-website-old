import React from 'react';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Resources: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#f5f5f7]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        <Link to="/services" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Services
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
            The Builder's Vault
          </h1>
          <p className="text-xl text-gray-500 font-medium">
            Tools, templates, and frameworks to help you move faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Example Resource Card 1 */}
          <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide">Template</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">GenAI Strategy Framework</h3>
            <p className="text-gray-500 mb-6 flex-grow">
              A slide deck template to help you pitch AI initiatives to stakeholders. Focuses on ROI and risk mitigation.
            </p>
            <button className="w-full py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <Download size={18} /> Download Deck
            </button>
          </div>

          {/* Example Resource Card 2 */}
          <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wide">Tool</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Prompt Engineering Cheatsheet</h3>
            <p className="text-gray-500 mb-6 flex-grow">
              A one-page reference guide for writing effective prompts across GPT-4, Claude, and Midjourney.
            </p>
            <button className="w-full py-3 rounded-xl bg-gray-100 text-gray-900 font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <ExternalLink size={18} /> View Notion Page
            </button>
          </div>

          {/* Locked/Coming Soon Card */}
          <div className="bg-gray-50 p-8 rounded-[24px] border border-gray-200 border-dashed flex flex-col items-center justify-center text-center opacity-75">
            <h3 className="text-xl font-bold text-gray-400 mb-2">Content Calendar System</h3>
            <p className="text-gray-400 text-sm">Coming next week</p>
          </div>

        </div>

      </div>
    </div>
  );
};