import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content?: React.ReactNode;
}

const posts: BlogPost[] = [
  {
    id: 'ai-updates-03-2025',
    title: 'AI Updates 03-2025',
    excerpt: 'A comprehensive look at the rapid advancements in LLMs, video generation, and what it means for marketers this month.',
    date: 'March 15, 2025',
    readTime: '5 min read',
    category: 'Industry News',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    content: (
      <div className="prose prose-lg prose-indigo max-w-none text-gray-600">
        <p className="lead text-xl text-gray-800 font-medium mb-8">
          The pace of innovation in Artificial Intelligence is not just accelerating; it's entering a warp speed phase. March 2025 has been a pivotal month for Generative AI, with major releases from OpenAI, Google, and Anthropic reshaping the landscape yet again.
        </p>
        
        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. The Rise of "Reasoning" Models</h3>
        <p>
          We are moving beyond simple text prediction. The latest iteration of models, notably Claude 3.5 Opus and Gemini 1.5 Pro's latest update, have demonstrated significantly improved reasoning capabilities. For marketers, this means we can now trust AI agents to handle complex, multi-step workflows—like analyzing a dataset, formulating a strategy, and drafting the copy—with far less human oversight than before.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Video Generation Goes Mainstream</h3>
        <p>
          Sora's public beta and Veo's integration into Workspace have effectively democratized high-fidelity video production. 
          What used to cost $10,000 and take three weeks can now be prototyped in minutes.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4 mb-6">
            <li><strong>Text-to-Video:</strong> Creating B-roll from scratch.</li>
            <li><strong>Image-to-Video:</strong> Animating static brand assets.</li>
            <li><strong>Video-to-Video:</strong> Style transfer for consistent branding.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. The Impact on Marketing Teams</h3>
        <p>
          The question is no longer "Will AI replace marketers?" but "Which marketers will lead the AI transition?" 
          We are seeing a shift towards smaller, hyper-efficient teams. The "Generalist" is becoming the most valuable player—someone who can orchestrate copy, design, and video using AI tools, rather than specializing deeply in just one execution channel.
        </p>

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
            <h4 className="text-lg font-bold text-blue-900 mb-2">Key Takeaway</h4>
            <p className="text-blue-800">
                Stop waiting for the "perfect" tool. The ecosystem is fragmented, but the core capability—strategic prompting—is universal. Start building your custom GPTs and Agents today.
            </p>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'The Death of SEO (Again?)',
    excerpt: 'Search Generative Experience is fully live. Here is how you optimize for answer engines instead of search engines.',
    date: 'March 10, 2025',
    readTime: '4 min read',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800',
    content: (
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600">
          <p className="lead text-xl text-gray-800 font-medium mb-8">
            SEO has died a thousand deaths in the headlines, but this time, the wound looks different. With Google's Search Generative Experience (SGE) taking up the entire "above the fold" real estate, the era of the "10 blue links" is officially over.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Zero-Click is the New Normal</h3>
          <p>
            Users aren't clicking through to your carefully optimized blog post to find the answer. The AI is reading your post, summarizing it, and presenting the answer directly on the results page. This is the "Zero-Click" future. Traffic to informational queries is dropping by 30-50% across the board.
          </p>
  
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Optimizing for Answer Engines (AEO)</h3>
          <p>
            So, how do we survive? We shift from SEO to AEO (Answer Engine Optimization).
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-4 mb-6">
              <li><strong>Structure is King:</strong> Use clear schema markup. AI needs to parse your data effortlessly.</li>
              <li><strong>Authoritative Voice:</strong> Generic "AI-written" content gets filtered out. You need genuine human insight, anecdotes, and unique data.</li>
              <li><strong>Brand as a Keyword:</strong> If people aren't searching for <em>your brand</em> specifically, you are at the mercy of the algorithm. Build a brand that people ask the AI about.</li>
          </ul>
  
          <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 my-8">
              <h4 className="text-lg font-bold text-yellow-900 mb-2">The Pivot</h4>
              <p className="text-yellow-800">
                  Stop optimizing for "traffic." Start optimizing for "influence." If the AI cites you as the source of truth, that citation is worth more than a generic click from a user who bounces in 3 seconds.
              </p>
          </div>
        </div>
      )
  },
  {
    id: '3',
    title: 'Building Your Second Brain',
    excerpt: 'How to use Notion AI and Obsidian to capture, organize, and synthesize your creative output.',
    date: 'Feb 28, 2025',
    readTime: '6 min read',
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
    content: (
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600">
          <p className="lead text-xl text-gray-800 font-medium mb-8">
            In the age of information overload, your biological brain is not enough. You need a digital extension—a "Second Brain"—to handle the capture and storage of ideas, leaving your mind free for creativity.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Capture vs. Consume</h3>
          <p>
            Most of us are passive consumers. We read a tweet, watch a video, nod in agreement, and forget it 10 minutes later. A Second Brain changes this habit. Using tools like Obsidian or Notion, every piece of content you consume should be captured if it resonates. 
          </p>
  
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Role of AI in Knowledge Management</h3>
          <p>
            This is where 2025 differs from 2020. Previously, organizing your notes was a chore. Now, AI does the heavy lifting.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-4 mb-6">
              <li><strong>Auto-Tagging:</strong> I dump raw notes into Notion, and an AI agent categorizes them by topic and project.</li>
              <li><strong>Synthesis:</strong> I can ask my Second Brain, "What have I read about 'Community Building' in the last year?" and it generates a synthesized essay based on my own notes.</li>
          </ul>
  
          <p>
             The goal isn't to become a librarian of your own thoughts. It's to build a personal knowledge engine that surfaces the right idea at the exact moment you need it.
          </p>
        </div>
      )
  },
  {
    id: '4',
    title: 'Prompt Engineering 201',
    excerpt: 'Moving beyond "Act as a...". Advanced techniques like Chain-of-Thought and Tree-of-Thought prompting.',
    date: 'Feb 15, 2025',
    readTime: '8 min read',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    content: (
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600">
          <p className="lead text-xl text-gray-800 font-medium mb-8">
            If your prompts still start with "Act as a world-class copywriter," you are stuck in 2023. Modern LLMs need more than role-play; they need structure, context, and reasoning paths.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Chain-of-Thought (CoT)</h3>
          <p>
            Instead of asking for the final output immediately, force the model to show its work. 
            <br />
            <em>Bad Prompt:</em> "Write a marketing email for this product."
            <br />
            <em>Good Prompt:</em> "First, analyze the target audience's pain points based on the data below. Second, outline three potential angles for the email. Finally, draft the email using the 'Fear of Missing Out' angle."
          </p>
  
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tree-of-Thought (ToT)</h3>
          <p>
            For complex strategic problems, use Tree-of-Thought. Ask the AI to generate three distinct solutions, critique the pros and cons of each, and then combine the best elements into a final recommendation. This mimics a collaborative brainstorming session with a team of experts.
          </p>
  
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Context Windows are the New Gold</h3>
          <p>
            With Gemini 1.5 Pro's massive context window, you don't need to fine-tune models as often. You can simply upload your entire brand brand book, last 50 emails, and product manual into the prompt. RAG (Retrieval-Augmented Generation) is becoming accessible to non-coders via simple file uploads.
          </p>
        </div>
      )
  },
  {
    id: '5',
    title: 'Agency vs In-House in 2025',
    excerpt: 'Why the hybrid model is winning, and how to structure your marketing department for agility.',
    date: 'Jan 30, 2025',
    readTime: '5 min read',
    category: 'Leadership',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    content: (
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600">
          <p className="lead text-xl text-gray-800 font-medium mb-8">
            The traditional agency model—high retainers, bloated teams, and slow turnaround—is bleeding out. But going fully in-house has its own risks, primarily the lack of diverse perspectives and specialized skills.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Rise of the "Fractional" Specialist</h3>
          <p>
            We are entering the era of the "Hollywood Model" for marketing. Companies act as producers, assembling a temporary team of elite specialists (fractional CMOs, AI automation experts, niche copywriters) for specific projects, then disbanding them. This allows SMEs to access enterprise-level talent without the full-time headcount costs.
          </p>
  
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">AI as the In-House Junior</h3>
          <p>
            The entry-level work (reporting, basic research, first drafts) is now handled by in-house AI agents. This pushes human employees to level up. Your in-house team should consist of "Editors" and "Strategists," not just "Doers." 
          </p>

          <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200 my-8">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Recommendation</h4>
            <p className="text-gray-700">
                Keep strategy and brand governance in-house. Outsource execution to fractional experts who use AI to deliver 5x faster than a traditional agency.
            </p>
        </div>
        </div>
      )
  },
  {
    id: '6',
    title: 'The Ethics of AI Copywriting',
    excerpt: 'Navigating copyright, disclosure, and the uncanny valley. Keeping the human in the loop.',
    date: 'Jan 12, 2025',
    readTime: '4 min read',
    category: 'Opinion',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
    content: (
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600">
          <p className="lead text-xl text-gray-800 font-medium mb-8">
            Just because you <em>can</em> generate 100 SEO articles in 5 minutes doesn't mean you <em>should</em>. As we flood the internet with synthetic content, trust becomes the scarcest currency.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Uncanny Valley of Text</h3>
          <p>
            Readers are developing a "sixth sense" for AI content. The perfectly balanced sentence structures, the overuse of words like "delve" and "landscape," the lack of strong opinions—it feels sterile. To overcome this, you must inject "flaws." Personal anecdotes, controversial takes, and colloquialisms are what signal humanity.
          </p>
  
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclosure and Brand Integrity</h3>
          <p>
            Should you label your content as AI-generated? My stance is: disclose the <em>process</em>, not the line items. If AI helped you research and outline, but you wrote the final draft, that's just modern writing. If AI wrote it entirely, and you publish it under your name, you are borrowing credibility you didn't earn. Eventually, the debt comes due.
          </p>

          <p>
            The winning strategy for 2025 is <strong>AI-Augmented, Human-Led</strong>. Use AI to break writer's block and scale variation, but never let it be the final approver of your brand's voice.
          </p>
        </div>
      )
  }
];

export const Blog: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = posts.find(p => p.id === selectedPostId);

  // Scroll to top when switching views
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPostId]);

  if (selectedPost) {
    return (
      <article className="min-h-screen pt-32 pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <button 
            onClick={() => setSelectedPostId(null)}
            className="group flex items-center text-sm font-semibold text-gray-500 hover:text-black mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Writing
          </button>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
              {selectedPost.category}
            </span>
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" /> {selectedPost.date}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" /> {selectedPost.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            {selectedPost.title}
          </h1>

          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {selectedPost.content || (
            <div className="text-gray-500 italic">
              Content for this post is not available in the preview.
            </div>
          )}

          <hr className="my-12 border-gray-100" />

          {/* Author Block */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Amit+Srivatsa&background=000&color=fff" alt="Amit" />
            </div>
            <div>
                <p className="font-bold text-gray-900">Written by Amit Srivatsa</p>
                <p className="text-sm text-gray-500">Marketing Strategist & AI Consultant</p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Writing.
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl">
            Thoughts on the intersection of Marketing, AI, and the future of work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPostId(post.id)}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-gray-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center text-sm font-bold text-gray-900">
                Read Article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};