import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function createPost() {
    console.log('Creating test post in Notion...');
    try {
        const res = await notion.pages.create({
            parent: { database_id: DATABASE_ID },
            properties: {
                Name: { title: [{ text: { content: 'AI Test Post via API' } }] },
                Slug: { rich_text: [{ text: { content: 'ai-test-post-via-api' } }] },
                Excerpt: { rich_text: [{ text: { content: 'This is a test post created via the Notion API to verify the integration.' } }] },
                'Published Date': { date: { start: new Date().toISOString() } },
                Category: { select: { name: 'AI' } },
                Tags: { multi_select: [{ name: 'AI' }, { name: 'Technology' }] },
                Status: { select: { name: 'Published' } },
                Featured: { checkbox: true }
            }
        });
        console.log(`✅ Test post created successfully! Page ID: ${res.id}`);
    } catch (error) {
        console.error('❌ Failed to create test post:', error.message);
    }
}

createPost();
