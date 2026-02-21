import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function run() {
    try {
        const db = await notion.databases.retrieve({ database_id: DATABASE_ID });
        console.log('Current Props:', Object.keys(db.properties));

        console.log('Updating...');
        const res = await notion.databases.update({
            database_id: DATABASE_ID,
            properties: {
                Slug: { rich_text: {} },
                Test: { checkbox: {} }
            }
        });
        console.log('Keys after Update:', Object.keys(res.properties));
    } catch (err) {
        console.log('Error:', err.message, err.status);
    }
}
run();
