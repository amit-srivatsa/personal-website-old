import React, { useState, useEffect } from 'react';
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

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => {
        const formattedPosts = data.map((blog: any) => ({
          id: blog.link,
          title: blog.title,
          excerpt: blog.content.substring(0, 150) + '...',
          date: new Date(blog.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: '5 min read',
          image: blog.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
          category: blog.categories[0] || 'Uncategorized',
          content: <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        }));
        setPosts(formattedPosts);
      });
  }, []);

  const selectedPost = posts.find(p => p.id === selectedPostId);

  // Scroll to top when switching views
  useEffect(() => {
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