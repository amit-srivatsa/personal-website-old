import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">
              grow
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Here’s how I help you.
            </h3>
            <div className="mt-4 text-xl text-gray-500 max-w-lg space-y-2">
              <p>I work with people at different stages. The work looks different, but the goal is the same. Clarity.</p>
              <p className="text-base">I don’t sell motivation or vague advice. I help you make better decisions and build systems that hold up in the real world.</p>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0">
             <Link 
              to="/services"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-full text-sm font-bold text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all"
            >
              View all services
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <ServiceCard 
            title="Strategic consulting"
            subtitle="(for businesses)"
            description="These are not coaching calls. They are focused thinking sessions. We work through your actual problems together. Positioning, priorities, AI adoption, content, or growth strategy. You leave every session with clarity and next steps. Fewer options. Better decisions."
            image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            link="/contact"
          />

          {/* Card 2 */}
          <ServiceCard 
            title="Personalised growth roadmap"
            description="You get a clear plan. Not a 40-slide deck. We map where you are. We define where you want to go. Then we design a simple path to get there. The goal is momentum. Not perfection."
            image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop"
            link="/services"
          />

          {/* Card 3 */}
          <ServiceCard 
            title="Tools & systems"
            subtitle="(for builders)"
            description="Good ideas fail without systems. I help you design lightweight frameworks and shared tools. For decision-making, execution, and focus. These systems are designed to compound over time. And to be used when things get busy."
            image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            link="/services"
          />

        </div>
        
        {/* Navigation Arrows (Visual only for this layout) */}
        <div className="flex justify-center gap-4 mt-12">
            <button className="p-3 rounded-full border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors">
                <ArrowUpRight className="rotate-[-135deg]" size={20} />
            </button>
            <button className="p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                <ArrowUpRight className="rotate-45" size={20} />
            </button>
        </div>

      </div>
    </section>
  );
};

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, description, image, link }) => {
  return (
    <Link to={link} className="group block h-full">
      <div className="bg-white rounded-[2rem] p-4 pb-8 h-full shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
        
        {/* Image Container */}
        <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-gray-100">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="px-4 flex-grow">
          <h4 className="text-2xl font-bold text-gray-900 mb-1 leading-tight group-hover:text-orange-600 transition-colors">
            {title}
          </h4>
          {subtitle && <p className="text-sm font-semibold text-gray-400 mb-3">{subtitle}</p>}
          <p className="text-base text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>

      </div>
    </Link>
  );
};