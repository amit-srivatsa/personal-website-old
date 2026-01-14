import React, { useState, useEffect } from 'react';
import { Save, Plus, FileText, Calendar, Image as ImageIcon, Tag, Layout } from 'lucide-react';

interface BlogPost {
    filename: string;
    title: string;
    date: string;
    image: string;
    category: string;
    excerpt: string;
    content: string;
}

export const AdminDashboard: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form State
    const [formData, setFormData] = useState<BlogPost>({
        filename: '',
        title: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        category: 'Thoughts',
        excerpt: '',
        content: ''
    });

    useEffect(() => {
        loadPosts();
    }, []);

    useEffect(() => {
        if (selectedPost) {
            setFormData(selectedPost);
        } else {
            // Reset for new post
            setFormData({
                filename: `post-${Date.now()}.md`,
                title: '',
                date: new Date().toISOString().split('T')[0],
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
                category: 'Thoughts',
                excerpt: '',
                content: ''
            });
        }
    }, [selectedPost]);

    const loadPosts = async () => {
        const modules = import.meta.glob('../../src/content/blog/*.md', { query: '?raw', eager: true });

        const loadedPosts: BlogPost[] = Object.entries(modules).map(([filepath, content]: [string, any]) => {
            const filename = filepath.split('/').pop() || '';
            const str = content.default || content;
            const match = /---\n([\s\S]*?)\n---/.exec(str);
            const frontmatter = match ? match[1] : '';
            const body = str.replace(/---\n[\s\S]*?\n---/, '').trim();

            const metadata: any = {};
            frontmatter.split('\n').forEach(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    let value = parts.slice(1).join(':').trim();
                    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                    metadata[key] = value;
                }
            });

            return {
                filename,
                title: metadata.title || 'Untitled',
                date: metadata.date || '',
                image: metadata.image || '',
                category: metadata.category || 'Uncategorized',
                excerpt: metadata.excerpt || '',
                content: body
            };
        });

        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(loadedPosts);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);

        // Construct file content
        const fileContent = `---
title: "${formData.title}"
date: ${formData.date}
image: "${formData.image}"
category: "${formData.category}"
excerpt: "${formData.excerpt || formData.content.slice(0, 150).replace(/\n/g, ' ')}..."
---

${formData.content}`;

        // Generate filename if needed (slugify title)
        let filename = formData.filename;
        if (!filename || filename.startsWith('post-')) {
            const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            if (slug) filename = `${slug}.md`;
        }

        try {
            const res = await fetch('/api/save-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename,
                    content: fileContent
                })
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Saved successfully!' });
                // Refresh list?
                // Ideally we wait for HMR or manual reload, but let's just update local state
                loadPosts();
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error saving post.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="font-bold text-lg text-gray-900">Content</h2>
                    <button
                        onClick={() => setSelectedPost(null)}
                        className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {posts.map(post => (
                        <div
                            key={post.filename}
                            onClick={() => setSelectedPost(post)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPost?.filename === post.filename ? 'bg-blue-50 hover:bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
                                }`}
                        >
                            <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{post.title}</h3>
                            <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
                    <h1 className="font-bold text-xl text-gray-900">
                        {selectedPost ? 'Edit Post' : 'New Post'}
                    </h1>
                    <div className="flex items-center gap-4">
                        {message && (
                            <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {message.text}
                            </span>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            <Save size={18} />
                            {isSaving ? 'Saving...' : 'Save Draft'}
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Post Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-lg font-bold"
                                placeholder="Enter post title..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Calendar size={16} /> Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                />
                            </div>
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Tag size={16} /> Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white"
                                >
                                    <option>AI Strategy</option>
                                    <option>Content Marketing</option>
                                    <option>Tutorial</option>
                                    <option>Workflow</option>
                                    <option>Thoughts</option>
                                </select>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Layout size={16} /> Excerpt
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                                placeholder="Brief summary of the post..."
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <ImageIcon size={16} /> Cover Image URL
                            </label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                placeholder="https://..."
                            />
                            {formData.image && (
                                <div className="mt-4 rounded-xl overflow-hidden h-48 bg-gray-100 border border-gray-200">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <FileText size={16} /> Content (Markdown)
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                rows={20}
                                className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none font-mono text-sm leading-relaxed"
                                placeholder="# Write your magnificent content here..."
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
