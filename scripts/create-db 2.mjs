import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const PAGE_ID = '2a9d184c-14dd-80aa-bc89-c92fe5f6b346';

async function createDb() {
    console.log('Creating database in Notion...');
    try {
        const db = await notion.databases.create({
            parent: { type: 'page_id', page_id: PAGE_ID },
            title: [{ type: 'text', text: { content: 'Claude Blogs (Website APIs)' } }],
            properties: {
                Name: { title: {} }
            }
        });
        console.log(`✅ Successfully created Database!`);
        console.log(`New Database ID: ${db.id}`);
    } catch (error) {
        console.error('❌ Failed to create database:', error.message, error.status);
    }
}

createDb();
