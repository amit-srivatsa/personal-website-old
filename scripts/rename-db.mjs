import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function renameDb() {
    console.log('Renaming database in Notion to verify access...');
    try {
        const db = await notion.databases.update({
            database_id: DATABASE_ID,
            title: [{ type: 'text', text: { content: 'Automated DB Test - Antigravity' } }]
        });
        console.log(`✅ Successfully renamed Database to: ${db.title[0].plain_text}`);
    } catch (error) {
        console.error('❌ Failed to rename database:', error.message);
    }
}

renameDb();
