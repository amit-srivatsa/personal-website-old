import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content?: string;
}

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch markdown files from src/content/blog
    const modules = import.meta.glob('../content/blog/*.md', { query: '?raw', eager: true });

    const formattedPosts = Object.entries(modules).map(([filepath, content]: [string, any]) => {
      // Basic Frontmatter parser
      const str = content.default || content; // Handle potential default export or raw string
      const match = /---\n([\s\S]*?)\n---/.exec(str);
      const frontmatter = match ? match[1] : '';
      const body = str.replace(/---\n[\s\S]*?\n---/, '').trim();

      const metadata: any = {};
      frontmatter.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          let value = parts.slice(1).join(':').trim();
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          metadata[key] = value;
        }
      });

      return {
        id: filepath,
        title: metadata.title || 'Untitled',
        excerpt: body.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...', // Strip HTML for excerpt
        date: new Date(metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: `${Math.max(1, Math.ceil(body.split(/\s+/).length / 200))} min read`,
        image: metadata.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        category: metadata.category || 'Uncategorized',
        content: body // Store raw markdown string
      };
    });

    // Sort by date desc
    formattedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setPosts(formattedPosts);
  }, []);

  const selectedPost = posts.find(p => p.id === selectedPostId);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPostId]);

  if (selectedPost) {
    return (
      <article className="min-h-screen pt-32 pb-24 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6">
          <button
            onClick={() => setSelectedPostId(null)}
            className="group flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Writing
          </button>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-medium">
              {selectedPost.category}
            </span>
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" /> {selectedPost.date}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" /> {selectedPost.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 leading-tight tracking-tight">
            {selectedPost.title}
          </h1>

          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {selectedPost.content ? (
            <div className="
              prose prose-lg prose-slate dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-gray-100
              prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-lg
              prose-blockquote:border-l-4 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:italic
              prose-li:text-gray-600 dark:prose-li:text-gray-300
              marker:text-gray-400 dark:marker:text-gray-500
            ">
              <Markdown>{selectedPost.content}</Markdown>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 italic">
              Content for this post is not available.
            </div>
          )}

          <hr className="my-12 border-gray-100 dark:border-gray-800" />

          {/* Author Block */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Amit+Srivatsa&background=000&color=fff" alt="Amit" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-gray-100">Written by Amit Srivatsa</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Strategist & AI Consultant</p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6">
            Writing.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                  {post.category}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center text-sm font-bold text-gray-900 dark:text-gray-100">
                Read Article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};