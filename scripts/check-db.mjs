import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function search() {
    try {
        const res = await notion.search({});
        console.log(`Found ${res.results.length} objects total`);
        for (const obj of res.results) {
            if (obj.object === 'database') {
                console.log(`\nFound real Database ID: ${obj.id}`);
                console.log(`Title: ${obj.title[0]?.plain_text}`);
                if (obj.properties) {
                    console.log(`Properties: ${Object.keys(obj.properties).join(', ')}`);
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}

search();
